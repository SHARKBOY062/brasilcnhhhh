import { useLocation, useNavigate } from "react-router-dom";

export default function StepBirth(){

  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state;

  if(!data) return <div>Carregando...</div>

  return(

    <div>

      <h2>Qual sua data de nascimento?</h2>

      <div onClick={()=>navigate("/mae",{state:data})}>
        {data.nascimento}
      </div>

    </div>

  )

}