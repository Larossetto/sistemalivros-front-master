import Livro from "@/core/Livro"
import { IconeEdicao, IconeLixo } from "../icones/tabela"
import Autor from "@/core/Autor"


interface TabelaProps {
    livros: Livro[]
    autores: Autor[]
    livroSelecionado?: (livros: Livro, autores: Autor) => void
    livroExcluido?: (livros: Livro) => void
}

export default function Tabela(props: TabelaProps) {

    const exibirAcoes = props.livroSelecionado || props.livroExcluido

    function renderizarAcoes(livros: Livro) {
        return (
            <td className="flex justify-center">
                {props.livroSelecionado
                    ? (<button onClick={() => props.livroSelecionado?.(livros,livros.autor)}
                        className={`flex justify-center items text-green-600
                            rounded-full p-2 m-1 hover:bg-gray-100`}>{IconeEdicao}</button>)
                    : false}
                {props.livroExcluido
                    ? (<button onClick={() => props.livroExcluido?.(livros)}
                        className={`flex justify-center items text-red-600
                            rounded-full p-2 m-1 hover:bg-gray-100`}>{IconeLixo}</button>)
                    : false}
            </td>)
    }

    function renderHeader() {
        return (
            <tr>
                <th className="text-left p-3">id</th>
                <th className="text-left p-3">Título</th>
                <th className="text-left p-3">Isbn</th>
                <th className="text-left p-3">Autor</th>
                {exibirAcoes ? <th className="p-3">Ações</th> : false}
            </tr>)
    }

    function renderDados() {
        return props.livros?.map((livros, i) => {
            return (
                <tr key={livros.id}
                    className={`${i % 2 === 0 ? 'bg-gray-200' : 'bg-gray-100'} `}>
                    <td className="text-left p-3">{livros.id}</td>
                    <td className="text-left p-3">{livros.titulo}</td>
                    <td className="text-left p-3">{livros.isbn}</td>
                    <td className="text-left p-3">{livros.autor.nome}</td>
                    {exibirAcoes ? renderizarAcoes(livros) : false}
                </tr>)
        })
    }

    return (
        <table className="w-full rounded-xl overflow-hidden">
            <thead className={`text-gray-100
            bg-gradient-to-r from-lime-500 to-lime-800`}>
                {renderHeader()} </thead>
            <tbody>
                {renderDados()} </tbody>
        </table>)
}