import { cn } from "@/lib/utils";
import "./three-dots.css";

export default ({className} : {className?: string;})  => (
<div className={cn("dots-loader", className)}>
    <div></div>
    <div></div>
    <div></div>
</div>
);