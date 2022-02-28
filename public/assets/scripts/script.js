document.addEventListener("DOMContentLoaded", () => {
  updatePosts();
});

$("#telefone-editar, #telefone").mask("(00) 00000-0000");
$('#cpf, #cpf-editar').mask('000.000.000.00');

function updatePosts() {
  fetch("http://localhost:3000/api/all")
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      let postElements = "";
      let posts = [];
      console.log(typeof json);
      if (typeof json === 'string') {
        posts = JSON.parse(json);
      } else {
        posts = json;
      }
      posts.forEach((post) => {
        let objectEdit = JSON.stringify(post);
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
                                    <td>${post.dataCriacao}</td>
                                    <td>${post.dataAtt}</td>
                                    <td><a class="btn btn-danger" onclick='deletePost("${post.id}")'><img src="assets/styles/icons/lixeira.svg"></img></a></td>
                                    <td><button class="btn btn-primary" onclick='editarModal(${objectEdit})'><img src="assets/styles/icons/editar.svg"></img></button></td>
                                </tr>
                                    `;
        // <td><button class="btn btn-primary editar-modal" onclick='editarModal(${objectEdit})'><img src="assets/styles/icons/editar.svg"></img></button></td>


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

  const validateEmpty = (
    apelido !== ""
    && telefone !== ""
    && genero !== ""
    && cpf !== ""
    && nome !== ""
    && endereco !== ""
    && observacao !== "");

  if (validateEmpty) {
    $(".validar-campo").removeClass("is-invalid");
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

    fetch("/api/new", options).then((res) => {
      updatePosts();

      document.getElementById("endereco").value = "";
      observacao = document.getElementById("observacao").value = "";
      foto = document.getElementById("foto").value = "";
      apelido = document.getElementById("apelido").value = "";
      telefone = document.getElementById("telefone").value = "";
      genero = document.getElementById("genero").value = "";
      cpf = document.getElementById("cpf").value = "";
      nome = document.getElementById("nome").value = "";
    });
  } else{
    $(".validar-campo").addClass("is-invalid");
  }
}

function deletePost(id) {
  let deletar = { id: id };

  const options = {
    method: "DELETE",
    headers: new Headers({ "content-type": "application/json" }),
    body: JSON.stringify(deletar),
  };

  fetch("/api/del", options).then((req) => {
    updatePosts();
  });
}

function editarPost() {
  let id = $("#id-editar").val();
  let dataCriacao = $("#data-editar").val();
  let apelido = $("#apelido-editar").val();
  let telefone = $("#telefone-editar").val();
  let genero = $("#genero-editar").val();
  let cpf = $("#cpf-editar").val();
  let endereco = $("#endereco-editar").val();
  let observacao = $("#observacao-editar").val();
  let nome = $("#nome-editar").val();
  let foto = $("#foto-editar").val();

  const validateEmpty = (
    apelido !== ""
    && telefone !== ""
    && genero !== ""
    && cpf !== ""
    && nome !== ""
    && endereco !== ""
    && observacao !== "");

  if (validateEmpty) {

    const params = {
      id,
      dataCriacao,
      apelido,
      telefone,
      genero,
      cpf,
      endereco,
      observacao,
      nome,
      foto
    }

    const options = {
      method: "PATCH",
      headers: new Headers({ "content-type": "application/json" }),
      body: JSON.stringify(params),
    };

    console.log(options)

    fetch('/api/edit', options).then((res) => {
      console.log('oioi')
      updatePosts();
    });

    $(".editar").addClass("d-none");
    $(".register").removeClass("d-none");
  }
};

function editarModal(params) {
  $(".register").addClass("d-none");
  $(".editar").removeClass("d-none");

  $("#id-editar").val(params.id);
  $("#data-editar").val(params.dataCriacao);
  $("#apelido-editar").val(params.apelido);
  $("#telefone-editar").val(params.telefone);
  $("#genero-editar").val(params.genero);
  $("#cpf-editar").val(params.cpf);
  $("#endereco-editar").val(params.endereco);
  $("#observacao-editar").val(params.observacao);
  $("#nome-editar").val(params.nome);
  $("#foto-editar").val(params.foto);
}