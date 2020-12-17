const playYooSound = () => {
  const yoo = document.getElementById("yoo");
  yoo.play();
};

document.getElementById("button-open-list-card").onclick = function () {
  playYooSound();
  modalListCard.style.display = "block";
};

document.getElementById("cancelUseCard").onclick = function () {
  playYooSound();
  modalConfirmationSelectCard.style.display = "none";
};

const fight = (fighter, enemy) => {
  let restDefense;
  let enemyRestDefense;
  let result = "";
  let win = false;
  let lose = false;
  let draw = false;

  restDefense = fighter.deffense - enemy.attack;
  enemyRestDefense = enemy.deffense - fighter.attack;

  if (
    (restDefense < 0 && enemyRestDefense < 0) ||
    restDefense === enemyRestDefense
  ) {
    result = "Draw";
    draw = true;
  } else if (restDefense > 0 && enemyRestDefense < 0) {
    result = "You Win!!!";
    win = true;
  } else if (restDefense < 0 && enemyRestDefense > 0) {
    result = "You Lose!!!";
    lose = true;
  } else if (restDefense < enemyRestDefense) {
    result = "You Lose!!!, because your defense point less than enemy";
    lose = true;
  } else if (restDefense > enemyRestDefense) {
    result = "You Win!!!, because your defense point more than enemy";
    win = true;
  }

  return {
    enemy: enemy,
    fighter: fighter,
    result: result,
    restDefense: restDefense,
    enemyRestDefense: enemyRestDefense,
    win: win,
    lose: lose,
    draw: draw,
  };
};

const generateOurCards = () => {
  const container = document.getElementById("our-card-container");
  const div = document.createElement("div");

  const createImgElement = (data, index) => {
    let img = document.createElement("img");
    let attSrc = document.createAttribute("src");
    attSrc.value = `assets/img/${data.id}.jpeg`;
    img.setAttributeNode(attSrc);

    let attAlt = document.createAttribute("alt");
    attAlt.value = data.id;
    img.setAttributeNode(attAlt);

    let attClass = document.createAttribute("class");
    attClass.value = "card our-card";
    img.setAttributeNode(attClass);

    let attStyle = document.createAttribute("style");
    attStyle.value = "padding-right: 5px;";
    index !== ourCards.length - 1 && img.setAttributeNode(attStyle);

    let Id = document.createAttribute("id");
    Id.value = data.id;
    img.setAttributeNode(Id);

    img.addEventListener("click", () => {
      playYooSound();
      const selectedCardModal = document.getElementById("selected-card-modal");
      const attackPoint = document.getElementById(
        "selected-card-modal-attack-point"
      );
      const deffensePoint = document.getElementById(
        "selected-card-modal-deffense-point"
      );
      selectedCard = data;
      selectedCardModal.innerHTML = `<img src="assets/img/${data.id}.jpeg" alt="yugioh" class="card our-card" />`;
      attackPoint.innerHTML = data.attack;
      deffensePoint.innerHTML = data.deffense;
      document.getElementById("selected-card-modal-name").innerHTML = data.name;
      modalConfirmationSelectCard.style.display = "block";
    });

    div.appendChild(img);
  };

  ourCards.forEach((res, index) => {
    createImgElement(res, index);
  });
  container.replaceChild(div, container.childNodes[0]);
};

// ourCards
const shuffleCard = () => {
  for (let i = 0; i < 5; i++) {
    ourCards.push({
      ...listCard[Math.floor(Math.random() * listCard.length)],
      id_number: i,
    });
    enemyCards.push({
      ...listCard[Math.floor(Math.random() * listCard.length)],
      id_number: i,
    });
  }

  document.getElementById("our-card-container-null").remove();
  generateOurCards();
};

const btnStartGame = document.getElementById("button-start-game");

btnStartGame.onclick = function (event) {
  playYooSound();
  shuffleCard();
  btnStartGame.remove();
};

document.getElementById("button-show-result").onclick = () => {
  playYooSound();
  document.getElementById("modalFightLoading").style.display = "none";
  document.getElementById("modalFight").style.display = "block";
};

