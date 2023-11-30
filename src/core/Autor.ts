import { stringParaEntradaDeData } from "@/utils/converters";

export default class Autor {
    id: number | null;
    nome: string;
    nascimento: string;

    constructor(id: number | null, nome: string, nascimento: string) {
        this.id = id;
        this.nome = nome;
        this.nascimento = nascimento;
    }

    static vazio(): Autor {
        return new Autor(null, "", stringParaEntradaDeData(""));
       }       

}