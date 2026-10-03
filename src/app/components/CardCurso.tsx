import Image from "next/image";
import Link from "next/link";

interface CardCursoProps {

    id : String;
    title: String;
    description: String;
    price: String;
    category: String;
    image?:String

}

export default function CardCurso(cardCursoProps:CardCursoProps) {
    
    return (
        <div className="flex flex-col justify-between overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:border-blue-500 hover:shadow-md">
            <div>
                {/* IMAGEM DO CURSO */}
                <div className="relative mb-4 h-44 w-full overflow-hidden rounded-lg bg-slate-100">
                    <Image
                        src={`${cardCursoProps.image}`}
                        width={3000}
                        height={3000}
                        alt="Curso"
                        className="h-full w-full object-cover"
                    />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                    {cardCursoProps.category}
                </span>
                <h2 className="mt-1 text-xl font-bold text-slate-800 line-clamp-1">
                    {cardCursoProps.title}
                </h2>
                <p className="mt-2 text-sm text-slate-600 line-clamp-3">
                    {cardCursoProps.description}
                </p>
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                
                <span className="text-sm font-bold text-slate-900">R$ {cardCursoProps.price}</span>
                {/* PASSO CARD 10: Criar o link dinâmico para navegar até a rota de detalhes'/curso/[id]' */}
                <Link
                    href={`../curso/${cardCursoProps.id}/`}
                    className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-blue-700"
                >
                    Ver Detalhes →
                </Link>
            </div>
        </div>
    );
}
