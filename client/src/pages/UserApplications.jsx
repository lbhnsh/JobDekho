import React, { useEffect, useState } from "react";
import { apiRequest } from "../utils";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
const Applications = () => {
    const { user } = useSelector((state) => state.user);
    const userId = user._id;
    const [applications, setApplications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const fetchApplications = async () => {
        try {
          const res = await apiRequest({
            url: `jobs/applications/${userId}`,
            method: "GET"
          });

          // Ensure that res is an array before setting applications
          if (Array.isArray(res)) {
            setApplications(res);
          } else {
            setApplications([res]);
          }
          
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching applications:", error);
          setIsLoading(false);
        }
      };
      console.log(applications.length)
      fetchApplications();
    }, [userId]);
  
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">List of Applications</h1>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {applications.length !== 0 ? (
    applications.map((application) => (
      <ApplicationCard key={application._id} application={application} />
    ))
  ) : (
    <p>No applications found.</p>
  )}
</div>
        )}
      </div>
    );
};
  
    const ApplicationCard = ({ application }) => {
      const { companyName, jobTitle, jobType, location, salary, time, uniqueId } = application;
      console.log(application,"please i beg you")
    
      return (
        <div className="bg-white rounded-md shadow-md p-4">
          <h2 className="text-lg font-semibold">{jobTitle}</h2>
          <p className="text-gray-500">Company: {companyName}</p>
          <p className="text-gray-500">Job Type: {jobType}</p>
          <p className="text-gray-500">Location: {location}</p>
          <p className="text-gray-500">Salary: ${salary.toLocaleString()}</p>
          <p className="text-gray-500">Posted On: {new Date(time).toLocaleDateString()}</p>
        </div>
      );
    };
    
    export default Applications;
    
  