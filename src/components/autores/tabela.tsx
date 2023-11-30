import Autor from "@/core/Autor"
import { IconeEdicao, IconeLixo } from "../icones/tabela"


interface TabelaProps {
    autores: Autor[]
    autorSelecionado?: (autor: Autor) => void
    autorExcluido?: (autor: Autor) => void
}

export default function Tabela(props: TabelaProps) {

    const exibirAcoes = props.autorSelecionado || props.autorExcluido

    function renderizarAcoes(autor: Autor) {
        return (
            <td className="flex justify-center">
                {props.autorSelecionado
                    ? (<button onClick={() => props.autorSelecionado?.(autor)}
                        className={`flex justify-center items text-green-600
                            rounded-full p-2 m-1 hover:bg-gray-100`}>{IconeEdicao}</button>)
                    : false}
                {props.autorExcluido
                    ? (<button onClick={() => props.autorExcluido?.(autor)}
                        className={`flex justify-center items text-red-600
                            rounded-full p-2 m-1 hover:bg-gray-100`}>{IconeLixo}</button>)
                    : false}
            </td>)
    }

    function renderHeader() {
        return (
            <tr>
                <th className="text-left p-3">id</th>
                <th className="text-left p-3">Nome</th>
                <th className="text-left p-3">Nascimento</th>
                {exibirAcoes ? <th className="p-3">Ações</th> : false}
            </tr>)
    }

    function renderDados() {
        return props.autores?.map((autor, i) => {
            return (
                <tr key={autor.id}
                    className={`${i % 2 === 0 ? 'bg-gray-200' : 'bg-gray-100'} `}>
                    <td className="text-left p-3">{autor.id}</td>
                    <td className="text-left p-3">{autor.nome}</td>
                    <td className="text-left p-3">{autor.nascimento}</td>
                    {exibirAcoes ? renderizarAcoes(autor) : false}

                </tr>)
        })
    }

    return (
        <table className="w-full rounded-xl overflow-hidden">
            <thead className={`text-gray-100
            bg-gradient-to-r from-lime-500 to-lime-800`}>
                {renderHeader()} </thead>
            <tbody>
                {renderDados()}
                </tbody>
        </table>)
}