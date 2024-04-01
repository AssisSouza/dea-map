import { FC, useEffect, useState } from "react"
import { Drawer, DrawerContent, DrawerHeader, DrawerOverlay, DrawerTitle } from "./ui/drawer"
import { useMediaQuery } from "@/hooks/useMediaQuery";
import guiaDea from "@/data/guiaDea";
import { Separator } from "./ui/separator";
import { MarkerInterface } from "@/interfaces/interfaces";

interface InfoDrawer {
    deaDetails: {
        infoOpen: boolean,
        dea?: MarkerInterface
    }
}

const InfoDrawer: FC<InfoDrawer> = (deaDetails) => {

    const isDesktop = useMediaQuery("(min-width: 768px)");
    const [open, setOpen] = useState(true);

    let styleDrawer = isDesktop ? 'h-[calc(100vh-9.7rem)] w-1/4 ' : 'h-[calc(100vh-5rem)]';

    const handleInteractOutside = () => {
        if (isDesktop) {
            setOpen(true)
        } else {
            setOpen(false)
        }
    }

    console.log('deaout', deaDetails.deaDetails.dea);

    return (
        <Drawer open={open} modal={false} dismissible={!isDesktop}  >
            <DrawerOverlay className="" />
            <DrawerContent className={styleDrawer + " rounded-none shadow-sm"} onInteractOutside={handleInteractOutside} >
                {deaDetails.deaDetails.infoOpen &&
                    <div className="leading-7 [&:not(:first-child)]:mt-6 p-4 pt-0">
                        <h2 className="scroll-m-20 text-xl font-semibold tracking-tight">{deaDetails.deaDetails.dea?.DEA}</h2>
                        <p className="">{deaDetails.deaDetails.dea?.address}</p>
                        <p>Lat: {deaDetails.deaDetails.dea?.lat}</p>
                        <p>Lng: {deaDetails.deaDetails.dea?.lng}</p>
                        <p>Area Atuação: {deaDetails.deaDetails.dea?.gbm.descr}</p>

                        <Separator className="mt-4" />
                    </div>
                }
                <DrawerHeader>
                    <DrawerTitle>Passo a Passo do uso do DEA</DrawerTitle>
                </DrawerHeader>

                <div className="overflow-auto" dangerouslySetInnerHTML={{ __html: guiaDea }} />
            </DrawerContent>
        </Drawer>
    )
}

export default InfoDrawer;