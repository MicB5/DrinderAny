class Board {
  constructor(playersCount) {
    this.players = [];
    this.selector = document.querySelector('.board');
    this.initBoard(playersCount);
    this.isRound = false;
  }

  initBoard(playersCount) {
    const mainDeck = new Deck();
    if (mainDeck.length % playersCount !== 0) throw Error('Error');

    mainDeck.shuffle();

    const cardsAmountPerPlayer = mainDeck.length / playersCount;
    let startIndex = 0;
    let endIndex = cardsAmountPerPlayer;

    for (let i = 0; i < playersCount; i++) {
      const playerDeck = new Deck(mainDeck.cards.slice(startIndex, endIndex));
      const newPlayer = new Player(playerDeck, i);
      this.players.push(newPlayer);

      startIndex += cardsAmountPerPlayer;
      endIndex += cardsAmountPerPlayer;
    }
    this.render();
  }

  click() {
    if(this.isRound){
      this.judgeRound();
    } else {
      this.round();
    }
    console.log(this)
  }

  render() {
    this.selector.innerHTML = '';
    for (const player of this.players) {
      this.selector.appendChild(player.getHTML());
    }
  }

  round() {
    this.isRound = true;
    for (const player of this.players) {
      if (player.canMove && !player.lost){
        player.pushCardToSlot();
      }
    }
    this.render();
  }


  judgeRound() {
    const slotCards = [];
    for (const player of this.players) {
      slotCards.push(player.lastSlotCard)
    }
    const max = Deck.getMaxCard(slotCards);
    const maxCards = slotCards.filter((x) => x.value === max.card.value)

    //console.log(maxCards)
    if(maxCards.length >= 2) {
      console.log('aa')
      const indexes = []
      for (const card of maxCards) {
        indexes.push(slotCards.indexOf(card));
      }
      for (const player of this.players) {
        player.canMove = false;
      }
      for (const index of indexes) {
        this.players[index].canMove = true;
      }
      this.round();
    } else {
      const winnerPlayer = this.players[max.index]
      for (const player of this.players) {
        player.canMove = true;
        const playerSlot = player.popAllSlot();
        winnerPlayer.deck.pushCards(playerSlot)
      }
    }
    this.haveLost();
    this.isRound = false;
    this.render();
  }

  haveLost() {
    for (const player of this.players) {
      if(!player.doesHaveCards()){
        player.lost = true;
      }
    }
  }


}


