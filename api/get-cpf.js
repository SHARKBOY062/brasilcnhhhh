/* eslint-disable no-undef */

export default async function handler(req, res) {

  res.setHeader("Access-Control-Allow-Origin", "*");

  const { cpf } = req.query;

  if (!cpf) {
    return res.status(400).json({ error: "CPF não informado" });
  }

  const cleanCpf = String(cpf).replace(/\D/g, "");

  if (cleanCpf.length !== 11) {
    return res.status(400).json({ error: "CPF inválido" });
  }

  const userKey = process.env.APELA_USER_KEY || "";

  if (!userKey) {
    return res.status(500).json({
      error: "UserKey não configurada na Vercel"
    });
  }

  try {

    const response = await fetch(
      `https://apela-api.tech/?user=${userKey}&cpf=${cleanCpf}`
    );

    if (!response.ok) {
      return res.status(500).json({
        error: "Erro na API externa"
      });
    }

    const rawData = await response.json();

    const data = rawData.Result || rawData;

    const getValue = (obj, ...keys) => {
      for (const key of keys) {
        if (obj && obj[key]) return obj[key];
      }
      return "";
    };

    const normalized = {
      nome: getValue(data,
        "nome",
        "Nome",
        "nome_completo",
        "NomePessoaFisica"
      ),
      nascimento: getValue(data,
        "nascimento",
        "data_nascimento",
        "DataNascimento"
      ),
      mae: getValue(data,
        "mae",
        "nome_mae",
        "NomeMae"
      )
    };

    return res.status(200).json(normalized);

  } catch {
    return res.status(500).json({
      error: "Erro ao consultar API externa"
    });
  }
}