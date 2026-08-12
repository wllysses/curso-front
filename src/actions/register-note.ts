"use server";

import { prisma } from "@/lib/prisma";

export async function registerNote({
  nota,
  dataAvaliacao,
  tipo,
  periodo,
  userId,
}: {
  nota: string;
  dataAvaliacao: string;
  tipo: string;
  periodo: string;
  userId: string;
}) {
  try {
    const note = await prisma.nota.create({
      data: {
        nota: parseFloat(nota),
        dataAvaliacao: new Date(`${dataAvaliacao}T00:00:00`),
        tipo,
        periodo,
        userId,
      },
    });

    return {
      success: true,
      data: note,
    };
  } catch (error) {
    console.error("ERRO AO CADASTRAR NOTA:", error);

    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}
