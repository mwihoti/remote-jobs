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

  const organizationsInfo = {};

  try {
    const organizationMemberships = await workos.userManagement.listOrganizationMemberships({
      userId: user.id,
    });
    const activeOrganizationMemberships = organizationMemberships.data.filter(om => om.status === 'active');

    for (const activeMembership of activeOrganizationMemberships) {
      try {
        const organization = await workos.organizations.getOrganization(activeMembership.organizationId);
        const userRoleData = await getUserRole(workos, user.id, activeMembership.organizationId);

        if (userRoleData) {
          const { role = 'unknown', permissions = [] } = userRoleData;
          organizationsInfo[organization.id] = {
            name: organization.name,
            role,
            permissions
          };
        } else {
          console.log(`User ${user.id} does not have a role in organization ${organization.name}`);
        }
      } catch (error) {
        console.error(`Error processing organization ${activeMembership.organizationId}:`, error);
        // Continue to the next organization
      }
    }
  } catch (error) {
    console.error('Error fetching organization memberships:', error);
    return (
      <div className="container">
        <div>An error occurred while fetching your organizations. Please try again later.</div>
      </div>
    );
  }

  return (
    <div className="container px-4">
      <div>
        <h2 className="text-lg mt-6">Your companies</h2>
        <p className="text-gray-500 text-sm mb-2">Select a company to create a job ad for</p>
        <div>
          <div className="border inline-block rounded-md">
            {Object.entries(organizationsInfo).map(([orgId, info], index) => (
              <Link
                key={orgId}
                href={'/new-listing/' + orgId}
                className={
                  "py-4 px-4 flex gap-2 items-center justify-between "
                  + (index === 0 ? '' : 'border-t')
                }>
                <span>{info.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">{info.role}</span>
                  <FontAwesomeIcon className="h-4" icon={faArrowRight} />
                </div>
              </Link>
            ))}
          </div>
        </div>
        

        {Object.keys(organizationsInfo).length === 0 && (
          <div className="border border-blue-200 bg-blue-50 p-4 rounded-md">
            No companies found where you have permission to create job listings
          </div>
        )}
        <Link href="/new-company" className="bg-gray-200 gap-2 inline-flex px-4 items-center py-2 rounded-md mt-4">
          Create a new company
          <FontAwesomeIcon className="size-4" icon={faArrowRight} />
        </Link>
        
      </div>
    </div>
  );
}


async function getUserRole(workos, userId, organizationId) {
  console.log(`Fetching role for user ${userId} in organization ${organizationId}`);
  try {
    const membership = await workos.userManagement.getOrganizationMembership({
      userId: userId,
      organizationId: organizationId,
    });

    if (!membership) {
      console.log(`No membership found for user ${userId} in organization ${organizationId}`);
      return null;
    }

    // Safely extract the role and permissions using optional chaining
    const role = membership.role?.slug || membership.metadata?.role || null;
    const permissions = membership.permissions || [];

    console.log(`Extracted role for user ${userId} in organization ${organizationId}: ${role}`);
    console.log(`Permissions for user ${userId} in organization ${organizationId}: ${permissions}`);

    return { role, permissions };
  } catch (error) {
    if (error.status === 404) {
      console.log(`No membership found for user ${userId} in organization ${organizationId}`);
      return null;
    }
    console.error(`Error fetching user role for user ${userId} in organization ${organizationId}:`, error);
    return null; // Return null instead of throwing error
  }
}