import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./StepName.css";

export default function StepName() {

  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  const [selected, setSelected] = useState(null);

  if (!data) return <div className="step-loading">Carregando...</div>;

  // Nome real vindo da API
  const realName = data.nome;

  // Outras opções falsas
  const options = [
    realName,
    "MARIA PEREIRA COSTA",
    "CIRO JOSE DE OLIVEIRA NETO",
    "ALICE SANTOS RIBEIRO"
  ].sort(() => Math.random() - 0.5);

  const handleConfirm = () => {

    if (!selected) return;

    navigate("/nascimento", {
      state: data
    });
  };

  return (
    <div className="gov-page">

      <div className="gov-header">
        <img src="/logo2.png" alt="Logo" />
      </div>

      <div className="gov-container">

        <h2 className="gov-title">
          Confirme seus dados para o cadastro no Programa CNH do Brasil
        </h2>

        <div className="gov-step">
          <div className="gov-step-number">1</div>
          <div className="gov-question">
            Qual é seu nome completo?
          </div>
        </div>

        <div className="gov-options">

          {options.map((name, index) => (
            <div
              key={index}
              className={`gov-option ${selected === name ? "active" : ""}`}
              onClick={() => setSelected(name)}
            >
              {name}
            </div>
          ))}

        </div>

        <button
          className="gov-button"
          disabled={!selected}
          onClick={handleConfirm}
        >
          Confirmar
        </button>

      </div>

    </div>
  );
}