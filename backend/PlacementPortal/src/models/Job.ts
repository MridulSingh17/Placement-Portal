import mongoose, { Schema, Document } from "mongoose";

export interface JobDocument extends Document {
  title: string;
  company: string;
  description: string;
  location: string;
  salary: string;
  lastDate: string;
  openings: number;
  postedBy: string;
}

const jobSchema = new Schema<JobDocument>({
  title: { type: String, required: true },
  company: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  salary: { type: String },
  lastDate: { type: String, required: true },
  openings: { type: Number, required: true },
  postedBy: { type: String, required: true },
}, {
  timestamps: true,
});

const Job = mongoose.model<JobDocument>("Job", jobSchema);
export default Job;
