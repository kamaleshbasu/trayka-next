"use client"

import type { HTMLAttributes } from "react";
import type { IconProps } from "./Icon";
import Icon from "./Icon";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/context/TranslationClientProvider";

export interface FeatureCardProps extends HTMLAttributes<HTMLAnchorElement | HTMLDivElement>{
    iconData : IconProps;
    iconTheme? : "primary" | "secondary" | "plain";
    title : string;
    description? : string;
    Tag? : "div" | "a";
}

export default ({iconData, title, description, className, iconTheme = "plain", Tag ="div", ...props} : FeatureCardProps) => {
    const {size, ...rest} = iconData;
    const {t, locale} = useTranslation();

    return(
        <Tag className={cn("flex items-stretch text-left", className)} {...props}>
            <div className={cn("col-start-1 row-start-1 flex size-14 items-center justify-center justify-self-start rounded-lg mr-3", `bg-${iconTheme} text-${iconTheme}-foreground`, iconTheme == "plain" ? "border" : "border border-white")}>
                <Icon size={size ?? 28} {...rest} />
            </div>
            <div className="flex-1 flex flex-col justify-center">
                <div className="font-bold text-sm">{t(title)}</div>
                <div className="text-muted-foreground text-xs">{t(description ?? "")}</div>
            </div>
        </Tag>
    );
};