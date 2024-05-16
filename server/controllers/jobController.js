import mongoose from "mongoose";
import Jobs from "../models/jobsModel.js";
import Companies from "../models/companiesModel.js";
import Applications from "../models/applicationsModel.js"; // Ensure this line is correct

export const createJob = async (req, res, next) => {
  try {
    const {
      jobTitle,
      jobType,
      location,
      salary,
      vacancies,
      experience,
      desc,
      requirements,
    } = req.body;

    if (
      !jobTitle ||
      !jobType ||
      !location ||
      !salary ||
      !requirements ||
      !desc
    ) {
      return next("Please fill all the fields");
    }

    const id = req.body.user.userId;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send(`No company with id: ${id}`);
    }

    const jobPost = {
      jobTitle,
      jobType,
      location,
      salary,
      vacancies,
      experience,
      detail: { desc, requirements },
      company: id,
    };

    const job = new Jobs(jobPost);
    await job.save();

    // update the company info with job id
    const company = await Companies.findById(id);
    company.jobPosts.push(job._id);
    await company.save();

    res.status(200).json({
      success: true,
      message: "Job Posted!",
      job,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const updateJob = async (req, res, next) => {
  try {
    const {
      jobTitle,
      jobType,
      location,
      salary,
      vacancies,
      experience,
      desc,
      requirements,
    } = req.body;
    const { jobId } = req.params;

    if (
      !jobTitle ||
      !jobType ||
      !location ||
      !salary ||
      !desc ||
      !requirements
    ) {
      return next("Please Provide All Required Fields");
    }

    const id = req.body.user.userId;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send(`No Company with id: ${id}`);
    }

    const jobPost = {
      jobTitle,
      jobType,
      location,
      salary,
      vacancies,
      experience,
      detail: { desc, requirements },
    };

    const updatedJob = await Jobs.findByIdAndUpdate(jobId, jobPost, { new: true });
    res.status(200).json({
      success: true,
      message: "Job Post Updated",
      updatedJob,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getJobPosts = async (req, res, next) => {
  try {
    const { search, sort, location, jtype, exp } = req.query;
    const types = jtype?.split(",");
    const experience = exp?.split("-");

    let queryObject = {};
    if (location) {
      queryObject.location = { $regex: location, $options: "i" };
    }
    if (jtype) {
      queryObject.jobType = { $in: types };
    }
    if (exp) {
      queryObject.experience = {
        $gte: Number(experience[0]) - 1,
        $lte: Number(experience[1]) + 1,
      };
    }

    if (search) {
      const searchQuery = {
        $or: [
          { jobTitle: { $regex: search, $options: "i" } },
          { jobType: { $regex: search, $options: "i" } },
        ],
      };
      queryObject = { ...queryObject, ...searchQuery };
    }

    let queryResult = Jobs.find(queryObject).populate({
      path: "company",
      select: "-password",
    });

    if (sort === "Newest") {
      queryResult = queryResult.sort("-createdAt");
    }
    if (sort === "Oldest") {
      queryResult = queryResult.sort("createdAt");
    }
    if (sort === "A-Z") {
      queryResult = queryResult.sort("jobTitle");
    }
    if (sort === "Z-A") {
      queryResult = queryResult.sort("-jobTitle");
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const totalJobs = await Jobs.countDocuments(queryObject);
    const numOfPage = Math.ceil(totalJobs / limit);

    queryResult = queryResult.skip(skip).limit(limit);
    const jobs = await queryResult;

    res.status(200).json({
      success: true,
      totalJobs,
      data: jobs,
      page,
      numOfPage,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getJobById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const job = await Jobs.findById(id).populate({
      path: "company",
      select: "-password",
    });
    if (!job) {
      return res.status(404).json({
        message: "No such Job Found",
        success: false,
      });
    }

    const searchQuery = {
      $or: [
        { jobTitle: { $regex: job.jobTitle, $options: "i" } },
        { jobType: { $regex: job.jobType, $options: "i" } },
      ],
    };

    const similarJobs = await Jobs.find(searchQuery)
      .populate({
        path: "company",
        select: "-password",
      })
      .sort({ _id: -1 })
      .limit(6);

    res.status(200).json({
      success: true,
      data: job,
      similarJobs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteJob = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Jobs.findByIdAndDelete(id);

    res.status(200).send({
      success: true,
      message: "Job Post Deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const applyForJob = async (req, res, next) => {
  // console.log(req.body,"controllerrrrrrrrrrrrrrrrrr")
  try {
    const applicantDetails  = req.body.data;
    const userId = req.body.user.userId;
    console.log(userId,"userId")
    const jobId = req.body.jobId;
    console.log(jobId, applicantDetails,"helolololololololo")
    if (!jobId || !applicantDetails) {
      return next("Please provide all required maidan");
    }

    const job = await Jobs.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const application = new Applications({
      jobId: jobId,
      applicantId: userId,
      applicantDetails: applicantDetails,
    });

    await application.save();

    res.status(201).json({
      success: true,
      message: "Applied for job successfully",
      application,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// export const getAllJobs = async (req, res, next) => {
//   try {
//     // const applicantId = req.params.id; // Extracting the id from req.params
//     const applicantId="66449f13a71b21ed23057f78"
//     console.log(applicantId, "applicantId");
//     const job = await Applications.findById(applicantId);
//     console.log(job, "job");
//     if (!job) {
//       return res.status(404).json({ message: 'Job not found' });
//     }
//     res.json({ job });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: err.message });
//   }
// };

export const getAllJobs = async (req, res, next) => {
  try {
    const applicantId = req.params.id; // Extracting the id from req.params
    console.log(applicantId, "applicantId");
    
    // Check if the applicantId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(applicantId)) {
      return res.status(400).json({ message: 'Invalid applicant ID' });
    }

    
    const finalDataArray = [];

    const jobs = await Applications.find({ applicantId });
    console.log(jobs, "jobs\n");
    for (let i = 0; i < jobs.length; i++) {
      const naukri = await Jobs.find( jobs[i].jobId );
      console.log(naukri, "naukri");
      const company = await Companies.find( jobs[i].company );
      console.log(company, "company");

      const finalData = {
        uniqueId: jobs[i]._id,
        companyName: company[0].name,
        jobTitle: naukri[0].jobTitle,
        jobType: naukri[0].jobType,
        location: naukri[0].location,
        salary: naukri[0].salary,
        time: naukri[0].createdAt
      };
      finalDataArray.push(finalData);
    }
    
    // console.log(finalDataArray)
    if (jobs.length === 0) {
      return res.json({ message: 'No jobs found for the applicant' });
    }
    else{res.send(finalDataArray);}
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
