import type { ElementType, JSX, ReactNode } from "react";

type SectionProps = {
    Tag?: ElementType;
    children? : ReactNode;
} & JSX.IntrinsicElements[keyof JSX.IntrinsicElements];

const Section = ({Tag = "section", children, ...props} : SectionProps) : JSX.Element => {
    return (
        <Tag {...props}>
            <div className="max-w-7xl mx-auto px-6">
                {children}
            </div>
        </Tag>
    );
}

export default Section;