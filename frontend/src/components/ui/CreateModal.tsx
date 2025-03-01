import { Button } from "./Button";
import { Crossicon } from "../../icons/Crossicon";
import { Input } from "./Input";
import { useRef, useState } from "react";
import { BACKEND_URL } from "../../config";
import axios from "axios";

enum ContentType{
    Youtube = "youtube",
    Twitter = "twitter"
}

interface CreateModalInterface {
    open: boolean;
    onClose: ()=>void;
}
//controlled component
export function CreateModal({open, onClose}: CreateModalInterface) {
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const [type, setType] = useState(ContentType.Youtube);

    async function addContent() {
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;

        await axios.post(`${BACKEND_URL}/api/v1/content`, {
            link,
            title,
            type
        }, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })

        onClose()
    }
    return (
        <div>
            {(open) && <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 rounded opacity-95 flex justify-center">
                <div className="flex flex-col justify-center">
                    <span className="bg-white p-4 rounded">
                        <div className="flex justify-end cursor-pointer" onClick={onClose}>
                            <Crossicon />
                        </div>
                        <div>
                            <Input placeholder="Title" reference={titleRef}/>
                            <Input placeholder="Link" reference={linkRef}/>
                        </div>
                        <div className="flex gap-2 p-4 items-center">
                            <h1>Type:</h1>
                            <Button size="sm" text="youtube" variant={type === ContentType.Youtube ? "primary" : "secondary"} onClick={() => setType(ContentType.Youtube)}></Button>
                            <Button size="sm" text="Twitter" variant={type === ContentType.Twitter ? "primary" : "secondary"} onClick={() => setType(ContentType.Twitter)}></Button>
                        </div>
                        <div className="flex justify-center">
                            <Button onClick={addContent} variant="primary" size="md" text="Add new item"/>
                        </div>
                    </span>
                </div>
            </div>}
        </div>
    )
}