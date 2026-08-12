import { Frequencia } from "@/generated/prisma/client";

export function calculateStudentFrequencies(
  frequencias: Frequencia[],
  presenca: boolean,
) {
  const frequencies = frequencias.filter(
    (frequencia) => frequencia.presenca === presenca,
  );
  return frequencies.length;
}
