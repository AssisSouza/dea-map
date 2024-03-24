import { Button } from "@/components/ui/button";
import { FilterDrawerContext } from "@/contexts/filter-context";
import { useContext } from "react";
import { GrFilter } from "react-icons/gr";

export default function Header() {

    const { openFilterDrawer } = useContext(FilterDrawerContext)

    return (
        <div className="top-0 flex items-center justify-between shadow-xl px-6 md:px-10 w-full h-16 mb-0 z-10 bg-slate-50 sticky">
            <h1 className="text-lg font-bold tracking-wider">Guia Prático para uso do DEA</h1>
            <Button className="" onClick={openFilterDrawer} variant="outline" size="icon">
                <GrFilter />
            </Button>
        </div>
    )
}