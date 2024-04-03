import { Button } from "@/components/ui/button";
import { FilterDrawerContext } from "@/contexts/filter-context";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useContext } from "react";
import { GrFilter } from "react-icons/gr";

export default function Header() {

    const { openFilterDrawer } = useContext(FilterDrawerContext);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    return (
        <div className="top-0 flex items-center justify-between shadow-md px-6 md:px-10 w-full h-16 mb-0 z-10 bg-slate-50 fixed">
            <h1 className="text-lg font-bold tracking-wider">Guia Prático para uso do DEA</h1>
            {!isDesktop &&
                <Button className="" onClick={openFilterDrawer} variant="outline" size="icon">
                    <GrFilter />
                </Button>
            }
        </div>
    )
}