import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export function useContent() {
    const [contents, setContents] = useState([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/content`, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        }).then((response) => {
            console.log(response.data.content)
            setContents(response.data.content)
        })
    }, [])
    console.log(contents);
    return contents;
}