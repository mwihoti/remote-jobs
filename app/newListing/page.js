'use server';
import { createCompany } from "../actions/workosActions";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {WorkOS} from "@workos-inc/node";
import Link from "next/link";
import { withAuth } from "@workos-inc/authkit-nextjs";

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
    
    
    const organizationMemberships = await workos.userManagement.listOrganizationMemberships({
        userId: user.id,
      });
      const activeOrganizationMemberships = organizationMemberships.data.filter(om => om.status === 'active');
    
      const organizationsNames = {};
      for (const activeMembership of activeOrganizationMemberships) {
        const organization = await workos.organizations.getOrganization(activeMembership.organizationId);
        organizationsNames[organization.id] = organization.name;
      }
    
    
      return (
        <div className="container">
          <div>
            <pre>
                {JSON.stringify(organizationMemberships, null)}
            </pre>
            <h2 className="text-lg mt-6">Your companies</h2>
            <p className="text-gray-500 text-sm mb-2">Select a company to create a job add for</p>
            <div>
              <div className="border inline-block rounded-md">
                {Object.keys(organizationsNames).map(orgId => (
                  <Link
                    href={'/new-listing/' + orgId}
                    className={
                      "py-2 px-4 flex gap-2 items-center "
                      + (Object.keys(organizationsNames)[0] === orgId ? '' : 'border-t')
                    }>
                    {organizationsNames[orgId]}
                    <FontAwesomeIcon className="h-4" icon={faArrowRight} />
                  </Link>
                ))}
              </div>
            </div>
    
            {organizationMemberships.data.length === 0 && (
              <div className="border border-blue-200 bg-blue-50 p-4 rounded-md">
                No companies found assigned to your user
              </div>
            )}
            <h2 className="text-lg mt-6">Create a new company</h2>
            <p className="text-gray-500 text-sm mb-2"> To create a job listing you first need to register a company</p>
        <form 
        action={createCompany} className="flex gap-2">

            <input name="newCompanyName" className="p-2 border border-gray-400 rounded-md"
            type="text"
            placeholder="company name"/>
        <button
              className="flex gap-2 items-center bg-gray-200 px-4 py-2 rounded-md mt-6"
              type="submit">
              Create a new company
              <FontAwesomeIcon className="h-4" icon={faArrowRight} />
            </button>
        </form>
           
          </div>
        </div>
    )
}


