import { Button } from "@/components/ui/button";
import { FilterDrawerContext } from "@/contexts/filter-context";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useContext } from "react";
import { GrFilter } from "react-icons/gr";
import { FaBookOpenReader } from "react-icons/fa6";
import { ManualContext } from "@/contexts/manual-context";
import Image from "next/image";

export default function Header() {

    const { openFilterDrawer } = useContext(FilterDrawerContext);
    const { handleOpenManualDrawer } = useContext(ManualContext);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    return (
        <div className="top-0 gap-2 flex items-center justify-between shadow-md px-6 md:px-10 w-full h-16 mb-0 z-10 bg-slate-50 fixed">
            <h1 className="grow text-lg font-bold tracking-wider">
                <Image 
                    src="/shockweb.svg"
                    alt="Logomarca ShockWeb"
                    width="30"
                    height="30"
                    className="inline mr-3"
                />
                ShockWeb
                </h1>
            {!isDesktop &&
            <>
                <Button className="" onClick={openFilterDrawer} variant="outline" size="icon">
                    <GrFilter />
                </Button>
                <Button className="" onClick={handleOpenManualDrawer} variant="outline" size="icon">
                    <FaBookOpenReader />
                </Button>
            </>
            }
        </div>
    )
}