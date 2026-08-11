"use server";

import { prisma } from "@/lib/prisma";

export async function registerFrequency({
  date,
  cargaHoraria,
  presenca,
  userId,
}: {
  date: string;
  cargaHoraria: number;
  presenca: boolean;
  userId: string;
}) {
  try {
    const frequency = await prisma.frequencia.create({
      data: {
        data: new Date(`${date}T00:00:00`),
        cargaHoraria,
        presenca,
        userId,
      },
    });

    return {
      success: true,
      data: frequency,
    };
  } catch (error) {
    console.error("ERRO AO CADASTRAR FREQUÊNCIA:", error);

    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}
