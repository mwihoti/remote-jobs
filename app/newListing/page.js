import { withAuth } from "@workos-inc/authkit-nextjs";

export default async function NewListingPage() {
    const { user } = await withAuth();
    return (
        <div className="container">
            {!user && (
                <div> You need to be logged in</div>

    )}
            {user && (
                <div> JSON.stringify(user)</div>
            )}
            <h1>New Listing</h1>
        </div>
    )
}