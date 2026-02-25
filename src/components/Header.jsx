import "./Header.css";
import { ChevronDown, Grid, Info, Search, User, Menu } from "lucide-react";

export default function Header() {
  return (
    <header className="gov-header">
      {/* ===== TOP BAR ===== */}
      <div className="gov-top">
        <div className="container gov-top-inner">
          <div className="gov-left">
            <img src="/logo.png" alt="Logo" className="gov-logo" />

            <button className="gov-icon-btn">
              <ChevronDown size={16} strokeWidth={2} />
            </button>

            <button className="gov-icon-btn">
              <Grid size={18} strokeWidth={2} />
            </button>

            <button className="gov-icon-btn">
              <Info size={18} strokeWidth={2} />
            </button>
          </div>

          <div className="gov-right">
            <button className="gov-login">
              <User size={16} strokeWidth={2} />
              <span>Entrar</span>
            </button>
          </div>
        </div>
      </div>

      {/* ===== BOTTOM BAR ===== */}
      <div className="gov-bottom">
        <div className="container gov-bottom-inner">
          <div className="gov-ministry-wrapper">
            <Menu size={18} strokeWidth={2} className="gov-menu-icon" />
            <span className="gov-ministry">
              Ministério dos Transportes
            </span>
          </div>

          <button className="gov-search-btn">
            <Search size={18} strokeWidth={2} />
          </button>
        </div>
      </div>
    </header>
  );
}