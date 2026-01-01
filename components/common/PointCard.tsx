import type { HTMLAttributes, ReactNode } from "react";
import type { IconProps } from "./Icon";
import { cn } from "@/lib/utils";
import Icon from "./Icon";

export interface PointCardProps extends HTMLAttributes<HTMLAnchorElement | HTMLDivElement>{
    iconData : string | IconProps | number;
    theme? : "primary" | "secondary";
    title : string;
    description? : string;
    Tag? : "div" | "a";
}

export default ({iconData, title, description, className, theme = "primary", Tag ="div", ...props} : PointCardProps) => {
    let iconContent : string | ReactNode = "";
    if(typeof iconData !== "string" && typeof iconData !== "number")
    {
        const {size, ...rest} = iconData;
        iconContent = <Icon size={size ?? 28} {...rest} />;
    }
    else iconContent = iconData;

    const isSecondary : boolean = theme === "secondary";

    return (
        <Tag className={cn(`point-card flex items-stretch text-left p-4 ${!isSecondary ? "bg-white" : "bg-primary border-primary"} rounded-lg border`, className)} {...props}>
            <div className={cn("col-start-1 row-start-1 flex size-13 items-center justify-center justify-self-start rounded-full mr-3", isSecondary ? "bg-white text-white-foreground border border-primary" : "bg-gray-50 border")}>
                {iconContent}
            </div>
            <div className="flex-1 flex flex-col justify-center">
                <div className={`font-bold text-md ${isSecondary ? "text-primary-foreground" : "text-black"}`}>{title}</div>
                <div className={`${isSecondary ? "text-blue-100" : "text-muted-foreground"} text-sm`}>{description}</div>
            </div>
        </Tag>
    );
}
