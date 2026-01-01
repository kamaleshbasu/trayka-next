"use client"

import type { HTMLAttributes, ReactNode } from "react";
import { Badge } from "../ui/badge";

type SectionHeroProps = {
    color? : string;
    title: string;
    children?: ReactNode;
    header : string | ReactNode;
    colorClass? : string;
} & HTMLAttributes<HTMLDivElement>;

export default ({color, title, header, children, colorClass, ...props } : SectionHeroProps) => {
    return(
        <div {...props}>
            <Badge variant="outline" className="inline-flex items-center rounded-full px-4 py-1.5 font-medium text-sm border bg-background text-foreground">
                <div className={`mr-1 size-2 rounded-full ${colorClass ?? "bg-secondary"}`} style={{backgroundColor : color}}></div>
                <span className="align-middle">{title}</span>
            </Badge>
            {typeof header === "string" ? (<h2 className="text-3xl font-bold mt-4">{header}</h2>) : header}
            <div className="text-gray-500">{children}</div>
        </div>
    );
}