import { model, models, Schema, Types } from "mongoose";

export const IMAGE_DIMENSIONS = {
  width: 1080,
  height: 1920
} as const;

export interface IImage{
  _id?: Types.ObjectId;
  title: string;
  description: string;
  imgUrl: string; // Cloud storage URL
  type: "profile" | "article" | "other"
  controls: boolean; // Whether transformation is applied
  transformation?: {
    height: number;
    width: number;
    quality?: number;
  };
    createdAt?: Date;
    updatedAt?: Date;
};

const imageSchema = new Schema<IImage>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    imgUrl: { type: String, required: true }, // Store image URL
    type: { type: String, enum: ["profile", "article", "other"], required: true },
    controls: { type: Boolean, default: true }, 
    transformation: {
      height: { type: Number, default: IMAGE_DIMENSIONS.height },
      width: { type: Number, default: IMAGE_DIMENSIONS.width },
      quality: { type: Number, min: 1, max: 100 },
    }
  },
  { timestamps: true }
);

// Index for optimized queries
imageSchema.index({ type: 1 });

const Image = models?.Image || model<IImage>("Image", imageSchema);
export default Image;
