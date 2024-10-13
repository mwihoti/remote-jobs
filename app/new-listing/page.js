'use server';
import { createCompany } from "../actions/workosActions";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { WorkOS } from "@workos-inc/node";
import Link from "next/link";
import { withAuth } from "@workos-inc/authkit-nextjs";
import {JobForm} from "../components/JobForm";

export default async function NewListingPage() {
  const workos = new WorkOS(process.env.WORKOS_API_KEY);
  const { user } = await withAuth();

  if (!user) {
    return (
      <div className="container">
        <div>You need to be logged in to post a job</div>
      </div>
    );
  }

 
    return (
      <div className="container">
        <div>An error occurred while fetching your organizations. Please try again later.</div>
      </div>
    );
  return (
    <div className="container px-4">
      <div>
        <h2 className="text-lg mt-6">Your companies</h2>
        <p className="text-gray-500 text-sm mb-2">Select a company to create a job ad for</p>
        <div>
          
               
          </div>
        </div>
        

        <Link href="/new-company" className="bg-gray-200 gap-2 inline-flex px-4 items-center py-2 rounded-md mt-4">
          Create a new company
          <FontAwesomeIcon className="size-4" icon={faArrowRight} />
        </Link>
        
      </div>
  
   ) ;
}
