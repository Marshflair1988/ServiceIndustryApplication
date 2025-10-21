const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/hospitality-hub',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

// Create admin user if it doesn't exist
const createAdminUser = async () => {
  try {
    const adminExists = await User.findOne({
      email: 'admin@hospitalityhub.com',
    });

    if (adminExists) {
      console.log('✅ Admin user already exists');
      return;
    }

    const adminUser = new User({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@hospitalityhub.com',
      password: 'admin123456', // Change this in production
      role: 'admin',
      businessName: 'Hospitality Hub',
      isVerified: true,
      isActive: true,
    });

    await adminUser.save();
    console.log('✅ Admin user created successfully');
    console.log('📧 Email: admin@hospitalityhub.com');
    console.log('🔑 Password: admin123456');
    console.log('⚠️  Please change the admin password in production!');
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
  }
};

// Main setup function
const setup = async () => {
  console.log('🚀 Setting up Hospitality Hub Backend...\n');

  await connectDB();
  await createAdminUser();

  console.log('\n✅ Setup completed successfully!');
  console.log('🎉 You can now start the server with: npm run dev');

  process.exit(0);
};

// Run setup
setup();
