"use client"

import React, { FC, useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

interface latLngInterface {
    lat: number,
    lng: number
}

interface MarkerInterface {
    id?: number,
    lat: number,
    lng: number,
    dea: number,
    address: string,
    comar: {
        id: number,
        descr: string
    },
    gbm: {
        id: number,
        descr: string
    }
}

interface MapaInterface {
    deaStore: MarkerInterface[],
    filteredDeaStore: MarkerInterface[]
}


const Mapa: FC<MapaInterface> = ({ deaStore, filteredDeaStore }) => {

    const mapRef = React.useRef<HTMLDivElement>(null);

    var centerMap = useRef<google.maps.LatLng>();
    var zoomMap = useRef<number | undefined>(undefined);

    useEffect(() => {

        const deaLocations = filteredDeaStore.length > 0 ? filteredDeaStore : deaStore;

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

            deaLocations.map((dea: MarkerInterface) => {
                const parser = new DOMParser();
                const pinSvgString = '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="3em" width="3em" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke-width="2" d="M2,8.4 C2,4 5,3 7,3 C9,3 11,5 12,6.5 C13,5 15,3 17,3 C19,3 22,4 22,8.4 C22,15 12,21 12,21 C12,21 2,15 2,8.4 Z M12,6 C11.5,5.5 10,10 10,10 L12,10 L12,12.5 L14,9 L12,9 C12,9 13,3 17,3 C13,3 12,6 12,6 Z"></path></svg>'
                const pinSvg = parser.parseFromString(pinSvgString, 'image/svg+xml').documentElement;

                const deaLatLng: latLngInterface = { lat: dea.lat, lng: dea.lng }

                new AdvancedMarkerElement({
                    map,
                    position: deaLatLng,
                    content: pinSvg
                });

            });

            // recupera centro do mapa
            map.addListener("center_changed", () => {
                zoomMap.current = map.getZoom();
                centerMap.current = map.getCenter();
            })
        }

        initMap();

    });



    return (

        <div className="h-[calc(100vh-4rem)] bottom-0 z-0" ref={mapRef} />

    )

}

export default Mapa;