import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
    {
        job: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Jobs",
            required: true,
        },
        applicant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users", // Assuming you have a Users model
            required: true,
        },
        details: {
            type: Object,
            required: true,
        },
    },
    { timestamps: true }
);

const Applications = mongoose.model("Applications", applicationSchema);

export default Applications;
