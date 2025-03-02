import { useParams } from "react-router-dom";
import { Card } from "../components/ui/Card";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useEffect, useState } from "react";

declare global {
    interface Window {
      twttr?: any;
    }
  }

export function SharedId() {
    const [contents, setContents] = useState([])
    const shareId = useParams()
    console.log(shareId.shareID)
    useEffect(() => {
        getCards();
    }, [])
    useEffect(() => {
        if (window.twttr && window.twttr.widgets) {
            window.twttr.widgets.load();
        }
    }, [contents]);

    async function getCards() {
        const response = await axios.get(`${BACKEND_URL}/api/v1/brain/${shareId.shareID}`)
        console.log(response.data.content)
        setContents(response.data.content);
    }

    return(
        <div className="flex gap-4 flex-wrap min-h-screen min-w-screen bg-gray-200 p-4">
            {
                contents.length > 0 ? contents.map((index: {link: string, title: string, type: "youtube" | "twitter"}) => {
                    return <Card type={index.type} title={index.title} link={index.link}/> 
                }): <h1>No Data Found</h1>
            }
        </div>
    )
}