const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const posts = require("../model/posts");

router.get("/all", (req, res) => {
  res.json(JSON.stringify(posts.getAll()));
});

router.post("/new", bodyParser.json(), (req, res) => {
  let foto = req.body.foto;
  let apelido = req.body.apelido;
  let telefone = req.body.telefone;
  let endereco = req.body.endereco;
  let observacao = req.body.observacao;
  let genero = req.body.genero;
  let cpf = req.body.cpf;
  let nome = req.body.nome;
  // let dataCriacao = req.body.dataCriacao;
  // let dataAtt = req.body.dataAtt;

  posts.newPost(
    foto,
    apelido,
    telefone,
    genero,
    cpf,
    nome,
    endereco,
    observacao
  );
  // posts.newPost(foto, apelido,  telefone, genero, cpf, nome, endereco, observacao, dataCriaco, dataAtt);

  res.send("Post adicionado!");
});

router.delete("/del", express.json(), (req, res) => {
  let id = req.body.id;

  posts.deletePost(id);

  res.send(`ID: ${id} deletado!`);
});

module.exports = router;
