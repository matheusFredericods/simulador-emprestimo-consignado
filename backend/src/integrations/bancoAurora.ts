import type { LoanApplication, BankResult } from "../types/loan";

export async function consultarBancoAurora(
  application: LoanApplication,
): Promise<BankResult> {
  await new Promise((resolve) => setTimeout(resolve, 800));

  if (application.salary < 2000) {
    return {
      bankName: "Banco Aurora",
      status: "rejected",
      message: "Renda abaixo do critério mínimo desta instituição.",
    };
  }

  return {
    bankName: "Banco Aurora",
    status: "approved",
    message: "Solicitação aprovada na simulação.",
    approvedAmount: Math.min(application.salary * 8, 20000),
    interestRate: 1.89,
  };
}
