import { withAuth } from "@workos-inc/authkit-nextjs";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import { createCompany } from "../actions/workosActions";
export default async function NewCompanyPage() {
    const { user } = await withAuth();
    async   function handleNewCompanyFormSubmit(data) {
        'use server'
        if (user) {
            await createCompany(data.get('newCompanyName'), user.id);
    
        }
            }
            if (!user) {
                'Login to use this page';
            }
            
    return (
        <div className="container">
             <h2 className="text-lg mt-6">Create a new company</h2>
            <p className="text-gray-500 text-sm mb-2"> To create a job listing you first need to register a company</p>
        <form 
        action={handleNewCompanyFormSubmit} className="flex gap-2">

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
        
    )
}