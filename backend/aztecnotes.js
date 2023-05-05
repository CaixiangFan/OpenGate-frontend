//run 'yarn add aztec.js'
const { JoinSplitProof, note } = require('aztec.js');
const secp256k1 = require('@aztec/secp256k1');

// dummy address of confidential AZTEC - DAI smart contract
const validatorAddress = '0x76581320dCdFFC93E2FFFF7DADfE668Ba55796a9';

const accounts = [secp256k1.generateAccount(), secp256k1.generateAccount()];

const inputNotes = [await note.create(accounts[0].publicKey, 80), await note.create(accounts[0].publicKey, 60)];

const outputNotes = [await note.create(accounts[1].publicKey, 50), await note.create(accounts[1].publicKey, 100)];

const publicValue = -10; // input notes contain 10 fewer than output notes = deposit of 10 public tokens
const sender = accounts[0].address; // address of transaction sender
const publicOwner = accounts[0].address; // address of public token owner

const proof = new JoinSplitProof(inputNotes, outputNotes, sender, publicValue, publicOwner);

// data can be directly fed into an ZkAsset.sol contract's confidentialTransfer method
const data = proof.encodeABI(validatorAddress);

console.log('data', data);