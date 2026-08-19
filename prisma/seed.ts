import { prisma } from "@/lib/prisma";

/**
 * ATENÇÃO / AJUSTES NECESSÁRIOS ANTES DE RODAR:
 *
 * 1. Este script assume que o model no schema.prisma se chama "Frequencia"
 *    (client: prisma.frequencia) com os campos: id, data (DateTime),
 *    cargaHoraria (Int), presenca (Boolean), userId (String).
 *    Se os nomes forem diferentes no seu schema.prisma, ajuste as
 *    referências abaixo (ex: prisma.attendance, "date", "workload" etc).
 *
 * 2. O campo "id" NÃO é enviado nos objetos — assim o Prisma usa o
 *    @default(cuid()) do schema e gera um id novo e único para cada
 *    registro replicado, como combinado.
 *
 * 3. "skipDuplicates: true" só tem efeito se existir uma constraint
 *    única no schema, por exemplo:
 *        @@unique([userId, data])
 *    Sem isso, rodar o seed mais de uma vez vai duplicar os registros.
 *    Se essa constraint não existir ainda, recomendo criá-la.
 */

// Registros de referência (aluno cmsnrltep000104iey8wqgepg), já sem as
// duplicatas de 22/07 e 13/08, e com 11/08 normalizado para 00:00:00.
const registrosReferencia: {
  data: string;
  cargaHoraria: number;
  presenca: boolean;
}[] = [
  { data: "2026-05-11", cargaHoraria: 3, presenca: true },
  { data: "2026-05-12", cargaHoraria: 3, presenca: true },
  { data: "2026-05-13", cargaHoraria: 3, presenca: true },
  { data: "2026-05-14", cargaHoraria: 3, presenca: true },
  { data: "2026-05-18", cargaHoraria: 0, presenca: false },
  { data: "2026-05-19", cargaHoraria: 3, presenca: true },
  { data: "2026-05-20", cargaHoraria: 0, presenca: false },
  { data: "2026-05-21", cargaHoraria: 3, presenca: true },
  { data: "2026-05-25", cargaHoraria: 3, presenca: true },
  { data: "2026-05-26", cargaHoraria: 3, presenca: true },
  { data: "2026-05-27", cargaHoraria: 0, presenca: false },
  { data: "2026-05-28", cargaHoraria: 3, presenca: true },
  { data: "2026-06-01", cargaHoraria: 0, presenca: false },
  { data: "2026-06-02", cargaHoraria: 0, presenca: false },
  { data: "2026-06-03", cargaHoraria: 3, presenca: true },
  { data: "2026-06-04", cargaHoraria: 3, presenca: true },
  { data: "2026-06-08", cargaHoraria: 3, presenca: true },
  { data: "2026-06-09", cargaHoraria: 0, presenca: false },
  { data: "2026-06-10", cargaHoraria: 3, presenca: true },
  { data: "2026-06-11", cargaHoraria: 3, presenca: true },
  { data: "2026-07-01", cargaHoraria: 0, presenca: false },
  { data: "2026-07-02", cargaHoraria: 0, presenca: false },
  { data: "2026-07-06", cargaHoraria: 3, presenca: true },
  { data: "2026-07-07", cargaHoraria: 3, presenca: true },
  { data: "2026-07-08", cargaHoraria: 3, presenca: true },
  { data: "2026-07-09", cargaHoraria: 3, presenca: true },
  { data: "2026-07-13", cargaHoraria: 3, presenca: true },
  { data: "2026-07-14", cargaHoraria: 3, presenca: true },
  { data: "2026-07-15", cargaHoraria: 3, presenca: true },
  { data: "2026-07-16", cargaHoraria: 3, presenca: true },
  { data: "2026-07-20", cargaHoraria: 0, presenca: false },
  { data: "2026-07-21", cargaHoraria: 3, presenca: true },
  { data: "2026-07-22", cargaHoraria: 3, presenca: true },
  { data: "2026-07-23", cargaHoraria: 3, presenca: true },
  { data: "2026-07-27", cargaHoraria: 3, presenca: true },
  { data: "2026-07-28", cargaHoraria: 0, presenca: false },
  { data: "2026-07-29", cargaHoraria: 3, presenca: true },
  { data: "2026-07-30", cargaHoraria: 3, presenca: true },
  { data: "2026-08-03", cargaHoraria: 3, presenca: true },
  { data: "2026-08-04", cargaHoraria: 3, presenca: true },
  { data: "2026-08-06", cargaHoraria: 3, presenca: true },
  { data: "2026-08-10", cargaHoraria: 3, presenca: true },
  { data: "2026-08-11", cargaHoraria: 3, presenca: true }, // normalizado (era 03:00)
  { data: "2026-08-12", cargaHoraria: 3, presenca: true },
  { data: "2026-08-13", cargaHoraria: 0, presenca: false },
  { data: "2026-08-17", cargaHoraria: 3, presenca: true },
  { data: "2026-08-18", cargaHoraria: 0, presenca: false },
];

// userIds dos outros alunos que devem receber a mesma frequência
const outrosAlunosIds: string[] = [
  "cmsnr7kop000004jp69rqa21n",
  "cmsnrl4je000004iez2w816tx",
  "cmsp65085000004l7yy05ugcy",
  "cmsp6clq1000104l7h1svk402",
  "cmsp7od0o000004k02mv5p3ki",
  "cmsqljxbi000004l7nspp6kca",
  "cmsqrm6yb000004l5jml1bbvq",
];

async function main() {
  const registrosParaCriar = outrosAlunosIds.flatMap((userId) =>
    registrosReferencia.map((registro) => ({
      userId,
      data: new Date(`${registro.data}T00:00:00`),
      cargaHoraria: registro.cargaHoraria,
      presenca: registro.presenca,
      // "id" propositalmente omitido: o Prisma gera um novo para cada registro
    })),
  );

  const resultado = await prisma.frequencia.createMany({
    data: registrosParaCriar,
    skipDuplicates: true,
  });

  console.log(
    `Seed concluído: ${resultado.count} registros criados para ${outrosAlunosIds.length} alunos (${registrosReferencia.length} datas cada).`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
