import { ReactElement } from "react";

type Variants = 'primary' | 'secondary';

interface ButtonProps {
    variant: Variants;
    size: 'sm' | "md" | 'lg';
    text: string,
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    onClick: () => void
}

type sizevariants = "sm" | "md" | "lg";

const variantStyles: Record<Variants, string> = {
    "primary": "bg-purple-600 text-white",
    "secondary": "bg-purple-300 text-purple-600"
}

const sizeStyles: Record<sizevariants, string> = {
    "lg" : "px-8 py-4",
    "md" : "px-4 py-2",
    "sm" : "px-2 py-1",
}

const defaultStyles = "rounded-md p-4 flex font-light"

export function Button(props: ButtonProps) {
    return(
        <button className={`${variantStyles[props.variant]} ${defaultStyles} ${sizeStyles[props.size]}`}>
            {props.startIcon ? <div className="pr-1 flex items-center">{props.startIcon}</div> : null} {props.text} {props.endIcon}
        </button>
    )
}