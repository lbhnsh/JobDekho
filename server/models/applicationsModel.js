import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
    {
        jobId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        applicantId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        applicantDetails: {
            type: Object,
            required: true,
        },
    },
    { timestamps: true }
);

const Applications = mongoose.model("Applications", applicationSchema);

export default Applications;
