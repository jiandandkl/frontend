import React from "react";
import SponsorJSON from "@site/static/json/sponsor.json";
import SponsorCard from "@site/src/components/SponsorCard";

const SponsorSection = () => {
    return (
        <div className="w-full bg-background py-[96px] flex items-center justify-center">
            <div className="w-full px-8 flex flex-col justify-center md:flex-row md:justify-between md:w-[1224px]">
                <div className="flex flex-col flex-shrink-0 items-center mb-8 md:items-start">
                    <div className="flex items-center gap-1">
                        <div className="text-[32px]">🍊</div>
                        <h2 className="font-ubuntu text-background-foreground text-[42px] font-bold">Sponsors</h2>
                    </div>
                    <div className="text-sm mt-4">Sponsor the future of Web3 ecology</div>
                </div>

                <div className="flex flex-col gap-5 flex-wrap xl:flex-row">
                    {SponsorJSON.map((sponsor) => (
                        <SponsorCard key={sponsor.name} sponsor={sponsor} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SponsorSection;