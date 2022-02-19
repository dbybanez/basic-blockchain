const SHA256 = require('crypto-js/sha256')

class Block {
  constructor(index, timestamp, data, previousHash = '') {
    this.index = index
    this.timestamp = timestamp
    this.data = data
    this.previousHash = previousHash
    this.hash = this.calculateHash()
  }

  calculateHash() {
    return SHA256(
      this.index +
      this.previousHash +
      this.timestamp +
      JSON.stringify(this.data)
    ).toString()
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()]
  }

  createGenesisBlock() {
    return new Block(0, '2/19/2022', 'Genesis block', '0')
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1]
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash
    newBlock.hash = newBlock.calculateHash()
    this.chain.push(newBlock)
  }
}

var today = new Date();
// (today.getMonth()+1) + '/' + today.getDate() + '/' + today.getFullYear()

let coin = new Blockchain()
coin.addBlock(
  new Block(
    1, 
    '2/19/2022',
    { amount: 6 }
  )
)
coin.addBlock(
  new Block(
    2, 
    '2/21/2022',
    { amount: 24 }
  )
)

console.log(JSON.stringify(coin, null, 4))