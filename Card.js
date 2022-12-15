const SUITS = ['♠', '♣', '♥', '♦']
const VALUES = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
// const VALUES = ['2', '3', '4']

class Card {
  constructor(suit, value) {
    this.suit = suit
    this.value = value
  }

  get color() {
    return (this.suit === '♥' || this.suit === '♦') ? 'red' : 'black'
  }

  getHTML() {
    const cardElem = document.createElement('div')
    cardElem.innerText = `${this.value} ${this.suit}`
    cardElem.classList.add('card', this.color)
    return cardElem
  }

  compareTo(otherCard) {
    const cardInd = VALUES.indexOf(this.value)
    const otherCardInd = VALUES.indexOf(otherCard.value)

    // if ((cardInd === 0 && otherCardInd === 12) || (cardInd === 12 && otherCardInd === 0)) {
    //   return otherCardInd - cardInd
    // }

    return cardInd - otherCardInd
  }
}