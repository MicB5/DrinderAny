class Deck {
  constructor(cards = this._getFreshDeck()) {
    this.cards = cards
  }

  _getFreshDeck() {
    return SUITS.flatMap(suit => {
      return VALUES.map(value => {
        return new Card(suit, value)
      })
    })
  }

  get length() {
    return this.cards.length
  }

  takeCard() {
    return this.cards.shift()
  }

  pushCards(cards) {
    return this.cards.push(...cards)
  }

  shuffle() {
    for (let i = this.length - 1; i > 0; i--) {
      const newIndex = Math.floor(Math.random() * (i + 1))

      const tmp = this.cards[newIndex]
      this.cards[newIndex] = this.cards[i]
      this.cards[i] = tmp
    }
  }

  static getMaxCard(cards) {
    let max = {
      index: 0,
      card: {},
    }

    for (let i = 0; i < cards.length; i++) {
      if (cards[i].compareTo(max.card) > 0) {
        max = {
          index: i,
          card: cards[i]
        }
      }
    }
    return max;
  }
}