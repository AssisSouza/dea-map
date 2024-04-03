'use client';

import React, { FC, createContext, useState } from "react";

export const ManualContext = createContext({
    openManualDrawer: true,
    handleOpenManualDrawer: () => {}
});

const ManualContextProvider: FC<any> = ({children}) => {
    const [openManualDrawer, setOpenManualDrawer] = useState<boolean>(false);

    const handleOpenManualDrawer = () => {
        setOpenManualDrawer(!openManualDrawer);
    }

    return (
        <ManualContext.Provider value={{openManualDrawer, handleOpenManualDrawer}}>
            {children}
        </ManualContext.Provider>
    )
}

export default ManualContextProvider;