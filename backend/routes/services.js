const express = require('express');
const { body, validationResult, query } = require('express-validator');
const Service = require('../models/Service');
const { auth, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/services
// @desc    Get all services with filtering and search
// @access  Public
router.get(
  '/',
  optionalAuth,
  [
    query('page')
      .optional()
      .isInt({ min: 1 })
      .withMessage('Page must be a positive integer'),
    query('limit')
      .optional()
      .isInt({ min: 1, max: 50 })
      .withMessage('Limit must be between 1 and 50'),
    query('category')
      .optional()
      .isIn([
        'catering',
        'event_planning',
        'staffing',
        'cleaning',
        'maintenance',
        'security',
        'entertainment',
        'photography',
        'floral',
        'transportation',
        'other',
      ]),
    query('minPrice')
      .optional()
      .isFloat({ min: 0 })
      .withMessage('Min price must be a positive number'),
    query('maxPrice')
      .optional()
      .isFloat({ min: 0 })
      .withMessage('Max price must be a positive number'),
    query('location').optional().trim(),
    query('search').optional().trim(),
    query('sortBy')
      .optional()
      .isIn(['price', 'rating', 'createdAt', 'popularity'])
      .withMessage('Invalid sort option'),
    query('sortOrder')
      .optional()
      .isIn(['asc', 'desc'])
      .withMessage('Sort order must be asc or desc'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array(),
        });
      }

      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 12;
      const skip = (page - 1) * limit;

      // Build filter object
      const filter = { isActive: true, isVerified: true };

      if (req.query.category) filter.category = req.query.category;
      if (req.query.minPrice || req.query.maxPrice) {
        filter.price = {};
        if (req.query.minPrice)
          filter.price.$gte = parseFloat(req.query.minPrice);
        if (req.query.maxPrice)
          filter.price.$lte = parseFloat(req.query.maxPrice);
      }
      if (req.query.location) {
        filter.$or = [
          { 'location.city': { $regex: req.query.location, $options: 'i' } },
          { 'location.state': { $regex: req.query.location, $options: 'i' } },
        ];
      }
      if (req.query.search) {
        filter.$text = { $search: req.query.search };
      }

      // Build sort object
      const sortBy = req.query.sortBy || 'createdAt';
      const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
      const sort = { [sortBy]: sortOrder };

      // If sorting by popularity, use bookings count
      if (sortBy === 'popularity') {
        sort['metadata.bookings'] = sortOrder;
      }

      const services = await Service.find(filter)
        .populate(
          'provider',
          'firstName lastName businessName businessType profileImage'
        )
        .sort(sort)
        .skip(skip)
        .limit(limit);

      const total = await Service.countDocuments(filter);

      res.json({
        success: true,
        data: {
          services,
          pagination: {
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalServices: total,
            hasNext: page < Math.ceil(total / limit),
            hasPrev: page > 1,
          },
        },
      });
    } catch (error) {
      console.error('Get services error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error',
      });
    }
  }
);

// @route   GET /api/services/:id
// @desc    Get service by ID
// @access  Public
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate(
      'provider',
      'firstName lastName businessName businessType profileImage email phone address'
    );

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found',
      });
    }

    // Increment view count
    service.metadata.views += 1;
    await service.save();

    res.json({
      success: true,
      data: { service },
    });
  } catch (error) {
    console.error('Get service error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
});

// @route   POST /api/services
// @desc    Create a new service
// @access  Private (Service providers only)
router.post(
  '/',
  auth,
  [
    body('title').trim().notEmpty().withMessage('Service title is required'),
    body('description')
      .trim()
      .notEmpty()
      .withMessage('Service description is required'),
    body('category')
      .isIn([
        'catering',
        'event_planning',
        'staffing',
        'cleaning',
        'maintenance',
        'security',
        'entertainment',
        'photography',
        'floral',
        'transportation',
        'other',
      ])
      .withMessage('Invalid category'),
    body('price')
      .isFloat({ min: 0 })
      .withMessage('Price must be a positive number'),
    body('priceType')
      .isIn(['hourly', 'daily', 'per_event', 'per_person', 'fixed'])
      .withMessage('Invalid price type'),
    body('duration')
      .isFloat({ min: 0.5 })
      .withMessage('Duration must be at least 0.5 hours'),
    body('capacity.min')
      .optional()
      .isInt({ min: 1 })
      .withMessage('Min capacity must be at least 1'),
    body('capacity.max')
      .optional()
      .isInt({ min: 1 })
      .withMessage('Max capacity must be at least 1'),
  ],
  async (req, res) => {
    try {
      // Check if user is a service provider
      if (!['service_provider', 'venue_owner'].includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: 'Only service providers can create services',
        });
      }

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array(),
        });
      }

      const serviceData = {
        ...req.body,
        provider: req.userId,
      };

      const service = new Service(serviceData);
      await service.save();

      const populatedService = await Service.findById(service._id).populate(
        'provider',
        'firstName lastName businessName businessType profileImage'
      );

      res.status(201).json({
        success: true,
        message: 'Service created successfully',
        data: { service: populatedService },
      });
    } catch (error) {
      console.error('Create service error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error',
      });
    }
  }
);

