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

    const variants = {
        open: { opacity: 1, scale: 1, display: 'hidden' },
        closed: { opacity: 0, scale: 0, display: 'block' }
    }

    return (
        <Drawer open={drawerOpen} modal={false} dismissible={!isDesktop}  >
            <DrawerOverlay className="" />
            <DrawerContent className={styleDrawer + " rounded-none shadow-sm"} onInteractOutside={handleInteractOutside} >
                {infoOpen &&
                <motion.div
                    animate={infoOpen ? "open" : "closed"}
                    variants={variants}
                >
                    <Card className="scale-100 duration-200 m-2 -mt-2 leading-7 bg-zinc-800 text-zinc-50">
                        <CardHeader>
                            <CardTitle>{deaSelected?.POI}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="">{deaSelected?.address}</p>
                            <p>Lat: {deaSelected?.lat}</p>
                            <p>Lng: {deaSelected?.lng}</p>
                            <p>{deaSelected?.obs}</p>
                        </CardContent>
                    </Card>
                </motion.div>
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