'use client';
import Botao from "@/components/livros/botao";
import Formulario from "@/components/livros/formulario";
import Layout from "@/components/livros/layout";
import Tabela from "@/components/livros/tabela";
import Autor from "@/core/Autor";
import Livro from "@/core/Livro";
import { fetchAutores } from "@/service/autorService";
import { atualizarLivro, cadastrarLivro, excluirLivro, fetchLivros } from "@/service/livroService";
import { useEffect, useState } from "react";

export default function Livros() {

    const [livro, setLivro] = useState<Livro>(Livro.vazio())
    const [livros, setLivros] = useState<Livro[]>([]);
    const [autor, setAutor] = useState<Autor>(Autor.vazio())
    const [autores, setAutores] = useState<Autor[]>([]);
    const [visivel, setVisivel] = useState<'tabela' | 'form'>('tabela')

    useEffect(() => {
        if (visivel === 'tabela') {
            const loadLivros = async () => {
                try {
                    const dados = await fetchLivros();
                    setLivros(dados);
                } catch (error) {
                    console.error("Erro ao buscar livros:", error);
                }
            }
            loadLivros();
        }
        if (visivel === 'form') {
            const loadAutores = async () => {
                try {
                    const dados = await fetchAutores();
                    setAutores(dados);
                } catch (error) {
                    console.error("Erro ao buscar autores:", error);
                }
            }
            loadAutores();
        }
    }, [visivel]);

    function livroSelecionado(livro: Livro) {
        setLivro(livro)
        setAutor(livro.autor)
        setVisivel('form')
    }

    async function salvarLivro(livro: Livro) {
        try {
            const novoLivro = await cadastrarLivro(livro);
            setVisivel("tabela");
        } catch (error) {
            console.error("Erro ao salvar livro:", error);
        }
    }

    function novoLivro() {
        setLivro(Livro.vazio())
        setVisivel("form")
    }

    async function alterarLivro(livro: Livro) {
        try {
            const livroAtualizado = await atualizarLivro(livro);
            setVisivel("tabela");
        } catch (error) {
            console.error("Erro ao atualizar livro:", error);
        }
    }

    function salvarOuAlterarLivro(livro: Livro) {
        if (livro.id) {
            alterarLivro(livro)
        } else {
            salvarLivro(livro)
        }
    }

    async function livroExcluido(livro: Livro) {
        const confirmacao =
            window.confirm("Tem certeza de que deseja excluir este livro?");
        if (confirmacao) {
            try {
                if (livro.id !== null) {
                    await excluirLivro(livro.id);
                } else {
                    console.error("livroId é null!");
                }
                setLivros(prevLivros => prevLivros.filter(ev => ev.id !== livro.id));
            } catch (error) {
                console.error("Erro ao excluir livro:", error);
            }
        }
    }

    return (
        <div className={`
            flex justify-center items-center h-screen
            bg-gradient-to-bl from-lime-950 via-lime-700 to-lime-950
            text-white`}>
            <Layout titulo="Cadastro de livros">
                {visivel === 'tabela' ? (
                    <> <div className="flex justify-end">
                        <Botao className="mb-4" cor="bg-gradient-to-r from-green-500 to-green-700"
                            onClick={() => novoLivro()}>
                            Novo livro </Botao>
                    </div>
                        <Tabela livros={livros}
                        autores={autores}
                        livroSelecionado={livroSelecionado}
                        livroExcluido={livroExcluido}></Tabela>
                    </>
                ) : (<Formulario livro={livro}
                    autores={autores}
                    livroMudou={salvarOuAlterarLivro}
                    cancelado={() => setVisivel('tabela')} />)}
            </Layout>
        </div>
    )
}