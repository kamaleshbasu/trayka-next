"use client"

import { cn } from "@/lib/utils";
import type { JSX, ReactNode } from "react";

type ButtonProps = React.LinkHTMLAttributes<HTMLAnchorElement> & React.ButtonHTMLAttributes<HTMLButtonElement> & {
    Tag? : "a" | "button";
    className?: string;
    target?: string;
    onClick? : (e : any) => void;
    href? : string;
    children? : ReactNode;
    theme? : "primary" | "white" | "secondary" | "white-without-border";
} & JSX.IntrinsicElements[keyof JSX.IntrinsicElements]

export default ({className, onClick, href, children, Tag = "a", target, theme="white"} : ButtonProps) => {
    let btnClass: string = "backdrop-blur-sm bg-white inline-block px-6 py-3 border border-black text-black rounded-md";
    switch(theme)
    {
        case "primary":
            btnClass = "inline-block px-6 py-3 bg-primary text-primary-foreground rounded-md"; break;
        default:
    }

    btnClass = cn(btnClass, className);

    return (
        <Tag href={href} target={target} className={btnClass} onClick={onClick}>
            {children}
        </Tag>
    );
}