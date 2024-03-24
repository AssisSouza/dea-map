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

const Index: FC = () => {


    let deaLocations = localStorage.getItem('deas') as string;
    const deaLocation = deaLocations ? JSON.parse(deaLocations) : [];

    const [filteredDeaStore, setFilteredDeaStore] = useState(Array<MarkerInterface>);

    const handleComarFilter = (comar: number) => {
        const filtered = deaLocation.filter((dea: MarkerInterface) => dea.comar.id == comar);
        setFilteredDeaStore(filtered);
    }


    return (
        <div className="">
            <FilterDrawerContextProvider>
                <Header />
                <FilterDrawer handleComarFilter={handleComarFilter} />
            </FilterDrawerContextProvider>
            <Mapa deaStore={deaLocation} filteredDeaStore={filteredDeaStore} />
        </div>
    )

}

export default Index;