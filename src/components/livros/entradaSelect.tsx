import Select from 'react-select'

interface EntradaProps {
    texto: string
    lista: any
    valor: any
    onChange?: (valor: any) => void
}

export default function EntradaSelect(props: EntradaProps) {
    console.log(props.valor)
    console.log(props.lista)
    return (<div className="flex flex-col mt-3" > <label className="mb-2">
        {props.texto} </label>
        <Select
            options={props.lista}
            value={props.valor}
            getOptionLabel={(option) => option.nome}
            getOptionValue={(option) => option}
            onChange={e => props.onChange?.(e)}
            className={`
                border border-lime-900 rounded-l g
                focus:outline-none bg-gray-100 px-4 py-2
                `} />
    </div>)
}
