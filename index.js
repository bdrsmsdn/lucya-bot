const { create, Client } = require('@open-wa/wa-automate')
const welcome = require('./lib/welcome')
const left = require('./lib/left')
const cron = require('node-cron')
const color = require('./lib/color')
const fs = require('fs-extra')
    // const msgHndlr = require ('./msgHndlr')
const figlet = require('figlet')
const options = require('./options')
    //const fs = require('fs-extra')
const {
    prefix
} = JSON.parse(fs.readFileSync('./lib/setting.json'))


// AUTO UPDATE BY NURUTOMO
// THX FOR NURUTOMO
// Cache handler and check for file change
require('./msgHndlr.js')
nocache('./msgHndlr.js', module => console.log(`${module} Updated!`))

const adminNumber = JSON.parse(fs.readFileSync('./lib/admin.json'))
const setting = JSON.parse(fs.readFileSync('./lib/setting.json'))
const isWhite = (chatId) => adminNumber.includes(chatId) ? true : false

let {
    limitCount,
    memberLimit,
    groupLimit,
    mtc: mtcState,
    banChats,
    restartState: isRestart
} = setting

function restartAwal(aksa) {
    setting.restartState = false
    isRestart = false
    aksa.sendText(setting.restartId, 'Restart Succesfull!')
    setting.restartId = 'undefined'
    fs.writeFileSync('./lib/setting.json', JSON.stringify(setting, null, 2));
}

const start = async(aksa = new Client()) => {
    console.log('------------------------------------------------')
    console.log(color(figlet.textSync('LUCYA BOT', { horizontalLayout: 'full' })))
    console.log('------------------------------------------------')
    console.log('[DEV] AKSARA')
    console.log('[SERVER] LUCYAV2 IS ONLINE!')
        //aksa.onAnyMessage((fn) => messageLog(fn.fromMe, fn.type))
        // Force it to keep the current session
    aksa.onStateChanged((state) => {
            console.log('[Client State]', state)
            if (state === 'CONFLICT' || state === 'UNLAUNCHED') aksa.forceRefocus()
        })
        // listening on message
    aksa.onAnyMessage((async(message) => {

        aksa.getAmountOfLoadedMessages() // Cut message Cache if cache more than 3K
            .then((msg) => {
                if (msg >= 1000) {
                    console.log('[CLIENT]', color(`Loaded Message Reach ${msg}, cuting message cache...`, 'yellow'))
                    aksa.cutMsgCache()
                }
            })
            // msgHndlr(aksa, message)
            // Message Handler (Loaded from recent cache)
        require('./msgHndlr.js')(aksa, message)
    }))


    aksa.onGlobalParicipantsChanged((async(heuh) => {
        await welcome(aksa, heuh)
        left(aksa, heuh)
    }))

    aksa.onAddedToGroup(async(chat) => {
        if (isWhite(chat.id)) return aksa.sendText(chat.id, `Halo aku LUCYA, Ketik ${prefix}help Untuk Melihat List Command Ku...`)
        if (mtcState === false) {
            const groups = await aksa.getAllGroups()
                // BOT group count less than
            if (groups.length > groupLimit) {
                await aksa.sendText(chat.id, 'Maaf, Batas group yang dapat LUCYA tampung sudah penuh').then(async() => {
                    aksa.deleteChat(chat.id)
                    aksa.leaveGroup(chat.id)
                })
            } else {
                if (chat.groupMetadata.participants.length < memberLimit) {
                    await aksa.sendText(chat.id, `Maaf, BOT keluar jika member group tidak melebihi ${memberLimit} orang`).then(async() => {
                        aksa.deleteChat(chat.id)
                        aksa.leaveGroup(chat.id)
                    })
                } else {
                    if (!chat.isReadOnly) aksa.sendText(chat.id, `Halo aku LUCYA, Ketik ${prefix}help Untuk Melihat List Command Ku...`)
                }
            }
        } else {
            await aksa.sendText(chat.id, 'LUCYA sedang maintenance, coba lain hari').then(async() => {
                aksa.deleteChat(chat.id)
                aksa.leaveGroup(chat.id)
            })
        }
    })

    /*aksa.onAck((x => {
        const { from, to, ack } = x
        if (x !== 3) aksa.sendSeen(to)
    }))*/

    // listening on Incoming Call
    aksa.onIncomingCall((async(call) => {
        await aksa.sendText(call.peerJid, 'Maaf, saya tidak bisa menerima panggilan. nelpon = block!.\nJika ingin membuka block harap chat Owner!')
            .then(() => aksa.contactBlock(call.peerJid))
    }))
}

/**
 * Uncache if there is file change
 * @param {string} module Module name or path
 * @param {function} cb <optional> 
 */
function nocache(module, cb = () => {}) {
    console.log('Module', `${module}`, 'is now being watched for changes')
    fs.watchFile(require.resolve(module), async() => {
        await uncache(require.resolve(module))
        cb(module)
    })
}

/**
 * Uncache a module
 * @param {string} module Module name or path
 */
function uncache(module = '.') {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(module)]
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}

create(options(true, start))
    .then(aksa => start(aksa))
    .catch((error) => console.log(error))