import { faHeart} from "@fortawesome/free-regular-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
export default function JobRow() {

    return (
        <>
        <div className="bg-white p-4 rounded-lg shadow-sm relative flex gap-4">
            <div className="absolute cursor-pointer top-4 right-0">
                <FontAwesomeIcon className="size-5 text-gray-500" icon={faHeart}/>
            </div>
           <div className="flex grow gap-4">
             <div className="content-center">
        <img className="size-12" 
        src="https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg"  alt="logo"/>
            </div>
            <div>
            <div className="grow">
                <div className="text-gray-500 text-sm">Spotify</div>
                <div className="font-bold">Product Designer</div>
                <div className="text-gray-400 text-sm">Remote &middot; New York, Us &middot; Full-time</div>
            </div>
            </div>
            
            <div className="content-end text-gray-500 text-xs">2 weeks ago</div>
        </div>
        </div>
            </>
    );
}