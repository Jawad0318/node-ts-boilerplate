import { model, Schema, Document } from 'mongoose';

import Admin from '@interfaces/admins.interface';


// admin schema

const adminSchema = new Schema(
    {
        name: {
            type: String,
            requireed: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
        },
        role: {
            type: String,
            default: 'admin',
            enum: ['admin', 'superadmin'],
        },
        active: {
            type: Boolean,
            default: true,
        }
    },
);

export default model <Admin & Document>('Admin', adminSchema);