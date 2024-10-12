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
        <div className="container px-4">
          <div>
            
            <h2 className="text-lg mt-6">Your companies</h2>
            <p className="text-gray-500 text-sm mb-2">Select a company to create a job add for</p>
            <div>
            
              <div className="border inline-block rounded-md">
                {Object.keys(organizationsNames).map(orgId => (
                  <Link
                    href={'/new-listing/' + orgId}
                    className={
                      "py-4 px-4 flex gap-2 items-center "
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
           <Link href="/new-company" className="bg-gray-200 gap-2 inline-flex px-4 items-center py-2 rounded-md">
           Create a new company
           <FontAwesomeIcon  className="size-4"
           icon={faArrowRight} />
           </Link>
        </div>
        </div>
      )};


