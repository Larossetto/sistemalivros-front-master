'use client';
import Botao from "@/components/autores/botao";
import Formulario from "@/components/autores/formulario";
import Layout from "@/components/autores/layout";
import Tabela from "@/components/autores/tabela";
import Autor from "@/core/Autor";
import { atualizarAutor, cadastrarAutor, excluirAutor, fetchAutores } from "@/service/autorService";
import { useEffect, useState } from "react";

export default function Autores() {

    const [autor, setAutor] = useState<Autor>(Autor.vazio())
    const [autores, setAutores] = useState<Autor[]>([]);
    const [visivel, setVisivel] = useState<'tabela' | 'form'>('tabela')

    useEffect(() => {
        if (visivel === 'tabela') {
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

    function autorSelecionado(autor: Autor) {
        setAutor(autor)
        setVisivel('form')
    }

    async function salvarAutor(autor: Autor) {
        try {
            const novoAutor = await cadastrarAutor(autor);
            setVisivel("tabela");
        } catch (error) {
            console.error("Erro ao salvar autor:", error);
        }
    }

    function novoAutor() {
        setAutor(Autor.vazio())
        setVisivel("form")
    }

    async function alterarAutor(autor: Autor) {
        try {
            const autorAtualizado = await atualizarAutor(autor);
            setVisivel("tabela");
        } catch (error) {
            console.error("Erro ao atualizar autor:", error);
        }
    }

    function salvarOuAlterarAutor(autor: Autor) {
        if (autor.id) {
            alterarAutor(autor)
        } else {
            salvarAutor(autor)
        }
    }

    async function autorExcluido(autor: Autor) {
        const confirmacao =
            window.confirm("Tem certeza de que deseja excluir este autor?");
        if (confirmacao) {
            try {
                if (autor.id !== null) {
                    await excluirAutor(autor.id);
                } else {
                    console.error("autorId é null!");
                }
                setAutores(prevAutores => prevAutores.filter(ev => ev.id !== autor.id));
            } catch (error) {
                console.error("Erro ao excluir autor:", error);
            }
        }
    }

    return (
        <div className={`
            flex justify-center items-center h-screen
            bg-gradient-to-bl from-lime-950 via-lime-700 to-lime-950
            text-white`}>
            <Layout titulo="Cadastro de autores">
                {visivel === 'tabela' ? (
                    <> <div className="flex justify-end">
                        <Botao className="mb-4" cor="bg-gradient-to-r from-green-500 to-green-700"
                            onClick={() => novoAutor()}>
                            Novo autor </Botao>
                    </div>
                        <Tabela autores={autores}
                            autorSelecionado={autorSelecionado}
                            autorExcluido={autorExcluido}></Tabela>
                    </>
                ) : (<Formulario autor={autor}
                    autorMudou={salvarOuAlterarAutor}
                    cancelado={() => setVisivel('tabela')} />)}
            </Layout>
            
        </div>
        
    )
}