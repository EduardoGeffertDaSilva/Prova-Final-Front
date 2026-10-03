"use client";
import { use, useState } from "react";
import { useEffect } from "react";
import CardCurso from "./components/CardCurso";

interface CursoAPI {

    id : String;
    categoria:String;
    created_at:String;
    data:String;
    descricao:String;
    destaque:Boolean;
    imagem: String
    local:String;
    nome:String;
    preco:Number;
    vagas_disponiveis:Number

} 

export default function Home() {

  const [cursos,SetCursos] = useState<CursoAPI[]>([]);
  const [busca,SetBusca] = useState("");
  const [carregando,SetCarregando] = useState(true);
  const [erro,SetErro] = useState("");

  useEffect(() =>{

    try {
      fetch("https://dynamic-events-api.onrender.com/api/eventos?categoria=Cursos")
      .then(res => res.json())
      .then(data => {
        SetCursos(data)
        SetCarregando(false)
      })
    } catch (error) {
      SetErro("Erro ao buscar dados")
    }
    
    

  })

  const cursosFiltrados = cursos.filter((curso) => {

    const dataBusca = curso.nome.toLowerCase().includes(busca.toLowerCase()) || curso.descricao.toLowerCase().includes(busca.toLowerCase());

    return dataBusca;

  })

  function clicarBotao(click:any){
    SetBusca("")
  }

  return (
    <main className="p-8">
      <div className="mx-auto max-w-5xl">
        <section className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-blue-600">Catálogo de Cursos</h1>
            <p className="mt-1 text-sm text-slate-500">
              Treinamentos e capacitações técnicas exclusivas
            </p>
          </div>
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="Buscar curso..."
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-800 outline-none transition-all focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              value={busca}
              onChange={(e) => SetBusca(e.target.value)}
            />
            {busca!= "" && (
            <button 
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
            onClick={clicarBotao}
            >
              ✕
            </button>
            )} 
            
          </div>
        </section>
        {erro != "" && (
            <p>{erro}</p>
        )}

        {carregando == true &&(
          <p>Carregando catálogo. . .</p>
        )}

        {carregando == false && cursosFiltrados.length > 0 && (

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {cursosFiltrados.map((cursoC) => (

              <CardCurso
              key={`${cursoC.id}`}
              id={cursoC.id}
              title={cursoC.nome}
              description={cursoC.descricao}
              price={cursoC.preco.toString()}
              category={cursoC.categoria}
              image={cursoC.imagem} 
              />

            ))}
          </div>
        )}
      </div>
    </main>
  );
}
