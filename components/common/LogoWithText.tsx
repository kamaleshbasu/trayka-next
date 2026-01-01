import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type LogoWithTextProps = {
    theme? : "light" | "dark";
}

export default ({theme = "light"}:LogoWithTextProps) => {
    const isDark : boolean = theme == "dark";
    return(
        <Link href="/">
            <div className="flex items-center gap-2">
                <div className={cn("size-7 rounded-sm text-white flex items-center justify-center font-semibold", isDark ? "bg-gray-300/5" : "bg-dark-brand")}>
                    <Image src="/logo.svg" alt="Trayka" width={16} height={16}/>
                </div>
                <span className="text-lg font-light uppercase">Trayka</span>
            </div>
        </Link>
    );
}