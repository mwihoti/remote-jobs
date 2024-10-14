import JobRow from "./JobRows"
export default function Jobs() {
    return (
        <div className="bg-slate-200 py-4  rounded-xl">
            <div className="container max-w-full p-14">
                <h2 className="font-bold mb-4"> Recent Jobs</h2>

                <div className="flex  flex-col gap-4">
                    <JobRow/>
                   
                   
                </div>
            </div>
        </div>
    )
}