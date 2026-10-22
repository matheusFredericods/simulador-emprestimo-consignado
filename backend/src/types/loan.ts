export interface LoanApplication {
  name: string;
  email: string;
  cpf: string;
  salary: number;
  employerCnpj: string;
}

export type BankStatus = "approved" | "rejected" | "unavailable";

export interface BankResult {
  bankName: string;
  status: BankStatus;
  message: string;
  approvedAmount?: number;
  interestRate?: number;
}

export interface LoanSimulationResponse {
  simulationId: string;
  results: BankResult[];
}
