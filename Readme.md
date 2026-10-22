# Simulador de Empréstimo Consignado

MVP desenvolvido como desafio técnico para estágio em desenvolvimento na Octafin. A aplicação permite simular uma solicitação de empréstimo consignado e consultar os resultados de duas instituições financeiras fictícias.

## Tecnologias

- **Frontend:** React, TypeScript, Vite e CSS.
- **Backend:** Node.js, Express e TypeScript.
- **Ferramentas:** Git e GitHub.

## Funcionalidades implementadas

- Formulário para nome, e-mail, CPF, salário e CNPJ do empregador.
- Validação dos dados de entrada no backend.
- Simulação assíncrona de consultas a dois bancos fictícios.
- Consolidação dos resultados individuais de cada instituição.
- Tratamento de falhas individuais, permitindo que uma instituição fique indisponível sem impedir o resultado da outra.
- Exibição do status, valor simulado, taxa e protocolo da simulação.
- Mensagens de erro para dados inválidos e falhas no processamento.

## Arquitetura e decisões técnicas

O projeto é dividido em frontend e backend, com responsabilidades separadas.

- **Routes:** recebe requisições e valida os dados.
- **Service:** coordena as consultas e consolida os resultados.
- **Integrations:** implementa as regras fictícias de cada banco.
- **Types:** define os contratos de dados.
- **Server:** configura o Express e as rotas da API.

O TypeScript ajuda a manter a consistência dos dados. O `Promise.allSettled` permite processar os resultados mesmo quando uma das consultas falha.

## Como executar

**Pré-requisito:** Node.js e npm instalados.

### Backend

```bash
cd backend
npm install
npm run dev
```

API: `http://localhost:3000`

Verificação de disponibilidade: `http://localhost:3000/health`

### Frontend

Em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

Acesse o endereço informado pelo Vite, normalmente `http://localhost:5173`.

## Melhorias e propostas

As propostas estão divididas entre o que já foi implementado e o que seria priorizado em uma próxima semana de desenvolvimento.

### Implementadas

**1. Tratamento de falhas parciais**

- **Problema:** uma instituição pode falhar durante a consulta.
- **Proposta:** utilizar `Promise.allSettled` para consolidar os resultados individualmente.
- **Por quê:** o cliente ainda recebe o resultado da instituição que respondeu, sem depender do sucesso de todas as consultas.

**2. Validação dos dados**

- **Problema:** dados ausentes ou em formatos incorretos podem comprometer a simulação.
- **Proposta:** validar os campos no backend, incluindo formato do e-mail, quantidade de dígitos do CPF e CNPJ e salário positivo.
- **Por quê:** reduz solicitações inválidas e melhora a consistência dos dados. A validação atual não confirma os dígitos verificadores dos documentos.

### Planejadas — ordem de prioridade

**1. Testes automatizados**

- **Problema:** testes manuais não garantem que os principais cenários continuem funcionando após alterações.
- **Proposta:** criar testes unitários para as regras dos bancos e testes de integração para a API.
- **Por quê:** detectar regressões e aumentar a confiabilidade da aplicação.

**2. Resiliência das integrações**

- **Problema:** serviços externos podem demorar a responder ou ficar indisponíveis.
- **Proposta:** implementar timeouts, logs e políticas de repetição controlada quando apropriadas.
- **Por quê:** melhorar o diagnóstico de falhas e a estabilidade do serviço.

**3. Histórico e proteção de dados**

- **Problema:** os resultados não são persistidos e não existe histórico das simulações.
- **Proposta:** adicionar persistência em banco de dados e definir controles de acesso, retenção e proteção de dados pessoais.
- **Por quê:** permitir rastreabilidade e preparar o serviço para uma operação real com mais segurança.

## Limitações

- Os bancos, critérios de aprovação, taxas e valores são fictícios.
- Não existem integrações bancárias reais nem banco de dados.
- CPF e CNPJ são validados quanto ao formato e à quantidade de dígitos, sem validação dos dígitos verificadores.
- Não foram implementados testes automatizados.
- A aplicação utiliza endereços locais para execução durante o desenvolvimento.

## Verificações realizadas

- Simulação com renda de R$ 2.500, com resultados diferentes entre as instituições.
- Simulação com renda de R$ 1.500, com rejeição pelas duas instituições.
- Bloqueio de CPF incompleto.
- Build do backend e do frontend executados sem erros.

