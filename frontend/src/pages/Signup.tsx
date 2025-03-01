import { useRef } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { BACKEND_URL } from "../config";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

export function Signup() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    async function signup() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        await axios.post(`${BACKEND_URL}/api/v1/signup`, {
            username,
            password
        })
        navigate("/signin")
    }
    return(
        <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
            <div className="bg-white rounded-xl border min-w-48 p-8">
                <Input placeholder="Username" reference={usernameRef}/>
                <Input placeholder="Password" reference={passwordRef}/>
                <div className="flex justify-center pt-4 ml-2 mr-2">
                    <Button onClick={signup} loading={false} variant="primary" text="Signup" size="md" fullWidth={true}/>
                </div>
                <div className="flex justify-center pt-2">
                    <h4 className="text-xs">Already, a user <Link to="/signin" className="underline">signin</Link>?</h4>
                </div>
            </div>
        </div>
    )
}