class Player {
  constructor(deck, name) {
    this.name = name;
    this.slotCards = [];
    this.deck = deck;
    this.canMove = true;
    this.lost = false;
  }

  pushCardToSlot() {
    let card = this.deck.takeCard();
    this.slotCards.push(card);
  }

  get lastSlotCard() {
    return this.slotCards[this.slotCards.length - 1];
  }

  popAllSlot() {
    const slot = this.slotCards;
    this.slotCards = [];
    return slot;
  }

  getHTML() {
    const mainDiv = document.createElement('div');
    mainDiv.classList.add('player');

    const deck = document.createElement('div');
    deck.classList.add('deck');
    deck.innerText = `${this.deck.length}`;
    mainDiv.appendChild(deck);

    const slot = document.createElement('div');
    slot.classList.add('slot');
    for (const slotCard of this.slotCards) {
      console.log(this)
      console.log(this.slotCards)
      slot.appendChild(slotCard.getHTML())
    }
    mainDiv.appendChild(slot);


    this.selector = mainDiv;
    return mainDiv;
  }

  doesHaveCards() {
    return this.deck.length > 0;
  }
}