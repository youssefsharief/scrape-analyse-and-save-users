import * as mongoose from 'mongoose';

export interface IDbUserModel extends mongoose.Document, IDbPureUserModel {}

export interface IDbPureUserModel {
    userId: string;
    status?: string;
    name?: string;
    socialMediaLinks?: string[];
    hashtags?: string[];
    latestActivityTime?: string;
}

export const getDbPureUser = (userId, status) => ({ userId, status });

const UserSchema = new mongoose.Schema({
    userId: { type: String, required: true, trim: true, index: true, unique: true, sparse: true },
    status: { type: String, required: false },
    name: { type: String, required: false },
    latestActivityTime: { type: Date, required: false },
    socialMediaLinks: { type: [String], required: false },
    hashtags: [String],
    messages: { type: [String], required: true, default: [] },
});

export const UserModel: mongoose.Model<IDbUserModel> = mongoose.models.User || mongoose.model<IDbUserModel>('User', UserSchema);
