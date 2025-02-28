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
    "sm" : "py-1",
    "md" : "p-4",
    "lg" : "p-6",
}

const defaultStyles = "rounded-md p-4 flex"

export function Button(props: ButtonProps) {
    return(
        <button className={`${variantStyles[props.variant]} ${defaultStyles} ${sizeStyles[props.size]}`}>
            {props.startIcon ? <div className="pr-1">{props.startIcon}</div> : null} {props.text} {props.endIcon}
        </button>
    )
}