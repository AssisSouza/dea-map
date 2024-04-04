'use client';

import React, { FC, createContext, useState } from "react";

export const ManualContext = createContext({
    openManualDrawer: true,
    handleOpenManualDrawer: (open: boolean) => {}
});

const ManualContextProvider: FC<any> = ({children}) => {
    const [openManualDrawer, setOpenManualDrawer] = useState<boolean>(false);

    const handleOpenManualDrawer = (open: boolean) => {
        setOpenManualDrawer(open);
        console.log('click', openManualDrawer)
    }

    return (
        <ManualContext.Provider value={{openManualDrawer, handleOpenManualDrawer}}>
            {children}
        </ManualContext.Provider>
    )
}

export default ManualContextProvider;