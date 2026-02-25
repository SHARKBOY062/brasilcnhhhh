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

  try {

    const response = await fetch(
      `https://apela-api.tech/?user=${userKey}&cpf=${cleanCpf}`
    );

    const data = await response.json();

    return res.status(200).json(data);

  } catch {

    return res.status(500).json({
      error: "Erro ao consultar API externa"
    });

  }
}