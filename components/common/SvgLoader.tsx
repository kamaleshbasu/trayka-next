import Image from "next/image";

export default ({src, title} : {src: string; title: string;}) => {
    return (<div className="relative w-full aspect-4/3 pointer-events-none">
        <Image
            src={src}
            alt={title}
            fill
            priority={false}
        />
    </div>);
}