// Fight
document.getElementById("button-fight").onclick = () => {
  playYooSound();
  document.getElementById("modalFightLoading").style.display = "block";
  const dataRandom5 = Math.floor(Math.random() * enemyCards.length);
  console.log("data random enemy => ", dataRandom5);
  enemySelectedCard = enemyCards[dataRandom5];

  let letsFight = fight(selectedCard, enemySelectedCard);
  document.getElementById("modalConfirmationSelectCard").style.display = "none";
  document.getElementById("content-modal-fight").innerHTML = `
      <h2 class="result">Result</h2>
      <div class="flex-center-center">
        <img src="assets/img/${letsFight.fighter.id}.jpeg" alt="yugioh" class="card" />
          <div style="padding: 0px 25px;">
            <div>
              <p class="result-you"><i>You</i></p>
              <p class="result-p-text">attack point ⚔️ ${letsFight.fighter.attack}</p>
              <p class="result-p-text">deffense point 🛡 ${letsFight.fighter.deffense}</p>
              <p class="result-p-text">rest of deffense point 🩸 <span style="color: red;">${letsFight.restDefense}</span></p>
            </div>
              <p class="result-fight">${letsFight.result}</p>
            <div>
            <p class="result-comp"><i>Computer</i></p>
            <p class="result-p-text">attack point ⚔️ ${letsFight.enemy.attack}</p>
            <p class="result-p-text">deffense point 🛡 ${letsFight.enemy.deffense}</p>
            <p class="result-p-text">rest of deffense point 🩸 <span style="color: red;">${letsFight.enemyRestDefense}</span></p>
          </div>
        </div>
        <img src="assets/img/${letsFight.enemy.id}.jpeg" alt="yugioh" class="card" />
      </div>
      <div style="text-align: center;margin-top: 20px;">
        <button class="styled-button" id="close-modal-fight">Close</button>
      </div>
    `;

  const closeModalFight = document.getElementById("close-modal-fight");

  closeModalFight.onclick = () => {
    playYooSound();
    changeStatus(letsFight);
    restCard = restCard - 1;
    ourCards = ourCards.filter(
      (val) => val.id_number !== selectedCard.id_number
    );
    enemyCards = enemyCards.filter(
      (val) => val.id_number !== enemySelectedCard.id_number
    );

    if (restCard === 0 && status.my_status.win > status.enemy_status.lose) {
      alert("YOU WIN!!!");
      location.reload();
    } else if (
      restCard === 0 &&
      status.my_status.win < status.enemy_status.lose
    ) {
      alert("YOU LOSE!!!");
      location.reload();
    } else if (
      status.my_status.draw === status.enemy_status.draw &&
      status.my_status.win === 2 &&
      status.enemy_status.lose === 2 &&
      status.my_status.draw === 2 &&
      status.enemy_status.draw === 2
    ) {
      alert("YOU WIN!!!");
      location.reload();
    } else if (status.my_status.win >= 3 && status.enemy_status.lose <= 3) {
      alert("YOU WIN!!!");
      location.reload();
    } else if (status.my_status.win <= 3 && status.enemy_status.lose >= 3) {
      alert("YOU LOSE!!!");
      location.reload();
    } else if (status.my_status.win === 5 && status.enemy_status.lose < 5) {
      alert("YOU WIN!!!");
      location.reload();
    } else if (status.my_status.win < 5 && status.enemy_status.lose === 5) {
      alert("YOU LOSE!!!");
      location.reload();
    } else if (status.my_status.draw === 5 && status.enemy_status.draw === 5) {
      alert("DRAW!!!");
      location.reload();
    } else if (status.enemy_status.win <= 3 && status.my_status.lose >= 3) {
      alert("YOU LOSE!!!");
      location.reload();
    } else if (
      restCard === 0 &&
      status.my_status.draw === status.enemy_status.draw &&
      status.my_status.win < status.my_status.lose
    ) {
      alert("YOU LOSE!!!");
      location.reload();
    } else if (
      restCard === 0 &&
      status.my_status.draw === status.enemy_status.draw &&
      status.my_status.win > status.my_status.lose
    ) {
      alert("YOU WIN!!!");
      location.reload();
    } else if (
      restCard === 0 &&
      status.my_status.draw === status.enemy_status.draw
    ) {
      alert("DRAW!!!");
      location.reload();
    }

    document.getElementById("modalFight").style.display = "none";

    const enemyCardsContainer = document.getElementById("enemy-card-container");
    const enemyCard = document.getElementById(`enemy-card-${restCard}`);
    generateOurCards();
    enemyCardsContainer.removeChild(enemyCard);
  };
};

const changeStatus = (data) => {
  const myStatusWin = document.getElementById("my-status-win");
  const myStatusLose = document.getElementById("my-status-lose");
  const myStatusDraw = document.getElementById("my-status-draw");
  const enemyStatusWin = document.getElementById("enemy-status-win");
  const enemyStatusLose = document.getElementById("enemy-status-lose");
  const enemyStatusDraw = document.getElementById("enemy-status-draw");

  if (data.win) {
    status = {
      my_status: { ...status.my_status, win: status.my_status.win + 1 },
      enemy_status: {
        ...status.enemy_status,
        lose: status.enemy_status.lose + 1,
      },
    };
    myStatusWin.innerHTML = status.my_status.win;
    enemyStatusLose.innerHTML = status.enemy_status.lose;
  } else if (data.lose) {
    status = {
      ...status,
      my_status: { ...status.my_status, lose: status.my_status.lose + 1 },
      enemy_status: {
        ...status.enemy_status,
        win: status.enemy_status.win + 1,
      },
    };
    myStatusLose.innerHTML = status.my_status.lose;
    enemyStatusWin.innerHTML = status.enemy_status.win;
  } else if (data.draw) {
    status = {
      ...status,
      my_status: { ...status.my_status, draw: status.my_status.draw + 1 },
      enemy_status: {
        ...status.enemy_status,
        draw: status.enemy_status.draw + 1,
      },
    };
    myStatusDraw.innerHTML = status.my_status.draw;
    enemyStatusDraw.innerHTML = status.enemy_status.draw;
  }
};
const proxyurl = "https://cors-anywhere.herokuapp.com/";
const targetUrl = "https://kumparan.com/kumparannews/kami-kutuk-keras-penembakan-pengawal-rizieq-perbuatan-tidak-pancasilais-1ujqJdSFkeh/full"
fetch(
  proxyurl + targetUrl
)
  .then((res) => res.text())
  .then((html) => {
    var parser = new DOMParser();
    var doc = parser.parseFromString(html, "text/html");
    console.log("hasil fetch", doc);
    // Get the image file
    var img = doc.querySelector("img")[0]
    // const title = doc.getElementById("firstHeading")
    // console.log("nama => ", nama.innerHTML)
    console.log(img.src.replace('file://', "https://"));
  });
