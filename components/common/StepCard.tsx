import type { HTMLAttributes, ReactNode } from "react";
import type { IconProps } from "./Icon";
import { cn } from "@/lib/utils";
import Icon from "./Icon";
import { nl2br } from "@/lib/strings";

export interface StepCardProps extends HTMLAttributes<HTMLAnchorElement | HTMLDivElement>{
    iconData? : IconProps;
    theme? : "primary" | "secondary";
    title : string;
    description? : string;
    Tag? : "div" | "a";
    step? : number | string; 
}


export default ({title, description, step, className, iconData, theme = "secondary", ...props} : StepCardProps) => {
    let iconContent : ReactNode;
    if(iconData)
    {
        const {size, ...rest} = iconData;
        iconContent = <Icon size={size ?? 28} {...rest} />;
    }
    
    return (
        <div className={cn("p-4 bg-white border rounded-lg", className)} {...props}>
            <div className="flex items-start">
                {step && <div className="text-sm text-primary font-semibold size-7 mr-1">{step}</div>}
                <div className="flex-1">
                    {iconData && <div className={`flex size-14 items-center justify-center bg-${theme} text-${theme}-foreground rounded-full mb-2`}>
                        {iconContent}
                    </div>}
                    <div className="font-bold text-black">{title}</div>
                    {description && <div className="mt-1 text-sm text-gray-500">{nl2br(description)}</div>}
                </div>
            </div>
        </div>
    )
}