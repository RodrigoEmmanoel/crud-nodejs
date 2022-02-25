document.addEventListener("DOMContentLoaded", () => {
  updatePosts();
});

function updatePosts() {
  fetch("http://localhost:3000/api/all")
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      let postElements = "";
      let posts = JSON.parse(json);

      posts.forEach((post) => {
        let postElement = `<tr class="linha" id="${post.id}">
                                    <th scope="row">${post.foto}</th>
                                    <td>${post.id}</td>
                                    <td>${post.apelido}</td>
                                    <td>${post.telefone}</td>
                                    <td>${post.endereco}</td>
                                    <td>${post.observacao}</td>
                                    <td>${post.genero}</td>
                                    <td>${post.cpf}</td>
                                    <td>${post.nome}</td>
                                    <td>123</td>
                                    <td>123</td>
                                    <td><a class="btn btn-danger" onclick='deletePost("${post.id}")'><img src="assets/styles/icons/lixeira.svg"></img></a></td>
                                    <td><button class="btn btn-primary"><img src="assets/styles/icons/editar.svg"></img></button></td>
                                </tr>
                                    `;

        postElements += postElement;
      });

      document.getElementById("posts").innerHTML = postElements;
    });
}

function newPost() {
  let foto = document.getElementById("foto").value;
  let apelido = document.getElementById("apelido").value;
  let telefone = document.getElementById("telefone").value;
  let genero = document.getElementById("genero").value;
  let cpf = document.getElementById("cpf").value;
  let nome = document.getElementById("nome").value;
  let endereco = document.getElementById("endereco").value;
  let observacao = document.getElementById("observacao").value;
  // let dataCriacao = document.getElementById("dataCriacao").value;
  // let dataAtt = document.getElementById("dataAtt").value;

  // let post = {foto, apelido,  telefone, genero, cpf, nome,  endereco, observacao, dataCriacao, dataAtt};
  let post = {
    foto,
    apelido,
    telefone,
    genero,
    cpf,
    nome,
    endereco,
    observacao,
  };

  const options = {
    method: "POST",
    headers: new Headers({ "content-type": "application/json" }),
    body: JSON.stringify(post),
  };

  fetch("http://localhost:3000/api/new", options).then((res) => {
    console.log(res);
    updatePosts();

    document.getElementById("endereco").value = "";
    observacao = document.getElementById("observacao").value = "";
    foto = document.getElementById("foto").value = "";
    apelido = document.getElementById("apelido").value = "";
    telefone = document.getElementById("telefone").value = "";
    genero = document.getElementById("genero").value = "";
    cpf = document.getElementById("cpf").value = "";
    nome = document.getElementById("nome").value = "";
    // dataCriacao = document.getElementById("dataCriacao").value = "";
    // dataAtt = document.getElementById("dataAtt").value = "";
  });
}

function deletePost(id) {
  let deletar = { id: id };

  const options = {
    method: "DELETE",
    headers: new Headers({ "content-type": "application/json" }),
    body: JSON.stringify(deletar),
  };

  fetch("http://localhost:3000/api/del", options).then((req) => {
    updatePosts();
  });
}
