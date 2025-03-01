import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";

export function Signin() {
    return(
        <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
            <div className="bg-white rounded-xl border min-w-48 p-8">
                <Input placeholder="Username"/>
                <Input placeholder="Password"/>
                <div className="flex justify-center pt-4 ml-2 mr-2">
                    <Button loading={false} variant="primary" text="Signin" size="md" fullWidth={true}/>
                </div>
            </div>
        </div>
    )
}