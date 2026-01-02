"use client"

import type React from "react";
type SmoothScrollProps = React.LinkHTMLAttributes<HTMLAnchorElement> & React.ButtonHTMLAttributes<HTMLButtonElement> & {
    Tag? : "a" | "button";
    target: string;
    type?: string;
}

const scrollToSection = (id : string) => {
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

export default ({target, Tag = "button", type = "button", children, ...rest} : SmoothScrollProps) => {
    return <Tag onClick={() => scrollToSection(target)} type={type}  {...rest}>
        {children}
    </Tag>
}