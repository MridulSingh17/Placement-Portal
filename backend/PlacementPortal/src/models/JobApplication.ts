import mongoose, { Document, Schema } from 'mongoose';

export interface JobApplicationDocument extends Document {
  studentId: mongoose.Types.ObjectId;
  jobId: mongoose.Types.ObjectId;
  status: 'applied' | 'shortlisted' | 'selected' | 'rejected';
  appliedOn: Date;
}

const JobApplicationSchema = new Schema<JobApplicationDocument>(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
    },
    status: {
      type: String,
      enum: ['applied', 'shortlisted', 'selected', 'rejected'],
      default: 'applied',
    },
    appliedOn: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const JobApplication = mongoose.model<JobApplicationDocument>(
  'Application',
  JobApplicationSchema
);

export default JobApplication;
