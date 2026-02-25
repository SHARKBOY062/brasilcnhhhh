import "./Footer.css";
import { ChevronDown } from "lucide-react";

export default function Footer() {
  const items = [
    "ASSUNTOS",
    "ACESSO À INFORMAÇÃO",
    "COMPOSIÇÃO",
    "CANAIS DE ATENDIMENTO",
    "CENTRAL DE CONTEÚDOS",
    "SERVIÇOS",
  ];

  return (
    <footer className="gov-footer" aria-label="Rodapé">
      <div className="container gov-footer-inner">
        <div className="gov-footer-brand">
          <img src="/logo.png" alt="Logo" className="gov-footer-logo" />
        </div>

        <div className="gov-footer-list" role="list">
          {items.map((label) => (
            <button
              key={label}
              className="gov-footer-item"
              type="button"
              aria-label={label}
            >
              <span className="gov-footer-text">{label}</span>
              <ChevronDown size={18} strokeWidth={2} className="gov-footer-icon" />
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}