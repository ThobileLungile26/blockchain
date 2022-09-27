const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(timestamp, data, previousHash = '') {
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.nonce = 0;
        this.hash = this.calculateHash();
        
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestampn + JSON.stringify(this.data) + this.nonce).toString();
       
    }

    
//# of our block begin with the certain amount of Zeros
mineBlock(difficulty) {
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
        this.nonce++;
        this.hash = this.calculateHash();
    }
    console.log("Block mined, nonce: " + this.nonce + ", hash: " + this.hash);
}
}

class Blockchain {
    constructor(){
        this.chain = [this.createGenesisBlock()];  //array of blocks array contains genesis block
        this.difficulty = 4;
    }

    createGenesisBlock(){
        return new Block(0, "19/09/2022", "Genesis Block", "0")
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];

    }

    addBlock(newBlock){ //adds a new block onto the chain but puts in some methods before pushes it onto the array.
        newBlock.previousHash = this.getLatestBlock().hash      //set the previoushash proparty set to the last block of the chain.
        newBlock.mineBlock(this.difficulty);                      //recalculate the hash of the new block that is changed.  
        this.chain.push(newBlock);
    }

    isChainValid(){
        for(let i = 1; i<this.chain.length; i++) {  //do not start looping on block 0 coz it is our genesis
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];   // going back by 1  
            //check if the blocks are properly linked together hash of the block is still valid
            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }
            // check id block points to the correct previous block
            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }  
    return true;
    }
}



let hawkEye = new Blockchain();
console.log("Mining block 1...");
hawkEye.addBlock(new Block(1, "19/09/2022", { amount: 4}));

console.log("Mining block 2...");
hawkEye.addBlock(new Block(1, "20/09/2022", { amount: 10}));




console.log(JSON.stringify(hawkEye, null, 4));