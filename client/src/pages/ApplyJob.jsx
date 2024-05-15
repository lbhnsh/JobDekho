import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CustomButton, Loading, TextInput } from "../components";
import { useSelector } from "react-redux";
import { apiRequest } from "../utils";
import { useParams } from "react-router-dom";

const ApplyJob = (job) => {
  const { id } = useParams();
  const jobId=id
  console.log(jobId,"JobId")
  const { user } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {},
  });
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

 const onSubmit = async (data) => {
  setIsLoading(true);
  setErrMsg(null);
  // console.log(jobId,"applyjob before postingggggggggggggg")

  const myData={"jobId":jobId,
    "data":data
  }
  console.log(data)
  try {
    const res = await apiRequest({
      url: "/jobs/apply",
      token: user?.token,
      data: myData,
      method: "POST",
    });
    if (res.status === "failed") {
      setErrMsg(res.message);
    } else {
      setErrMsg(res.message);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
    setIsLoading(false);
  } catch (error) {
    console.log("Error:", error); 
    setIsLoading(false);
  }
};

  return (
    <div className="container mx-auto flex flex-col bg-[#f7fdfd] px-5">
      <div className="w-full h-fit bg-white px-5 py-10 shadow-md">
        <div>
          <p className="text-gray-500 font-semibold text-2xl">Apply for Job</p>
          <form onSubmit={handleSubmit(onSubmit)}
            className="w-full mt-2 flex flex-col gap-8"
            
          >
            <TextInput
              name="fullName"
              label="Full Name"
              placeholder="Enter your full name"
              type="text"
              required={true}
              register={register("fullName", {
                required: "Full Name is required",
              })}
              error={errors.fullName ? errors.fullName?.message : ""}
            />

            <TextInput
              name="email"
              label="Email"
              placeholder="Enter your email"
              type="email"
              required={true}
              register={register("email", {
                required: "Email is required",
              })}
              error={errors.email ? errors.email?.message : ""}
            />

            <TextInput
              name="phone"
              label="Phone Number"
              placeholder="Enter your phone number"
              type="tel"
              required={true}
              register={register("phone", {
                required: "Phone Number is required",
              })}
              error={errors.phone ? errors.phone?.message : ""}
            />

            <TextInput
              name="resume"
              label="Resume (PDF)"
              type="file"
              accept=".pdf"
              required={true}
              register={register("resume", {
                required: "Resume file is required",
              })}
              error={errors.resume ? errors.resume?.message : ""}
            />

            {errMsg && (
              <span role="alert" className="text-sm text-red-500 mt-0.5">
                {errMsg} 
              </span>
            )}
            <div className="mt-2">
              {isLoading ? (
                <Loading /> 
              ) : (
                <CustomButton
                
                  type="submit"
                  containerStyles="inline-flex justify-center rounded-md border border-transparent bg-customBlue px-8 py-2 text-sm font-medium text-white hover:bg-[#1d4fd846] hover:text-[#1d4fd8] focus:outline-none "
                  title="Apply Now"
                />
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyJob;
