const produtos = { produtos: [] };  // Lista de produtos

const express = require('express');
const app = express();

app.use(express.json());  // Middleware para processar JSON no corpo da requisição

const server = app.listen(8080, () => {
  console.log("Servidor pronto na porta 8080");
});

// Rota principal...
app.get("/", (req, res) => {
  res.status(200).send("mensagem da rota principal");
});

// Lista de produtos enviada...
app.get("/produtos", (req, res) => {
  res.status(200).json(produtos);
});

// Produto adicionado...
app.post("/produtos", (req, res) => {
  const produto = { ...req.body, id: produtos.produtos.length + 1 };  // Gera um ID único
  produtos.produtos.push(produto);
  res.status(200).json({ msg: "Produto adicionado com sucesso!" });
});

// Modificando um produto...
app.put('/produtos/:id', (req, res) => {
  const { id } = req.params;  // Extrai o id dos parâmetros da rota
  const produtoEditado = req.body;  // Recebe o produto editado no corpo da requisição

  // Busca o produto na lista e o modifica
  const index = produtos.produtos.findIndex(produto => produto.id === parseInt(id));
  if (index !== -1) {
    produtos.produtos[index] = { ...produtos.produtos[index], ...produtoEditado };  // Atualiza o produto
    res.status(200).json({ msg: 'Produto modificado com sucesso!' });
  } else {
    res.status(404).json({ msg: 'Produto não encontrado!' });
  }
});

// Deletando um produto existente
app.delete("/produtos/:id", (req, res) => {
  const { id } = req.params;
  const index = produtos.produtos.findIndex(produto => produto.id === parseInt(id));
  if (index !== -1) {
    produtos.produtos.splice(index, 1);
    res.status(200).json({ msg: "Produto retirado com sucesso!" });
  } else {
    res.status(404).json({ msg: "Produto não pode ser encontrado!" });
  }
});

module.exports = server;