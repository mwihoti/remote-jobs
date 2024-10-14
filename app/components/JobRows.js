'use client';

import { faHeart,  faBuilding, faMapMarkerAlt, faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function JobRow({ jobDoc }) {
  // Function to handle job deletion
  const handleDelete = async (jobId) => {
    try {
      const response = await fetch(`/api/jobs?id=${jobId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete the job');
      }

      // Reload page after successful deletion
      window.location.reload();
    } catch (error) {
      alert('Error deleting the job: ' + error.message);
    }
  };

  // Ensure jobDoc is defined before rendering
  if (!jobDoc) {
    return <div className="text-gray-400">Job information is unavailable</div>;
  }
  console.log(jobDoc);


  return (<div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 relative mb-6 border border-gray-200">
    {/* Favorite Icon */}
    <div className="absolute top-4 right-4 cursor-pointer">
      <FontAwesomeIcon className="text-gray-300 hover:text-red-400 transition duration-200" icon={faHeart} />
    </div>
  
    {/* Job Information */}
    <div className="flex items-start justify-between mb-4">
      <div className="grow">
        {/* Job Title */}
        <div className="font-bold text-2xl mb-2 text-indigo-600">
          <Link className="hover:underline" href={`/jobs/${jobDoc.id}`}>
            {jobDoc.title || 'Unknown Job'}
          </Link>
        </div>
  
        {/* Job Description */}
        <div className="text-gray-700 mb-4 line-clamp-2 leading-relaxed">
          {jobDoc.description || 'No description available'}
        </div>
  
        {/* Job Details (Company, Location, Salary) */}
        <div className="flex flex-wrap gap-4 text-gray-500 text-sm">
          {/* Company */}
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faBuilding} className="text-indigo-500" />
            <span>{jobDoc.company || 'Unknown Company'}</span>
          </div>
  
          {/* Location */}
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-indigo-500" />
            <span>{jobDoc.location || 'Unknown Location'}</span>
          </div>
  
          {/* Salary */}
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faDollarSign} className="text-indigo-500" />
            <span>Salary: {jobDoc.salary || 'Not specified'}</span>
          </div>
        </div>
      </div>
    </div>
  
    {/* Admin Actions */}
    {jobDoc.isAdmin && (
      <div className="mt-4 flex gap-6">
        <Link href={`/jobs/edit/${jobDoc.id}`} className="text-blue-500 hover:text-blue-700">
          Edit
        </Link>
        <button
          className="text-red-500 hover:text-red-700"
          type="button"
          onClick={() => handleDelete(jobDoc.id)}
        >
          Delete
        </button>
      </div>
    )}
  </div>
     
 
  );
}
