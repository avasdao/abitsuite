const BITBOX = require('bitbox-sdk').BITBOX
const bitbox = new BITBOX()
const bitcore = require('bitcore-lib-cash')
const Mnemonic = require('bitcore-mnemonic')
const util = require('util')

/* Set dust amount. */
const DUST_AMOUNT = 546

let mnemonic = require('./.mnemonic').seed

/* Set required number of signatures. */
const REQ_NUM_SIGS = 2

/* Set miner fee. */
const MINER_FEE = 2000

function bnToHex(bn) {
    var base = 16;
    var hex = BigInt(bn).toString(base);
    if (hex.length % 2) {
        hex = '0' + hex;
    }
    return hex;
}

/**
 * Mint (New) Tokens
 */
const mint = async (_tokenid, _privateKeys, _mintTo, _amountToMint, _isLive) => {
    const publicKeys = _privateKeys.map(bitcore.PublicKey)

    const address = new bitcore.Address(publicKeys, REQ_NUM_SIGS)
    console.log('\nMINT ADDRESS:', address.toString())

    /* Set txid. */
    // NOTE: UTXO location of Mint Baton
    const txId = '291feda829e43a1c17528bfb443a39bf539bf4b568a118b687ce8ea0c42df74b'

    /* Set input size. */
    const satoshis = DUST_AMOUNT

    const utxo = {
        txId,
        outputIndex: 2,
        address: address.toString(),
        script: new bitcore.Script(address).toHex(),
        satoshis,
    }
    console.log('\nUTXO', utxo)

    /* Set txid. */
    // NOTE: Contains BCH for mining fees.
    const txId2 = '291feda829e43a1c17528bfb443a39bf539bf4b568a118b687ce8ea0c42df74b'

    /* Set input size. */
    // FIXME: Pull the UTXO value dynamically
    const satoshis2 = 788249

    const utxo2 = {
        txId: txId2,
        outputIndex: 3,
        address: address.toString(),
        script: new bitcore.Script(address).toHex(),
        satoshis: satoshis2,
    }
    console.log('\nUTXO2', utxo2)

    // 2 MULTISIG-P2SH 2-of-3 inputs
    const inputs = {
        // 'MULTISIG-P2SH:2-3': 2,
        'MULTISIG-P2SH:8-12': 2,
        // 'MULTISIG-P2SH:15-21': 1,
    }

    // 1 P2PKH outputs
    const outputs = {
        P2PKH: 4,
    }

    const byteCount = bitbox.BitcoinCash.getByteCount(inputs, outputs)
    console.log('\nBYTE COUNT', byteCount)

    /* Calc (tx) send value. */
    // const sendValue = satoshis - DUST_AMOUNT - DUST_AMOUNT - parseInt(byteCount * 1.1)
    const sendValue = satoshis + satoshis2 - DUST_AMOUNT - DUST_AMOUNT - parseInt(byteCount * 1.1)

    // v5
    const buf1 = Buffer.from('6a04534c50000101', 'hex') // SLPv1
    const buf2 = Buffer.from('044d494e54', 'hex') // MINT
    const buf3 = Buffer.from('20' + _tokenid, 'hex')
    const buf4 = Buffer.from('0102', 'hex') // minting baton vout
    const buf5 = Buffer.alloc(9)
    buf5.writeUInt8(0x08) // length (8-bytes)
    buf5.writeBigUInt64BE(_amountToMint, 1)

    const arr = [ buf1, buf2, buf3, buf4, buf5 ]
    const buf = Buffer.concat(arr)

    const script = new bitcore.Script(buf)
    console.log('\nSCRIPT (decoded)', script.toString())

    const transaction = new bitcore.Transaction()
        .from(utxo, publicKeys, REQ_NUM_SIGS)
        .from(utxo2, publicKeys, REQ_NUM_SIGS) // NOTE: Used for mining fees (when necessary?)
        .addOutput(new bitcore.Transaction.Output({
            script: script,
            satoshis: 0
        }))
        .to(_mintTo, DUST_AMOUNT) // (token) receiver address
        .to(address.toString(), DUST_AMOUNT) // (baton) receiver address
        .to(address.toString(), sendValue) // (change) receiver address
        .sign([_privateKeys[0], _privateKeys[1]])

    console.log('\nTRANSACTION (isFullySigned)', transaction.isFullySigned())
    console.log('\nTRANSACTION (HEX)', transaction.toString())

    const decodeRawTransaction = await bitbox
        .RawTransactions.decodeRawTransaction(transaction.toString())
        .catch(err => console.error('DECODE ERROR:', err))
    console.log('\nDECODED', decodeRawTransaction)
    console.log('\nDECODED (OP_RETURN)', decodeRawTransaction.vout[0].scriptPubKey)

    if (_isLive) {
        /* Broadcast the transaction. */
        const sendRawTransaction = await bitbox
            .RawTransactions.sendRawTransaction(transaction.toString())
            .catch(err => console.error('TX SEND ERROR:', err))
        console.log('\nTX SEND', sendRawTransaction)
    }
}

/* Reset mnemonic. */
mnemonic = Mnemonic(mnemonic)
// console.log('\nMnemonic:', mnemonic.toString())

/* Initialize HD node. */
const hdNode = mnemonic.toHDPrivateKey()
// console.log('\nHDNODE:', hdNode)

/* Return (hardened) derivation path prefix. */
const pathPrefix = `m/44'/145'/0'/0/`

/* Initialize child node. */
const childNode0 = hdNode.deriveChild(pathPrefix + '0')
const childNode1 = hdNode.deriveChild(pathPrefix + '1')
const childNode2 = hdNode.deriveChild(pathPrefix + '2')

// FIXME: Split private keys onto 3 independent nodes/servers.
const privateKeys = [
    bitcore.PrivateKey(childNode0.privateKey),
    bitcore.PrivateKey(childNode1.privateKey),
    bitcore.PrivateKey(childNode2.privateKey),
]
const mappedKeys = privateKeys.map(bitcore.PublicKey)
// console.log('\nMAPPED KEYS', mappedKeys)

const address = new bitcore.Address(mappedKeys, REQ_NUM_SIGS)
console.log('\nTreasury address:', address.toString())

const tokenid = 'b9141c4adf5a55955d93c14977b7710f5e3903b8f2a760a29c2536efd4238697' // Pawnbroker Dollars
// const mintTo = 'bitcoincash:qr5cv5xee23wdy8nundht82v6637etlq3u6kzrjknk' // nyusternie@55155
const mintTo = 'bitcoincash:qpyxm8409svxsdufm30g7pxwcxu4cyprk5p5v6kamd' // Shomari's Bitcoin.com wallet
// const mintTo = 'simpleledger:qzlz5ymex5dsqm3g0ehlr5zprfaarddqxv0r5dtskv' // Shomari's Bitcoin.com wallet (NOTE: SLP address DOES NOT WORK)

// mint(tokenid, privateKeys, mintTo, 10 * 10**8, false)
mint(tokenid, privateKeys, mintTo, BigInt('5000000'), false)
