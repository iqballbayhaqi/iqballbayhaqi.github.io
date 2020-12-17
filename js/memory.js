let selectedCard = {};
let enemySelectedCard = {};
let ourCards = [];
let enemyCards = [];
let status = {
  my_status: {
    win: 0,
    lose: 0,
    draw: 0,
  },
  enemy_status: {
    win: 0,
    lose: 0,
    draw: 0,
  },
};
let restCard = 5;
let listCard = [
  { id: "default", name: "default", attack: 1000, deffense: 1000 },
];

const bumi_langit = [
  { id: "aquanus", name: "Aquanus", attack: 1000, deffense: 1000 },
  { id: "ghazul", name: "Ghazul", attack: 1000, deffense: 1000 },
  { id: "godam", name: "Godam", attack: 1000, deffense: 1000 },
  { id: "gundala", name: "Gundala", attack: 1000, deffense: 1000 },
  { id: "ki-wilawuk", name: "Ki Wilawuk", attack: 1000, deffense: 1000 },
  { id: "leak-hitam", name: "Leak Hitam", attack: 1000, deffense: 1000 },
  { id: "mandala", name: "Mandala", attack: 1000, deffense: 1000 },
  { id: "pengkor", name: "Pengkor", attack: 1000, deffense: 1000 },
  {
    id: "sibuta",
    name: "Si Buta Dari Gua Hantu",
    attack: 1000,
    deffense: 1000,
  },
  { id: "sri-asih", name: "Sri Asih", attack: 1000, deffense: 1000 },
  { id: "tira", name: "Tira", attack: 1000, deffense: 1000 },
  { id: "virgo", name: "Virgo", attack: 1000, deffense: 1000 },
  { id: "xrephus", name: "Xrephus", attack: 1000, deffense: 1000 },
];

const marvel = [
  { id: "raccoon", name: "Rocket Raccoon", attack: 1000, deffense: 1000 },
  { id: "vision", name: "Vision", attack: 1000, deffense: 1000 },
  { id: "hulk", name: "Hulk", attack: 1000, deffense: 1000 },
  { id: "black-widow", name: "Black Widow", attack: 1000, deffense: 1000 },
  { id: "drax", name: "Drax", attack: 1000, deffense: 1000 },
  { id: "gamora", name: "Gamora", attack: 1000, deffense: 1000 },
  { id: "star-lord", name: "Star Lord", attack: 1000, deffense: 1000 },
  { id: "groot", name: "Groot", attack: 1000, deffense: 1000 },
  { id: "loki", name: "Loki", attack: 1000, deffense: 1000 },
  { id: "mantis", name: "Mantis", attack: 1000, deffense: 1000 },
  { id: "black-phanter", name: "Black Phanter", attack: 1000, deffense: 1000 },
  { id: "hawkeye", name: "Hawkeye", attack: 1000, deffense: 1000 },
  { id: "iron-man", name: "Iron Man", attack: 1000, deffense: 1000 },
  {
    id: "captain-america",
    name: "Captain America",
    attack: 1000,
    deffense: 1000,
  },
  { id: "thor", name: "Thor", attack: 1000, deffense: 1000 },
  { id: "spider-man", name: "Spider-Man", attack: 1000, deffense: 1000 },
];

function renderListCard() {
  listCard
    .sort((a, b) => (a.name > b.name ? 1 : -1))
    .forEach((res) => {
      const tr = document.createElement("tr");
      var att = document.createAttribute("id");
      att.value = res.id;
      tr.setAttributeNode(att);
      document.getElementById("table-list-card").appendChild(tr);

      document.getElementById(
        res.id
      ).innerHTML = `
      <td>${res.name}</td>
      <td style="text-align: center">${res.attack}</td>
      <td style="text-align: center">${res.deffense}</td>
      `;
    });
}

const selectDeckCards = (theme) => {
  listCard = theme;
  for (let i = 0; i < listCard.length; i++) {
    listCard[i].attack = Math.ceil(Math.random() * 1000);
    listCard[i].deffense = Math.ceil(Math.random() * 1000);
  }
  renderListCard();
  document.getElementById("modal-select-cards-theme").style.display = "none";
  document.getElementById("backsound").play();
};
document.getElementById("bumi_langit").onclick = () => selectDeckCards(bumi_langit);
document.getElementById("marvel").onclick = () => selectDeckCards(marvel);
