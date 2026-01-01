import { useTranslation } from "@/context/TranslationClientProvider";
import { cn } from "@/lib/utils";
import Link from "next/link";

type FooterLinks = {
    target? : string;
    label: string;
    url?: string;
    callback?: () => void;
}
type FooterListProps = {
    title: string;
    links : FooterLinks[]
}

export default ({title, links} : FooterListProps) => {
    const {t} = useTranslation();
    return (
        <div className="footer-list">
            <h3 className="text-white text-md mb-1">{t(title)}</h3>
            {links.length > 0 ? <ul>
                {links.map((link, i) => <li className={cn("text-gray-400 text-sm pt-1")} key={i}>
                    {!link.target&& link.url  ? 
                        <Link href={link.url}>{t(link.label)}</Link>:
                        <a href={link.url} target={link.target} onClick={link.callback}>
                            {t(link.label)}
                        </a>
                    }
                </li>)}
            </ul>: <></>}
        </div>
    );
}