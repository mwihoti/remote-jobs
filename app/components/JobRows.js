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
              <Link className="hover:underline" href={`/show/${jobDoc._id}`}>
                {jobDoc?.title || 'Unknown Job'}
              </Link>
            </div>

            {/* Job Details (Remote, Location, Type) */}
            <div className="text-gray-400 text-sm capitalize">
              {jobDoc?.remote ? 'Remote' : 'On-site'}
              {' '}&middot;{' '}
              {jobDoc?.city || 'Unknown City'}, {jobDoc?.country || 'Unknown Country'}
              {' '}&middot;{' '}
              {jobDoc?.type || 'Unknown'}-time
              {jobDoc?.isAdmin && (
                <>
                  {' '}&middot;{' '}
                  <Link href={`/jobs/edit/${jobDoc._id}`} className="text-blue-500">Edit</Link>
                  {' '}&middot;{' '}
                  <button
                    className="text-red-500"
                    type="button"
                    onClick={() => handleDelete(jobDoc._id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Time Ago */}
          {jobDoc?.createdAt && (
            <div className="content-end text-gray-500 text-sm">
  
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
