interface MarkerInterface {
    id: number,
    lat: number,
    lng: number,
    DEA: string,
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

interface latLngInterface {
    lat: number,
    lng: number
}




export type {
    MarkerInterface,
    latLngInterface
}