import { useLocation } from "react-router-dom";

export default function StepMother(){

  const location = useLocation();

  const data = location.state;

  if(!data) return <div>Carregando...</div>

  return(

    <div>

      <h2>Qual o nome da sua mãe?</h2>

      <div>
        {data.mae}
      </div>

    </div>

  )

}