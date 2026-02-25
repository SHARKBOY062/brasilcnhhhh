import "./NewsArticleTop.css";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiLink } from "react-icons/fi";

export default function NewsArticleTop() {
  return (
    <section className="news-top">
      <div className="container news-inner">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <span className="home" aria-hidden="true">🏠</span>

          <span className="sep" aria-hidden="true">{">"}</span>
          <a className="crumb" href="#">Assuntos</a>

          <span className="sep" aria-hidden="true">{">"}</span>
          <a className="crumb" href="#">Notícias</a>

          <span className="sep" aria-hidden="true">{">"}</span>
          <a className="crumb" href="#">CNH do Brasil</a>

          <span className="sep" aria-hidden="true">{">"}</span>
          <a className="crumb" href="#">2026</a>

          <span className="sep" aria-hidden="true">{">"}</span>
          <a className="crumb" href="#">02</a>
        </nav>

        <div className="portal">PORTAL DE SERVIÇOS SENATRAN</div>

        <h1 className="title">
          Nova regra já vale: CNH sem custo e sem autoescola está liberada no Brasil
        </h1>

        <div className="share-row">
          <span className="share-label">Compartilhe:</span>

          <a className="share-icon fb" href="#" aria-label="Compartilhar no Facebook">
            <FaFacebookF size={14} />
          </a>

          <a className="share-icon x" href="#" aria-label="Compartilhar no X">
            <FaXTwitter size={14} />
          </a>

          <a className="share-icon in" href="#" aria-label="Compartilhar no LinkedIn">
            <FaLinkedinIn size={14} />
          </a>

          <a className="share-icon link" href="#" aria-label="Copiar link">
            <FiLink size={16} />
          </a>
        </div>

        <div className="dates">
          <div className="date">Publicado em 02/02/2026 14h32</div>
          <div className="date">Atualizado em 11/02/2026 17h50</div>
        </div>
      </div>
    </section>
  );
}