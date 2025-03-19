import { model, models, Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
    email: string;
    password: string;
    avatar?: string;
    bio?: string;
    username: string;
    isProfileComplete: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    // add user preffered choices like tech, sports etc.
    comparePassword(candidatePassword: string): Promise<boolean>;  // <-- Added method to interface
}

const userSchema = new Schema<IUser>(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, select: false }, // ⬅️ select: false for security
        username: { type: String, required: true, unique: true },            
        avatar: { type: String },
        bio: { type: String },
        isProfileComplete: { type: Boolean, default: false }, // <-- New field with default value

    },
    { timestamps: true }
);

// 🔹 Hash password before saving
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// 🔹 Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

const User = models?.User || model<IUser>("User", userSchema);
export default User;
