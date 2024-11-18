const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Configuração para processar dados do formulário
app.use(bodyParser.urlencoded({ extended: true }));

// Lista para armazenar empresas cadastradas
let empresas = [];

// Rota para exibir o formulário e a lista de empresas cadastradas
app.get("/", (req, res) => {
  let formHtml = `
    <h1>Cadastro de Empresas</h1>
    <form action="/cadastrar" method="POST">
      <label for="cnpj">CNPJ:</label>
      <input type="text" id="cnpj" name="cnpj" required><br><br>

      <label for="razaoSocial">Razão Social:</label>
      <input type="text" id="razaoSocial" name="razaoSocial" required><br><br>

      <label for="nomeFantasia">Nome Fantasia:</label>
      <input type="text" id="nomeFantasia" name="nomeFantasia" required><br><br>

      <label for="endereco">Endereço:</label>
      <input type="text" id="endereco" name="endereco" required><br><br>

      <label for="cidade">Cidade:</label>
      <input type="text" id="cidade" name="cidade" required><br><br>

      <label for="uf">UF:</label>
      <input type="text" id="uf" name="uf" maxlength="2" required><br><br>

      <label for="cep">CEP:</label>
      <input type="text" id="cep" name="cep" required><br><br>

      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required><br><br>

      <label for="telefone">Telefone:</label>
      <input type="text" id="telefone" name="telefone" required><br><br>

      <button type="submit">Cadastrar</button>
    </form>
  `;

  if (empresas.length > 0) {
    formHtml += `
      <h2>Empresas Cadastradas:</h2>
      <ul>
        ${empresas
          .map(
            (empresa) => `
          <li>
            <strong>CNPJ:</strong> ${empresa.cnpj}<br>
            <strong>Razão Social:</strong> ${empresa.razaoSocial}<br>
            <strong>Nome Fantasia:</strong> ${empresa.nomeFantasia}<br>
            <strong>Endereço:</strong> ${empresa.endereco}, ${empresa.cidade} - ${empresa.uf}, ${empresa.cep}<br>
            <strong>Email:</strong> ${empresa.email}<br>
            <strong>Telefone:</strong> ${empresa.telefone}<br><br>
          </li>
        `
          )
          .join("")}
      </ul>
    `;
  }

  res.send(formHtml);
});

// Rota para processar o formulário
app.post("/cadastrar", (req, res) => {
  const { cnpj, razaoSocial, nomeFantasia, endereco, cidade, uf, cep, email, telefone } = req.body;

  // Validação dos campos
  const erros = [];
  if (!cnpj) erros.push("CNPJ é obrigatório.");
  if (!razaoSocial) erros.push("Razão Social é obrigatória.");
  if (!nomeFantasia) erros.push("Nome Fantasia é obrigatório.");
  if (!endereco) erros.push("Endereço é obrigatório.");
  if (!cidade) erros.push("Cidade é obrigatória.");
  if (!uf || uf.length !== 2) erros.push("UF é obrigatório e deve ter 2 caracteres.");
  if (!cep) erros.push("CEP é obrigatório.");
  if (!email) erros.push("Email é obrigatório.");
  if (!telefone) erros.push("Telefone é obrigatório.");

  if (erros.length > 0) {
    // Retorna os erros ao usuário
    res.send(`
      <h1>Erros no Cadastro</h1>
      <ul>${erros.map((erro) => `<li>${erro}</li>`).join("")}</ul>
      <a href="/">Voltar ao formulário</a>
    `);
  } else {
    // Adiciona a empresa à lista
    empresas.push({ cnpj, razaoSocial, nomeFantasia, endereco, cidade, uf, cep, email, telefone });

    // Redireciona para a página inicial
    res.redirect("/");
  }
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
