import { Nota } from "@/generated/prisma/client";

export function calculateStudentAverage(notes: Nota[]) {
  const notas = notes.reduce((total, nota) => {
    return total + Number(nota.nota);
  }, 0);

  return (notas / notes.length).toFixed(1);
}
