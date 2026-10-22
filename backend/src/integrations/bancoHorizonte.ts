import type { LoanApplication, BankResult } from "../types/loan";

export async function consultarBancoHorizonte(
  application: LoanApplication,
): Promise<BankResult> {
  await new Promise((resolve) => setTimeout(resolve, 1200));

  if (application.salary < 3000) {
    return {
      bankName: "Banco Horizonte",
      status: "rejected",
      message: "Renda abaixo do critério mínimo desta instituição.",
    };
  }

  return {
    bankName: "Banco Horizonte",
    status: "approved",
    message: "Solicitação aprovada na simulação.",
    approvedAmount: Math.min(application.salary * 10, 30000),
    interestRate: 1.69,
  };
}
