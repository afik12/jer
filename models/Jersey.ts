import mongoose, { Model } from "mongoose";
import type { Jersey as JerseyType } from "@/types/jersey";

const JerseySchema = new mongoose.Schema<JerseyType>(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    club: { type: String, required: true },
    league: { type: String, required: true },
    era: { type: String, required: true },
    decade: { type: String, required: true },
    story: { type: String },
    theme: { type: mongoose.Schema.Types.Mixed, required: true },
    imageUrl: { type: String },
    images: { type: [String], default: undefined },
    price: { type: Number },
    sizes: { type: [String], default: undefined },
    trending: { type: Boolean },
    isNationalTeam: { type: Boolean },
  },
  { collection: "jerseys" }
);

export const JerseyModel: Model<JerseyType> =
  mongoose.models.Jersey ?? mongoose.model<JerseyType>("Jersey", JerseySchema);
