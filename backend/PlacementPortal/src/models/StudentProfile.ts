import mongoose, { Schema, Document } from 'mongoose';

export interface StudentProfileDocument extends Document {
  userId: string;
  bio: string;
  skills: string[];
  resumeLink: string;
}

const studentProfileSchema = new Schema<StudentProfileDocument>({
  userId: { type: String, required: true, unique: true },
  bio: String,
  skills: [String],
  resumeLink: String,
}, { timestamps: true });

const StudentProfile = mongoose.model<StudentProfileDocument>('StudentProfile', studentProfileSchema);
export default StudentProfile;
