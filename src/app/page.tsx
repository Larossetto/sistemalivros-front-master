import Layout from "@/components/livros/layout";



export default function Home() {
  return (
    <div className={`
            flex justify-center items-center h-screen
            bg-gradient-to-bl from-lime-950 via-lime-700 to-lime-950
            text-white`}>

      <Layout titulo="Sistema de livros">Sistema de cadastro de livros e autores</Layout>

    </div>
  )
}
