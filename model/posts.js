module.exports = {
  posts: [],

  getAll() {
    return this.posts;
  },
  newPost(
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
  ) {
    this.posts.push({
      foto,
      id: generateID(),
      apelido,
      telefone,
      genero,
      cpf,
      nome,
      endereco,
      observacao,
      dataCriacao,
      dataAtt,
    });
  },

  deletePost(id) {
    this.posts.forEach((element) => {
      let idArray = element.id;
      var index = idArray.indexOf();

      if (idArray === id) {
        this.posts.splice(index, 1);
      }
    });
  },

  editPost(payload) {
      let currentPostIndex = this.posts.findIndex((post) => {
        return post.id === payload.id
      })

      this.posts[currentPostIndex] = payload;
  }
};

function generateID() {
  return Math.random().toString(36).substring(2, 9);
}
