var objJson = [];

const URL = `http://localhost:3000/doctors`;

function getDoctors() {
  fetch(URL)
    .then((resposta) => resposta.json())
    .then((data) => preencherDados(data))
    .catch((erro) => console.error(erro));
}

getDoctors();

function favoriteDoctor() {}

var listing_table = document.getElementById("tabela-lista-corpo");

listing_table.innerHTML = "";

function createButtonFavorite(favorite) {
  const buttonFav = document.createElement("button");
  let favoriteIcon = document.createElement("i");
  favoriteIcon.className = "far fa-star";
  buttonFav.innerHTML = favoriteIcon;
  document.body.appendChild(buttonFav);
}

function preencherDados(lista) {
  lista.forEach((element, index) => {
    let linha = document.createElement("tr");
    let itemDaLinhaId = document.createElement("td");
    itemDaLinhaId.innerText = element.id;
    let itemDaLinhaNome = document.createElement("td");
    itemDaLinhaNome.innerText = element.name;
    let itemDaLinhaCrm = document.createElement("td");
    itemDaLinhaCrm.innerHTML = element.crm;
    let itemDaLinhaSpeciality = document.createElement("td");
    itemDaLinhaSpeciality.innerHTML = element.specialty;
    let itemDaLinhaClinc = document.createElement("td");
    itemDaLinhaClinc.innerHTML = element.clinic;
    let itemDaLinhaPhone = document.createElement("td");
    itemDaLinhaPhone.innerHTML = element.phone;
    let itemDaLinhaFavorite = document.createElement("td");
    let itemDaLinhaDelete = document.createElement("td");

    const buttonFav = document.createElement("button");
    buttonFav.addEventListener("click", function () {
      fetch(`${URL}/${element.id}/favorite`, {
        method: "PATCH",
        body: JSON.stringify({ favorite: !element.favorite }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resposta) => {
          resposta.json();
        })
        .then((data) => window.location.reload())
        .catch((erro) => console.error(erro));
    });
    let favoriteIcon = document.createElement("i");
    favoriteIcon.className = element.favorite ? "fas fa-star" : "far fa-star";
    buttonFav.appendChild(favoriteIcon);
    itemDaLinhaFavorite.appendChild(buttonFav);

    const buttonDel = document.createElement("button");
    buttonDel.addEventListener("click", function () {
      fetch(`${URL}/${element.id}`, {
        method: "DELETE",
      })
        .then((resposta) => resposta.json())
        .then((data) => {
          var i = this.parentNode.parentNode.rowIndex;
          document.getElementById("tabela-lista").deleteRow(i);
        })
        .catch((erro) => console.error(erro));
    });

    let deleteIcon = document.createElement("i");
    deleteIcon.className = "far fa-trash-alt";
    buttonDel.appendChild(deleteIcon);
    itemDaLinhaDelete.appendChild(buttonDel);

    linha.appendChild(itemDaLinhaId);
    linha.appendChild(itemDaLinhaNome);
    linha.appendChild(itemDaLinhaCrm);
    linha.appendChild(itemDaLinhaSpeciality);
    linha.appendChild(itemDaLinhaClinc);
    linha.appendChild(itemDaLinhaPhone);
    linha.appendChild(itemDaLinhaFavorite);
    linha.appendChild(itemDaLinhaDelete);
    listing_table.appendChild(linha);
  });
}
