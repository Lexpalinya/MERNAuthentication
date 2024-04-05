import mongoose, { Document, Model } from 'mongoose';

// Define the structure of a user document
export interface User extends Document {
    username: string;
    password: string;
    email: string;
    firstName?: string;
    lastName?: string;
    mobile?: string;
    address?: string;
    profile?: string;
}

// Define the Mongoose schema for the user document
const userSchema = new mongoose.Schema<User>({
    username: {
        type: String,
        required: [true, "Please provide a unique Username"],
        unique: true,
        trim: true // Ensure leading/trailing spaces are removed
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    email: {
        type: String,
        required: [true, "Please provide a unique email"],
        unique: true,
        lowercase: true, // Convert email to lowercase
        trim: true // Ensure leading/trailing spaces are removed
    },
    firstName: String,
    lastName: String,
    mobile: String,
    address: String,
    profile: String
});

// Define the Mongoose model for the user schema


export default mongoose.model<User>('User', userSchema);
