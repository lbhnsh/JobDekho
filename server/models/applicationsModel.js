import mongoose from "mongoose";
import validator from "validator";

const applicationSchema = new mongoose.Schema(
    {
        jobId: {
            type: mongoose.Schema.Types.ObjectId,
            // ref: "Jobs",
            required: true,
        },
        applicantId: {
            type: mongoose.Schema.Types.ObjectId,
            // ref: "Users", 
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
