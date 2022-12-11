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

/**
 * Create (New) Tokens
 */
const create = async (_privateKeys, _ownerAddr, _isLive) => {
    const publicKeys = _privateKeys.map(bitcore.PublicKey)

    const address = new bitcore.Address(publicKeys, REQ_NUM_SIGS)

    /* Set txid. */
    // NOTE: Contains BCH for mining fees.
    const txId = '9503049d03d760b226defb254ac38143077d4fd446b8c79e21ebbe69bd6415da'

    /* Set input size. */
    const satoshis = 792700

    const utxo = {
        txId,
        outputIndex: 0,
        address: address.toString(),
        script: new bitcore.Script(address).toHex(),
        satoshis,
    }
    console.log('\nUTXO', utxo)

    /* Calc (tx) send value. */
    // const sendValue = satoshis - DUST_AMOUNT - DUST_AMOUNT - MINER_FEE
    const sendValue = satoshis - DUST_AMOUNT - MINER_FEE

    // v5
    const buf1 = Buffer.from('6a04534c50000101', 'hex') // SLPv1
    const buf2 = Buffer.from('0747454e45534953', 'hex') // GENESIS
    const buf3 = Buffer.from('0450574e44', 'hex') // PWND
    const buf4 = Buffer.from('125061776e62726f6b657220446f6c6c617273', 'hex') // Pawnbroker Dollars
    const buf5 = Buffer.from('0970776e642e63617368', 'hex') // pwnd.cash
    const buf6 = Buffer.from('4c00', 'hex') // OP_PUSHDATA1 (Document hash)
    const buf7 = Buffer.from('0108', 'hex') // 8 decimals
    const buf8 = Buffer.from('0102', 'hex') // minting baton vout
    // const buf8 = Buffer.from('4c00', 'hex') // OP_PUSHDATA1 (Minting baton)
    const buf9 = Buffer.from('080000000000000000', 'hex') // 0 initial tokens
    // const buf9 = Buffer.from('08000775F05A074000', 'hex') // 21M initial tokens

    const arr = [ buf1, buf2, buf3, buf4, buf5, buf6, buf7, buf8, buf9 ]
    const buf = Buffer.concat(arr)

    const script = new bitcore.Script(buf)
    console.log('\nSCRIPT (decoded)', script.toString())

    const transaction = new bitcore.Transaction()
        .from(utxo, publicKeys, REQ_NUM_SIGS)
        .addOutput(new bitcore.Transaction.Output({
            script: script,
            satoshis: 0
        }))
        .to(_ownerAddr, DUST_AMOUNT) // (token) receiver address
        .to(_ownerAddr, DUST_AMOUNT) // (baton) receiver address
        .to(_ownerAddr, sendValue) // (change) receiver address
        .sign([_privateKeys[0], _privateKeys[1]])

    console.log('\nTRANSACTION (isFullySigned)', transaction.isFullySigned())
    // console.log('\nTRANSACTION (RAW)', transaction)
    console.log('\nTRANSACTION (HEX)', transaction.toString())

    const decodeRawTransaction = await bitbox
        .RawTransactions.decodeRawTransaction(transaction.toString())
        .catch(err => console.error('DECODE ERROR:', err))
    console.log('\nDECODED', decodeRawTransaction)
    console.log('\nDECODED (OP_RETURN)', decodeRawTransaction.vout[0].scriptPubKey)

    /* Broadcast the transaction. */
    if (_isLive) {
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

create(privateKeys, address.toString(), false)
