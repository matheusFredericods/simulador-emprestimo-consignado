import { randomUUID } from "node:crypto";
import type { LoanApplication, LoanSimulationResponse } from "../types/loan";
import { consultarBancoAurora } from "../integrations/bancoAurora";
import { consultarBancoHorizonte } from "../integrations/bancoHorizonte";

export async function simularEmprestimo(
  application: LoanApplication,
): Promise<LoanSimulationResponse> {
  const results = await Promise.allSettled([
    consultarBancoAurora(application),
    consultarBancoHorizonte(application),
  ]);

  const bankResults = results.map((result, index) => {
    const bankName = index === 0 ? "Banco Aurora" : "Banco Horizonte";

    if (result.status === "fulfilled") {
      return result.value;
    }

    return {
      bankName,
      status: "unavailable" as const,
      message: "Não foi possível consultar esta instituição. Tente novamente.",
    };
  });

  return {
    simulationId: randomUUID(),
    results: bankResults,
  };
}
