import { FC, useEffect, useState } from "react"
import { Drawer, DrawerContent, DrawerHeader, DrawerOverlay, DrawerTitle } from "./ui/drawer"
import { useMediaQuery } from "@/hooks/useMediaQuery";
import guiaDea from "@/data/guiaDea";
import { MarkerInterface } from "@/interfaces/interfaces";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { motion } from "framer-motion";
import Image from "next/image";

interface InfoDrawer {
    infoOpen: boolean,
    drawerOpen: boolean,
    deaSelected: MarkerInterface | null,
    handleDrawerOpen: (drawer: boolean) => void
}

const InfoDrawer: FC<InfoDrawer> = ({ deaSelected, infoOpen, drawerOpen, handleDrawerOpen }) => {

    const isDesktop = useMediaQuery("(min-width: 768px)");
    const [open, setOpen] = useState(() => (isDesktop));

    const handleInteractOutside = () => {
        if (isDesktop) {
            setOpen(true)
        } else {
            setOpen(false)
        }
    }
    useEffect(() => {
        if (isDesktop) handleDrawerOpen(true)
    })

    let styleDrawer = isDesktop ? 'h-[calc(100vh-9.7rem)] w-1/4 ' : 'h-[calc(100vh-5rem)]';

    return (
        <Drawer open={drawerOpen} modal={false} dismissible={!isDesktop}  >
            <DrawerOverlay className="" />
            <DrawerContent className={styleDrawer + " rounded-none shadow-sm"} onInteractOutside={handleInteractOutside} >
                <DrawerHeader>
                    <DrawerTitle>Passo a Passo do uso do DEA</DrawerTitle>
                </DrawerHeader>
                <div className="overflow-auto p-4">
                    <ol className="list-decimal list-inside mb-4 mx-4 [&>li]:mb-1 [&>li]:font-semibold text-justify">
                        <li>
                            Agir imediatamente
                            <Image
                                src="/atencao.svg"
                                width="42"
                                height="42"
                                alt=""
                                className="inline mb-2"
                            />
                            </li>
                        <ul className="list-disc list-inside mb-4 ml-4 [&>li]:mt-1">
                            <li className=" indent-8 leading-7">Apenas comprima o centro do peito da vítima, de forma “forte e rápida” (frequência de 100 a 120/minuto) até que o DEA chegue ao local.</li>
                            <li className=" indent-8 leading-7">O ideal, caso não esteja sozinho, é que alguém faça as compressões enquanto outra pessoa busca e prepara o equipamento.</li>
                        </ul >
                        <li>Prepare o paciente</li>
                        <ul className="list-disc list-inside mb-4 ml-4 [&>li]:mt-1">
                            <li className=" indent-8 leading-7">Quando o aparelho estiver a postos, exponha o peito da vítima e verifique se a pele está seca.</li>
                        </ul>
                        <li>Ligue o aparelho</li>
                        <ul className="list-disc list-inside mb-4 ml-4 [&>li]:mt-1">
                            <li className=" indent-8 leading-7">Ligue apertando o botão por 3 segundos, escute atentamente as instruções que serão transmitidas pelo próprio equipamento.</li>
                        </ul>
                        <li>Posicione os eletrodos</li>
                        <ul className="list-disc list-inside mb-4 ml-4 [&>li]:mt-1">
                            <li className=" indent-8 leading-7">Assim que for dada essa orientação pelo Dispositivo, é hora de colocar os eletrodos (adesivos) no tórax do paciente. Os aparelhos costumam ter um desenho ilustrando a posição:</li>
                            <li className=" indent-8 leading-7">Eletrodo do lado direito do paciente: deve ser colocado abaixo da clavícula;</li>
                            <li className=" indent-8 leading-7">Eletrodo do lado esquerdo do paciente: precisa ser posicionado nas últimas costelas, abaixo do mamilo esquerdo.</li>
                            <li className=" indent-8 leading-7">Atenção! O DEA não deve ser removido, os eletrodos devem ser mantidos no tórax do paciente até o atendimento médico.</li>
                        </ul>
                        <li>Conecte o cabo</li>
                        <ul className="list-disc list-inside mb-4 ml-4 [&>li]:mt-1">
                            <li>Nesse momento, a instrução dada será para conectar o cabo do DEA no conector. Em seguida, o aparelho irá fazer uma análise do ritmo cardíaco.</li>
                        </ul>
                        <li>Analise o ritmo</li>
                        <ul className="list-disc list-inside mb-4 ml-4 [&>li]:mt-1">
                            <li>Após analisar, será indicado se é necessário aplicar o choque ou não.</li>
                            <li>CHOQUE NÃO INDICADO: deve-se continuar com as compressões até a chegada do socorro.</li>
                            <li>CHOQUE INDICADO: Solicite aos presentes que se afastem, não podendo haver ninguém próximo e, principalmente, em contato com o paciente ou com o aparelho.</li>
                        </ul>
                        <li>Dê o choque</li>
                        <ul className="list-disc list-inside mb-4 ml-4 [&>li]:mt-1">
                            <li>Pressione o botão de choque para deflagrar a descarga.</li>
                            <li>Retome as compressões torácicas imediatamente por mais 2 minutos.</li>
                            <li>Após os 2 minutos de compressão o Dispositivo faz uma nova análise e aponta o próximo passo.</li>
                        </ul>
                        <li>Prossiga com as compressões (Se for o caso)</li>
                        <ul className="list-disc list-inside mb-4 ml-4 [&>li]:mt-1">
                            <li>O DEA irá dizer se o ritmo das compressões está adequado ou se precisa ser modificado (aumentar ou diminuir o ritmo, se as compressões devem ser mais profundas) e avisa quando o choque poderá ser dado.</li>
                        </ul>
                        <li className="list-none font-semibold text-lg my-8 -ml-1 text-left">Como proceder em casos especiais?</li>
                        <ul className="list-disc list-inside mb-4 mt-3 ml-4 mr-0 [&>li]:mt-1 text-justify">
                            <li><span className="font-semibold">Crianças:</span> Eletrodos infantis em crianças devem ser posicionados com um eletrodo no centro do peito, e o outro nas costas, também ao centro. Acima de 8 anos utilizar como em adultos</li>
                            <li><span className="font-semibold">Situações Molhadas ou Úmidas:</span> Secar o peito ou o local antes de aplicar os eletrodos. Situações com muita água o DEA pode não ser seguro para uso.
                            </li>
                            <li><span className="font-semibold">Homens muito peludos:</span> Se o paciente tiver muitos pelos no tórax, raspe o peito da vítima antes de aplicar as pás adesivas.
                            </li>
                            <li><span className="font-semibold">Presença de acessórios e adesivos:</span> Retirar medicamento adesivo (nicotina ou anticoncepcional), acessórios de metal, como colares, aros metálicos de sutiãs e joias também devem ser retirados.
                            </li>
                            <li><span className="font-semibold">Vítimas com Marca-passo Interno:</span> Se o marca-passo estiver do lado direito do peito, afastar o eletrodo cerca de 8cm do local implantado.
                            </li>
                            <li>
                                <span className="font-semibold">Gestantes:</span> Pode usar normalmente.
                            </li>
                        </ul>
                    </ol>
                </div>
            </DrawerContent >
        </Drawer >
    )
}

export default InfoDrawer;