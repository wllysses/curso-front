import Link from "next/link";
import { Card, CardContent } from "./ui/card";
import { CalendarIcon, FileTextIcon, HardDriveIcon } from "lucide-react";
import { getGoogleDriveData } from "@/services/api";
import { ArquivoRoot } from "@/@types";

export async function Classrooms() {
  const data: ArquivoRoot = await getGoogleDriveData();

  return (
    <section
      className="w-full flex flex-col gap-6 mt-20 items-center"
      id="aulas"
    >
      <div className="text-center mb-4">
        <h2 className="font-bold text-4xl">Material de Apoio</h2>
        <p className="text-muted-foreground mt-2">
          Todo o conteúdo do curso disponível para consulta e download. Acesse
          os materiais das aulas.
        </p>
      </div>

      <div className="grid grid-cols-1 w-full gap-4">
        {data.arquivos.map((file) => (
          <Link
            key={file.id}
            href={file.url}
            target="_blank"
            className="w-full"
          >
            <Card>
              <CardContent className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <FileTextIcon className="h-6 w-6" aria-hidden="true" />
                  </span>
                </div>

                <h3 className="font-heading text-base font-bold leading-snug text-card-foreground text-balance">
                  {file.nome.replace(".pdf", "")}
                </h3>

                <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <HardDriveIcon className="h-4 w-4" aria-hidden="true" />
                    {(file.tamanho / (1024 * 1024)).toFixed(1)}MB
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarIcon className="h-4 w-4" aria-hidden="true" />
                    {new Date(file.dataCriacao).toLocaleDateString("pt-BR", {
                      dateStyle: "medium",
                    })}{" "}
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
