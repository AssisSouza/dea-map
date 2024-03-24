'use client'

import React from "react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command"

export default function MultipleSelect() {

    return (
        <>
            <Command>
                <CommandInput placeholder="Selecione o GBM" />
                <CommandList>
                    <CommandEmpty>GBM não encontrado</CommandEmpty>
                    <CommandGroup heading="GBM">
                        <CommandItem key="1" value="1">17gbm</CommandItem>
                        <CommandItem key="2" value="2">18gbm</CommandItem>
                        <CommandItem key="3" value="3">19gbm</CommandItem>
                        <CommandItem key="4" value="4">16gbm</CommandItem>
                    </CommandGroup>
                </CommandList>
            </Command>
        </>
    )
}