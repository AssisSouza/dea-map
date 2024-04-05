import { Button } from "@/components/ui/button";
import { FilterDrawerContext } from "@/contexts/filter-context";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useContext } from "react";
import { GrFilter } from "react-icons/gr";
import { ManualContext } from "@/contexts/manual-context";
import Image from "next/image";

export default function Header() {

    const { openFilterDrawer } = useContext(FilterDrawerContext);
    const { handleOpenManualDrawer } = useContext(ManualContext);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    return (
        <div className="top-0 gap-2 flex items-center justify-between shadow-md px-6 md:px-10 w-full h-16 mb-0 z-10 bg-slate-50 fixed">
            <h1 className="text-lg font-bold tracking-wider">
                <Image
                    src="/shockweb.svg"
                    alt="Logomarca ShockWeb"
                    width="30"
                    height="30"
                    className="inline mr-3"
                />
                ShockWeb
            </h1>
            {isDesktop &&
                <Image
                    src="/cbmdf.png"
                    width="60"
                    height="60"
                    alt="Simbolo CBMDF"
                />
            }
            {!isDesktop &&
                <div className="flex justify-end gap-1">
                    <Button className="" onClick={openFilterDrawer} variant="outline" size="icon">
                        <GrFilter size="18" />
                    </Button>
                    <Button className="" onClick={() => handleOpenManualDrawer(true)} variant="outline" size="icon">
                        <Image
                            src="/livro.png"
                            width="26"
                            height="26"
                            alt=""
                            className=""

                        />
                    </Button>
                </div>
            }
            {isDesktop &&
                <Button variant="outline" onClick={() => handleOpenManualDrawer(true)} >
                    <Image
                        src="/livro.png"
                        width="26"
                        height="26"
                        alt=""
                        className="mr-2"

                    />
                    Passo a Passo para uso do DEA
                </Button>
            }
        </div>
    )
}