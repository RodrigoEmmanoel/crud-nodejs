const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const posts = require("../model/posts");

function getCurrentDate(){
  const today = new Date();

  const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' / '+today.getHours()+':'+today.getMinutes();

  return date;
}

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
  let dataCriacao = getCurrentDate();
  let dataAtt = getCurrentDate();

  posts.newPost(
    foto,
    apelido,
    telefone,
    genero,
    cpf,
    nome,
    endereco,
    observacao,
    dataCriacao,
    dataAtt
  );
  // posts.newPost(foto, apelido,  telefone, genero, cpf, nome, endereco, observacao, dataCriaco, dataAtt);

  res.send("Post adicionado!");
});

router.delete("/del", express.json(), (req, res) => {
  let id = req.body.id;

  posts.deletePost(id);

  res.send(`ID: ${id} deletado!`);
});

router.patch("/edit", express.json(), (req, res) => {

  console.log(res, "<--res")
  let payload = {
    id: req.body.id,
    foto: req.body.foto,
    apelido: req.body.apelido,
    telefone: req.body.telefone,
    endereco: req.body.endereco,
    observacao: req.body.observacao,
    genero: req.body.genero,
    cpf: req.body.cpf,
    nome: req.body.nome,
    dataCriacao: req.body.dataCriacao,
    dataAtt: getCurrentDate(),
  }

  posts.editPost(payload);

  res.send(`ID: ${payload.id} editado!`);
});

module.exports = router;
