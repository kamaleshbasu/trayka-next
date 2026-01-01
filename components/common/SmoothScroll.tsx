"use client"

import type React from "react";

type SmoothScrollProps = React.LinkHTMLAttributes<HTMLAnchorElement | HTMLDivElement> & {
    Tag? : "a" | "div";
    target: string;
}


const scrollToSection = (id : string) => {
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

export default ({target, Tag = "a", children, ...rest} : SmoothScrollProps) => {
    return <Tag onClick={() => scrollToSection(target)}  {...rest}>
        {children}
    </Tag>
}