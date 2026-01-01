import AppButton from "@/components/common/AppButton";
import PointCard from "@/components/common/PointCard";
import SectionHero from "@/components/common/SectionHero";

export type JobProps = {
    title: string;
    description?: string;
    responsibilities: string[];
    profile: string[] | {
        title: string;
        description? : string;
    }[];
    opening: number;
    type? : "remote" | "office";
}

export default (job : JobProps) => {
    return (
        <>
            <SectionHero title={job.opening == 1 ? "1 opening" : `${job.opening} openings`}
                header={job.title}
                colorClass="bg-red-600"
            >
                {job.description && <p className="mb-4 mt-8">{job.description}</p>}
                <p className="font-medium text-lg text-black">Responsibilities</p>
                <ul className="my-4">
                    {job.responsibilities.map((s, i) => <li key={i} className="text-sm mt-1">{s}</li>)}
                </ul>
                <AppButton href={`mailto:${process.env.NEXT_PUBLIC_CAREERS_EMAIL}?subject=${encodeURIComponent(`Application for Trayka ${job.title}`)}`} theme="primary">Apply</AppButton>
            </SectionHero>
            <div>
                <p className="font-medium text-lg text-black mb-4">What we are looking for</p>
                <div className="grid gap-2 items-stretch">
                    {job.profile.map((profile, item) => <PointCard 
                        title={typeof profile === "string" ? profile : profile.title} 
                        // iconData={{name: "checkmark"}} 
                        iconData={item+1}
                        key={item}
                        description={typeof profile === "string" ? undefined : profile.description}
                    />)}
                </div>
            </div>
        </>
    )
}