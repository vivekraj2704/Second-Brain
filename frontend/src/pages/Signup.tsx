import { useRef } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { BACKEND_URL } from "../config";
import axios from 'axios';

export function Signup() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    async function signup() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
            username,
            password
        })
        alert("you have signed up!")
    }
    return(
        <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
            <div className="bg-white rounded-xl border min-w-48 p-8">
                <Input placeholder="Username" reference={usernameRef}/>
                <Input placeholder="Password" reference={passwordRef}/>
                <div className="flex justify-center pt-4 ml-2 mr-2">
                    <Button onClick={signup} loading={false} variant="primary" text="Signup" size="md" fullWidth={true}/>
                </div>
            </div>
        </div>
    )
}