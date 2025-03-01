import { Button } from "./Button";
import { Crossicon } from "../../icons/Crossicon";
import { Input } from "./Input";

interface CreateModalInterface {
    open: boolean;
    onClose: ()=>void;
}
//controlled component
export function CreateModal({open, onClose}: CreateModalInterface) {
    return (
        <div>
            {(open) && <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 rounded opacity-60 flex justify-center">
                <div className="flex flex-col justify-center">
                    <span className="bg-white p-4 rounded">
                        <div className="flex justify-end cursor-pointer" onClick={onClose}>
                            <Crossicon />
                        </div>
                        <div>
                            <Input placeholder="Title" onChange={() => {}}/>
                            <Input placeholder="Link" onChange={() => {}}/>
                        </div>
                        <div className="flex justify-center">
                            <Button variant="primary" size="md" text="Add new item" onClick={() => {}}/>
                        </div>
                    </span>
                </div>
            </div>}
        </div>
    )
}