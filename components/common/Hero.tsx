import type { ReactNode } from "react";
import SvgLoader from "./SvgLoader";
import Section from "../layout/Section";
import Ctas from "./Ctas";

type HeroProps = {
    title? : string;
    description? : string;
    slogan? : string;
    svgImage? : string;
    align? : "left" | "right";
    is404? : boolean;
    hasCta? : boolean;
    children? : ReactNode;
}

export default ({align="left", svgImage, slogan, description, title, is404 = false, children, hasCta=true, ...rest} : HeroProps) => {
    const text = (<div>
        {title && <h1 className="text-4xl md:text-4xl font-extrabold leading-tight">{title}</h1>}
        {description && <p className="mt-6 text-lg text-gray-500">{description}</p>}
        {slogan && <p className="mt-6 font-bold text-gray-600 text-xl">{slogan}</p>}
        {hasCta && <Ctas is404={is404} className="mt-8"/>}
        {children}
    </div>);
    const img = svgImage && <SvgLoader src={svgImage} title={title ?? ""}/>;
    return (
        <Section className="bg-white" {...rest}>
            <div className="py-16 grid md:grid-cols-2 gap-12 items-center">
            {align == "left" ? <>{text}{img}</> : <>{img}{text}</>}
            </div>
        </Section>
    );
}