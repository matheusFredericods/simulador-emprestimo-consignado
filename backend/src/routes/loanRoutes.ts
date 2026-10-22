import { Router } from "express";
import { simularEmprestimo } from "../service/loanService";
import type { LoanApplication } from "../types/loan";

const router = Router();

router.post("/simulate", async (req, res) => {
  const { name, email, cpf, salary, employerCnpj } = req.body ?? {};

  if (
    typeof name !== "string" ||
    !name.trim() ||
    typeof email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    typeof cpf !== "string" ||
    !/^\d{11}$/.test(cpf) ||
    typeof salary !== "number" ||
    !Number.isFinite(salary) ||
    salary <= 0 ||
    typeof employerCnpj !== "string" ||
    !/^\d{14}$/.test(employerCnpj)
  ) {
    res.status(400).json({
      message: "Dados inválidos. Confira os campos e tente novamente.",
    });
    return;
  }

  const application: LoanApplication = {
    name: name.trim(),
    email: email.trim(),
    cpf,
    salary,
    employerCnpj,
  };

  try {
    const result = await simularEmprestimo(application);
    res.status(200).json(result);
  } catch {
    res.status(500).json({
      message: "Não foi possível realizar a simulação.",
    });
  }
});

export default router;
