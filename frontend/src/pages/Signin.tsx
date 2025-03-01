import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { useRef } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export function Signin() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    async function signin() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
            username,
            password
        })
        const jwt = response.data.token
        localStorage.setItem('token', jwt)
        navigate("/dashboard", {replace : true})
    }
    return(
        <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
            <div className="bg-white rounded-xl border min-w-48 p-8">
                <Input placeholder="Username" reference={usernameRef}/>
                <Input placeholder="Password" reference={passwordRef}/>
                <div className="flex justify-center pt-4 ml-2 mr-2">
                    <Button onClick={signin} loading={false} variant="primary" text="Signin" size="md" fullWidth={true}/>
                </div>
            </div>
        </div>
    )
}