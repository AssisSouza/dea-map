'use client';

import React, { FC, createContext, useState } from "react";

export const FilterDrawerContext = createContext({
    openDrawer: true,
    handleFilter: () => { },
    closeFilterDrawer: () => { },
    openFilterDrawer: () => { }
});

const FilterDrawerContextProvider: FC<any> = ({ children }) => {
    const [openDrawer, setOpenDrawer] = useState<boolean>(false);

    const handleFilter = () => setOpenDrawer(!openDrawer)
    const openFilterDrawer = () => setOpenDrawer(true);
    const closeFilterDrawer = () => setOpenDrawer(false);

    return (
        <FilterDrawerContext.Provider value={{ openDrawer, handleFilter, closeFilterDrawer, openFilterDrawer }}>
            {children}
        </FilterDrawerContext.Provider>
    )
}

export default FilterDrawerContextProvider;