import { Shareicon } from "../../icons/Shareicon";

interface CardProps{
    title: string;
    link: string;
    type: "youtube" | "twitter";
}

const youtubeClassname = "bg-white p-4 rounded-md border border-gray-200 max-w-96 min-h-48 max-h-56 min-w-72"
const twitterClassname = "bg-white p-4 rounded-md border border-gray-200 max-w-72 min-h-48 overflow-y-scroll max-h-56 min-w-auto"

export function Card({ title, link, type}: CardProps) {
    return(
        <div className={`${type === "youtube" ? youtubeClassname : twitterClassname}`}>
            <div className="flex justify-between">
                <div className="flex items-center text-md">
                    <div className="text-gray-500 pr-2">
                        <Shareicon />
                    </div>
                    {title}
                </div>
                <div className="flex items-center">
                    <div className="pr-2 text-gray-500">
                        <a href={link} target="_blank">
                            <Shareicon />
                        </a>
                    </div>
                    <div className="text-gray-500">
                        <Shareicon />
                    </div>
                </div>
            </div>

            <div className="pt-4">
                {type === "youtube" && 
                <iframe className="w-full" src={link.replace("watch", "embed").replace("?v=", "/")} title="MANIAC (Official Video): YO YO HONEY SINGH | ESHA GUPTA | GLORY | BHUSHAN KUMAR" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}

                {type === "twitter" && 
                <blockquote className="twitter-tweet">
                <a href={link.replace("x.com", "twitter.com")}></a> 
                </blockquote>
                }   
            </div>
        </div>
    )
}