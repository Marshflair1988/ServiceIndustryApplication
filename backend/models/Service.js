const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
  {
    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Service provider is required'],
    },
    title: {
      type: String,
      required: [true, 'Service title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Service description is required'],
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    category: {
      type: String,
      required: [true, 'Service category is required'],
      enum: [
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
      ],
    },
    subcategory: {
      type: String,
      trim: true,
      maxlength: [50, 'Subcategory cannot exceed 50 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    priceType: {
      type: String,
      enum: ['hourly', 'daily', 'per_event', 'per_person', 'fixed'],
      default: 'fixed',
    },
    duration: {
      type: Number, // in hours
      required: [true, 'Duration is required'],
      min: [0.5, 'Duration must be at least 0.5 hours'],
    },
    capacity: {
      min: { type: Number, min: 1 },
      max: { type: Number, min: 1 },
    },
    location: {
      type: {
        type: String,
        enum: ['on_site', 'off_site', 'both'],
        default: 'both',
      },
      address: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: { type: String, default: 'US' },
      },
      travelRadius: Number, // in miles
    },
    availability: {
      monday: {
        start: String,
        end: String,
        available: { type: Boolean, default: true },
      },
      tuesday: {
        start: String,
        end: String,
        available: { type: Boolean, default: true },
      },
      wednesday: {
        start: String,
        end: String,
        available: { type: Boolean, default: true },
      },
      thursday: {
        start: String,
        end: String,
        available: { type: Boolean, default: true },
      },
      friday: {
        start: String,
        end: String,
        available: { type: Boolean, default: true },
      },
      saturday: {
        start: String,
        end: String,
        available: { type: Boolean, default: true },
      },
      sunday: {
        start: String,
        end: String,
        available: { type: Boolean, default: true },
      },
    },
    images: [
      {
        url: String,
        alt: String,
        isPrimary: { type: Boolean, default: false },
      },
    ],
    features: [String],
    requirements: [String],
    isActive: {
      type: Boolean,
      default: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    rating: {
      average: { type: Number, default: 0, min: 0, max: 5 },
      count: { type: Number, default: 0 },
    },
    tags: [String],
    metadata: {
      views: { type: Number, default: 0 },
      bookings: { type: Number, default: 0 },
      lastBooked: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
serviceSchema.index({ provider: 1 });
serviceSchema.index({ category: 1 });
serviceSchema.index({ isActive: 1, isVerified: 1 });
serviceSchema.index({ 'location.city': 1, 'location.state': 1 });
serviceSchema.index({ price: 1 });
serviceSchema.index({ 'rating.average': -1 });
serviceSchema.index({ tags: 1 });

// Text search index
serviceSchema.index({
  title: 'text',
  description: 'text',
  tags: 'text',
});

module.exports = mongoose.model('Service', serviceSchema);
