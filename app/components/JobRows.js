'use client';

import { faHeart } from "@fortawesome/free-solid-svg-icons";
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


  return (
    <div className="bg-white p-4 rounded-lg shadow-sm relative">
      {/* Favorite Icon */}
      <div className="absolute cursor-pointer top-4 right-4">
        <FontAwesomeIcon className="size-4 text-gray-300" icon={faHeart} />
      </div>

      {/* Job Information */}
      <div className="flex grow gap-4">
        <div className="grow sm:flex">
          <div className="grow">
            {/* Job Title */}
            <div className="font-bold text-lg mb-1">
              <Link className="hover:underline" href={`/show/${jobDoc.id}`}>
                {jobDoc.title || 'Unknown Job'}
              </Link>
            </div>

            {/* Job Details (Company, Location, Salary) */}
            <div className="text-gray-400 text-sm capitalize">
              {jobDoc.company || 'Unknown Company'}
              {' '}&middot;{' '}
              {jobDoc.location || 'Unknown Location'}
              {' '}&middot;{' '}
              Salary: {jobDoc.salary || 'Not specified'}
            </div>

            {/* Admin Actions */}
            {jobDoc.isAdmin && (
              <>
                {' '}&middot;{' '}
                <Link href={`/jobs/edit/${jobDoc.id}`} className="text-blue-500">Edit</Link>
                {' '}&middot;{' '}
                <button
                  className="text-red-500"
                  type="button"
                  onClick={() => handleDelete(jobDoc.id)}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
