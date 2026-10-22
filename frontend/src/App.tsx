import { useState } from "react";
import "./App.css";

type BankResult = {
  bankName: string;
  status: "approved" | "rejected" | "unavailable";
  message: string;
  approvedAmount?: number;
  interestRate?: number;
};

type SimulationResponse = {
  simulationId: string;
  results: BankResult[];
};

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [salary, setSalary] = useState("");
  const [employerCnpj, setEmployerCnpj] = useState("");

  const [results, setResults] = useState<BankResult[]>([]);
  const [simulationId, setSimulationId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");
    setResults([]);
    setSimulationId("");

    try {
      const response = await fetch("http://localhost:3000/api/loans/simulate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          cpf,
          salary: Number(salary),
          employerCnpj,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Não foi possível realizar a simulação.",
        );
      }

      const simulation = data as SimulationResponse;
      setSimulationId(simulation.simulationId);
      setResults(simulation.results);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Erro inesperado ao realizar a simulação.",
      );
    } finally {
      setLoading(false);
    }
  }

  function formatCurrency(value: number) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  }

  return (
    <main className="app">
      <section className="loan-card">
        <span className="eyebrow">SIMULADOR DE CRÉDITO</span>

        <h1>Simule seu empréstimo consignado</h1>

        <p className="description">
          Preencha seus dados para consultar as condições disponíveis nas
          instituições participantes.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nome completo</label>
            <input
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Digite seu nome completo"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="voce@exemplo.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="cpf">CPF (11 números)</label>
            <input
              id="cpf"
              value={cpf}
              onChange={(event) => setCpf(event.target.value)}
              placeholder="12345678901"
              inputMode="numeric"
              maxLength={11}
              pattern="[0-9]{11}"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="salary">Salário mensal (R$)</label>
            <input
              id="salary"
              type="number"
              min="0.01"
              step="0.01"
              value={salary}
              onChange={(event) => setSalary(event.target.value)}
              placeholder="2500"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="employerCnpj">
              CNPJ do empregador (14 números)
            </label>
            <input
              id="employerCnpj"
              value={employerCnpj}
              onChange={(event) => setEmployerCnpj(event.target.value)}
              placeholder="12345678000199"
              inputMode="numeric"
              maxLength={14}
              pattern="[0-9]{14}"
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Consultando bancos..." : "Simular empréstimo"}
          </button>
        </form>

        {error && (
          <p className="error-message" role="alert">
            {error}
          </p>
        )}

        {results.length > 0 && (
          <section className="results" aria-live="polite">
            <h2>Resultado da simulação</h2>

            <p className="simulation-id">Protocolo: {simulationId}</p>

            {results.map((bank) => (
              <article className="bank-result" key={bank.bankName}>
                <h3>{bank.bankName}</h3>

                <p>
                  Status:{" "}
                  {bank.status === "approved"
                    ? "Aprovado"
                    : bank.status === "rejected"
                      ? "Rejeitado"
                      : "Indisponível"}
                </p>

                <p>{bank.message}</p>

                {bank.approvedAmount !== undefined && (
                  <p>Valor simulado: {formatCurrency(bank.approvedAmount)}</p>
                )}

                {bank.interestRate !== undefined && (
                  <p>Taxa informada: {bank.interestRate}%</p>
                )}
              </article>
            ))}
          </section>
        )}
      </section>
    </main>
  );
}

export default App;
