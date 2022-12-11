const BITBOX = require('bitbox-sdk').BITBOX
const bitbox = new BITBOX()
const bitcore = require('bitcore-lib-cash')
const Mnemonic = require('bitcore-mnemonic')
const util = require('util')

/* Set dust amount. */
const DUST_AMOUNT = 546

let mnemonic = ''

/* Set required number of signatures. */
const REQ_NUM_SIGS = 2

/* Set miner fee. */
const MINER_FEE = 2000

/**
 * Send Token
 */
const send = async (_shouldBroadcast) => {
    /* Set txid. */
    // NOTE: Contains the SLP tokens.
    const txId = '53b1a445aafcd07a38c31ad7ee4218b6e567628c675a8116e2d7c08b57d0cc67'

    /* Set input size. */
    const satoshis = 546

    const utxo = {
        txId,
        outputIndex: 1,
        address: address.toString(),
        script: new bitcore.Script(address).toHex(),
        satoshis,
    }
    console.log('\nUTXO', utxo)

    /* Set txid. */
    // NOTE: Contains BCH for mining fees.
    const txId2 = '53b1a445aafcd07a38c31ad7ee4218b6e567628c675a8116e2d7c08b57d0cc67'

    /* Set input size. */
    const satoshis2 = 1331908

    const utxo2 = {
        txId: txId2,
        outputIndex: 2,
        address: address.toString(),
        script: new bitcore.Script(address).toHex(),
        satoshis: satoshis2,
    }
    console.log('\nUTXO2', utxo2)

    // 2 MULTISIG-P2SH 2-of-3 inputs
    // const inputs = {
    //     'MULTISIG-P2SH:2-3': 2,
    //     // 'MULTISIG-P2SH:8-12': 1,
    //     // 'MULTISIG-P2SH:15-21': 1,
    // }

    // 1 P2PKH outputs
    // const outputs = {
    //     P2PKH: 4,
    //     // 'P2SH': 100,
    // }

    // const byteCount = bitbox.BitcoinCash.getByteCount(inputs, outputs)
    // console.log('\nBYTE COUNT', byteCount)

    // return

    /* Set send address. */
    const sendTo = 'bitcoincash:qqxtz0fw3gs5ndmwjm2we92k20zu3z99uusag3pa5w' // Bitcoin Please (SLP)

    /* Calc (tx) send value. */
    // const sendValue = satoshis - DUST_AMOUNT - parseInt(byteCount * 1.1)
    // const sendValue = satoshis + satoshis2 - DUST_AMOUNT - parseInt(byteCount * 1.1)
    const sendValue = satoshis + satoshis2 - DUST_AMOUNT - MINER_FEE
    console.log('\nSend value:', sendValue)

    // v5
    const buf1 = Buffer.from('6a04534c50000101', 'hex') // SLPv1
    const buf2 = Buffer.from('0453454e44', 'hex') // SEND
    const buf3 = Buffer.from(`20${tokenid}`, 'hex')
    const buf4 = Buffer.from('0800005AF3107A4000', 'hex') // Transfer amount (1M)
    const buf5 = Buffer.from('0800071AFD498D0000', 'hex') // Change amount (20M)

    const arr = [ buf1, buf2, buf3, buf4, buf5 ]
    const buf = Buffer.concat(arr)

    const script = new bitcore.Script(buf)
    console.log('\nSCRIPT (raw)', script)
    console.log('\nSCRIPT (decoded)', script.toString())

    /* Set public keys. */
    const publicKeys = [
        privateKeys[0].publicKey.toString(),
        privateKeys[1].publicKey.toString(),
        privateKeys[2].publicKey.toString(),
    ]

    const transaction = new bitcore.Transaction()
        .from(utxo, publicKeys, REQ_NUM_SIGS)
        .from(utxo2, publicKeys, REQ_NUM_SIGS) // NOTE: Used for mining fees (when necessary?)
        .addOutput(new bitcore.Transaction.Output({
            script,
            satoshis: 0,
        }))
        .to(sendTo, DUST_AMOUNT) // (token) receiver address
        .to(address.toString(), sendValue) // (change) receiver address
        .sign([privateKeys[0], privateKeys[1]])

    console.log('\nTRANSACTION (isFullySigned)', transaction.isFullySigned())
    // console.log('\nTRANSACTION (RAW)', transaction)
    console.log('\nTRANSACTION (HEX)', transaction.toString())

    const decodeRawTransaction = await bitbox
        .RawTransactions.decodeRawTransaction(transaction.toString())
        .catch(err => console.error('DECODE ERROR:', err))
    // console.log('\nDECODED', decodeRawTransaction)
    console.log('\nDECODED', util.inspect(decodeRawTransaction, false, null, true /* enable colors */))
    console.log('\nDECODED (OP_RETURN)', decodeRawTransaction.vout[0].scriptPubKey)

    /* Broadcast the transaction. */
    if (_shouldBroadcast) {
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
console.log('\nNito Cloud Treasury (address):', address.toString())

const tokenid = '53b1a445aafcd07a38c31ad7ee4218b6e567628c675a8116e2d7c08b57d0cc67' // NITO

send(false)
