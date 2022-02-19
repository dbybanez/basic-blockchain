const SHA256 = require('crypto-js/sha256')

class Block {
  constructor(index, timestamp, data, previousHash = '') {
    this.index = index
    this.timestamp = timestamp
    this.data = data
    this.previousHash = previousHash
    this.hash = this.calculateHash()
    this.nonce = 0
  }

  calculateHash() {
    return SHA256(
      this.index +
      this.previousHash +
      this.timestamp +
      JSON.stringify(this.data) +
      this.nonce
    ).toString()
  }

  mineBlock(difficulty) {
    while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
      this.nonce++
      this.hash = this.calculateHash()
    }

    console.log('Block mined: ' + this.hash)
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
    // newBlock.hash = newBlock.calculateHash()
    this.chain.push(newBlock)
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i]
      const previousBlock = this.chain[i - 1]

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false
      }
    }
    return true
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

console.log ('Is blockchain valid? ' + coin.isChainValid())

coin.chain[1].data = { amount: 100 }
coin.chain[1].hash = coin.chain[1].calculateHash()

console.log ('Is blockchain valid? ' + coin.isChainValid())

// console.log(JSON.stringify(coin, null, 4))