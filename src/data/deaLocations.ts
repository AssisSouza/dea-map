import { MarkerInterface } from "@/interfaces/interfaces";

const deaLocations: MarkerInterface[] = [
    {
        id: 1,
        lat: -15.633020275933195,
        lng: -48.02632917519532,
        address: "Bem aqui",
        DEA: "Zoll",
        comar: {
            id: 3,
            descr: "COMAR III"
        },
        gbm: {
            id: 17,
            descr: "17º GBM"
        }
    },
    {
        id: 3,
        lat: -15.903622638765505,
        lng: -47.77651011943817,
        address: "17º GBM",
        DEA: "Zoll",
        comar: {
            id: 2,
            descr: "COMAR II"
        },
        gbm: {
            id: 12,
            descr: "12º GBM"
        }
    },
    {
        id: 2,
        lat: -15.796168187860095,
        lng: -47.89188058289393,
        address: "Pátio Brasil",
        DEA: "Phillips",
        comar: {
            id: 2,
            descr: "COMAR I"
        },
        gbm: {
            id: 1,
            descr: "1º GBM"
        }
    }
]

export default deaLocations;