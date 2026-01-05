"use client"

import type { JSX } from "react";
import Section from "./Section";
import SocialIcon from "@/components/common/SocialIcon";
import FooterList from "./FooterList";
import { useTranslation } from "@/context/TranslationClientProvider";
import LogoWithText from "../common/LogoWithText";
import { useNewsletterDialog } from "../dialogs/Newsletter";


const Footer = () : JSX.Element => {
    const {openDialog} = useNewsletterDialog();
    const {t, locale} = useTranslation();

    const services = {
        title: "services",
        links : [
            {label : "kb", url: `/${locale}/rag`},
            {label : "zta", url: `/${locale}/zta`},
        ]
    }

    const company = {
        title: "company",
        links : [
            {label : "privacy.label", url: `/${locale}/privacy`},
            {label : "career.label", url: `/${locale}/career`},
            // {label : "About us", url: "/about"},
        ]
    }

    const resources = {
        title: "resources",
        links : [
            {label : "blog", url: process.env.NEXT_PUBLIC_BLOG_URL, target: "__blank"},
            {label : "book", url: process.env.NEXT_PUBLIC_DEMO_LINK, target: "__blank"},
        ]
    }

    return (
        <Section className="py-32 bg-dark-brand text-white" Tag={"footer"}>
            <div className="grid md:grid-cols-2 gap-12 items-start">
                <div>
                    <LogoWithText theme="dark"/>
                    <div className="flex gap-2 my-5">
                        <SocialIcon name="x" url={process.env.NEXT_PUBLIC_X!}/>
                        <SocialIcon name="instagram" url={process.env.NEXT_PUBLIC_INSTAGRAM!}/>
                        <a 
                            onClick={() => {
                                openDialog({
                                    // icon: "launch",
                                    // title: "Project details",
                                    // description: "Let us know what you are looking to build  — Knowledge Base, Automation, Customer Service Agent, others.",
                                    args: {
                                        type : "project"
                                    }
                                });
                            }}
                            className="inline-block px-6 py-3 bg-white text-black rounded-md">{t("contactus")}</a>
                    </div>
                    <p className="copyright text-xs text-gray-500">@ Trayka LLC, {new Date().getFullYear()}</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 items-start">
                    <FooterList {...services} />
                    <FooterList {...company} />
                    <FooterList {...resources} />
                </div>
            </div>
        </Section>
    );
}

export default Footer;