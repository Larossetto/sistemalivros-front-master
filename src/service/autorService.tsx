import axios from 'axios';
import Autor from '../core/Autor';

interface ApiResponse {
    content: Autor[];
}

const BASE_URL = 'http://localhost:8080';

export const fetchAutores = async (): Promise<Autor[]> => {
    try {
        const response = await axios.get<ApiResponse>(`${BASE_URL}/autores`);
        return response.data.content;
    } catch (error) {
        throw new Error('Erro ao buscar autores');
    }
};

export const cadastrarAutor = async (autor: Autor): Promise<Autor> => {
    try {
        const response = await axios.post<Autor>(`${BASE_URL}/autores`, autor);
        return response.data;
    } catch (error) {
        console.error("Erro ao cadastrar autor:", error);
        throw error;
    }
};

export const atualizarAutor = async (autor: Autor): Promise<Autor> => {
    try {
        const response = await axios.put<Autor>(
            `${BASE_URL}/autores/${autor.id}`, autor);
        return response.data;
    } catch (error) {
        console.error("Erro ao atualizar autor:", error);
        throw error;
    }
};

export const excluirAutor = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${BASE_URL}/autores/${id}`);
    } catch (error) {
        console.error("Erro ao excluir autor:", error);
        throw error;
    }
};