"use client";
import { useState } from "react";
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";

interface CursoDetalhe {

    categoria:String;
    created_at:String;
    data:String;
    descricao:String;
    destaque:String;
    id:String;
    imagem:String;
    local:String;
    nome:String;
    preco:Number;
    vagas_disponiveis:Number

}

export default function DetalhesCurso({ params }:{ 
    params: Promise<{ id: string }> 
}) {
const id = null;

async function buscarId({ params }:{ 
    params: Promise<{ id: string }> 
}) {
 
    const id = (await params).id
    
}

buscarId(params)

const [curso,SetCurso] = useState<CursoDetalhe>();
const [carregando,SetCarregando] = useState(true);
const [erro,SetErro] = useState("");

useEffect(() =>{
    try {
      fetch(`https://dynamic-events-api.onrender.com/api/eventos/${id}`)
      .then(res => res.json())
      .then(data => {
        SetCurso(data)
        SetCarregando(false)
      })
    } catch (erro ) {
      SetErro("Erro ao buscar dados")
    }
  })

  {carregando == true &&(

    <p>Carregando informações</p>
    
  )}

    {carregando == true && (
        <p>Carregando informações</p>
    )}
    
    {curso == null && (
        <p>Curso não encontrado</p>
    )}

    return (

        <main className="p-8">
            <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="relative h-72 w-full bg-slate-100">
                        <Image
                        src={`${curso.imagem}`}
                        width={3000}
                        height={3000}
                        alt="Curso"
                        className="h-full w-full object-cover"
                        />                
                </div>
                <div className="p-8">
                    <div className="mb-4 flex items-center justify-between">
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-600">
                            {curso?.categoria}
                        </span>
                        <span className="text-2xl font-extrabold text-slate-900">R$ {curso?.preco}</span>
                    </div>
                    <h1 className="text-3xl font-bold text-slate-800">{curso?.nome}</h1>
                    <p className="mt-4 leading-relaxed text-slate-600">
                        {curso?.descricao}
                    </p>
                    <div className="mt-8 grid grid-cols-2 gap-4 border-t border-slate-100 pt-6 text-sm">
                        <div>
                            <span className="block font-medium text-slate-400">📍 Localização</span>
                            <span className="font-semibold text-slate-700">{curso.local}</span>
                        </div>
                        <div>
                            <span className="block font-medium text-slate-400">🎓 Modalidade</span>
                            <span className="font-semibold text-slate-700">Presencial / Prática</span>
                        </div>
                    </div>
                    <div className="mt-8 border-t border-slate-100 pt-6">
                        <Link
                            href="/"
                            className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800"
                        >
                            ← Voltar para a lista de cursos
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}