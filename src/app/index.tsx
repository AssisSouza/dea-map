"use client"

import Mapa from "@/components/mapa";
import { FC, useState } from "react";
import Header from "./header";
import FilterDrawerContextProvider from "@/contexts/filter-context";
import FilterDrawer from "@/components/filterDrawer";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import Filters from "@/components/filters";

import deaLocations from "@/data/deaLocations";
import { MarkerInterface } from "@/interfaces/interfaces";
import ManualContextProvider from "@/contexts/manual-context";
import InfoDrawer from "@/components/infoDrawer";


const Index: FC = () => {

  const [filteredDeaStore, setFilteredDeaStore] = useState<Array<MarkerInterface> | null>(null);

  const handleComarFilter = (comar: number) => {
    const filtered = deaLocations.filter((dea: MarkerInterface) => dea.comar.id == comar);
    setFilteredDeaStore(filtered);
  }

  const handleGBMFilter = (gbm: number) => {
    const filtered = deaLocations.filter((dea: MarkerInterface) => dea.gbm.id == gbm);
    setFilteredDeaStore(filtered);
  }

  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <div className="">
      <ManualContextProvider>
        <FilterDrawerContextProvider>
          <Header />
          {!isDesktop &&
            <FilterDrawer handleComarFilter={handleComarFilter} handleGBMFilter={handleGBMFilter} />
          }
          {isDesktop &&
            <Filters handleComarFilter={handleComarFilter} handleGBMFilter={handleGBMFilter} />
          }
          <InfoDrawer />
        </FilterDrawerContextProvider>
      </ManualContextProvider>

      <Mapa deaStore={deaLocations} filteredDeaStore={filteredDeaStore} />
    </div>
  )

}

export default Index;
