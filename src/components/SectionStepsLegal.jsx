import "./SectionStepsLegal.css";

export default function SectionStepsLegal({ onOpenModal }) {
  return (
    <section className="steps-legal" aria-label="Inscrição e base legal">
      <div className="container">
        <h2 className="h2">2. Como se inscrever no programa?</h2>

        <p className="p">O processo de inscrição é simples e pode ser feito totalmente online:</p>

        <ol className="steps">
          <li>
            <span className="n">1.</span>
            <span>Clique no botão abaixo para iniciar seu cadastro</span>
          </li>
          <li>
            <span className="n">2.</span>
            <span>Informe seu CPF para verificar elegibilidade</span>
          </li>
          <li>
            <span className="n">3.</span>
            <span>Confirme seus dados pessoais</span>
          </li>
          <li>
            <span className="n">4.</span>
            <span>Sua Carteira de Motorista será emitida em até 2 dias</span>
          </li>
        </ol>

        <div className="cta-wrap">
          <button className="cta-btn" type="button" onClick={onOpenModal}>
            Fazer Minha Inscrição Agora
          </button>
          <div className="cta-sub">Últimas vagas para 2026</div>
        </div>

        <h2 className="h2 h2-gap">3. Base Legal</h2>

        <ul className="legal">
          <li>
            <span className="dot" aria-hidden="true" />
            <span>Resolução Contran nº 985/2025</span>
          </li>
          <li>
            <span className="dot" aria-hidden="true" />
            <span>Lei nº 14.071/2020 (Nova Lei de Trânsito)</span>
          </li>
          <li>
            <span className="dot" aria-hidden="true" />
            <span>Decreto nº 11.999/2025 (Programa CNH do Brasil)</span>
          </li>
        </ul>
      </div>
    </section>
  );
}