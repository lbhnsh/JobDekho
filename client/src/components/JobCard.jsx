import { GoLocation } from "react-icons/go";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const JobCard = ({ job }) => {
  console.log(job)
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();     
  console.log(user,"finaleeeeeeeeeeeeeeeeeeeeeeeeee")
  const handleApplyNowClick = () => {
    // Navigate to the ApplyJob component when Apply Now button is clicked
    // navigate("/apply-job");
    navigate(`/apply-job/${job._id}`);
  };

  return (
    <div className="w-full md:w-[16rem] 2xl:w-[18rem] h-[16rem] md:h-[18rem] bg-white flex flex-col justify-between shadow-lg 
                rounded-md px-3 py-5">
      <div className="w-full h-full flex flex-col justify-between">
        <div className="flex gap-3">
          <img src={job?.logo} alt={job?.name} className="w-14 h-14" />

          <div className="truncate w-full h-16 flex flex-col justify-center">
            <p className="w-full h-12 flex items-center text-lg font-semibold overflow-hidden leading-5">
              {job?.jobTitle}
            </p>
            <span className="flex gap-2 items-center">
              <GoLocation className="text-slate-900 text-sm" />
              {job?.location}
            </span>
          </div>
        </div>

        <div className="py-3">
          <p className="text-sm">
            {job?.detail[0]?.desc?.slice(0, 150) + "..."}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <p className="bg-[#1d4fd826] text-[#1d4fd8] py-0.5 px-1.5 rounded font-semibold text-sm mr-2">
              {job?.jobType}
            </p>
            <span className="text-gray-500 text-sm ml-auto">
              {moment(job?.createdAt).fromNow()}
            </span>
          </div>
          {/* Apply Now button */}
          <button
            onClick={handleApplyNowClick} // Call the handleApplyNowClick function
            className="bg-blue-600 text-white py-1.5 px-4 rounded-md text-sm hover:bg-blue-700 focus:outline-none"
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
