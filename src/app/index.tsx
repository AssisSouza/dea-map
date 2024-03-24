"use client"

import Mapa from "@/components/mapa";
import { FC, useState } from "react";
import Header from "./header";
import FilterDrawerContextProvider from "@/contexts/filter-context";
import FilterDrawer from "@/components/filterDrawer";

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

const deaLocations:MarkerInterface[] = [{"lat":-15.633020275933195,"lng":-48.02632917519532,"address":"Bem aqui","DEA":"Zoll","comar":{"id":3,"descr":"COMAR III"},"gbm":{"id":17,"descr":"17º GBM"}},{"lat":-15.903622638765505,"lng":-47.77651011943817,"address":"17º GBM","DEA":"Zoll","comar":{"id":2,"descr":"COMAR II"},"gbm":{"id":12,"descr":"12º GBM"}},{"lat":-15.796168187860095,"lng":-47.89188058289393,"address":"Pátio Brasil","DEA":"Phillips","comar":{"id":2,"descr":"COMAR I"},"gbm":{"id":1,"descr":"1º GBM"}}]

const Index: FC = () => {

    const [filteredDeaStore, setFilteredDeaStore] = useState(Array<MarkerInterface>);

    const handleComarFilter = (comar: number) => {
        const filtered = deaLocations.filter((dea: MarkerInterface) => dea.comar.id == comar);
        setFilteredDeaStore(filtered);
    }


    return (
        <div className="">
            <FilterDrawerContextProvider>
                <Header />
                <FilterDrawer handleComarFilter={handleComarFilter} />
            </FilterDrawerContextProvider>
            <Mapa deaStore={deaLocations} filteredDeaStore={filteredDeaStore} />
        </div>
    )

}

export default Index;
