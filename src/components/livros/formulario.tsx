import Livro from "@/core/Livro"
import Entrada from "./entrada"
import { useState } from "react"
import Botao from "@/components/livros/botao";
import Autor from "@/core/Autor";
import EntradaSelect from "./entradaSelect";


interface FormularioProps {
    livro: Livro
    autores: Autor[]
    livroMudou?: (livro: Livro) => void
    cancelado?: () => void
}

export default function Formulario(props: FormularioProps) {


    const id = props.livro?.id
    const [titulo, setTitulo] = useState(props.livro?.titulo)
    const [isbn, setIsbn] = useState(props.livro?.isbn)
    const [autor, setAutor] = useState(props.livro?.autor)
    return (
        <div>
            {id ? (<Entrada texto="id" valor={id} somenteLeitura ></Entrada>) : false}
            <Entrada texto="Titulo" valor={titulo} onChange={setTitulo}></Entrada>
            <Entrada texto="Isbn" valor={isbn} onChange={setIsbn}></Entrada>
            <EntradaSelect texto="Autor" lista={props.autores} valor={autor} onChange={setAutor}></EntradaSelect>
            
            <div className="flex justify-end mt-5" >
                <Botao className="mr-3" cor="bg-gradient-to-r from-blue-500 to-blue-700"
                    onClick={() => props.livroMudou?.(new Livro(
                        id, titulo, isbn, autor))}>
                    {id ? 'Alterar' : 'Salvar'}
                </Botao>
                <Botao cor="bg-gradient-to-r from-gray-500 to-gray-700"
                    onClick={props.cancelado}> Cancelar
                </Botao>
            </div>
        </div>
    )
}