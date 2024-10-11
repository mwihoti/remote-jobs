export default function JobRow() {

    return (
        <>
        <div className="bg-white p-6 rounded-lg shadow-sm flex gap-4">
            <div className="content-center">
        <img className="size-12" 
        src="https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg"  alt="logo"/>
            </div>
            <div className="grow">
                <div className="text-gray-500 text-sm">Spotify</div>
                <div className="font-bold">Product Designer</div>
                <div className="text-gray-400 text-sm">Remote &middot; New York, Us &middot; Full-time</div>
            </div>
            <div className="content-end text-gray-500 text-xs">2 weeks ago</div>
        </div>
            </>
    );
}