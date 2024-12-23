const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./models/User'); 

dotenv.config();

const createDefaultUser = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

        const email = 'admin@sharesphere.com';
        const password = 'Admin@123';

        // Check if the default user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('Default user already exists.');
            return process.exit(0);
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the default user
        const defaultUser = new User({
            name: 'Admin',
            email,
            password: hashedPassword,
        });

        await defaultUser.save();
        console.log(`Default user created: ${email} / ${password}`);
        process.exit(0);
    } catch (error) {
        console.error('Error creating default user:', error);
        process.exit(1);
    }
};

createDefaultUser();
