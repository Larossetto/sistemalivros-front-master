import Autor from "@/core/Autor"
import Entrada from "./entrada"
import { useState } from "react"
import Botao from "@/components/autores/botao";
import { stringParaEntradaDeData } from "@/utils/converters";

interface FormularioProps {
    autor: Autor
    autorMudou?: (autor: Autor) => void
    cancelado?: () => void
}

export default function Formulario(props: FormularioProps) {
    const id = props.autor?.id
    const [nome, setNome] = useState(props.autor?.nome)
    const [nascimento, setNascimento] = useState(props.autor?.nascimento)
    return (
        <div>
            {id ? (<Entrada texto="id" valor={id} somenteLeitura ></Entrada>) : false}
            <Entrada texto="Nome" valor={nome} onChange={setNome}></Entrada>
            <Entrada texto="Nascimento" tipo="date" valor={stringParaEntradaDeData(nascimento)}
                onChange={setNascimento}></Entrada>
            <div className="flex justify-end mt-5" >
                <Botao className="mr-3" cor="bg-gradient-to-r from-blue-500 to-blue-700"
                    onClick={() => props.autorMudou?.(new Autor(
                        id, nome, nascimento))}>
                    {id ? 'Alterar' : 'Salvar'}
                </Botao>
                <Botao cor="bg-gradient-to-r from-gray-500 to-gray-700"
                    onClick={props.cancelado}> Cancelar
                </Botao>
            </div>
        </div>
    )
}