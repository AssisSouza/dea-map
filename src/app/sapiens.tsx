// import Image from "next/image";

// export default function Home() {
//   return (

//   );
// }


import { useState } from "react";
import { Marker, Map, GoogleApiWrapper } from "google-maps-react";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const MapPage = ({ google }) => {

    interface Marker {
        id?: number,
        name?: string,
        description?: string,
        lat?: number,
        lng?: number
      }

    const [markers, setMarkers] = useState<Marker>([]);

    const [newMarker, setNewMarker] = useState<Marker>({ lat: 0, lng: 0 });

    const handleMarkerDrag = (marker, e) => {
        const newMarkers = [...markers]; 
        newMarkers[marker.index].lat = e.latLng.lat();
        newMarkers[marker.index].lng = e.latLng.lng(); 
        setMarkers(newMarkers);
    };

    const handleMarkerClick = (marker, e) => {
        alert(`Nome: ${marker.name}\nDescrição: ${marker.description}`);
    };

    const handleAddMarker = async (e) => {
        e.preventDefault();
        const newMarkerData = { name: "Novo Ponto de Interesse", description: "Descrição do Novo Ponto de Interesse", lat: newMarker.lat, lng: newMarker.lng, };
        const createdMarker = await prisma.marker.create(
            { data: newMarkerData });
        setMarkers([...markers, createdMarker]);
    };

    const handleMarkerInputChange = (e) => {
        const { name, value } = e.target; 
        setNewMarker({ ...newMarker, [name]: value });
    };

    return (
        <div>
            <Map google={google} zoom={12} initialCenter={{ lat: -23.55052, lng: -46.633309 }}      >
                {markers.map((marker, index) => (
                    <Marker
                        key={marker.id}
                        index={index}
                        position={{ lat: marker.lat, lng: marker.lng }}
                        draggable={true}
                        onDragend={handleMarkerDrag}
                        onClick={handleMarkerClick}
                        icon={{ url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png", scaledSize: new google.maps.Size(32, 32), }}
                    />
                ))}
            </Map>

            <form onSubmit={handleAddMarker}>
                <input type="text" placeholder="Nome do Ponto de Interesse" name="name" value={newMarker.name} onChange={handleMarkerInputChange} />
                <input type="text" placeholder="Descrição do Ponto de Interesse" name="description" value={newMarker.description} onChange={handleMarkerInputChange} />
                <button type="submit">Adicionar Ponto de Interesse</button>
            </form>
        </div>);
};

export default GoogleApiWrapper({ apiKey: process.env.GOOGLE_MAPS_API_KEY, })(MapPage);