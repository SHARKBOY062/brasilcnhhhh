import { useLocation, useNavigate } from "react-router-dom";

export default function StepName(){

  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state;

  if(!data) return <div>Carregando...</div>

  return(

    <div>

      <h2>Qual é seu nome completo?</h2>

      <div onClick={()=>navigate("/nascimento",{state:data})}>
        {data.nome}
      </div>

    </div>

  )

}