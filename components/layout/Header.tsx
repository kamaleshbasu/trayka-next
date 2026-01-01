"use client"

import { cn } from "@/lib/utils";
import Section from "@/components/layout/Section";
import { JSX, useEffect, useState } from "react";
import LogoWithText from "../common/LogoWithText";
import Link from "next/link";
import Icon from "../common/Icon";
import FeatureCard, { type FeatureCardProps } from "@/components/common/FeatureCard";
import { useTranslation } from "@/context/TranslationClientProvider";
import { NavigationMenuLink, NavigationMenu, NavigationMenuTrigger, NavigationMenuItem, NavigationMenuList, NavigationMenuContent  } from "@/components/ui/navigation-menu";
import { langs } from "@/lib/i18n";
import { usePathname, useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useNewsletterDialog } from "../dialogs/Newsletter";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Menu } from "lucide-react";

type HeaderContentWithIcon = FeatureCardProps & {
    link? : string;
    callback? : () => void;
    isExternalLink? : boolean;
    onClickClose?: () => void;
    isLast?: boolean;
    isMobile?: boolean;
    key? : any;
};

const renderIconContent = ({key, isLast, isMobile, onClickClose, ...content} : HeaderContentWithIcon) : JSX.Element => {
    
    const {callback, link, isExternalLink = false, ...passedProps} = content;
    const props = {
        ...passedProps,
        className: `cursor-pointer ${isLast ? "" : " mb-2"}`
    }

    const isTagADiv = isMobile || !content.link;
    const onClick = () : void => {isMobile  && onClickClose ? onClickClose() : null};

    let htmlContent : JSX.Element;

    if(content.link)
        htmlContent = !isExternalLink ? 
            <Link href={content.link} onClick={onClick}><FeatureCard {...props}/></Link>:
            <a href={content.link} target="_blank" rel="noopener noreferrer" onClick={onClick}><FeatureCard {...props} /></a>;
    else
        htmlContent = <FeatureCard {...props} Tag={callback ? "a" : "div"} onClick={() => {
            if(onClick) onClick();
            if(callback) callback();
        }}/>

    return <div key={key}>{htmlContent}</div>;
    // return isTagADiv? <div key={key}>{htmlContent}</div>
    //     : <NavigationMenuLink asChild key={key} >{htmlContent}</NavigationMenuLink>;
}

export default () => {
    const [hasScrolled, setHasScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const closeMobileMenu = () => {setMobileOpen(false)};
    const {t, locale} = useTranslation();
    
    useEffect(() => {
        const onScroll = () => setHasScrolled(window.scrollY > 10);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const {openDialog} = useNewsletterDialog();
    const resouceContent : HeaderContentWithIcon[] = [
        {
            iconData : {name : "calendar"},
            title : "book",
            description : "book_desc",
            link: process.env.NEXT_PUBLIC_DEMO_LINK,
            isExternalLink: true
        },
        {
            iconData : {name : "mail", },
            title : "newsletter",
            description : "newsletter_desc",
            callback: () => {
                openDialog({
                    args: {
                        type: "newsletter"
                    }
                });
            }
        },
    ];
    const servicesContent : HeaderContentWithIcon[] = [
        {
            iconData : {name : "knowledge", },
            title : "kb",
            description : "kb_desc",
            link: `/${locale}/rag`
        },
        {
            iconData : {name : "network", },
            title : "zta",
            description : "zta_desc",
            link: `/${locale}/zta`
        }
    ];

    const pathname : string = usePathname();
    const router : AppRouterInstance = useRouter();

    const switchLocale = (newLocale: string) => {
        if (newLocale === locale) return;

        const segments = pathname.split("/");
        segments[1] = newLocale; // Replace the locale segment

        const newPath = segments.join("/");

        router.push(newPath);
    };

    return(
        <Section Tag="header" className={cn("fixed w-full top-0 z-50 dark:bg-slate-900/60 transition-colors duration-200", hasScrolled ? "bg-white/70 border-b-gray-200 border-b  backdrop-blur-sm" : "")}>
            <div className="flex items-center justify-between h-12">
                <LogoWithText />
                <nav className="hidden md:flex items-center gap-8">
                    <NavigationMenu viewport={false}>
                        <NavigationMenuList className="flex-wrap">
                            {/* Services */}
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="flex"><Icon name="app-and-services" className="mr-2 text-primary"/> {t("services")}</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <div className="w-75">
                                        {
                                            servicesContent.map((c, i) => 
                                                renderIconContent({...c, key: `s-${i}`, isLast: i === servicesContent.length - 1, isMobile: false})
                                            )
                                        }
                                    </div>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            
                            {/* Resources */}
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="flex"><Icon name="document-lines" className="mr-2 text-primary"/> {t("resources")}</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <div className="w-75">
                                        {
                                            resouceContent.map((c, i) => 
                                                renderIconContent({...c, key: `s-${i}`, isLast: i === resouceContent.length - 1, isMobile: false})
                                            )
                                        }
                                    </div>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            
                            {/* Language */}
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="flex"><Icon name="language" className="mr-2 text-primary"/> {t("lang")}</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-50 gap-2">
                                    {
                                        langs.map((c, i) => {
                                            const isActiveLang = c.code === locale;
                                            return (<li className="px-2 text-sm" key={i}>
                                                <div>
                                                    <a onClick={() => isActiveLang ? null : switchLocale(c.code)} className={!isActiveLang ? "text-gray-400 cursor-pointer" : "font-semibold"}>{c.lang}</a>
                                                </div>
                                            </li>);
                                        })
                                    }
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </nav>

                {/* Mobile Menu */}
                <div className="md:hidden">
                    <button
                        aria-label="Open menu"
                        className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
                        onClick={() => setMobileOpen(true)}
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                </div>
                <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                    <SheetContent side="right" className="w-full">
                        <SheetHeader className="flex items-start justify-between">
                            <SheetTitle><LogoWithText /></SheetTitle>
                        </SheetHeader>
                        <div className="mt-0 space-y-4 px-4">
                            {/* Services */}
                            <div className="border-b pb-4">
                                <h4 className="text-md font-semibold mb-2 flex items-center"><Icon name="app-and-services" className="mr-2 text-primary"/> {t("services")}</h4>
                                {servicesContent.map((c, i) => renderIconContent({...c, key: `s-${i}`, isLast: i === servicesContent.length - 1, isMobile: true, onClickClose: closeMobileMenu}))}
                            </div>

                            {/* Resources */}
                            <div className="border-b pb-4">
                                <h4 className="text-md font-semibold mb-2 flex items-center"><Icon name="document-lines" className="mr-2 text-primary"/> {t("resources")}</h4>
                                {resouceContent.map((c, i) => renderIconContent({...c, key: `s-${i}`, isLast: i === resouceContent.length - 1, isMobile: true, onClickClose: closeMobileMenu}))}
                            </div>
                            
                            {/* Language */}
                            <div className="grid grid-cols-2 gap-2">
                                {langs.map((c, i) => {
                                    const isActiveLang =  locale == c.code;
                                    return (<div key={i} className="flex items-center p-2 cursor-pointer border rounded-md" onClick={() => isActiveLang ? null : switchLocale(c.code)}>
                                        <div className={cn("size-6 rounded-full flex items-center justify-center border mr-2", isActiveLang ? "bg-secondary border-secondary text-black" : "text-gray-500")}>
                                            <Icon name="checkmark" size={14}/>
                                        </div>
                                        <div className={cn("text-sm",  isActiveLang ? "font-bold" :"text-gray-500")}>{c.lang}</div>
                                    </div>);
                            })}
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </Section>
    );
}