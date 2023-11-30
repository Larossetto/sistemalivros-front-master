import axios from 'axios';
import Livro from '../core/Livro';

interface ApiResponse {
    content: Livro[];
}

const BASE_URL = 'http://localhost:8080';

export const fetchLivros = async (): Promise<Livro[]> => {
    try {
        const response = await axios.get<ApiResponse>(`${BASE_URL}/livros`);
        return response.data.content;
    } catch (error) {
        throw new Error('Erro ao buscar livros');
    }
};

export const cadastrarLivro = async (autor: Livro): Promise<Livro> => {
    try {
        const response = await axios.post<Livro>(`${BASE_URL}/livros`, autor);
        return response.data;
    } catch (error) {
        console.error("Erro ao cadastrar autor:", error);
        throw error;
    }
};

export const atualizarLivro = async (autor: Livro): Promise<Livro> => {
    try {
        const response = await axios.put<Livro>(
            `${BASE_URL}/livros/${autor.id}`, autor);
        return response.data;
    } catch (error) {
        console.error("Erro ao atualizar autor:", error);
        throw error;
    }
};

export const excluirLivro = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${BASE_URL}/livros/${id}`);
    } catch (error) {
        console.error("Erro ao excluir autor:", error);
        throw error;
    }
};