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

const variantStyles: Record<Variants, string> = {
    "primary": "bg-purple-600 text-white",
    "secondary": "bg-purple-300 text-white"
}

export function Button(props: ButtonProps) {
    return(
        <button className={`${variantStyles[props.variant]} rounded-lg text-xs width-lg`}>{props.text}</button>
    )
}