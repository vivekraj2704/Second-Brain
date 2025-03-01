import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

interface contents{
    title: string;
    type: "youtube" | "twitter";
    link: string;
}

export function useContent() {
    const [contents, setContents] = useState<contents[]>([]);

    useEffect(() => {
        const response = axios.get(`${BACKEND_URL}/api/v1/content`, {
            headers: {
                "Authorization": localStorage.getItem("token") || ""
            }
        }).then((response) => {
            setContents(response.data.content || [])
        })
    }, [])

    return contents;
}