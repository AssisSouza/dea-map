"use client"

import { Loader } from "@googlemaps/js-api-loader";
import React, { useEffect, useState } from "react";

// import { GrAed } from "react-icons/gr";

interface MarkerInterface {
    id?: number,
    lat: number,
    lng: number,
    dea?: number,
    address: string,
    comar: string,
    gbm: string
}

interface latLngInterface {
    lat: number,
    lng: number
}

export default function NovoDea() {

    const mapRef = React.useRef<HTMLDivElement>(null);

    const [newMarker, setNewMarker] = useState<MarkerInterface>({});
    const [newForm, setNewForm] = useState(false);
    const [centerMap, setCenterMap] = useState<google.maps.LatLng>()

    const handleMarkerInputChange = (e
        // & {
        // target: HTMLInputElement}
    ) => {
        const { name, value } = e.target;
        setNewMarker({ ...newMarker, [name]: value })
    }

    const handleLog = (log: string) => {
        console.log();
    }

    const handleNewForm = (open?: boolean) => {
        if (open != undefined) {
            setNewForm(open)
        } else {
            setNewForm(!newForm);
        }
    }

    const handleNewMakerFormSubmit = (e) => {
        e.preventDefault();

        let storedLocalPOIs = localStorage.getItem('deas') as string;
        let localPOIs = storedLocalPOIs ? JSON.parse(storedLocalPOIs) : [];

        localPOIs.push(newMarker);

        localStorage.setItem("deas", JSON.stringify(localPOIs));

        handleNewForm();
        handleLog(localPOIs);
    }

    const handleCloseNewForm = () => {
        handleNewForm();
    }

    useEffect(() => {

        var centerPos = {} as google.maps.LatLng;
        const initMap = async () => {

            let deaLocations = localStorage.getItem('deas') as string;

            const deaLocation = deaLocations ? JSON.parse(deaLocations) : [];

            // const deaLocation = [
            //     { lat: -15.9035701, lng: -47.7768298 },
            //     { lat: -15.8042108, lng: -47.8773271 }
            // ];

            const instrucoes =
                '<div id="content">' +
                '<div id="siteNotice">' +
                '</div>' +
                '<h1 id="firstHeading" class="firstHeading">Instruções DEA</h1> ' +
                '</div>' +
                '<div id="bodyContent">' +
                '<h2>Ligue o DEA<h2>' +

                '<p>Posicione o DEA próximo à vítima, ligue o aparelho e siga as orientações fornecidas pelo equipamento. Esse é um diferencial do DEA, pois no desfibrilador manual é necessário saber avaliar o paciente antes de realizar qualquer manobra.</p>' +
                '<h2>Posicione os eletrodos</h2>' +

                '<p>Os eletrodos precisam ser posicionados corretamente para não comprometer sua funcionalidade.</p>' +

                '<p>O eletrodo com a indicação do lado direito do paciente (apex) precisa ficar no peito acima do mamilo direito e abaixo da clavícula.</p>' +
                '<p>O eletrodo com a indicação do lado esquerdo do paciente (sternum) precisa ser colocado nas última costelas, abaixo do mamilo esquerdo. </p>' +
                '</div>' +
                '</div>';

            const loader = new Loader({
                apiKey: 'AIzaSyCtwmoSTFu6qGLof-B8dKF3_ZSjC8j5GlE',
                version: 'quartely'
            });

            const { Map } = await loader.importLibrary('maps');
            const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

            const position1: latLngInterface = {
                lat: -15.8042108,
                lng: -47.8773271
            }

            const position = (centerMap != null) ? centerMap : position1;

            console.log(position)


            //map options
            const mapOptions: google.maps.MapOptions = {
                center: position,
                zoom: 11,
                mapId: 'MY_NEXTJS_MAPID'
            }

            const map = new Map(mapRef.current as HTMLDivElement, mapOptions);

            // const parser = new DOMParser();
            // const pinSvgString = '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke-width="2" d="M2,8.4 C2,4 5,3 7,3 C9,3 11,5 12,6.5 C13,5 15,3 17,3 C19,3 22,4 22,8.4 C22,15 12,21 12,21 C12,21 2,15 2,8.4 Z M12,6 C11.5,5.5 10,10 10,10 L12,10 L12,12.5 L14,9 L12,9 C12,9 13,3 17,3 C13,3 12,6 12,6 Z"></path></svg>'
            // const pinSvgElement = parser.parseFromString(pinSvgString, 'image/svg+xml').documentElement;


            var infoWindow = new google.maps.InfoWindow({
                content: instrucoes
            })

            deaLocation.map((dea: google.maps.LatLng) => {
                console.log(position)
                const marker = new AdvancedMarkerElement({
                    map,
                    position: dea
                });

                marker.addListener("click", () => {
                    infoWindow.open({
                        anchor: marker,
                        map
                    })
                })

            })

            const newMarkerElement = new AdvancedMarkerElement({ map, gmpDraggable: true });

            // atualiza lat lng ao arrastar marcador
            newMarkerElement.addListener('drag', (mapsMouseEvent: google.maps.MapMouseEvent) => {

                const { lat, lng } = mapsMouseEvent.latLng?.toJSON();

                setNewMarker({ ...newMarker, lat, lng })
            })

            // recupera centro do mapa
            map.addListener("center_changed", () => {
                var centerPos = map.getCenter();
                setCenterMap(centerPos);
            })


            // ao clicar em nova posição no mapa adicionar um novo marcador
            map.addListener("click", (mapsMouseEvent: google.maps.MapMouseEvent) => {
                infoWindow.close();
                console.log(newForm);

                if (newForm) {
                    newMarkerElement.position = mapsMouseEvent.latLng as google.maps.LatLng
                    const { lat, lng }: google.maps.LatLng = mapsMouseEvent.latLng?.toJSON();

                    setNewMarker({ ...newMarker, lat, lng })
                }
            })



        }

        initMap();

    }, [newForm]);

    return (
        <>
            <div className="mt-2 mb-2">
                <button onClick={() => handleNewForm(true)}>Adicionar novo local</button>
            </div>

            {newForm &&
                <div className="mb-6 mt-6">
                    <form onSubmit={handleNewMakerFormSubmit} className="flex-1 flex-row" >
                        <input
                            className="border flex"
                            type="text"
                            placeholder="Endereço"
                            name="address"
                            value={newMarker.address}
                            onChange={handleMarkerInputChange}
                            required
                        />
                        <input
                            className="border flex"
                            type="text"
                            placeholder="DEA"
                            name="DEA"
                            value={newMarker.dea}
                            onChange={handleMarkerInputChange}
                            required
                        />
                        <select
                            className="border flex"
                            name="comar"
                            value={newMarker.comar}
                            onChange={handleMarkerInputChange}
                            required
                        >
                            <option value="comar_1">COMAR I</option>
                            <option value="comar_2">COMAR II</option>
                            <option value="comar_3">COMAR III</option>
                            <option value="comar_4">COMAR IV</option>
                            <option value="comar_5">COMAR V</option>
                        </select>
                        <select
                            className="border flex"
                            name="gbm"
                            value={newMarker.gbm}
                            onChange={handleMarkerInputChange}
                            required
                        >
                            <option value="9_gbm">9º GBM</option>
                            <option value="10_gbm">10º GBM</option>
                            <option value="17_gbm">17º GBM</option>
                            <option value="22_gbm">22º GBM</option>
                        </select>
                        <input
                            className="border flex"
                            type="text"
                            placeholder="Latitude"
                            name="lat"
                            value={newMarker.lat}
                            onChange={handleMarkerInputChange}
                            disabled
                            required
                        />
                        <input
                            className="border flex"
                            type="text"
                            placeholder="Longitude"
                            name="lng"
                            value={newMarker.lng}
                            onChange={handleMarkerInputChange}
                            disabled
                            required
                        />
                        <button
                            type="submit"
                        >
                            Adicionar Novo D.E.A.
                        </button>
                        <button
                            type="button"
                            onClick={() => handleNewForm(false)}
                        >
                            Fechar
                        </button>
                    </form>
                </div>
            }

            <div className="h-[700px]" ref={mapRef} />

            <button
                type="button"
                className="border flex"
                onClick={handleLog}
            >
                Log
            </button>

            {/* <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke-width="2" d="M2,8.4 C2,4 5,3 7,3 C9,3 11,5 12,6.5 C13,5 15,3 17,3 C19,3 22,4 22,8.4 C22,15 12,21 12,21 C12,21 2,15 2,8.4 Z M12,6 C11.5,5.5 10,10 10,10 L12,10 L12,12.5 L14,9 L12,9 C12,9 13,3 17,3 C13,3 12,6 12,6 Z"></path></svg> */}
        </>
    )

}