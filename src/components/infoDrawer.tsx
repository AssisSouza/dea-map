import { FC, useEffect, useState } from "react"
import { Drawer, DrawerContent, DrawerHeader, DrawerOverlay, DrawerTitle } from "./ui/drawer"
import { useMediaQuery } from "@/hooks/useMediaQuery";
import guiaDea from "@/data/guiaDea";
import { MarkerInterface } from "@/interfaces/interfaces";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { motion } from "framer-motion";

interface InfoDrawer {
    infoOpen: boolean,
    drawerOpen: boolean,
    deaSelected: MarkerInterface | null,
    handleDrawerOpen: (drawer: boolean) => void
}

const InfoDrawer: FC<InfoDrawer> = ({ deaSelected, infoOpen, drawerOpen, handleDrawerOpen }) => {

    const isDesktop = useMediaQuery("(min-width: 768px)");
    const [open, setOpen] = useState(() => (isDesktop));

    const handleInteractOutside = () => {
        if (isDesktop) {
            setOpen(true)
        } else {
            setOpen(false)
        }
    }
    useEffect(() => {
        if (isDesktop) handleDrawerOpen(true)
    })

    let styleDrawer = isDesktop ? 'h-[calc(100vh-9.7rem)] w-1/4 ' : 'h-[calc(100vh-5rem)]';

    return (
        <Drawer open={drawerOpen} modal={false} dismissible={!isDesktop}  >
            <DrawerOverlay className="" />
            <DrawerContent className={styleDrawer + " rounded-none shadow-sm"} onInteractOutside={handleInteractOutside} >
                <DrawerHeader>
                    <DrawerTitle>Passo a Passo do uso do DEA</DrawerTitle>
                </DrawerHeader>
                <div className="overflow-auto" dangerouslySetInnerHTML={{ __html: guiaDea }} />
            </DrawerContent>
        </Drawer>
    )
}

export default InfoDrawer;