// @route   PUT /api/services/:id
// @desc    Update service
// @access  Private (Service owner or admin)
router.put(
  '/:id',
  auth,
  [
    body('title').optional().trim().notEmpty(),
    body('description').optional().trim().notEmpty(),
    body('category')
      .optional()
      .isIn([
        'catering',
        'event_planning',
        'staffing',
        'cleaning',
        'maintenance',
        'security',
        'entertainment',
        'photography',
        'floral',
        'transportation',
        'other',
      ]),
    body('price').optional().isFloat({ min: 0 }),
    body('priceType')
      .optional()
      .isIn(['hourly', 'daily', 'per_event', 'per_person', 'fixed']),
    body('duration').optional().isFloat({ min: 0.5 }),
  ],
  async (req, res) => {
    try {
      const service = await Service.findById(req.params.id);

      if (!service) {
        return res.status(404).json({
          success: false,
          message: 'Service not found',
        });
      }

      // Check if user owns the service or is admin
      if (
        req.user.role !== 'admin' &&
        service.provider.toString() !== req.userId.toString()
      ) {
        return res.status(403).json({
          success: false,
          message: 'Access denied',
        });
      }

      const allowedUpdates = [
        'title',
        'description',
        'category',
        'subcategory',
        'price',
        'priceType',
        'duration',
        'capacity',
        'location',
        'availability',
        'images',
        'features',
        'requirements',
        'tags',
      ];

      const updates = {};
      allowedUpdates.forEach((field) => {
        if (req.body[field] !== undefined) {
          updates[field] = req.body[field];
        }
      });

      const updatedService = await Service.findByIdAndUpdate(
        req.params.id,
        { $set: updates },
        { new: true, runValidators: true }
      ).populate(
        'provider',
        'firstName lastName businessName businessType profileImage'
      );

      res.json({
        success: true,
        message: 'Service updated successfully',
        data: { service: updatedService },
      });
    } catch (error) {
      console.error('Update service error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error',
      });
    }
  }
);

// @route   DELETE /api/services/:id
// @desc    Delete service
// @access  Private (Service owner or admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found',
      });
    }

    // Check if user owns the service or is admin
    if (
      req.user.role !== 'admin' &&
      service.provider.toString() !== req.userId.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: 'Access denied',
      });
    }

    // Soft delete - set isActive to false
    service.isActive = false;
    await service.save();

    res.json({
      success: true,
      message: 'Service deactivated successfully',
    });
  } catch (error) {
    console.error('Delete service error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
});

// @route   GET /api/services/provider/:providerId
// @desc    Get services by provider
// @access  Public
router.get('/provider/:providerId', optionalAuth, async (req, res) => {
  try {
    const services = await Service.find({
      provider: req.params.providerId,
      isActive: true,
    })
      .populate(
        'provider',
        'firstName lastName businessName businessType profileImage'
      )
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: { services },
    });
  } catch (error) {
    console.error('Get provider services error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
});

// @route   GET /api/services/categories/list
// @desc    Get list of service categories
// @access  Public
router.get('/categories/list', (req, res) => {
  const categories = [
    { value: 'catering', label: 'Catering' },
    { value: 'event_planning', label: 'Event Planning' },
    { value: 'staffing', label: 'Staffing' },
    { value: 'cleaning', label: 'Cleaning' },
    { value: 'maintenance', label: 'Maintenance' },
    { value: 'security', label: 'Security' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'photography', label: 'Photography' },
    { value: 'floral', label: 'Floral' },
    { value: 'transportation', label: 'Transportation' },
    { value: 'other', label: 'Other' },
  ];

  res.json({
    success: true,
    data: { categories },
  });
});

module.exports = router;
