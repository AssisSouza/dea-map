import { FC } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"


const comar = [
    { id: 1, nome: "COMAR I" },
    { id: 2, nome: "COMAR II" },
    { id: 3, nome: "COMAR III" },
    { id: 4, nome: "COMAR IV" },
    { id: 5, nome: "COMAR V" },
]

const gbm = [
    { "id": 1, "comar": 1, "nome": "1º GBM - Esplanada" },
    { "id": 2, "comar": 1, "nome": "2º GBM - Taguatinga" },
    { "id": 3, "comar": 1, "nome": "3º GBM - SIA" },
    { "id": 4, "comar": 1, "nome": "4º GBM - Asa Norte" },
    { "id": 6, "comar": 4, "nome": "6º GBM - Núcleo Bandeirante" },
    { "id": 7, "comar": 2, "nome": "7º GBM - Brazlândia" },
    { "id": 8, "comar": 2, "nome": "8º GBM - Ceilândia Centro" },
    { "id": 9, "comar": 3, "nome": "9º GBM - Planaltina" },
    { "id": 10, "comar": 3, "nome": "10º GBM - Paranoá" },
    { "id": 11, "comar": 1, "nome": "11º GBM - Lago Sul" },
    { "id": 12, "comar": 2, "nome": "12º GBM - Samambaia Centro" },
    { "id": 13, "comar": 1, "nome": "13º GBM - Guará" },
    { "id": 15, "comar": 1, "nome": "15º GBM - Asa Sul" },
    { "id": 16, "comar": 4, "nome": "16º GBM - Gama" },
    { "id": 17, "comar": 3, "nome": "17º GBM - São Sebastião" },
    { "id": 18, "comar": 4, "nome": "18º GBM - Santa Maria" },
    { "id": 19, "comar": 4, "nome": "19º GBM - Candangolândia" },
    { "id": 21, "comar": 4, "nome": "21º GBM - Riacho Fundo" },
    { "id": 22, "comar": 3, "nome": "22º GBM - Sobradinho" },
    { "id": 25, "comar": 2, "nome": "25º GBM - Águas Claras" },
    { "id": 34, "comar": 3, "nome": "34º GBM - Lago Norte" },
    { "id": 36, "comar": 4, "nome": "36º GBM - Recanto das Emas" },
    { "id": 37, "comar": 2, "nome": "37º GBM - Samambaia" },
    { "id": 41, "comar": 2, "nome": "41º GBM - Ceilândia" },
    { "id": 45, "comar": 1, "nome": "45º GBM - Sudoeste" }
]

interface filterDrawerInterface {
    handleComarFilter: (id: number) => void
    handleGBMFilter: (gbm: number) => void
}

const Filters: FC<filterDrawerInterface> = ({ handleComarFilter, handleGBMFilter }) => {

    return (
        <>
            <div className="my-2">
                <Card className="mx-2">
                    {/* <CardHeader className="flex flex-row gap-2">
                        <CardTitle className="text-lg">Filtros</CardTitle>
                    </CardHeader> */}
                    <CardContent className="flex flex-row items-center gap-4 p-4">
                        <div className="flex flex-wrap font-bold"><h3>Filtros</h3></div>
                        <div className="flex flex-wrap gap-2">
                            {comar.map(comar => (
                                <Button variant="secondary" key={comar.id} onClick={() => handleComarFilter(comar.id)}>{comar.nome}</Button>
                            ))}
                        </div>
                        <div className="flex flex-wrap gap-2 px-3">
                            <Select onValueChange={(value) => { handleGBMFilter(Number(value)) }}>
                                <SelectTrigger>
                                    <SelectValue placeholder="GBM" />
                                </SelectTrigger>
                                <SelectContent>
                                    {gbm.map(gbm => (
                                        <SelectItem key={gbm.id} value={`${gbm.id}`}>{gbm.nome}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default Filters;