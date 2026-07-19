import { SparklesIcon, CheckCircleIcon } from "lucide-react";
import { Badge } from "./ui/badge";

export function Hero() {
  return (
    <section className="mt-10 w-full flex flex-col items-center gap-4">
      <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 px-4 py-1.5 text-sm font-medium text-primary">
        <SparklesIcon className="h-4 w-4" aria-hidden="true" />
        Em andamento
      </span>
      <h2 className="max-w-3xl mx-auto font-bold text-6xl text-center bg-linear-to-r from-slate-50 to-green-400 bg-clip-text text-transparent">
        Curso de Desenvolvedor de Aplicativos para Mídias Digitais
      </h2>
      <p className="max-w-2xl mx-auto text-center">
        Aprenda a criar aplicativos móveis e experiências digitais do zero. Uma
        formação prática, gratuita e certificada para preparar você para o
        mercado de tecnologia da Paraíba e de todo o Brasil.
      </p>

      <div className="flex items-center justify-center gap-4 mt-4">
        <Badge className="p-4 text-sm">
          {" "}
          <CheckCircleIcon /> 100% gratuito
        </Badge>
        <Badge className="p-4 text-sm">
          <CheckCircleIcon />
          Certificado reconhecido
        </Badge>

        <Badge className="p-4 text-sm">
          <CheckCircleIcon />
          Aulas práticas
        </Badge>
      </div>
    </section>
  );
}
