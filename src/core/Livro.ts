import Autor from "./Autor";

export default class Livros {
    id: number | null;
    titulo: string;
    isbn: string;
    autor: Autor;

    constructor(id: number | null, titulo: string, isbn: string, autor: Autor) {
        this.id = id;
        this.titulo = titulo;
        this.isbn = isbn;
        this.autor = autor;
    }

    static vazio(): Livros {
        return new Livros(null, "", "", Autor.vazio());
    }

}