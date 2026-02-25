import "./ArticleCTA.css";

export default function ArticleCTA({ onOpenModal }) {
  return (
    <section className="article-cta" aria-label="Inscrição e informações">
      <div className="container">
        <p className="intro">
          O processo para obter a primeira Carteira Nacional de Habilitação ficou mais simples com o
          novo Programa CNH do Brasil, site oficial do Ministério dos Transportes. Pelo celular, o
          cidadão pode abrir o requerimento, acompanhar todas as etapas, realizar o curso teórico
          gratuito e acessar a versão digital da habilitação. Confira, ponto a ponto, como funciona.
        </p>

        <div className="cta-center">
          <button className="cta-btn" type="button" onClick={onOpenModal}>
            Fazer Minha Inscrição Agora
          </button>
          <div className="cta-sub">Últimas vagas para 2026</div>
        </div>

        <h2 className="section-title">1. O que mudou com a nova resolução?</h2>

        <ul className="bullets">
          <li>
            <span className="bullet-dot" aria-hidden="true" />
            <span>
              <span className="lead">Fim da obrigatoriedade de autoescola:</span>{" "}
              Candidatos não precisam mais frequentar Centros de Formação de Condutores (CFCs)
            </span>
          </li>

          <li>
            <span className="bullet-dot" aria-hidden="true" />
            <span>
              <span className="lead">Curso teórico online e gratuito:</span> Disponível após realizar o cadastro.
            </span>
          </li>

          <li>
            <span className="bullet-dot" aria-hidden="true" />
            <span>
              <span className="lead">Carga horária prática reduzida:</span> De 20 horas obrigatórias para apenas 2 horas mínimas
            </span>
          </li>

          <li>
            <span className="bullet-dot" aria-hidden="true" />
            <span>
              <span className="lead">Aulas práticas flexíveis:</span> Podem ser realizadas com instrutor autônomo credenciado pelo Detran
            </span>
          </li>

          <li>
            <span className="bullet-dot" aria-hidden="true" />
            <span>
              <span className="lead">Redução de até 80% nos custos:</span> Processo que antes custava entre R$ 3.000 e R$ 5.000 agora pode sair praticamente de graça
            </span>
          </li>
        </ul>

        <div className="notice">
          <div className="notice-title">Últimas Vagas para 2026</div>
          <div className="notice-text">
            Devido à alta demanda, restam poucas vagas para obter a CNH gratuitamente e sem
            autoescola. Estas são as últimas vagas disponíveis para <strong>fevereiro de 2026</strong>.
            Caso não realize a inscrição com urgência, a próxima oportunidade será somente entre 2026
            e 2027. Quem não se cadastrar arcará com os custos integrais do processo de habilitação.
          </div>
        </div>
      </div>
    </section>
  );
}