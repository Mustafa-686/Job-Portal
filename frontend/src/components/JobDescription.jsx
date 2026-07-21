import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const isIntiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isIntiallyApplied);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="max-w-5xl mx-auto my-10 p-8 bg-white shadow-lg rounded-xl border border-gray-100">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{singleJob?.title}</h1>
          <p className="text-gray-500 text-sm mt-1">
            Posted on {singleJob?.createdAt?.split("T")[0]}
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            <Badge className="text-blue-700 font-semibold" variant="ghost">
              {singleJob?.postion} Positions
            </Badge>
            <Badge className="text-[#F83002] font-semibold" variant="ghost">
              {singleJob?.jobType}
            </Badge>
            <Badge className="text-[#7209b7] font-semibold" variant="ghost">
              {singleJob?.salary} PKR
            </Badge>
          </div>
        </div>
        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`px-6 py-2 text-white font-semibold rounded-lg shadow-md transition ${
            isApplied
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#7209b7] hover:bg-[#5f32ad]"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>

      {/* Divider */}
      <div className="my-6 border-t border-gray-200"></div>

      {/* Job Details */}
      <div className="space-y-4 text-gray-700">
        <p>
          <span className="font-semibold text-gray-900">Role:</span>{" "}
          {singleJob?.title}
        </p>
        <p>
          <span className="font-semibold text-gray-900">Location:</span>{" "}
          {singleJob?.location}
        </p>
        <p>
          <span className="font-semibold text-gray-900">Description:</span>{" "}
          {singleJob?.description}
        </p>
        <p>
          <span className="font-semibold text-gray-900">Experience:</span>{" "}
          {singleJob?.experience} yrs
        </p>
        <p>
          <span className="font-semibold text-gray-900">Salary:</span>{" "}
          {singleJob?.salary} PKR
        </p>
        <p>
          <span className="font-semibold text-gray-900">Total Applicants:</span>{" "}
          {singleJob?.applications?.length}
        </p>
      </div>
    </div>
  );
};

export default JobDescription;
