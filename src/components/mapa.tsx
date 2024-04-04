"use client"

import React, { FC, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import InfoDrawer from "./infoDrawer";

import { latLngInterface, MarkerInterface } from "@/interfaces/interfaces";

interface MapaInterface {
    deaStore: MarkerInterface[],
    filteredDeaStore: MarkerInterface[] | null
}

const Mapa: FC<MapaInterface> = ({ deaStore, filteredDeaStore }) => {

    const isDesktop = useMediaQuery("(min-width: 768px)");
    const [drawerOpen, setDrawerOpen] = useState<boolean>(() => (isDesktop));

    const [deaSelected, setDeaSelected] = useState<MarkerInterface | null>(null);
    const [infoOpen, setInfoOpen] = useState<boolean>(false);

    const handleDrawerOpen = (drawer: boolean) => {
        setDrawerOpen(drawer);
    }

    const mapRef = React.useRef<HTMLDivElement | null>(null);

    var centerMap = useRef<google.maps.LatLng>();
    var zoomMap = useRef<number | undefined>(undefined);

    const contentString = (dea: MarkerInterface) => {
        const contentString =
            '<div id="" class="pr-3 pb-3 leading-5" >' +
            '<div id="">' +
            "</div>" +
            '<h1 id="" class="font-bold text-base p-0">' + dea.POI + '</h1>' +
            '<div id="">' +
            '<p class="text-zinc-700 text-sm pb-1">' + dea.obs + '</p>' +
            '<p className="">' + dea.address + '</p>' +
            '<p class="leading-4">Lat: ' + dea.lat + '<br />' +
            'Lng: ' + dea.lng + '</p>' +
            "</div>" +
            "</div>";

        return contentString;
    }


    const deaLocations = filteredDeaStore !== null ? filteredDeaStore : deaStore;

    const initMap = async () => {

        const loader = new Loader({
            apiKey: process.env.GOOGLE_MAPS_API_KEY as string,
            version: 'weekly'
        });

        const { Map } = await loader.importLibrary('maps');
        const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

        const positionDefault: latLngInterface = {
            lat: -15.8042108,
            lng: -47.8773271
        }

        const position = (centerMap.current != undefined) ? centerMap.current : positionDefault;

        const mapOptions: google.maps.MapOptions = {
            center: position,
            zoom: zoomMap.current ? zoomMap.current : 11,
            mapId: 'MY_DEAMAPS_02'
        }

        const map = new Map(mapRef.current as HTMLDivElement, mapOptions);

        let infoWindowArray: Array<google.maps.InfoWindow> = []

        deaLocations.map((dea: MarkerInterface) => {
            const parser = new DOMParser();
            const pinSvgString = '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="3em" width="3em" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke-width="2" d="M2,8.4 C2,4 5,3 7,3 C9,3 11,5 12,6.5 C13,5 15,3 17,3 C19,3 22,4 22,8.4 C22,15 12,21 12,21 C12,21 2,15 2,8.4 Z M12,6 C11.5,5.5 10,10 10,10 L12,10 L12,12.5 L14,9 L12,9 C12,9 13,3 17,3 C13,3 12,6 12,6 Z"></path></svg>'
            const pinSvg = parser.parseFromString(pinSvgString, 'image/svg+xml').documentElement;

            const deaLatLng: latLngInterface = { lat: dea.lat, lng: dea.lng }

            const marker = new AdvancedMarkerElement({
                map,
                position: deaLatLng,
                content: pinSvg
            });

            let contentInfo = contentString(dea)

            const infoWindow = new google.maps.InfoWindow({
                content: contentInfo,
                ariaLabel: dea.POI
            })

            infoWindowArray.push(infoWindow);

            marker.addListener("click", () => {
                infoWindowArray.map((info) => {
                    info.close();
                })

                infoWindow.open({
                    anchor: marker,
                    map
                })
            });

            map.addListener("click", () => {
                infoWindow.close();
            })

        });

        map.addListener("center_changed", () => {
            zoomMap.current = map.getZoom();
            centerMap.current = map.getCenter();
        })

        map.addListener("click", () => {
            setInfoOpen(false);
            if (!isDesktop) setDrawerOpen(false);
        });
    }

    useEffect(() => {
        initMap();
    })

    let styleMap = isDesktop ? ' h-[calc(100vh-9.8rem)] w-3/4 ml-[calc(100vw/4)] mt-[9.7rem]' : " h-[calc(100vh-4rem)]  mt-[4rem]";

    return (
        <div className="flex flex-col">
            <div className="">
                <InfoDrawer deaSelected={deaSelected} drawerOpen={drawerOpen} infoOpen={infoOpen} handleDrawerOpen={handleDrawerOpen} />
            </div>
            <div className={'fixed bottom-0 right-0 z-0 ' + styleMap} ref={mapRef} />
        </div>
    )

}

export default Mapa;