import { Root } from "@/@types";
import { getGithubRepository } from "@/services/api";
import { GitBranch, GitFork, Eye, CircleDot, ArrowRight } from "lucide-react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18.92-.26 1.91-.39 2.89-.39.98 0 1.97.13 2.89.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.07.78 2.16 0 1.56-.01 2.82-.01 3.2 0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z" />
    </svg>
  );
}

export async function Repositories() {
  const repository: Root = await getGithubRepository();

  return (
    <section className="relative py-16 lg:py-24" id="codigos">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center text-center gap-4">
          <h2 className="text-balance font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Nossos Códigos{" "}
          </h2>
          <p className="max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Acesse o repositório oficial do curso e tenha à mão todos os
            projetos e exemplos desenvolvidos durante as aulas.
          </p>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-border/60 bg-card">
          <div className="flex flex-col gap-6 p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <GithubIcon className="h-7 w-7" />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading text-lg font-bold text-card-foreground">
                      curso-apps-midias-digitais
                    </h3>
                    <span className="rounded-full border border-primary/40 bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                      {!repository?.private && "Público"}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Repositório Oficial do Curso{" "}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <GitFork
                  className="h-4 w-4 text-muted-foreground"
                  aria-hidden="true"
                />
                <span className="font-heading text-sm font-bold text-card-foreground">
                  {repository?.forks_count}
                </span>
                <span className="text-sm text-muted-foreground">Forks</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye
                  className="h-4 w-4 text-muted-foreground"
                  aria-hidden="true"
                />
                <span className="font-heading text-sm font-bold text-card-foreground">
                  {repository?.watchers}
                </span>
                <span className="text-sm text-muted-foreground">Watchers</span>
              </div>
              <div className="flex items-center gap-2">
                <CircleDot
                  className="h-4 w-4 text-muted-foreground"
                  aria-hidden="true"
                />
                <span className="font-heading text-sm font-bold text-card-foreground">
                  {repository?.open_issues}
                </span>
                <span className="text-sm text-muted-foreground">Issues</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 rounded-xl border border-border/60 bg-background/60 p-4">
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <GitBranch className="h-4 w-4" aria-hidden="true" />
                Clonar via HTTPS
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-border/60 bg-card px-4 py-3">
                <code className="flex-1 overflow-x-auto font-mono text-sm text-card-foreground">
                  git clone {repository?.html_url}
                </code>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={repository?.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-heading text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
              >
                <GithubIcon className="h-5 w-5" />
                Acessar repositório
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
