
import { withAuth } from "@workos-inc/authkit-nextjs";
import { WorkOS } from "@workos-inc/node";

export default async function NewListingForOrgPage(props) {
  const { user } = await withAuth();
  const workos = new WorkOS(process.env.WORKOS_API_KEY);

  if (!user) {
    return 'Please log in';
  }

  const orgId = props.params.orgId;
  const oms = await workos.userManagement.listOrganizationMemberships({
    userId: user.id,
    organizationId: orgId,
  });

  const hasAccess = oms.data.length > 0;
  if (!hasAccess) {
    return 'No access';
  }

  return (
   <form>
    {JSON.stringify(props)}
    New job form here
   </form>
  );
}
