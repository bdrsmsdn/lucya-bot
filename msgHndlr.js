/*
    Special Thanks to:
    Allah SWT
    Mhankbarbar
    Tobz
    Seluruh creator bot yang ada di Group BOT WE A
    Seluruh pemilik web penyedia layanan API 
*/

const {
    decryptMedia
} = require('@open-wa/wa-decrypt')
const fs = require('fs-extra')
const axios = require('axios')
const moment = require('moment-timezone')
const get = require('got')
const getYouTubeID = require('get-youtube-id')
const os = require('os')
const speed = require('performance-now')
const {
    msgFilter,
    color,
    processTime,
    isUrl
} = require('./utils')
const {
    uploadImages,
    custom
} = require('./utils/fetcher')
const fetch = require('node-fetch')
const {
    spawn,
    exec
} = require('child_process')
const {
    API
} = require('nhentai-api')
const {
    liriklagu,
    quotemaker,
    randomNimek,
    sleep,
    jadwalTv,
    ss,
    stickerburn,
    stickerlight,
    nhentai,
    instagram,
    igstory,
    missin,
    custome
} = require('./lib/functions')
const {
    admeen,
    snk,
    info,
    donate,
    readme,
    listChannel,
    prem,
    sewa,
    nsfwmenu,
    maker,
    media,
    edukasi,
    funmenu,
    poll,
    weebs,
    tools,
    infor,
    anonymous,
    contact,
    tnc,
    others
} = require('./lib/help')
const {
    getStickerMaker
} = require('./lib/ttp')
const Removebg = require('./lib/nobg');
const feature = require('./lib/poll');
const quotedd = require('./lib/quote')
const truth = require('./lib/truth')
const dare = require('./lib/dare')
const {
    downloader,
    urlShortener,
    cekResi,
    images,
    rugapoi,
    nobg,
    nsfww
} = require('./lib')
const {
    stdout
} = require('process')
const translatte = require('translatte')
const translate = require('translatte')
const google = require('google-it')
const Math_js = require('mathjs')
const bent = require('bent')
const path = require('path')
const ffmpeg = require('fluent-ffmpeg')
const Utils = require('web-audio-api/build/utils')
const emojiUnicode = require("emoji-unicode")
const wav = require('node-wav')

// LOAD FILE
const bad = JSON.parse(fs.readFileSync('./lib/bad.json'))
const badword = JSON.parse(fs.readFileSync('./lib/badword.json'))
const banned = JSON.parse(fs.readFileSync('./lib/banned.json'))
const nsfw_ = JSON.parse(fs.readFileSync('./lib/nsfwz.json'))
const NoLink = JSON.parse(fs.readFileSync('./lib/NoLink.json'))
const simi_ = JSON.parse(fs.readFileSync('./lib/Simsimi.json'))
const limit = JSON.parse(fs.readFileSync('./lib/limit.json'))
const welkom = JSON.parse(fs.readFileSync('./lib/welcome.json'))
const left = JSON.parse(fs.readFileSync('./lib/left.json'))
const muted = JSON.parse(fs.readFileSync('./lib/muted.json'))
const setting = JSON.parse(fs.readFileSync('./lib/setting.json'))
const msgLimit = JSON.parse(fs.readFileSync('./lib/msgLimit.json'))
const adminNumber = JSON.parse(fs.readFileSync('./lib/admin.json'))
const regis = JSON.parse(fs.readFileSync('./lib/data/regis.json'))

let {
    limitCount,
    memberLimit,
    groupLimit,
    banChats,
    prefix,
    restartState: isRestart,
    mtc: mtcState
} = setting


let state = {
    status: () => {
        if (banChats) {
            return 'Nonaktif'
        } else if (mtcState) {
            return 'Nonaktif'
        } else if (!mtcState) {
            return 'Aktif'
        } else {
            return 'Aktif'
        }
    }
}

moment.tz.setDefault('Asia/Jakarta').locale('id')

module.exports = msgHndlr = async (aksa, message) => {
    try {
        const {
            type,
            id,
            from,
            t,
            to,
            sender,
            isGroupMsg,
            chat,
            chatId,
            caption,
            isMedia,
            mimetype,
            quotedMsg,
            quotedMsgObj,
            author,
            mentionedJidList
        } = message

        let {
            body
        } = message
        const dari = sender && sender.isMe ? to : from //biar selfbot ceunah
        const {
            name,
            formattedTitle
        } = chat
        let {
            pushname,
            verifiedName
        } = sender
        pushname = pushname || verifiedName
        const commands = caption || body || ''
        const command = commands.toLowerCase().split(' ')[0] || ''
        const args = commands.split(' ')
        const isCmd = command.startsWith(`${prefix}`)

        const isQuotedImage = quotedMsg && quotedMsg.type === 'image'
        const isQuotedVideo = quotedMsg && quotedMsg.type === 'video'
        const isQuotedAudio = quotedMsg && (quotedMsg.type === 'audio' || quotedMsg.type === 'ptt' || quotedMsg.type === 'ppt')
        const isQuotedFile = quotedMsg && quotedMsg.type === 'document'

        const chats = (type === 'chat') ? body : (type === 'image' || type === 'video') ? caption : ''

        function restartAwal(aksa) {
            setting.restartState = false
            isRestart = false
            aksa.sendText(setting.restartId, 'Restart Succesfull!')
            setting.restartId = 'undefined'
            fs.writeFileSync('./lib/setting.json', JSON.stringify(setting, null, 2));
        }

        const isMuted = (chatId) => {
            if (muted.includes(chatId)) {
                return false
            } else {
                return true
            }
        }

        function banChat() {
            if (banChats == true) {
                return false
            } else {
                return true
            }
        }

        if (typeof Array.prototype.splice === 'undefined') {
            Array.prototype.splice = function (index, howmany, elemes) {
                howmany = typeof howmany === 'undefined' || this.length;
                var elems = Array.prototype.slice.call(arguments, 2),
                    newArr = this.slice(0, index),
                    last = this.slice(index + howmany);
                newArr = newArr.concat.apply(newArr, elems);
                newArr = newArr.concat.apply(newArr, last);
                return newArr;
            }
        }

        const apakah = [
            'Ya',
            'Tidak',
            'Coba Ulangi'
        ]

        const bisakah = [
            'Bisa',
            'Tidak Bisa',
            'Coba Ulangi'
        ]

        const kapankah = [
            '1 Minggu lagi',
            '1 Bulan lagi',
            '1 Tahun lagi'
        ]

        const jwb = [
            'iya, kak?',
            'siap!',
            'gimana kak?',
            'apa?',
            'iyaa',
            'halo kak, lulu disini',
            'kenapa kak'
        ]

        const rate = [
            '100%',
            '95%',
            '90%',
            '85%',
            '80%',
            '75%',
            '70%',
            '65%',
            '60%',
            '55%',
            '50%',
            '45%',
            '40%',
            '35%',
            '30%',
            '25%',
            '20%',
            '15%',
            '10%',
            '5%'
        ]

        const mess = {
            wait: `*Tunggu!* Permintaan Anda sedang diproses \n\n-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-\n\n${donate()}`,
            error: {
                St: `[❗] Kirim gambar dengan caption *${prefix}sticker* atau tag gambar yang sudah dikirim`,
                Ti: `[❗] Replay sticker dengan caption *${prefix}stickertoimg* atau tag sticker yang sudah dikirim`,
                Qm: '[❗] Terjadi kesalahan, mungkin themenya tidak tersedia!',
                Yt3: '[❗] Terjadi kesalahan, tidak dapat meng konversi ke mp3!',
                Yt4: '[❗] Terjadi kesalahan, mungkin error di sebabkan oleh sistem.',
                Ig: '[❗] Terjadi kesalahan, mungkin karena akunnya private',
                Ki: '[❗] Bot tidak bisa mengeluarkan Admin group!',
                Sp: '[❗] Bot tidak bisa mengeluarkan Admin',
                Ow: '[❗] Bot tidak bisa mengeluarkan Owner',
                Bk: '[❗] Bot tidak bisa memblockir Owner',
                Ad: '[❗] Tidak dapat menambahkan target, mungkin karena di private',
                Iv: '[❗] Link yang anda kirim tidak valid!'
            }
        }

        const apiKey = 'APIKEY' // apikey you can get it at https://mhankbarbarss.herokuapp.com/api
        const vhtear = 'APIKEY' // apikey from vhtear
        const time = moment(t * 1000).format('DD/MM HH:mm:ss')
        const timu = moment(t * 1000).format('DD/MM/YYYY');
        const timi = moment(t * 1000).add(30, 'days').calendar();
        const botNumber = await aksa.getHostNumber()
        const blockNumber = await aksa.getBlockedIds()
        const groupId = isGroupMsg ? chat.groupMetadata.id : ''
        const groupAdmins = isGroupMsg ? await aksa.getGroupAdmins(groupId) : ''
        const isGroupAdmins = isGroupMsg ? groupAdmins.includes(sender.id) : false
        const isBotGroupAdmins = isGroupMsg ? groupAdmins.includes(botNumber + '@c.us') : false
        //const chats = (type === 'chat') ? body : (type === 'image' || type === 'video') ? caption : ''
        const serial = sender.id
        const pengirim = JSON.parse(fs.readFileSync('./lib/user.json'))
        const uwong = pengirim[Math.floor(Math.random() * pengirim.length)];
        const isPrivate = sender.id === chat.contact.id
        const isRegis = message ? regis.includes(sender.id) : false

        const isAdmin = adminNumber.includes(sender.id)
        const ownerNumber = ["6281281817375@c.us", "17073546544@c.us"] // replace with your whatsapp number
        const isOwner = ownerNumber.includes(sender.id)
        const isBanned = banned.includes(sender.id)
        const isBlocked = blockNumber.includes(sender.id)
        const isNsfw = isGroupMsg ? nsfw_.includes(chat.id) : false
        const isMe = true
        const isSimi = isGroupMsg ? simi_.includes(chat.id) : false
        //const isBw = isGroupMsg ? nobw.includes(chat.id) : false
        //const isAntilink = isGroupMsg ? antilink.includes(chat.id) : false
        global.pollfile = 'poll_Config_' + chat.id + '.json'
        global.voterslistfile = 'poll_voters_Config_' + chat.id + '.json'
        const uaOverride = 'WhatsApp/2.2029.4 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36'
        const isUrl = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi)
        const isWhite = (chatId) => adminNumber.includes(chatId) ? true : false
        const isWhiteList = (chatId) => {
            if (adminNumber.includes(sender.id)) {
                if (muted.includes(chatId)) return false
                return true
            } else {
                return false
            }
        }


        const isBadWord = isGroupMsg ? badword.includes(chat.id) : false
        const isNoLink = isGroupMsg ? NoLink.includes(chat.id) : false
        const url = args.length !== 0 ? args[0] : ''

        const tutor = 'https://i.ibb.co/Hp1XGbL/a4dec92b8922.jpg'
        const errorurl = 'https://1.bp.blogspot.com/-Qr7Wq8rfjEA/X7zyydUwBfI/AAAAAAAALa0/DQCeziWRu4MNBhhcL-AbH4XnYQsil32hwCLcBGAsYHQ/w300-h640/WhatsApp%2BImage%2B2020-11-24%2Bat%2B18.33.52.jpeg'
        const errorurl2 = 'https://1.bp.blogspot.com/-Qr7Wq8rfjEA/X7zyydUwBfI/AAAAAAAALa0/DQCeziWRu4MNBhhcL-AbH4XnYQsil32hwCLcBGAsYHQ/w300-h640/WhatsApp%2BImage%2B2020-11-24%2Bat%2B18.33.52.jpeg'
        // FUNCTION
        function isMsgLimit(id) {
            if (isAdmin) {
                return false;
            }
            let found = false;
            for (let i of msgLimit) {
                if (i.id === id) {
                    if (i.msg >= 12) {
                        found === true
                        aksa.reply(dari, '*[ANTI-SPAM]*\nMaaf, akun anda kami blok karena SPAM, dan tidak bisa di UNBLOK!', id)
                        aksa.contactBlock(id)
                        banned.push(id)
                        fs.writeFileSync('./lib/banned.json', JSON.stringify(banned))
                        return true;
                    } else if (i.msg >= 7) {
                        found === true
                        aksa.reply(dari, '*[ANTI-SPAM]*\nNomor anda terdeteksi spam!\nMohon tidak spam 5 pesan lagi atau nomor anda AUTO BLOK!', id)
                        return true
                    } else {
                        found === true
                        return false;
                    }
                }
            }
            if (found === false) {
                let obj = {
                    id: `${id}`,
                    msg: 1
                };
                msgLimit.push(obj);
                fs.writeFileSync('./lib/msgLimit.json', JSON.stringify(msgLimit));
                return false;
            }
        }

        function addMsgLimit(id) {
            if (isAdmin) {
                return;
            }
            var found = false
            Object.keys(msgLimit).forEach((i) => {
                if (msgLimit[i].id == id) {
                    found = i
                }
            })
            if (found !== false) {
                msgLimit[found].msg += 1;
                fs.writeFileSync('./lib/msgLimit.json', JSON.stringify(msgLimit));
            }
        }

        function isLimit(id) {
            if (isAdmin) {
                return false;
            }
            let found = false;
            for (let i of limit) {
                if (i.id === id) {
                    let limits = i.limit;
                    if (limits >= limitCount) {
                        found = true;
                        aksa.reply(dari, 'Perintah BOT anda sudah mencapai batas, coba esok hari :)', id)
                        return true;
                    } else {
                        limit
                        found = true;
                        return false;
                    }
                }
            }
            if (found === false) {
                let obj = {
                    id: `${id}`,
                    limit: 1
                };
                limit.push(obj);
                fs.writeFileSync('./lib/limit.json', JSON.stringify(limit));
                return false;
            }
        }

        function limitAdd(id) {
            if (isAdmin) {
                return;
            }
            var found = false;
            Object.keys(limit).forEach((i) => {
                if (limit[i].id == id) {
                    found = i
                }
            })
            if (found !== false) {
                limit[found].limit += 1;
                fs.writeFileSync('./lib/limit.json', JSON.stringify(limit));
            }
        }

        function monospace(string) {
            return '```' + string + '```'
        }

        function isMedialimit(id) {
            if (isAdmin) {
                return false;
            }
            let found = false;
            for (let i of medialimit) {
                if (i.id === id) {
                    let limitsa = i.medialimit;
                    if (limitsa >= medialimitCount) {
                        found = true;
                        aksa.reply(dari, 'Perintah media anda sudah mencapai batas, coba esok hari atau coba perintah lain:)', id)
                        return true;
                    } else {
                        medialimit
                        found = true;
                        return false;
                    }
                }
            }
            if (found === false) {
                let obj = {
                    id: `${id}`,
                    medialimit: 1
                };
                medialimit.push(obj);
                fs.writeFileSync('./lib/medialimit.json', JSON.stringify(medialimit));
                return false;
            }
        }

        function MedialimitAdd(id) {
            if (isAdmin) {
                return;
            }
            var found = false;
            Object.keys(medialimit).forEach((i) => {
                if (medialimit[i].id == id) {
                    found = i
                }
            })
            if (found !== false) {
                medialimit[found].medialimit += 1;
                fs.writeFileSync('./lib/medialimit.json', JSON.stringify(medialimit));
            }
        }
        // END HELPER FUNCTION
        if (isGroupMsg && isNoLink && !isGroupAdmins && !isAdmin && !isOwner) {
            if (chats.match(/(https:\/\/chat.whatsapp.com)/gi)) {
                const check = await aksa.inviteInfo(chats);
                if (!check) {
                    return
                } else {
                    aksa.reply(dari, `*「 GROUP LINK DETECTOR 」*\nKamu dikick karena mengirimkan link group lain!`, id).then(() => {
                        aksa.removeParticipant(groupId, sender.id)
                    })
                }
            }
        }
        // MRHRTZ
        if (isGroupMsg && isBadWord) {
            if (bad.includes(chats)) {
                //if (!isBadWord) return aksa.reply(dari, 'Fitur ANTI BADWORD belum Aktif Pak', id)
                if (!isGroupAdmins) {
                    return aksa.reply(dari, "JAGA UCAPAN DONG!! 😠", id)
                        .then(() => aksa.removeParticipant(groupId, sender.id))
                        .then(() => {
                            aksa.sendText(dari, `*「 ANTI BADWORD 」*\nKamu dikick karena berkata kasar!`)
                        }).catch(() => aksa.sendText(dari, `Untung cya bukan admin, kalo admin udah cya kick!`))
                } else {
                    return aksa.reply(dari, "Tolong Jaga Ucapan Min 😇", id)
                }
            }
        }



        if (body === `${prefix}mute` && isMuted(chatId) == true) {
            if (isGroupMsg) {
                if (!isGroupAdmins) return aksa.reply(dari, 'Maaf, perintah ini hanya dapat dilakukan oleh admin Lucya!', id)
                if (isMsgLimit(serial)) {
                    return
                } else {
                    addMsgLimit(serial)
                }
                muted.push(chatId)
                fs.writeFileSync('./lib/muted.json', JSON.stringify(muted, null, 2))
                aksa.reply(dari, `Bot telah di mute pada chat ini! ${prefix}unmute untuk unmute`, id)
            } else {
                if (isMsgLimit(serial)) {
                    return
                } else {
                    addMsgLimit(serial)
                }
                muted.push(chatId)
                fs.writeFileSync('./lib/muted.json', JSON.stringify(muted, null, 2))
                reply(dari, `Bot telah di mute pada chat ini! ${prefix}unmute untuk unmute!`, id)
            }
        }
        if (body === `${prefix}unmute` && isMuted(chatId) == false) {
            if (isGroupMsg) {
                if (!isGroupAdmins) return aksa.reply(dari, 'Maaf, perintah ini hanya dapat dilakukan oleh admin Lucya!', id)
                if (isMsgLimit(serial)) {
                    return
                } else {
                    addMsgLimit(serial)
                }
                let index = muted.indexOf(chatId);
                muted.splice(index, 1)
                fs.writeFileSync('./lib/muted.json', JSON.stringify(muted, null, 2))
                aksa.reply(dari, 'Bot telah di unmute!', id)
            } else {
                if (isMsgLimit(serial)) {
                    return
                } else {
                    addMsgLimit(serial)
                }
                let index = muted.indexOf(chatId);
                muted.splice(index, 1)
                fs.writeFileSync('./lib/muted.json', JSON.stringify(muted, null, 2))
                aksa.reply(dari, 'Bot telah di unmute!', id)
            }
        }
        if (args.includes('@6282115089860')) { //replace with your bot number
            aksa.reply(dari, 'Iya ada apa?', id)
        }
        if (args.includes('terima kasih') || args.includes('makasih') || args.includes('terimakasih') || args.includes('thank you') || args.includes('thanks')) {
            aksa.reply(dari, `sama-sama ${pushname}💖`, id)
        }
        if (body === `${prefix}unbanchat`) {
            if (!isOwner) return aksa.reply(dari, 'Maaf, perintah ini hanya dapat dilakukan oleh Owner Lucya!', id)
            if (setting.banChats === false) return
            setting.banChats = false
            banChats = false
            fs.writeFileSync('./lib/setting.json', JSON.stringify(setting, null, 2))
            aksa.reply(dari, 'Global chat has been disable!', id)
        }

        // [BETA] Avoid Spam Message
        if (isCmd && msgFilter.isFiltered(from) && !isGroupMsg) {
            return console.log(color('[SPAM]', 'red'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
        }
        if (isCmd && msgFilter.isFiltered(from) && isGroupMsg) {
            return console.log(color('[SPAM]', 'red'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(name || formattedTitle))
        }
        //
        if (isCmd && !isGroupMsg) {
            console.log(color('[EXEC]'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
        }
        if (isCmd && isGroupMsg) {
            console.log(color('[EXEC]'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(name || formattedTitle))
        }
        // [BETA] Avoid Spam Message
        msgFilter.addFilter(from)

        // auto read
        aksa.sendSeen(chatId)

        if (isMuted(chatId) && banChat() && !isBlocked && !isBanned || isOwner) {
            switch (command) {
                //owner menu----------------------------------------------------------------------------------------------------------------------------
                case `${prefix}banchat`:
                    if (setting.banChats === true) return
                    if (!isOwner) return aksa.reply(dari, 'Perintah ini hanya bisa di gunakan oleh Owner Lucya!', id)
                    setting.banChats = true
                    banChats = true
                    fs.writeFileSync('./lib/setting.json', JSON.stringify(setting, null, 2))
                    aksa.reply(dari, 'Global chat has been enable!', id)
                    break
                case `prefix`:
                    aksa.reply(dari, `*Lucya is Use ( ${prefix} ) Prefix!.* 
_Prefix adalah tanda di awal perintah._
_Contoh: ${prefix}menu_`, id)
                    break
                case `${prefix}setprefix`:
                    if (!isOwner) return aksa.reply(dari, 'Maaf, Fitur ini hanya untuk OWNER dan ADMIN Lucya!', id)
                    if (args.length === 1) return aksa.reply(dari, `*Kirim Perintah ${prefix}setto [prefix baru]*. 
Contoh: ${prefix}setprefix #`, id)
                    const pf = body.slice(11)
                    setting.prefix = `${pf}`
                    prefix = `${pf}`
                    fs.writeFileSync('./lib/setting.json', JSON.stringify(setting, null, 2))
                    aksa.reply(dari, `Change Prefix To ${pf} SUCCESS!`, id)
                    break
                case `${prefix}addbadword`:
                    if (!isOwner) return aksa.reply(dari, 'Perintah ini hanya bisa di gunakan oleh Owner Lucya!', id)
                    if (!isGroupAdmins) return aksa.reply(dari, 'Perintah ini hanya bisa di gunakan oleh Admin group', id)
                    if (args.length == 1) return aksa.reply(dari, `Kirim perintah ${prefix}addbadword [kata kasar]. contoh ${prefix}addbadword bego`, id)
                    const bw = body.slice(12)
                    bad.push(bw)
                    fs.writeFileSync('./lib/bad.json', JSON.stringify(bad))
                    aksa.reply(dari, 'Success Menambahkan Bad Word!', id)
                    break
                case `${prefix}delbadword`:
                    if (!isOwner) return aksa.reply(dari, 'Perintah ini hanya bisa di gunakan oleh Owner Lucya!', id)
                    if (!isGroupAdmins) return aksa.reply(dari, 'Perintah ini hanya bisa di gunakan oleh Admin group', id)
                    if (args.length == 1) return aksa.reply(dari, `Kirim perintah ${prefix}delbadword [kata kasar]. contoh ${prefix}delbadword bego`, id)
                    let dbw = body.slice(12)
                    bad.splice(dbw)
                    fs.writeFileSync('./lib/bad.json', JSON.stringify(bad))
                    aksa.reply(dari, 'Success Menghapus BAD WORD!', id)
                    break
                case `${prefix}listbanned`:
                    let bened = `This is list of banned number\nTotal : ${banned.length}\n`
                    for (let i of banned) {
                        bened += `➸ ${i.replace(/@c.us/g,'')}\n`
                    }
                    await aksa.reply(dari, bened, id)
                    break
                case `${prefix}block`:
                    if (!isOwner) return aksa.reply(dari, 'Perintah ini hanya bisa digunakan oleh Owner', id)
                    for (let i = 0; i < mentionedJidList.length; i++) {
                        let block = `${mentionedJidList[i]}`
                        await aksa.contactBlock(block).then((a) => {
                            console.log(a)
                            aksa.reply(dari, `Success block ${args[1]}!`, id)
                        })
                    }
                    break
                case `${prefix}blok`: //bedanya apa? kalo blok ketik nomornya gausah ditag
                    if (!isOwner) return aksa.reply(dari, 'Perintah ini hanya bisa digunakan oleh Owner', id)
                    if (args.length >= 2) {
                        let block = `${args[1]}@c.us`
                        await aksa.contactBlock(block).then(() => {
                            return aksa.reply(dari, `Sukses blok ${args[1]}!`, id)
                        })
                        return
                    }
                    break
                case `${prefix}unblock`:
                    if (!isOwner) return aksa.reply(dari, 'Perintah ini hanya bisa digunakan oleh Owner', id)
                    for (let i = 0; i < mentionedJidList.length; i++) {
                        let unblock = `${mentionedJidList[i]}`
                        await aksa.contactUnblock(unblock).then((a) => {
                            console.log(a)
                            aksa.reply(dari, `Success unblok ${args[1]}!`, id)
                        })
                    }
                    break
                case `${prefix}unblok`:
                    if (!isOwner) return aksa.reply(dari, 'Perintah ini hanya bisa digunakan oleh Owner', id)
                    if (args.length >= 2) {
                        let unblock = `${args[1]}@c.us`
                        await aksa.contactBlock(unblock).then(() => {
                            aksa.reply(dari, `Sukses unblok ${args[1]}!`, id)
                        })
                        return
                    }
                    break
                case `${prefix}cgc`:
                    if (!isOwner) return aksa.reply(dari, 'Perintah ini hanya bisa digunakan oleh Owner', id)
                    arg = body.trim().split(' ')
                    const gcname = arg[1]
                    aksa.createGroup(gcname, mentionedJidList)
                    aksa.sendText(dari, 'Berhasil membuat group!')
                    break
                case `${prefix}setgrouplimit`:
                    if (!isOwner) return aksa.reply(dari, 'Perintah ini hanya untuk Owner Lucya!', id)
                    if (args.length == 1) return aksa.reply(dari, `Kirim perintah *!setgrouplimit ['!']*, contoh *!setgrouplimit 15*`, id)
                    const gli = body.slice(15)
                    setting.groupLimit = `${gli}`
                    groupLimit = `${gli}`
                    fs.writeFileSync('./lib/setting.json', JSON.stringify(setting, null, 2))
                    aksa.reply(dari, `Mengubah limit group ke ${gli} silakan restart!`, id)
                    break
                case `${prefix}seticon`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (!isGroupMsg) return aksa.reply(dari, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
                    if (!isGroupAdmins) return aksa.reply(dari, 'Gagal, perintah ini hanya dapat digunakan oleh admin grup!', id)
                    if (!isBotGroupAdmins) return aksa.reply(dari, 'Gagal, silahkan tambahkan Lucya sebagai admin grup!', id)
                    const isqwtimg = quotedMsg && quotedMsg.type === 'image'
                    if (isMedia && type == 'image' || isqwtimg) {
                        const dataMedia = isqwtimg ? quotedMsg : message
                        const _mimetype = dataMedia.mimetype
                        const mediaData = await decryptMedia(dataMedia, uaOverride)
                        const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                        await aksa.setGroupIcon(groupId, imageBase64)
                    } else if (args.length === 1) {
                        if (!isUrl(url)) {
                            await aksa.reply(dari, 'Maaf, link yang kamu kirim tidak valid.', id)
                        }
                        aksa.setGroupIconByUrl(groupId, url).then((r) => (!r && r !== undefined) ?
                            aksa.reply(dari, 'Maaf, link yang kamu kirim tidak memuat gambar.', id) :
                            aksa.reply(dari, 'Berhasil mengubah profile group', id))
                    } else {
                        aksa.reply(dari, `Commands ini digunakan untuk mengganti icon/profile group chat\n\n\nPenggunaan:\n1. Silahkan kirim/reply sebuah gambar dengan caption !seticon\n\n2. Silahkan ketik !seticon linkImage`)
                    }
                    break
                case `${prefix}setpp`:
                    if (!isOwner) return aksa.reply(dari, 'Perintah ini hanya untuk Owner!', id)
                    const isqwtimg1 = quotedMsg && quotedMsg.type === 'image'
                    if (isMedia && type == 'image' || isqwtimg1) {
                        const dataMedia = isqwtimg1 ? quotedMsg : message
                        const _mimetypee = dataMedia.mimetype
                        const mediaData = await decryptMedia(dataMedia, uaOverride)
                        const imageBase64 = `data:${_mimetypee};base64,${mediaData.toString('base64')}`
                        await aksa.setProfilePic(imageBase64)
                        await aksa.reply(dari, 'Berhasil mengubah foto profile!', id)
                    }
                    break
                case `${prefix}setname`:
                    if (!isOwner) return aksa.reply(dari, `Perintah ini hanya bisa di gunakan oleh Owner Lucya!`, id)
                    const setnem = body.slice(9)
                    await aksa.setMyName(setnem)
                    aksa.sendTextWithMentions(dari, `Makasih Nama Barunya @${sender.id.replace('@c.us','')} 😘`, id)
                    break
                case `${prefix}setstatus`:
                    if (!isOwner) return aksa.reply(dari, `Perintah ini hanya bisa di gunakan oleh Owner Lucya!`, id)
                    const setstat = body.slice(11)
                    await aksa.setMyStatus(setstat)
                    aksa.sendTextWithMentions(dari, `Makasih Status Barunya @${sender.id.replace('@c.us','')} 😘`, id)
                    break
                case `${prefix}setgroupname`:
                    if (!isGroupMsg) return aksa.reply(dari, `Fitur ini hanya bisa di gunakan dalam group`, id)
                    if (!isGroupAdmins) return aksa.reply(dari, `Fitur ini hanya bisa di gunakan oleh admin group`, id)
                    if (!isBotGroupAdmins) return aksa.reply(dari, `Fitur ini hanya bisa di gunakan ketika bot menjadi admin`, id)
                    const namagrup = body.slice(14)
                    let sebelum = chat.groupMetadata.formattedName
                    let halaman = global.page ? global.page : await aksa.getPage()
                    await halaman.evaluate((chatId, subject) =>
                        Store.WapQuery.changeSubject(chatId, subject), groupId, `${namagrup}`)
                    aksa.sendTextWithMentions(dari, `Nama group telah diubah oleh admin @${sender.id.replace('@c.us','')}\n\n• Before: ${sebelum}\n• After: ${namagrup}`)
                    break
                case 'tes':
                    if (isOwner) return aksa.reply(dari, 'Ok', id)
                    break
                case `${prefix}leaveall`:
                    if (!isOwner) return aksa.reply(dari, 'Perintah ini hanya untuk Owner Lucya', id)
                    const allChats = await aksa.getAllChatIds()
                    const allGroups = await aksa.getAllGroups()
                    for (let gclist of allGroups) {
                        await aksa.sendText(gclist.contact.id, `Maaf bot sedang pembersihan, total chat aktif : ${allChats.length}`)
                        await aksa.leaveGroup(gclist.contact.id)
                    }
                    aksa.reply(dari, 'Succes leave all group!', id)
                    break
                case `${prefix}clearall`:
                    if (!isOwner) return aksa.reply(dari, 'Perintah ini hanya untuk Owner Lucya', id)
                    const allChatz = await aksa.getAllChats()
                    for (let dchat of allChatz) {
                        await aksa.deleteChat(dchat.id)
                    }
                    aksa.reply(dari, 'Succes clear all chat!', id)
                    break
                case `${prefix}join`:
                    if (!isOwner) return aksa.reply(dari, 'Silakan hubungi Owner untuk mengundang Lucya ke dalam Grup. Ketik !owner', id)
                    if (args.length < 2) return aksa.reply(dari, 'Silakan hubungi Owner untuk mengundang bot ke dalam Grup. Ketik !owner', id)
                    const link = args[1]
                    const tGr = await aksa.getAllGroups()
                    const minMem = 2
                    const check = await aksa.inviteInfo(link)
                    const isLink = link.match(/(https:\/\/chat.whatsapp.com)/gi)
                    if (!isLink) return aksa.reply(dari, 'Ini link? 👊🤬', id)
                    if (tGr.length > 50) return aksa.reply(dari, 'Maaf jumlah group sudah maksimal!', id)
                    if (check.size < minMem) return aksa.reply(dari, 'Member group tidak melebihi 2, Lucya tidak bisa masuk', id)
                    if (check.status === 200) {
                        await aksa.joinGroupViaLink(link).then(() => aksa.reply(dari, 'Lucya akan segera masuk!'))
                    } else {
                        aksa.reply(dari, 'Link group tidak valid!', id)
                    }
                    break
                case `${prefix}mtcstart`:
                    if (mtcState === true) return
                    if (!isOwner) return
                    setting.mtc = true
                    fs.writeFileSync('./lib/setting.json', JSON.stringify(setting, null, 2))
                    aksa.reply(dari, 'Maintenance sudah di Umumkan!', id)
                    break
                case `${prefix}mtcstop`:
                    if (mtcState === false) return
                    if (!isOwner) return
                    setting.mtc = false
                    fs.writeFileSync('./lib/setting.json', JSON.stringify(setting, null, 2))
                    aksa.reply(dari, 'Maintenance sudah di Umumkan!', id)
                    break
                case `${prefix}listbadword`:
                    let lbw = `Ini adalah list BAD WORD\nTotal : ${bad.length}\n`
                    for (let i of bad) {
                        lbw += `➸ ${i.replace(bad)}\n`
                    }
                    await aksa.reply(dari, lbw, id)
                    break
                case `${prefix}bc`: // TERIMA KASIH TOBZ BAIK HATI DAN TIDAK SOMBONG
                    if (!isOwner) return aksa.reply(dari, `Perintah ini hanya untuk Owner Lucya`, id)
                    bctxt = body.slice(4)
                    txtbc = `
❉──────────────────❉
    *_BROADCAST_*
❉──────────────────❉\n\n${bctxt}`
                    const semuagrup = await aksa.getAllChatIds();
                    if (quotedMsg && quotedMsg.type == 'image') {
                        const mediaData = await decryptMedia(quotedMsg)
                        const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                        for (let grupnya of semuagrup) {
                            var cekgrup = await aksa.getChatById(grupnya)
                            if (!cekgrup.isReadOnly) aksa.sendImage(grupnya, imageBase64, 'gambar.jpeg', txtbc)
                        }
                        aksa.reply('Broadcast sukses!')
                    } else {
                        for (let grupnya of semuagrup) {
                            var cekgrup = await aksa.getChatById(grupnya)
                            if (!cekgrup.isReadOnly && isMuted(grupnya)) aksa.sendText(grupnya, txtbc)
                        }
                        aksa.reply('Broadcast Success!')
                    }
                    break
                case `${prefix}getses`:
                    if (!isOwner) return aksa.reply(dari, 'Fitur ini hanya untuk Owner Lucya!, id')
                    const sesPic = await aksa.getSnapshot()
                    aksa.sendFile(dari, sesPic, 'session.png', 'Nih...', id)
                    break
                case `${prefix}listblock`:
                case `${prefix}listblok`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    let hih = `This is list of blocked number\nTotal : ${blockNumber.length}\n`
                    for (let i of blockNumber) {
                        hih += `➸ @${i.replace(/@c.us/g,'')}\n`
                    }
                    aksa.sendTextWithMentions(dari, hih, id)
                    break
                case `${prefix}listprem`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    let admn = `「 *PREMIUM USER* 」\n`
                    for (let i of adminNumber) {
                        admn += `👑 ${i.replace(/@c.us/g,'')}\n`
                    }
                    await aksa.reply(dari, admn, id)
                    break
                case `${prefix}list`: //siapa aja yang udah regis
                    if (!isOwner) return aksa.reply(dari, 'Perintah ini hanya untuk Owner!', id)
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    let rgs = `Registered User\nTotal : ${regis.length}\n`
                    for (let i of regis) {
                        rgs += `➸ ${i.replace(/@c.us/g,'')}\n`
                    }
                    await aksa.reply(dari, rgs, id)
                    break
                    //aksara
                case `${prefix}prem`: //asumsikan admin itu premium member ya!
                    if (!isOwner) return aksa.reply(dari, 'Perintah ini hanya bisa digunakan oleh Owner', id)
                    //var sia = mentionedJidList.name
                    for (let i = 0; i < mentionedJidList.length; i++) {
                        adminNumber.push(mentionedJidList[i])
                        fs.writeFileSync('./lib/admin.json', JSON.stringify(adminNumber))
                        aksa.reply(dari, `
╭────「 *PREMIUM👑* 」──
│+ *Number*\t: ${mentionedJidList[i].replace(/@c.us/g,'')}
│+ *Status*\t\t: *ACTIVE*
│+ *Since*\t\t\t: ${timu}
│+ *Expired*\t\t: ${timi}
│ Thx for Upgrade to Premium🥰
╰──────「 *LUCYA* 」────`, id)
                    }
                    break
                case `${prefix}delprem`:
                    if (!isOwner) return aksa.reply(dari, 'Perintah ini hanya bisa digunakan oleh Owner', id)
                    let inq = adminNumber.indexOf(mentionedJidList[0])
                    adminNumber.splice(inq, 1)
                    fs.writeFileSync('./lib/admin.json', JSON.stringify(adminNumber))
                    aksa.reply(dari, `
╭────「 *PREMIUM👑* 」──
│+ *Number* : ${mentionedJidList[0].replace(/@c.us/g,'')}
│+ *Status* : *DEACTIVE*
│ See u for next order🙂
╰──────「 *LUCYA* 」────`, id)
                    break
                case `${prefix}listgroup`:
                    aksa.getAllGroups().then((res) => {
                        let berhitung1 = 1
                        let gc = `
❉──────────────────❉
    *LIST GROUP*
❉──────────────────❉\n`
                        for (let i = 0; i < res.length; i++) {
                            gc += `\n═════════════════\n\n*No : ${i+1}*\n*Nama* : ${res[i].name}\n*Pesan Belum Dibaca* : ${res[i].unreadCount} chat\n*Tidak Spam* : ${res[i].notSpam}\n`
                        }
                        aksa.reply(dari, gc, id)
                    })
                    break
                case `${prefix}ban`:
                    if (!isOwner) return aksa.reply(dari, 'Hanya Owner Lucya yang bisa!:p', id)
                    for (let i = 0; i < mentionedJidList.length; i++) {
                        banned.push(mentionedJidList[i])
                        fs.writeFileSync('./lib/banned.json', JSON.stringify(banned))
                        aksa.reply(dari, 'Succes ban target!', id)
                    }
                    break
                case `${prefix}unban`:
                    if (!isOwner) return aksa.reply(dari, 'Hanya Owner Lucya yang bisa:p', id)
                    let inax = banned.indexOf(mentionedJidList[0])
                    banned.splice(inax, 1)
                    fs.writeFileSync('./lib/banned.json', JSON.stringify(banned))
                    aksa.reply(dari, 'Unbanned User!', id)
                    break

                    //primary menu-----------------------------------------------------------------------------------------------

                case `${prefix}regis`: //AKSARA 
                    if (isRegis) return aksa.reply(dari, 'Anda sudah melakukan registrasi!', id)
                    if (args === 1) return aksa.reply(dari, `Silakan isi dengan nama dan nomor telepon! Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    arg = body.trim().split('|')
                    const nimi = arg[1]
                    const nimir = arg[2]
                    const texts = nimir.replace(/[-\s+]/g, '') + '@c.us'
                    var cek = regis.includes(texts);
                    if (cek) {
                        return aksa.reply(dari, 'Nomor sudah ada di database', id) //if number already exists on database
                    } else {
                        const mentahh = await aksa.checkNumberStatus(texts) //VALIDATE WHATSAPP NUMBER
                        const hasilll = mentahh.canReceiveMessage ? `
╭───「 *REGISTRASI* 」───
│++
│+ *Nama* : ${nimi}
│+ *Nomor* : wa.me/${nimir}
│
╰───────────────────
Terima kasih telah melakukan registrasi.
Total user terdaftar : ${regis.length}

          ║▌│█║▌│ █║▌│█│║▌║
          ║▌│█║▌│ █║▌│█│║▌║
          
                           *_AKSARA_*` : false
                        if (!hasilll) return aksa.reply(dari, 'Nomor WhatsApp tidak valid [ Tidak terdaftar di WhatsApp ] atau gunakan 62 di awal bukan 0', id)
                        regis.push(mentahh.id._serialized)
                        fs.writeFileSync('./lib/regis.json', JSON.stringify(regis))
                        aksa.sendText(dari, hasilll)
                    }
                    break
                case `${prefix}unreg`: //menghapus nomor dari database
                    if (!isOwner) return aksa.reply(dari, 'Fitur ini hanya dapat digunakan oleh Owner Lucya')
                    if (args.length === 1) return aksa.reply(dari, 'Masukkan nomornya, *GUNAKAN AWALAN 62* contoh: 6281281817375')
                    let inx = regis.indexOf(args[1] + '@c.us')
                    regis.splice(inx, 1)
                    fs.writeFileSync('./lib/regis.json', JSON.stringify(regis))
                    aksa.reply(dari, 'Sukses menghapus nomor from database', id)
                    break
                case `${prefix}limit`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (isAdmin) return aksa.reply(dari, `Sisa limit request anda tersisa : *UNLIMITED*\n\n_Note : Limit akan direset setiap jam 21:00!_`, id)
                    var found = false
                    const limidat = JSON.parse(fs.readFileSync('./lib/limit.json'))
                    for (let lmt of limidat) {
                        if (lmt.id === serial) {
                            let limitCounts = limitCount - lmt.limit
                            if (limitCounts <= 0) return aksa.reply(dari, `Limit request anda sudah habis\n\n_Note : Limit akan direset setiap jam 21:00!_`, id)
                            aksa.reply(dari, `Sisa limit request anda tersisa : *${limitCounts}*\n\n_Note : Limit akan direset setiap jam 21:00!_`, id)
                            found = true
                        }
                    }
                    //console.log(limit)
                    //console.log(limidat)
                    if (found === false) {
                        let obj = {
                            id: `${serial}`,
                            limit: 1
                        };
                        limit.push(obj);
                        fs.writeFileSync('./lib/limit.json', JSON.stringify(limit, 1));
                        aksa.reply(dari, `Sisa limit request anda tersisa : *${limitCounts}*\n\n_Note : Limit akan direset setiap jam 21:00!_`, id)
                    }
                    break
                case `${prefix}limed`: //batesin biar ga kebanyakan download fitur youtube:D
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (isAdmin) return aksa.reply(dari, `Sisa limit request media anda tersisa : *UNLIMITED*\n\n_Note : Limit akan direset setiap jam 21:00!_`, id)
                    var found = false
                    const limed = JSON.parse(fs.readFileSync('./lib/medialimit.json'))
                    for (let lmta of limed) {
                        if (lmta.id === serial) {
                            let medialimitCounts = medialimitCount - lmta.medialimit
                            if (medialimitCounts <= 0) return aksa.reply(dari, `Limit request media anda sudah habis\n\n_Note : Limit akan direset setiap jam 21:00!_`, id)
                            aksa.reply(dari, `Sisa limit request media anda tersisa : *${medialimitCounts}*\n\n_Note : Limit akan direset setiap jam 21:00!_`, id)
                            found = true
                        }
                    }
                    //console.log(limit)
                    //console.log(limidat)
                    if (found === false) {
                        let obj = {
                            id: `${serial}`,
                            medialimit: 1
                        };
                        medialimit.push(obj);
                        fs.writeFileSync('./lib/medialimit.json', JSON.stringify(medialimit, 1));
                        aksa.reply(dari, `Sisa limit request media anda tersisa : *${medialimitCounts}*\n\n_Note : Limit akan direset setiap jam 21:00!_`, id)
                    }
                    break
                case `${prefix}help`:
                case `${prefix}menu`: //edit sendiri deh menu nya
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    const loadedMsggg = await aksa.getAmountOfLoadedMessages()
                    const chatIdsss = await aksa.getAllChatIds()
                    const groupsss = await aksa.getAllGroups()
                    var premma = isAdmin
                    var found = false
                    const limedd = JSON.parse(fs.readFileSync('./lib/medialimit.json'))
                    const limidatt = JSON.parse(fs.readFileSync('./lib/limit.json'))
                    for (let lmt of limidatt) {
                        if (lmt.id === serial) {
                            let limitCounts = limitCount - lmt.limit
                            aksa.reply(dari, `
╭─────「 *INFO* 」──── 
│++ _*LUCYA V2*_ 
│+ 3.1.X 
│+ OWNER : _*AKSARA*_ 
│+ wa.me/6281281817375 
╰───────────────────  

❉──────────────────❉  
*Name* : *${pushname}* 
*User* : wa.me/${serial.replace(/@c.us/g,'')} 
*Limit* : ${limitCounts}/24  
*Status* : *${premma ? 'Premium' : 'Standar'}*
❉──────────────────❉ ​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​

╭────「 *LIST MENU* 」──
│+ *${prefix}maker*
│+ *${prefix}media*
│+ *${prefix}menugroup*
│+ *${prefix}edukasi*
│+ *${prefix}funmenu*
│+ *${prefix}poll*
│+ *${prefix}weebs*
│+ *${prefix}tools*
│+ *${prefix}anonymous*
│+ *${prefix}information*
│+ *${prefix}contact*
│+ *${prefix}tnc*
│+ *${prefix}others*
│+ *${prefix}nsfwmenu*
│+ *${prefix}vip*
│+ *${prefix}pray*
╰───────────────────

*Status Lucya :*
- ${loadedMsggg} Loaded Messages
- ${groupsss.length} Group Chats
- ${chatIdsss.length - groupsss.length} Personal Chats
- ${chatIdsss.length} Total Chats

*Speed :* ${processTime(t, moment())} _second_

Ayo bergabung bersama ratusan orang lainnya ke dalam Group Official Informasi Lucya!
Ketik aja !lucyagroup

Follow juga ig aku yuk!
https://instagram.com/bdrsmsdn
`, id)
                            var found = true
                        }
                    }
                    if (found === false) {
                        let obj = {
                            id: `${serial}`,
                            limit: 1
                        };
                        limit.push(obj);
                        fs.writeFileSync('./lib/limit.json', JSON.stringify(limit, 1));
                        aksa.reply(dari, `
╭─────「 *INFO* 」──── 
│++ _*LUCYA V2*_ 
│+ 3.1.X 
│+ OWNER : _*AKSARA*_ 
│+ wa.me/6281281817375 
╰───────────────────  

❉──────────────────❉  
*Name* : *${pushname}* 
*User* : wa.me/${serial.replace(/@c.us/g,'')} 
*Limit* : ${limitCounts}/24  
*Status* : *${premma ? 'Premium' : 'Standar'}*
❉──────────────────❉ ​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​

╭────「 *LIST MENU* 」──
│+ *${prefix}maker*
│+ *${prefix}media*
│+ *${prefix}menugroup*
│+ *${prefix}edukasi*
│+ *${prefix}funmenu*
│+ *${prefix}poll*
│+ *${prefix}weebs*
│+ *${prefix}tools*
│+ *${prefix}anonymous*
│+ *${prefix}information*
│+ *${prefix}contact*
│+ *${prefix}tnc*
│+ *${prefix}others*
│+ *${prefix}nsfwmenu*
│+ *${prefix}vip*
│+ *${prefix}pray*
╰───────────────────

*Status Lucya :*
- ${loadedMsggg} Loaded Messages
- ${groupsss.length} Group Chats
- ${chatIdsss.length - groupsss.length} Personal Chats
- ${chatIdsss.length} Total Chats

*Speed :* ${processTime(t, moment())} _second_

Ayo bergabung bersama ratusan orang lainnya ke dalam Group Official Informasi Lucya!
Ketik aja !lucyagroup

Follow juga ig aku yuk!
https://instagram.com/bdrsmsdn
`, id)
                    }
                    break
                case `${prefix}menugroup`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (!isGroupMsg) return aksa.reply(dari, 'Maaf, perintah ini hanya dapat digunakan didalam grup!', id)
                    if (!isGroupAdmins) return aksa.reply(dari, 'Gagal, perintah ini hanya dapat digunakan oleh admin grup!', id)
                    aksa.sendText(dari, admeen(), id)
                    break
                case `${prefix}menuprem`:
                case `${prefix}vip`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (!isAdmin) return aksa.reply(dari, 'Mohon maaf anda tidak bisa menggunakan fitur premium!', id)
                    aksa.sendText(dari, prem(), id)
                    break
                case `${prefix}maker`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    aksa.reply(dari, maker(), id)
                    break
                case `${prefix}media`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    aksa.reply(dari, media(), id)
                    break
                case `${prefix}edukasi`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    aksa.reply(dari, edukasi(), id)
                    break
                case `${prefix}funmenu`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    aksa.reply(dari, funmenu(), id)
                    break
                case `${prefix}iklan`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    aksa.sendLinkWithAutoPreview(dari, 'https://instagram.com/kayora.id', sewa())
                    break
                case `${prefix}poll`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    aksa.reply(dari, poll(), id)
                    break
                case `${prefix}pray`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    aksa.reply(dari, pray(), id)
                    break
                case `${prefix}weebs`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    aksa.reply(dari, weebs(), id)
                    break
                case `${prefix}tools`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    aksa.reply(dari, tools(), id)
                    break
                case `${prefix}contact`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    aksa.reply(dari, contact(), id)
                    break
                case `${prefix}anonymous`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    aksa.reply(dari, anonymous(), id)
                    break
                case `${prefix}information`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    aksa.reply(dari, infor(), id)
                    break
                case `${prefix}tnc`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    aksa.reply(dari, tnc(), id)
                    break
                case `${prefix}others`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    aksa.reply(dari, others(), id)
                    break
                case `${prefix}readme`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    aksa.reply(dari, readme(), id)
                    break
                case `${prefix}info`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    aksa.sendLinkWithAutoPreview(dari, 'https://instagram.com/bdrsmsdn', info(), id)
                    break
                case `${prefix}snk`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    5
                    aksa.reply(dari, snk(), id)
                    break
                case `${prefix}donasi`:
                case `${prefix}donate`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    aksa.reply(dari, donate(), id)
                    break
                case `${prefix}linkwa`:
                    aksa.reply(dari, `wa.me/${serial.replace(/@c.us/g,'')}`, id)
                    break
                case `${prefix}cekprem`:
                    if (!isAdmin) return aksa.reply(dari, 'Anda bukan Member Premium, silakan hubungi owner untuk membeli akses Premium!', id)
                    var pic = await aksa.getProfilePicFromServer(author)
                    if (pic == undefined) {
                        var pfpp = errorurl
                    } else {
                        var pfpp = pic
                    }
                    aksa.sendFileFromUrl(dari, pfpp, 'photo.jpg', `
╭────「 *PREMIUM👑* 」──
│+ *Name* : ${pushname}
│+ *Number* : ${serial.replace(/@c.us/g,'')}
│+ *Status* : *ACTIVE*
╰──────「 *LUCYA* 」────`, id)
                    break
                case `${prefix}ping`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    const loadedMsg = await aksa.getAmountOfLoadedMessages()
                    const chatIds = await aksa.getAllChatIds()
                    const groups = await aksa.getAllGroups()
                    const me = await aksa.getMe()
                    const battery = await aksa.getBatteryLevel()
                    const isCharging = await aksa.getIsPlugged()
                    await aksa.reply(dari,
                        `Penggunaan RAM: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
                            
*CPU :* ${os.cpus()[0].model}

*Status Lucya :*
- ${loadedMsg} Loaded Messages
- ${groups.length} Group Chats
- ${chatIds.length - groups.length} Personal Chats
- ${chatIds.length} Total Chats

*Status Device Lucya :*
${(`*Battery : ${battery}% ${isCharging ? 'is Charging' : 'is not Charging'}
${Object.keys(me.phone).map(key => `${key} : ${me.phone[key]}`).join('\n')}`.slice(1, -1))}

*Speed :* ${processTime(t, moment())} _second_ 
*Provider :* INDIHOME ASU`, id)
                    break

                    //premium menu-------------------------------------------------------------------------------------------------------

                case `${prefix}stgif`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (!isAdmin) return aksa.reply(dari, 'Mohon maaf anda tidak bisa menggunakan fitur premium!', id)
                    if (quotedMsg) {
                        const quoteText = quotedMsg.type == 'chat' ? quotedMsg.body : quotedMsg.type == 'image' ? quotedMsg.caption : ''
                        const bjbjbj = body.slice(7)
                        aksa.sendStickerfromUrl(dari, "https://api.vhtear.com/textxgif?text=" + quoteText + "&apikey=" + vhtear)
                    } else {
                        const bjbjbj = body.slice(7)
                        aksa.sendStickerfromUrl(dari, "https://api.vhtear.com/textxgif?text=" + bjbjbj + "&apikey=" + vhtear)
                    }
                    break
                case `${prefix}stickergif`: // INSTALL FFMPEG, IF YOU WANT THIS COMMAND WORK!
                case `${prefix}stikergif`: // TUTORIAL IN README, PLEASE READ!
                case `${prefix}sgif`: // MRHRTZ
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    aksa.reply(dari, `*Tunggu!* Permintaan Anda sedang diproses \n\n-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-\n\n${donate()}`, id)
                    if (isMedia && type === 'video' || mimetype === 'image/gif') {
                        try {
                            const mediaData = await decryptMedia(message, uaOverride)
                            await aksa.sendMp4AsSticker(dari, mediaData, {
                                fps: 15,
                                startTime: `00:00:00.0`,
                                endTime: `00:00:05.0`,
                                loop: 0
                            })
                        } catch (e) {
                            aksa.reply(dari, `Size media terlalu besar! mohon kurangi durasi video.`, id)
                        }
                    } else if (quotedMsg && quotedMsg.type == 'video' || quotedMsg && quotedMsg.mimetype == 'image/gif') {
                        const mediaData = await decryptMedia(quotedMsg, uaOverride)
                        await aksa.sendMp4AsSticker(dari, mediaData, {
                            fps: 15,
                            startTime: `00:00:00.0`,
                            endTime: `00:00:05.0`,
                            loop: 0
                        })
                    } else {
                        aksa.reply(dari, `Kesalahan ⚠️ Hanya bisa video/gif apabila file media berbentuk gambar ketik #sticker`, id)
                    }
                    break
                case `${prefix}stickernobg`: //error hehe
                case `${prefix}stikernobg`:
                case `${prefix}snbg`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (!isAdmin) return aksa.reply(dari, 'Mohon maaf anda tidak bisa menggunakan fitur premium!', id)
                    if (isMedia) {
                        try {
                            nobg.Removebg()
                            aksa.sendFileFromUrl(dari, image, id)
                        } catch (err) {
                            console.log(err)
                        }
                    }
                    break
                case `${prefix}bass`:
                    //premium command, lu tau kemana harus ngehubungi
                    break
                case `${prefix}distord`:
                    //premium command, lu tau kemana harus ngehubungi
                    break
                case `${prefix}tomp3`:
                    //premium command, lu tau kemana harus ngehubungi
                    break
                case `${prefix}stickerfire`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (!isAdmin) return aksa.reply(dari, 'Mohon maaf anda tidak bisa menggunakan fitur premium!', id)
                    aksa.reply(dari, `*Tunggu!* Permintaan Anda sedang diproses \n\n-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-\n\n${donate()}`)
                    if (isMedia && type === 'image' || isQuotedImage) {
                        const dataMediaa = isQuotedImage ? quotedMsg : message
                        const mediaData = await decryptMedia(dataMediaa, uaOverride)
                        const getUrli = await uploadImages(mediaData, false)
                        const imgnya = await stickerburn(getUrli)
                        const Sfire = imgnya.result.imgUrl
                        await aksa.sendStickerfromUrl(dari, Sfire)
                    } else {
                        await aksa.reply(dari, 'Wrong Format!\n⚠️ Harap Kirim Gambar Dengan !stickerfire', id)
                    }
                    break
                case `${prefix}stgif2`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (!isAdmin) return aksa.reply(dari, 'Mohon maaf anda tidak bisa menggunakan fitur premium!', id)
                    aksa.reply(dari, mess.wait, id)
                    const eqw = body.slice(8)
                    aksa.sendFileFromUrl(dari, "https://api.vhtear.com/slidingtext?text=" + eqw + "&apikey=" + vhtear)
                    break
                case `${prefix}stickerlight`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (!isAdmin) return aksa.reply(dari, 'Mohon maaf anda tidak bisa menggunakan fitur premium!', id)
                    aksa.reply(dari, `*Tunggu!* Permintaan Anda sedang diproses \n\n-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-\n\n${donate()}`)
                    if (isMedia && type === 'image' || isQuotedImage) {
                        const dataMediaas = isQuotedImage ? quotedMsg : message
                        const mediaData = await decryptMedia(dataMediaas, uaOverride)
                        const getUrli = await uploadImages(mediaData, false)
                        const imgnya = await stickerlight(getUrli)
                        const slight = imgnya.result.imgUrl
                        await aksa.sendStickerfromUrl(dari, slight)
                    } else {
                        await aksa.reply(dari, 'Wrong Format!\n⚠️ Harap Kirim Gambar Dengan !stickerlight', id)
                    }
                    break
                case `${prefix}stickertoimg`:
                case `${prefix}stickertoimg`:
                case `${prefix}s2img`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (!isAdmin) return aksa.reply(dari, 'Mohon maaf anda tidak bisa menggunakan fitur premium!', id)
                    if (quotedMsg && quotedMsg.type == 'sticker') {
                        const mediaData = await decryptMedia(quotedMsg)
                        aksa.reply(dari, `*Tunggu!* Permintaan Anda sedang diproses \n\n-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-\n\n${donate()}`)
                        const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                        await aksa.sendFile(dari, imageBase64, 'imagesticker.jpg', 'nih', id)
                    } else if (!quotedMsg) return aksa.reply(dari, 'Mohon tag sticker yang ingin dijadikan gambar!', id)
                    break
                case `${prefix}ttp`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (!isAdmin) return aksa.reply(dari, 'Mohon maaf anda tidak bisa menggunakan fitur premium!', id)
                    if (quotedMsg) {
                        const quoteText = quotedMsg.type == 'chat' ? quotedMsg.body : quotedMsg.type == 'image' ? quotedMsg.caption : ''
                        aksa.sendStickerfromUrl(dari, `https://api.vhtear.com/textmaker?text=${quoteText}&warna=white&apikey=${vhtear}`)
                    } else {
                        const bjbjbjaa = body.slice(5)
                        aksa.sendStickerfromUrl(dari, `https://api.vhtear.com/textmaker?text=${bjbjbjaa}&warna=white&apikey=${vhtear}`)
                    }
                    break
                case `${prefix}musik`:
                case `${prefix}music`:
                    //premium command, lu tau kemana harus ngehubungi
                    break
                case `${prefix}vidio`:
                case `${prefix}video`:
                case `${prefix}film`:
                    //premium command, lu tau kemana harus ngehubungi
                    break
                case `${prefix}getmusik`:
                case `${prefix}getmusic`:
                    //premium command, lu tau kemana harus ngehubungi
                    break
                case `${prefix}getvideo`:
                    //premium command, lu tau kemana harus ngehubungi
                    break
                case `${prefix}movie`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (!isAdmin) return aksa.reply(dari, 'Mohon maaf anda tidak bisa menggunakan fitur premium!', id)

                    aksa.reply(dari, mess.wait, id)
                    const mov = body.slice(7)
                    try {
                        const mova = await get.get(`https://arugaz.herokuapp.com/api/sdmovie?film=${mov}`).json()
                        const {
                            rating,
                            sinopsis,
                            thumb,
                            title,
                            video
                        } = await mova.result
                        const movi = `*「 MOVIE 」*\n\n*Hasil Pencarian Film: ${mov}*\n\n*Rating* : ${rating}\n*Title* : ${title}\n*Sinopsis* : ${sinopsis}\n*Link* : ${video}`
                        aksa.sendFileFromUrl(dari, thumb, 'thumbjpg', movi, id)
                    } catch (err) {
                        aksa.sendText(ownerNumber, 'Error Movie : ' + err)
                        aksa.reply(dari, 'Error!', id)
                    }
                    break
                case `${prefix}nhentai`:
                    //premium command, lu tau kemana harus ngehubungi
                    break
                case `${prefix}getnhentai`:
                    //premium command, lu tau kemana harus ngehubungi
                    break
                case `${prefix}lewds`: //thanks to BOCCHI BOT
                case `${prefix}lewd`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (!isAdmin) return aksa.reply(dari, 'Mohon maaf anda tidak bisa menggunakan fitur premium!', id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    if (isGroupMsg) {
                        if (!isNsfw) return await aksa.reply(dari, 'NSFW belum diaktifkan di grup ini!', id)
                        await aksa.reply(dari, mess.wait, id)
                        nsfww.randomLewd()
                            .then(async ({
                                url
                            }) => {
                                await aksa.sendFileFromUrl(dari, url, 'lewd.jpg', '', null, null, true)
                                    .then(() => console.log('Success sending lewd!'))
                            })
                            .catch(async (err) => {
                                console.error(err)
                                await aksa.reply(dari, err, id)
                            })
                    } else {
                        await aksa.reply(dari, mess.wait, id)
                        nsfww.randomLewd()
                            .then(async ({
                                url
                            }) => {
                                await aksa.sendFileFromUrl(dari, url, 'lewd.jpg', '', null, null, true)
                                    .then(() => console.log('Success sending lewd!'))
                            })
                            .catch(async (err) => {
                                console.error(err)
                                await aksa.reply(dari, err, id)
                            })
                    }
                    break
                case `${prefix}fetish`: //thanks to BOCCHI BOT
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (!isAdmin) return aksa.reply(dari, 'Mohon maaf anda tidak bisa menggunakan fitur premium!', id)
                    if (args.length === 1) return await aksa.reply(dari, 'Wrong Format!', id)
                    if (isGroupMsg) {
                        if (!isNsfw) return await aksa.reply(dari, 'NSFW belum diaktifkan di grup ini!', id)
                        await aksa.reply(dari, mess.wait, id)
                        try {
                            if (args[1] === 'armpits') {
                                nsfww.armpits()
                                    .then(async ({
                                        url
                                    }) => {
                                        await aksa.sendFileFromUrl(dari, url, 'armpits.jpg', '', id)
                                            .then(() => console.log('Success sending armpits pic!'))
                                    })
                            } else if (args[1] === 'feets') {
                                nsfww.feets()
                                    .then(async ({
                                        url
                                    }) => {
                                        await aksa.sendFileFromUrl(dari, url, 'feets.jpg', '', id)
                                            .then(() => console.log('Success sending feets pic!'))
                                    })
                            } else if (args[1] === 'thighs') {
                                nsfww.thighs()
                                    .then(async ({
                                        url
                                    }) => {
                                        await aksa.sendFileFromUrl(dari, url, 'thighs.jpg', '', id)
                                            .then(() => console.log('Success sending thighs pic!'))
                                    })
                            } else if (args[1] === 'ass') {
                                nsfww.ass()
                                    .then(async ({
                                        url
                                    }) => {
                                        await aksa.sendFileFromUrl(dari, url, 'ass.jpg', '', id)
                                            .then(() => console.log('Success sending ass pic!'))
                                    })
                            } else if (args[1] === 'boobs') {
                                nsfww.boobs()
                                    .then(async ({
                                        url
                                    }) => {
                                        await aksa.sendFileFromUrl(dari, url, 'boobs.jpg', '', id)
                                            .then(() => console.log('Success sending boobs pic!'))
                                    })
                            } else if (args[1] === 'belly') {
                                nsfww.belly()
                                    .then(async ({
                                        url
                                    }) => {
                                        await aksa.sendFileFromUrl(dari, url, 'belly.jpg', '', id)
                                            .then(() => console.log('Success sending belly pic!'))
                                    })
                            } else if (args[1] === 'sideboobs') {
                                nsfww.sideboobs()
                                    .then(async ({
                                        url
                                    }) => {
                                        await aksa.sendFileFromUrl(dari, url, 'sideboobs.jpg', '', id)
                                            .then(() => console.log('Success sending sideboobs pic!'))
                                    })
                            } else if (args[1] === 'ahegao') {
                                nsfww.ahegao()
                                    .then(async ({
                                        url
                                    }) => {
                                        await aksa.sendFileFromUrl(dari, url, 'ahegao.jpg', '', id)
                                            .then(() => console.log('Success sending ahegao pic!'))
                                    })
                            } else {
                                await aksa.reply(dari, 'Tag not found.', id)
                            }
                        } catch (err) {
                            console.error(err)
                            await aksa.reply(dari, err, id)
                        }
                    } else {
                        await aksa.reply(dari, mess.wait, id)
                        try {
                            if (args[1] === 'armpits') {
                                nsfww.armpits()
                                    .then(async ({
                                        url
                                    }) => {
                                        await aksa.sendFileFromUrl(dari, url, 'armpits.jpg', '', id)
                                            .then(() => console.log('Success sending armpits pic!'))
                                    })
                            } else if (args[1] === 'feets') {
                                nsfww.feets()
                                    .then(async ({
                                        url
                                    }) => {
                                        await aksa.sendFileFromUrl(dari, url, 'feets.jpg', '', id)
                                            .then(() => console.log('Success sending feets pic!'))
                                    })
                            } else if (args[1] === 'thighs') {
                                nsfww.thighs()
                                    .then(async ({
                                        url
                                    }) => {
                                        await aksa.sendFileFromUrl(dari, url, 'thighs.jpg', '', id)
                                            .then(() => console.log('Success sending thighs pic!'))
                                    })
                            } else if (args[1] === 'ass') {
                                nsfww.ass()
                                    .then(async ({
                                        url
                                    }) => {
                                        await aksa.sendFileFromUrl(dari, url, 'ass.jpg', '', id)
                                            .then(() => console.log('Success sending ass pic!'))
                                    })
                            } else if (args[1] === 'boobs') {
                                nsfww.boobs()
                                    .then(async ({
                                        url
                                    }) => {
                                        await aksa.sendFileFromUrl(dari, url, 'boobs.jpg', '', id)
                                            .then(() => console.log('Success sending boobs pic!'))
                                    })
                            } else if (args[1] === 'belly') {
                                nsfww.belly()
                                    .then(async ({
                                        url
                                    }) => {
                                        await aksa.sendFileFromUrl(dari, url, 'belly.jpg', '', id)
                                            .then(() => console.log('Success sending belly pic!'))
                                    })
                            } else if (args[1] === 'sideboobs') {
                                nsfww.sideboobs()
                                    .then(async ({
                                        url
                                    }) => {
                                        await aksa.sendFileFromUrl(dari, url, 'sideboobs.jpg', '', id)
                                            .then(() => console.log('Success sending sideboobs pic!'))
                                    })
                            } else if (args[1] === 'ahegao') {
                                nsfww.ahegao()
                                    .then(async ({
                                        url
                                    }) => {
                                        await aksa.sendFileFromUrl(dari, url, 'ahegao.jpg', '', id)
                                            .then(() => console.log('Success sending ahegao pic!'))
                                    })
                            } else {
                                await aksa.reply(dari, 'Tag not found.', id)
                            }
                        } catch (err) {
                            console.error(err)
                            await aksa.reply(dari, err, id)
                        }
                    }
                    break
                case `${prefix}ptlvid`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (!isAdmin) return aksa.reply(dari, 'Perintah ini hanya untuk Member Premium', id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    aksa.reply(dari, mess.wait, id)
                    const ditai = fs.readFileSync('./lib/asupan.json')
                    const ditaiJsin = JSON.parse(ditai)
                    const rindIndixa = Math.floor(Math.random() * ditaiJsin.length)
                    const rindKiya = ditaiJsin[rindIndixa]
                    aksa.sendFileFromUrl(dari, rindKiya, 'asupan.mp4', 'Nih', id)
                    break
                case `${prefix}playstore`:
                    //premium command, lu tau kemana harus ngehubungi
                    break
                case `${prefix}shopee`:
                    //premium command, lu tau kemana harus ngehubungi
                    break
                case `${prefix}news`:
                    //premium command, lu tau kemana harus ngehubungi
                    break
                case `${prefix}alkitab`:
                    //premium command, lu tau kemana harus ngehubungi
                    break
                case `${prefix}moviecs`:
                case `${prefix}csmovie`:
                    //premium command, lu tau kemana harus ngehubungi
                    break
                case `${prefix}jurnalotaku`:
                    //premium command, lu tau kemana harus ngehubungi
                    break
                case `${prefix}jadwalbola`:
                    //premium command, lu tau kemana harus ngehubungi
                    break
                case `${prefix}xvideos`:
                    //premium command, lu tau kemana harus ngehubungi
                    break
                case `${prefix}getxvideos`:
                    //premium command, lu tau kemana harus ngehubungi
                    break
                case `${prefix}phdl`: //thanks to BOCCHI BOT
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (!isAdmin) return aksa.reply(dari, 'Mohon maaf anda tidak bisa menggunakan fitur premium!', id)
                    if (isGroupMsg) {
                        if (!isNsfw) return await aksa.reply(dari, ind.notNsfw(), id)
                        if (!args[1].match(isUrl) && !args[1].includes('instagram.com')) return aksa.reply(dari, `Maaf, link yang kamu kirim tidak valid. [Invalid Link]`, id)
                        await aksa.reply(dari, mess.wait, id)
                        try {
                            nsfww.phDl(yuerel)
                                .then(async ({
                                    title,
                                    download_urls,
                                    thumbnail_url
                                }) => {
                                    const count = Object.keys(download_urls).length
                                    if (count !== 2) {
                                        const shortsLow = await shortener(download_urls['240P'])
                                        const shortsMid = await shortener(download_urls['480P'])
                                        const shortsHigh = await shortener(download_urls['720P'])
                                        await aksa.sendFileFromUrl(dari, thumbnail_url, `${title}`, `Title: ${title}\n\nLinks:\n${shortsLow} (240P)\n${shortsMid} (480P)\n${shortsHigh} (720P)`, id)
                                            .then(() => console.log('Success sending pornhub metadata!'))
                                    } else {
                                        const shortsLow = await shortener(download_urls['240P'])
                                        await aksa.sendFileFromUrl(dari, thumbnail_url, `${title}`, `Title: ${title}\n\nLinks:\n${shortsLow} (240P)`, id)
                                            .then(() => console.log('Success sending pornhub metadata!'))
                                    }
                                })
                        } catch (err) {
                            console.error(err)
                            await aksa.reply(dari, err, id)
                        }
                    } else {
                        if (!args[1].match(isUrl) && !args[1].includes('instagram.com')) return aksa.reply(dari, `Maaf, link yang kamu kirim tidak valid. [Invalid Link]`, id)
                        await aksa.reply(dari, mess.wait, id)
                        try {
                            nsfww.phDl(yuerel)
                                .then(async ({
                                    title,
                                    download_urls,
                                    thumbnail_url
                                }) => {
                                    const count = Object.keys(download_urls).length
                                    if (count !== 2) {
                                        const shortsLow = await shortener(download_urls['240P'])
                                        const shortsMid = await shortener(download_urls['480P'])
                                        const shortsHigh = await shortener(download_urls['720P'])
                                        await aksa.sendFileFromUrl(dari, thumbnail_url, `${title}`, `Title: ${title}\n\nLinks:\n${shortsLow} (240P)\n${shortsMid} (480P)\n${shortsHigh} (720P)`, id)
                                            .then(() => console.log('Success sending pornhub metadata!'))
                                    } else {
                                        const shortsLow = await shortener(download_urls['240P'])
                                        await aksa.sendFileFromUrl(dari, thumbnail_url, `${title}`, `Title: ${title}\n\nLinks:\n${shortsLow} (240P)`, id)
                                            .then(() => console.log('Success sending pornhub metadata!'))
                                    }
                                })
                        } catch (err) {
                            console.error(err)
                            await aksa.reply(dari, err, id)
                        }
                    }
                    break
                case `${prefix}giftlimit`: //thanks to SASHA BOT
                    if (!isAdmin) return aksa.reply(dari, 'Perintah ini hanya untuk Owner dan Member Premium!', id)
                    var found = false;
                    Object.keys(limit).forEach((i) => {
                        if (limit[i].id == mentionedJidList[0]) {
                            found = i
                        }
                    })
                    if (found !== false) {
                        limit[found].limit -= args[1];
                        fs.writeFileSync('./lib/limit.json', JSON.stringify(limit));
                    }
                    aksa.sendTextWithMentions(dari, `menambahkan ${args[1]} limit ke @${mentionedJidList[0].replace('@c.us', '')}`)
                    break
                case `${prefix}google`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (!isAdmin) return aksa.reply(dari, 'Mohon maaf anda tidak bisa menggunakan fitur premium!', id)

                    aksa.reply(dari, mess.wait, id)
                    const googleQuery = body.slice(8)
                    if (googleQuery == undefined || googleQuery == ' ') return aksa.reply(dari, `*Hasil Pencarian : ${googleQuery}* tidak ditemukan`, id)
                    google({
                        'query': googleQuery
                    }).then(results => {
                        let vars = `_*Hasil Pencarian : ${googleQuery}*_\n`
                        for (let i = 0; i < results.length; i++) {
                            vars += `\n═════════════════\n\n*Judul* : ${results[i].title}\n\n*Deskripsi* : ${results[i].snippet}\n\n*Link* : ${results[i].link}\n\n`
                        }
                        aksa.reply(dari, vars, id);
                    }).catch(e => {
                        console.log(e)
                        aksa.sendText(ownerNumber, 'Google Error : ' + e);
                    })
                    break
                case `${prefix}memesticker`:
                case `${prefix}memestiker`:
                    arg = body.trim().split('|')
                    aksa.reply(dari, 'Sedang di proses silahkan tunggu ± 1 min!', id)
                    if ((isMedia || isQuotedImage) && args.length >= 2) {
                        const top = arg[1]
                        const bottom = arg[2]
                        const encryptMedia = isQuotedImage ? quotedMsg : message
                        const mediaData = await decryptMedia(encryptMedia, uaOverride)
                        const getUrl = await uploadImages(mediaData, false)
                        const ImageBase64 = await meme.custom(getUrl, top, bottom)
                        aksa.sendImageAsSticker(dari, ImageBase64, 'image.png', '', null, true)
                            .catch(() => {
                                aksa.reply(dari, 'Ada yang error!')
                            })
                    } else {
                        await aksa.reply(dari, `Tidak ada gambar! Silahkan kirim gambar dengan caption ${prefix}memesticker <teks_atas> | <teks_bawah>\ncontoh: ${prefix}meme teks atas | teks bawah`, id)
                    }
                    break
                    /*case `${prefix}ttp`:
                            if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                            if (!isAdmin) return aksa.reply(dari, 'Mohon maaf anda tidak bisa menggunakan fitur premium!', id)
                            aksa.reply(dari, `*Tunggu!* Permintaan Anda sedang diproses \n\n-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-\n\n${donate()}`)
                            try
                            {
                                const string = body.toLowerCase().includes('!ttp') ? body.slice(5) : body.slice(5)
                                if(args)
                                {
                                    if(quotedMsgObj == null)
                                    {
                                        const gasMake = await getStickerMaker(string)
                                        if(gasMake.status == true)
                                        {
                                            try{
                                                await aksa.sendImageAsSticker(dari, gasMake.base64)
                                            }catch(err) {
                                                await aksa.reply(dari, 'Gagal membuat.', id)
                                            } 
                                        }else{
                                            await aksa.reply(dari, gasMake.reason, id)
                                        }
                                    }else if(quotedMsgObj != null){
                                        const gasMake = await getStickerMaker(quotedMsgObj.body)
                                        if(gasMake.status == true)
                                        {
                                            try{
                                                await aksa.sendImageAsSticker(dari, gasMake.base64)
                                            }catch(err) {
                                                await aksa.reply(dari, 'Gagal membuat.', id)
                                            } 
                                        }else{
                                            await aksa.reply(dari, gasMake.reason, id)
                                        }
                                    }
                                   
                                }else{
                                    await aksa.reply(dari, 'Tidak boleh kosong.', id)
                                }
                            }catch(error)
                            {
                                console.log(error)
                            }
                        break*/

                    //maker menu--------------------------------------------------------------------------------------------------

                case `${prefix}sticker`:
                case `${prefix}stiker`:
                case `${prefix}s`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (isMedia && type === 'image') {
                        const mediaData = await decryptMedia(message, uaOverride)
                        const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                        await aksa.sendImageAsSticker(dari, imageBase64)
                    } else if (quotedMsg && quotedMsg.type == 'image') {
                        const mediaData = await decryptMedia(quotedMsg, uaOverride)
                        const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                        await aksa.sendImageAsSticker(dari, imageBase64)
                    } else if (args.length === 2) {
                        const url = args[1]
                        if (url.match(isUrl)) {
                            await aksa.sendStickerfromUrl(dari, url, {
                                    method: 'get'
                                })
                                .catch(err => console.log('Caught exception: ', err))
                        } else {
                            aksa.reply(dari, mess.error.Iv, id)
                        }
                    } else {
                        aksa.reply(dari, mess.error.St, id)
                    }
                    break
                case `${prefix}esticker`: //aksara
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    aksa.reply(dari, mess.wait, id)
                    const bjbjbja = emojiUnicode(args[1])
                    aksa.sendStickerfromUrl(dari, "https://api.vhtear.com/emojitopng?code=" + bjbjbja + "&apikey=" + vhtear)
                    break
                case `${prefix}sth`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    //if (!isAdmin) return aksa.reply(dari, 'Mohon maaf anda tidak bisa menggunakan fitur premium!', id)
                    const stha = body.slice(5)
                    if (stha.length > 10) return aksa.reply(dari, 'Teksnya kepanjangan sayang', id)
                    aksa.reply(dari, mess.wait, id)
                    aksa.sendFileFromUrl(dari, "https://api.vhtear.com/hartatahta?text=" + stha + "&apikey=" + vhtear)
                    break
                case `${prefix}bp`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)

                    //if (!isAdmin) return aksa.reply(dari, 'Mohon maaf anda tidak bisa menggunakan fitur premium!', id)
                    const sthaa = body.slice(4)
                    if (sthaa.length > 10) return aksa.reply(dari, 'Teksnya kepanjangan sayang', id)
                    aksa.reply(dari, mess.wait, id)
                    aksa.sendFileFromUrl(dari, "https://api.vhtear.com/blackpinkicon?text=" + sthaa + "&apikey=" + vhtear)
                    break
                case `${prefix}thunder`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    //if (!isAdmin) return aksa.reply(dari, 'Mohon maaf anda tidak bisa menggunakan fitur premium!', id)
                    const sthaas = body.slice(9)
                    aksa.sendFileFromUrl(dari, "https://api.vhtear.com/thundertext?text=" + sthaas + "&apikey=" + vhtear)
                    break
                case `${prefix}ff`: //thanks jojo 
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    arg = body.trim().split('|')
                    if (args === 1) return aksa.reply(dari, 'Silakan gunakan !epep <teks>', id)
                    const burik = await get.get(`https://api-jojo.herokuapp.com/api/epep?text=${args[1]}`).json()
                    aksa.sendFileFromUrl(dari, burik.result, id)
                    break
                case `${prefix}phub`: //textmaker api from MRHRTZ
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    arg = body.trim().split('|')
                    const porn = arg[1]
                    const hub = arg[2]
                    if (args === 1) return aksa.reply(dari, 'Silakan gunakan !phub |<teks>|<teks2>', id)
                    const pron = await get.get(`http://nzcha-api.herokuapp.com/styletext/phub?text1=${porn}&text2=${hub}`).json()
                    aksa.sendFileFromUrl(dari, pron.result, id)
                    break
                case `${prefix}glow`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    const graffity = body.slice(6)
                    const graffitystrz = await get.get('http://nzcha-api.herokuapp.com/styletext/advglow?text1=' + graffity).json()
                    aksa.sendFileFromUrl(dari, graffitystrz.result, id)
                    break
                case `${prefix}joker`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    const jok = body.slice(7)
                    const joki = await get.get('http://nzcha-api.herokuapp.com/styletext/jokerlogo?text1=' + jok).json()
                    aksa.sendFileFromUrl(dari, joki.result, id)
                    break
                case `${prefix}codmw`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    const joka = body.slice(7)
                    const jokia = await get.get('http://nzcha-api.herokuapp.com/styletext/codmw?text1=' + joka).json()
                    aksa.sendFileFromUrl(dari, jokia.result, id)
                    break
                case `${prefix}avenger`:
                case `${prefix}avengers`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    arg = body.trim().split('|')
                    const spa = arg[1]
                    const acea = arg[2]
                    if (args === 1) return aksa.reply(dari, 'Silakan gunakan !avengers |<teks>|<teks2>', id)
                    const pronaa = await get.get(`http://nzcha-api.herokuapp.com/styletext/avenger?text1=${spa}&text2=${acea}`).json()
                    aksa.sendFileFromUrl(dari, pronaa.result, id)
                    break
                case `${prefix}outline`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    const jokqa = body.slice(9)
                    const jokiqa = await get.get('http://nzcha-api.herokuapp.com/styletext/bokeh?text1=' + jokqa).json()
                    aksa.sendFileFromUrl(dari, jokiqa.result, id)
                    break
                case `${prefix}sunset`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    const jokqas = body.slice(8)
                    const jokiqas = await get.get('http://nzcha-api.herokuapp.com/styletext/senja?text1=' + jokqas).json()
                    aksa.sendFileFromUrl(dari, jokiqas.result, id)
                    break
                case `${prefix}minion`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    const jokqass = body.slice(8)
                    const jokiqass = await get.get('http://nzcha-api.herokuapp.com/styletext/minion?text1=' + jokqass).json()
                    aksa.sendFileFromUrl(dari, jokiqass.result, id)
                    break
                case `${prefix}space`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    arg = body.trim().split('|')
                    const sp = arg[1]
                    const ace = arg[2]
                    if (args === 1) return aksa.reply(dari, 'Silakan gunakan !space |<teks>|<teks2>', id)
                    const prona = await get.get(`http://nzcha-api.herokuapp.com/styletext/space?text1=${sp}&text2=${ace}`).json()
                    aksa.sendFileFromUrl(dari, prona.result, id)
                    break
                case `${prefix}glitch`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    arg = body.trim().split('|')
                    const spq = arg[1]
                    const aceq = arg[2]
                    if (args === 1) return aksa.reply(dari, 'Silakan gunakan !glitch |<teks>|<teks2>', id)
                    const pronaq = await get.get(`http://inyourdream.herokuapp.com/glitch?kata1=${spq}&kata2=${aceq}`).json()
                    aksa.sendFileFromUrl(dari, pronaq.status, id)
                    break
                case `${prefix}blood`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    const jokqassa = body.slice(7)
                    const jokiqassa = await get.get('http://nzcha-api.herokuapp.com/styletext/blood?text1=' + jokqassa).json()
                    aksa.sendFileFromUrl(dari, jokiqassa.result, id)
                    break
                case `${prefix}lg`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    if (args === 1) return aksa.reply(dari, 'Silakan gunakan !lg <teks>', id)
                    const gggg = await get.get(`https://api-jojo.herokuapp.com/api/gaming?text=${args[1]}`).json()
                    aksa.sendFileFromUrl(dari, gggg.result, id)
                    break
                case `${prefix}qrcode`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    if (!args.lenght >= 2) return
                    let qrcodes = body.slice(8)
                    await aksa.sendFileFromUrl(dari, `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${qrcodes}`, 'gambar.png', 'Process sukses!')
                    break
                case `${prefix}quotemaker`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    arg = body.trim().split('|')
                    if (arg.length >= 4) {
                        aksa.reply(dari, mess.wait, id)
                        const quotes = encodeURIComponent(arg[1])
                        const author = encodeURIComponent(arg[2])
                        const theme = encodeURIComponent(arg[3])
                        await quotemaker(quotes, author, theme).then(amsu => {
                            aksa.sendFile(dari, amsu, 'quotesmaker.jpg', 'nih').catch(() => {
                                aksa.reply(dari, mess.error.Qm, id)
                            })
                        })
                    } else {
                        aksa.reply(dari, 'Usage: \n!quotemaker |teks|watermark|theme\n\nEx :\n!quotemaker |ini contoh|bdr|random', id)
                    }
                    break
                case `${prefix}textmaker`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (!isGroupMsg) return aksa.reply(dari, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !ceklimit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    arg = body.trim().split('|')
                    aksa.reply(dari, 'Sedang di proses silahkan tunggu ± 1 min!', id)
                    if ((isMedia || isQuotedImage) && args.length >= 2) {
                        const top = arg[1]
                        const bott = arg[2]
                        const encryptMedia = isQuotedImage ? quotedMsg : message
                        const mediaData = await decryptMedia(encryptMedia, uaOverride)
                        const getUrl = await uploadImages(mediaData, false)
                        const ImageBase64 = await custom(getUrl, top, bott)
                        await aksa.sendFile(dari, ImageBase64, 'image.png', 'neh...')
                    } else {
                        await aksa.reply(dari, 'Wrong Format!', id)
                    }
                    break
                case `${prefix}text2img`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    if (args.length === 1) return aksa.reply(dari, 'Kirim perintah *!text2img <teks>*. Jika kesulitan silakan lihat contoh di *!readme*', id)
                    const q2img = (body.slice(10))
                    const txt2img = await get.get(`https://mhankbarbars.herokuapp.com/api/text2image?text=${q2img}&apiKey=${apiKey}`).json()
                    if (txt2img.error) {
                        aksa.reply(dari, 'Error!', id)
                    } else {
                        aksa.sendFileFromUrl(dari, txt2img.result, '02726161.png', null, id)
                    }
                    break
                case `${prefix}sandwriting`:
                    if (!isGroupMsg) return aksa.reply(dari, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    if (args.length === 1) return aksa.reply(dari, 'Kirim perintah #sandwriting [ Teks ]\nContoh #sandwriting MRG3P5 GANS', id)
                    const swrt = body.slice(13)
                    try {
                        const swrt2 = await axios.get('https://api.vhtear.com/sand_writing?text1=' + swrt + '&apikey=' + vhtear)
                        const {
                            imgUrl
                        } = swrt2.data.result
                        const swrt3 = `「 SAND WRITING 」
   Text : ${swrt}`
                        const pictk = await bent("buffer")(imgUrl)
                        const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
                        aksa.sendFileFromUrl(dari, base64, swrt3)
                    } catch (err) {
                        console.error(err.message)
                        await aksa.sendFileFromUrl(dari, errorurl2, 'error.png', '💔 Maaf, User tidak ditemukan')
                        aksa.sendText(ownerNumber, 'Sand Writing Error : ' + err)
                    }
                    break

                    //group menu & fun-----------------------------------------------------------------------------------------------------------

                case `${prefix}`:
                    if (!isSimi) return aksa.reply(dari, 'command/Perintah Simi belum di aktifkan! ketik !simi enable', id)
                    if (args.length === 1) return aksa.reply(dari, 'Kirim perintah *! [teks]*\nContoh : *! halo*')
                    const que = body.slice(1)
                    const sigo = await axios.get(`http://simsumi.herokuapp.com/api?text=${que}&lang=id`)
                    const sigot = sigo.data
                    aksa.reply(dari, sigot.success, id)
                    console.log(sigot)
                    break
                case `${prefix}profile`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (isBanned, isBlocked) return false
                    if (isGroupMsg) {
                        if (!quotedMsg) {
                            var block = blockNumber.includes(author)
                            var bend = banned.includes(author)
                            var pic = await aksa.getProfilePicFromServer(author)
                            var namae = pushname
                            var premm = isAdmin
                            var sts = await aksa.getStatus(author)
                            var adm = isGroupAdmins
                            const {
                                status
                            } = sts
                            if (pic == undefined) {
                                var pfp = errorurl
                            } else {
                                var pfp = pic
                            }
                            await aksa.sendFileFromUrl(dari, pfp, 'pfp.jpg',
                                `*User Profile* ✨️
➸ *Username 🐷 : ${namae}*
➸ *User Info 💫 : ${status}*
➸ *Tipe Account 👑: ${premm ? 'Premium' : 'Standar'}*
➸ *Block 🚫 : ${block ? 'Yes' : 'No'}*
➸ *Banned 🔒 : ${bend ? 'Yes' : 'No'}*
➸ *Admin Group 🔰 : ${adm}*`)
                        } else if (quotedMsg) {
                            var qmid = quotedMsgObj.sender.id
                            var block = blockNumber.includes(qmid)
                            var bend = banned.includes(author)
                            var pic = await aksa.getProfilePicFromServer(qmid)
                            var namae = quotedMsgObj.sender.name
                            var premm = quotedMsgObj.isAdmin
                            var sts = await aksa.getStatus(qmid)
                            var adm = isGroupAdmins
                            const {
                                status
                            } = sts
                            if (pic == undefined) {
                                var pfp = errorurl
                            } else {
                                var pfp = pic
                            }
                            await aksa.sendFileFromUrl(dari, pfp, 'pfp.jpg',
                                `*User Profile* ✨️ 
➸ *Username 🐷 : ${namae}*
➸ *User Info 💫 : ${status}*
➸ *Tipe Account 👑: ${premm ? 'Premium' : 'Standar'}*
➸ *Block 🚫 : ${block ? 'Yes' : 'No'}*
➸ *Banned 🔒 : ${bend ? 'Yes' : 'No'}*
➸ *Admin Group 🔰 : ${adm ? 'Yes' : 'No'}*`)
                        }
                    }
                    break
                case `${prefix}groupinfo`:
                    if (!isGroupMsg) return aksa.reply(dari, 'Perintah ini hanya bisa digunakan dalam group!', message.id)
                    isMuted(chatId) == false
                    var totalMem = chat.groupMetadata.participants.length
                    var desc = chat.groupMetadata.desc
                    var groupname = formattedTitle
                    var welgrp = welkom.includes(chat.id)
                    var leftgrp = left.includes(chat.id)
                    var ngrp = nsfw_.includes(chat.id)
                    var nb = badword.includes(chat.id)
                    var al = NoLink.includes(chat.id)
                    var simu = simi_.includes(chat.id)
                    var grouppic = await aksa.getProfilePicFromServer(chat.id)
                    if (grouppic == undefined) {
                        var pfp = errorurl
                    } else {
                        var pfp = grouppic
                    }
                    await aksa.sendFileFromUrl(dari, pfp, 'group.png', `➸ *Name : ${groupname}* 
*➸ Members : ${totalMem}*
*➸ Welcome : ${welgrp ? 'ON' : 'OFF'}*
*➸ Left : ${leftgrp ? 'ON' : 'OFF'}*
*➸ NSFW : ${ngrp ? 'ON' : 'OFF'}*
*➸ SimSimi : ${simu ? 'ON' : 'OFF'}*
*➸ Anti Badword : ${nb ? 'ON' : 'OFF'}* 
*➸ Anti Link : ${al ? 'ON' : 'OFF'}*
*➸ Group Description : ${desc}*`)
                    break
                case `${prefix}ptl`:
                    if (!isGroupMsg) return aksa.reply(dari, 'Perintah ini hanya bisa digunakan dalam group!', id)
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    const pptl = ["https://i.pinimg.com/564x/b2/84/55/b2845599d303a4f8fc4f7d2a576799fa.jpg", "https://i.pinimg.com/236x/98/08/1c/98081c4dffde1c89c444db4dc1912d2d.jpg", "https://i.pinimg.com/236x/a7/e2/fe/a7e2fee8b0abef9d9ecc8885557a4e91.jpg", "https://i.pinimg.com/236x/ee/ae/76/eeae769648dfaa18cac66f1d0be8c160.jpg", "https://i.pinimg.com/236x/b2/84/55/b2845599d303a4f8fc4f7d2a576799fa.jpg", "https://i.pinimg.com/564x/78/7c/49/787c4924083a9424a900e8f1f4fdf05f.jpg", "https://i.pinimg.com/236x/eb/05/dc/eb05dc1c306f69dd43b7cae7cbe03d27.jpg", "https://i.pinimg.com/236x/d0/1b/40/d01b40691c68b84489f938b939a13871.jpg", "https://i.pinimg.com/236x/31/f3/06/31f3065fa218856d7650e84b000d98ab.jpg", "https://i.pinimg.com/236x/4a/e5/06/4ae5061a5c594d3fdf193544697ba081.jpg", "https://i.pinimg.com/236x/56/45/dc/5645dc4a4a60ac5b2320ce63c8233d6a.jpg", "https://i.pinimg.com/236x/7f/ad/82/7fad82eec0fa64a41728c9868a608e73.jpg", "https://i.pinimg.com/236x/ce/f8/aa/cef8aa0c963170540a96406b6e54991c.jpg", "https://i.pinimg.com/236x/77/02/34/77023447b040aef001b971e0defc73e3.jpg", "https://i.pinimg.com/236x/4a/5c/38/4a5c38d39687f76004a097011ae44c7d.jpg", "https://i.pinimg.com/236x/41/72/af/4172af2053e54ec6de5e221e884ab91b.jpg", "https://i.pinimg.com/236x/26/63/ef/2663ef4d4ecfc935a6a2b51364f80c2b.jpg", "https://i.pinimg.com/236x/2b/cb/48/2bcb487b6d398e8030814c7a6c5a641d.jpg", "https://i.pinimg.com/236x/62/da/23/62da234d941080696428e6d4deec6d73.jpg", "https://i.pinimg.com/236x/d4/f3/40/d4f340e614cc4f69bf9a31036e3d03c5.jpg", "https://i.pinimg.com/236x/d4/97/dd/d497dd29ca202be46111f1d9e62ffa65.jpg", "https://i.pinimg.com/564x/52/35/66/523566d43058e26bf23150ac064cfdaa.jpg", "https://i.pinimg.com/236x/36/e5/27/36e52782f8d10e4f97ec4dbbc97b7e67.jpg", "https://i.pinimg.com/236x/02/a0/33/02a033625cb51e0c878e6df2d8d00643.jpg", "https://i.pinimg.com/236x/30/9b/04/309b04d4a498addc6e4dd9d9cdfa57a9.jpg", "https://i.pinimg.com/236x/9e/1d/ef/9e1def3b7ce4084b7c64693f15b8bea9.jpg", "https://i.pinimg.com/236x/e1/8f/a2/e18fa21af74c28e439f1eb4c60e5858a.jpg", "https://i.pinimg.com/236x/22/d9/22/22d9220de8619001fe1b27a2211d477e.jpg", "https://i.pinimg.com/236x/af/ac/4d/afac4d11679184f557d9294c2270552d.jpg", "https://i.pinimg.com/564x/52/be/c9/52bec924b5bdc0d761cfb1160865b5a1.jpg", "https://i.pinimg.com/236x/1a/5a/3c/1a5a3cffd0d936cd4969028668530a15.jpg"]
                    let pep = pptl[Math.floor(Math.random() * pptl.length)]
                    aksa.sendFileFromUrl(dari, pep, 'pptl.jpg', 'Follow ig : https://www.instagram.com/ptl_repost untuk mendapatkan penyegar timeline lebih banyak', message.id)
                    break
                case `${prefix}koin`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (!isGroupMsg) return aksa.reply(dari, 'Perintah ini hanya bisa digunakan dalam group!', id)
                    const side = Math.floor(Math.random() * 2) + 1
                    if (side == 1) {
                        aksa.sendStickerfromUrl(dari, 'https://i.ibb.co/YTWZrZV/2003-indonesia-500-rupiah-copy.png', {
                            method: 'get'
                        })
                    } else {
                        aksa.sendStickerfromUrl(dari, 'https://i.ibb.co/bLsRM2P/2003-indonesia-500-rupiah-copy-1.png', {
                            method: 'get'
                        })
                    }
                    break
                case `${prefix}dadu`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (!isGroupMsg) return aksa.reply(dari, 'Perintah ini hanya bisa digunakan dalam group!', id)
                    const dice = Math.floor(Math.random() * 6) + 1
                    await aksa.sendStickerfromUrl(dari, 'https://www.random.org/dice/dice' + dice + '.png', {
                        method: 'get'
                    })
                    break
                case `${prefix}spamcall`:
                    arg = body.trim().split(' ')
                    console.log(...arg[1])
                    var slicedArgs = Array.prototype.slice.call(arg, 1);
                    console.log(slicedArgs)
                    const spam = await slicedArgs.join(' ')
                    console.log(spam)
                    const call2 = await axios.get('https://tobz-api.herokuapp.com/api/spamcall?no=' + spam)
                    const {
                        logs
                    } = call2.data
                    await aksa.sendText(dari, `Logs : ${logs}` + '.')
                    break
                case `${prefix}tts`:
                case `${prefix}tss`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    if (args.length === 1) return aksa.reply(dari, `Kirim perintah *!tts <kode_bahasa> <teks>*, contoh *!tts id halo semua* untuk kode bahasa silakan cek di https://bit.ly/3kAELDe `)
                    var dataBhs = body.slice(5, 7)
                    const ttsWK = require('node-gtts')(dataBhs)
                    var dataText = body.slice(8)
                    if (dataText === '') return aksa.reply(dari, 'hah?', id)
                    if (dataText.length > 500) return aksa.reply(dari, 'Teks terlalu panjang!', id)
                    ttsWK.save('./media/tts/tts.mp3', dataText, function () {
                        aksa.sendPtt(dari, './media/tts/tts.mp3', id)
                    })
                    break
                case `${prefix}family100`: //thanks to LORDZ BOT
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (!isGroupMsg) return aksa.reply(dari, 'Perintah ini hanya bisa digunakan dalam group!', id)
                    if (isLimit(serial)) return aksa.reply(dari, `_Hai ${pushname} Limit request anda sudah mencapai batas, Akan direset kembali setiap jam 9 dan gunakan seperlunya!_`, id)
                    if (isMsgLimit(serial)) {
                        return
                    } else {
                        await addMsgLimit(serial)
                    }
                    await limitAdd(serial)
                    const family = await get.get('https://api.vhtear.com/family100&apikey=' + vhtear).json()
                    aksa.reply(dari, `*FAMILY 100*\n\n*Pertanyaan* : ${family.result.soal}\n\n_Waktu : 30 Detik..._`, id)
                    await sleep(10000)
                    aksa.sendText(dari, `_Sisa Waktu : 20 Detik_`)
                    await sleep(10000)
                    aksa.sendText(dari, `_Sisa Waktu : 10 Detik_`)
                    await sleep(10000)
                    aksa.sendText(dari, `_Waktu Habis..._`, id)
                    await sleep(1000)
                    aksa.reply(dari, `*Jawaban* : ${family.result.jawaban}`, id)
                    break
                case `${prefix}caklontong`: //thanks to LORDZ BOT
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (!isGroupMsg) return aksa.reply(dari, 'Perintah ini hanya bisa digunakan dalam group!', id)
                    if (isLimit(serial)) return aksa.reply(dari, `_Hai ${pushname} Limit request anda sudah mencapai batas, Akan direset kembali setiap jam 9 dan gunakan seperlunya!_`, id)
                    if (isMsgLimit(serial)) {
                        return
                    } else {
                        await addMsgLimit(serial)
                    }
                    await limitAdd(serial)
                    const cakl = await get.get('https://api.vhtear.com/funkuis&apikey=' + vhtear).json()
                    aksa.reply(dari, `*TTS CAK LONTONG*\n\n*Pertanyaan* : ${cakl.result.soal} \n\n_Waktu : 30 Detik..._`, id)
                    await sleep(10000)
                    aksa.sendText(dari, `_Sisa Waktu : 20 Detik_`)
                    await sleep(10000)
                    aksa.sendText(dari, `_Sisa Waktu : 10 Detik_`)
                    await sleep(10000)
                    aksa.sendText(dari, `_Waktu Habis..._`, id)
                    await sleep(1000)
                    aksa.reply(dari, cakl.result.desk, id)
                    break
                case `${prefix}tebakgambar`: //thanks to LORDZ BOT
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (!isGroupMsg) return aksa.reply(dari, 'Perintah ini hanya bisa digunakan dalam group!', id)
                    if (isLimit(serial)) return aksa.reply(dari, `_Hai ${pushname} Limit request anda sudah mencapai batas, Akan direset kembali setiap jam 9 dan gunakan seperlunya!_`, id)
                    if (isMsgLimit(serial)) {
                        return
                    } else {
                        await addMsgLimit(serial)
                    }
                    await limitAdd(serial)
                    const teabaks = await get.get('https://api.vhtear.com/tebakgambar&apikey=' + vhtear).json()
                    const {
                        soalImg, jawaban
                    } = teabaks.result
                    await aksa.sendFileFromUrl(dari, soalImg, 'soal.jpg', `*TEBAK GAMBAR*\n\n_Waktu : 30 Detik..._`, id)
                    await sleep(10000)
                    aksa.sendText(dari, `_Sisa Waktu : 20 Detik_`)
                    await sleep(10000)
                    aksa.sendText(dari, `_Sisa Waktu : 10 Detik_`)
                    await sleep(10000)
                    aksa.sendText(dari, `_Waktu Habis..._`, id)
                    await sleep(1000)
                    aksa.reply(dari, `*Jawaban* : ${teabaks.result.jawaban}`, id)
                    break
                case `${prefix}artimimpi`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    if (args.length === 1) return aksa.reply(dari, 'Kirim perintah *!artimimpi <teks>*. Jika kesulitan silakan lihat contoh di *!readme*', id)
                    const qmimpi = (body.slice(11))
                    try {
                        const mim = await axios.get(`https://api.vhtear.com/artimimpi?query=${qmimpi}&apikey=${vhtear}`)
                        if (mim.data.error) return aksa.reply(dari, mim.data.error, id)
                        const kbbau = `➸ *Query* : ${qmimpi}\n➸ *Hasil* : ${mim.data.result.hasil}`
                        aksa.reply(dari, kbbau, id)
                    } catch (err) {
                        console.error(err.message)
                        await aksa.sendFileFromUrl(dari, errorurl2, 'error.png', '💔️ Maaf, tidak ditemukan')
                        aksa.sendText(ownerNumber, 'ARTI MIMPI Error : ' + err)
                    }
                    break
                case `${prefix}kapankah`:
                    if (!isGroupMsg) return aksa.reply(dari, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                    const when = args.join(' ')
                    const ans = kapankah[Math.floor(Math.random() * (kapankah.length))]
                    if (!when) aksa.reply(dari, `⚠️ Format salah! Ketik *${prefix}menu* untuk penggunaan.`)
                    await aksa.sendText(dari, `Pertanyaan: *${when}* \n\nJawaban: ${ans}`)
                    break
                case `${prefix}nilai`:
                case `${prefix}rate`:
                    if (!isGroupMsg) return aksa.reply(dari, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                    const rating = args.join(' ')
                    const awr = rate[Math.floor(Math.random() * (rate.length))]
                    if (!rating) aksa.reply(dari, `⚠️ Format salah! Ketik *${prefix}menu* untuk penggunaan.`)
                    await aksa.sendText(dari, `Pertanyaan: *${rating}* \n\nJawaban: ${awr}`)
                    break
                case `${prefix}apakah`:
                    if (!isGroupMsg) return aksa.reply(dari, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                    const nanya = args.join(' ')
                    const jawab = apakah[Math.floor(Math.random() * (apakah.length))]
                    if (!nanya) aksa.reply(dari, `⚠️ Format salah! Ketik *${prefix}menu* untuk penggunaan.`)
                    await aksa.sendText(dari, `Pertanyaan: *${nanya}* \n\nJawaban: ${jawab}`)
                    break
                case `${prefix}bisakah`:
                    if (!isGroupMsg) return aksa.reply(dari, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                    const bsk = args.join(' ')
                    const jbsk = bisakah[Math.floor(Math.random() * (bisakah.length))]
                    if (!bsk) aksa.reply(dari, `⚠️ Format salah! Ketik *${prefix}menu* untuk penggunaan.`)
                    await aksa.sendText(dari, `Pertanyaan: *${bsk}* \n\nJawaban: ${jbsk}`)
                    break
                case `${prefix}tod`: //aksara
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    if (!isGroupMsg) return aksa.reply(dari, 'Perintah ini hanya bisa digunakan dalam group!', id)
                    const sliin = "https://blog.elevenia.co.id/wp-content/uploads/2020/04/27420-truth-or-dare.jpg"
                    const gmeek = await aksa.getGroupMembersId(groupId)
                    let gmimk = gmeek[Math.floor(Math.random() * gmeek.length)]
                    const mmkkk = `     *「 TRUTH OR DARE 」*`
                    const lllk = `Truth or Dare kali ini ditujukan kepada @${gmimk.replace(/@c.us/g, '')} \n\nTolong reply pesan ini dengan !truth atau !dare`
                    aksa.sendFileFromUrl(dari, sliin, 'ddas.jpg', mmkkk, id)
                    await sleep(3000)
                    await aksa.sendTextWithMentions(dari, lllk, id)
                    break
                case `${prefix}truth`:
                    if (!quotedMsg) return aksa.reply(dari, 'Reply pesannya!', id)
                    aksa.reply(dari, `${truth()}`, id)
                    break
                case `${prefix}dare`:
                    if (!quotedMsg) return aksa.reply(dari, 'Reply pesannya!', id)
                    aksa.reply(dari, `${dare()}`, id)
                    break
                case `${prefix}babi`:
                    const gmek = await aksa.getGroupMembersId(groupId)
                    let gmik = gmek[Math.floor(Math.random() * gmek.length)]
                    const mmkk = `YANG PALING BABI DISINI ADALAH @${gmik.replace(/@c.us/g, '')}`
                    aksa.sendTextWithMentions(dari, mmkk, id)
                    break
                case `${prefix}ganteng`:
                    const gmekk = await aksa.getGroupMembersId(groupId)
                    let gmikk = gmekk[Math.floor(Math.random() * gmekk.length)]
                    const mmkkkk = `YANG PALING GANTENG DISINI ADALAH @${gmikk.replace(/@c.us/g, '')}`
                    aksa.sendTextWithMentions(dari, mmkkkk, id)
                    break
                case `${prefix}zodiak`:
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik #limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    if (args.length === 1) return aksa.reply(dari, 'Kirim perintah *#zodiak [zodiak kamu]*\nContoh : *#zodiak scorpio*', id)
                    try {
                        const resp = await axios.get('https://api.vhtear.com/zodiak?query=' + body.slice(8) + '&apikey=' + vhtear)
                        if (resp.data.error) return aksa.reply(dari, resp.data.error, id)
                        const anm2 = `➸ Zodiak : ${resp.data.result.zodiak}\n➸ Ramalan : ${resp.data.result.ramalan}\n➸ Nomor Keberuntungan : ${resp.data.result.nomorKeberuntungan}\n➸ Motivasi : ${resp.data.result.motivasi}\n➸ Inspirasi : ${resp.data.result.inspirasi}`
                        aksa.reply(dari, anm2, id)
                    } catch (err) {
                        console.error(err.message)
                        await aksa.sendFileFromUrl(dari, errorurl2, 'error.png', '💔️ Maaf, Zodiak tidak ditemukan')
                        aksa.sendText(ownerNumber, 'Zodiak Error : ' + err)
                    }
                    break
                case `${prefix}heroml`:
                    if (!isGroupMsg) return aksa.reply(dari, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik #limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    if (args.length === 1) return aksa.reply(dari, 'Kirim perintah *#heroml [nama hero]*\nContoh : *#heroml akai*', id)
                    try {
                        const resp = await axios.get('https://api.vhtear.com/herodetail?query=' + body.slice(8) + '&apikey=' + vhtear)
                        if (resp.data.error) return aksa.reply(dari, resp.data.error, id)
                        const anm2 = `➸ Title : ${resp.data.result.title}\n➸ Quotes : ${resp.data.result.quotes}\n➸ Info : ${resp.data.result.info}\n➸ Atribut : ${resp.data.result.attributes}`
                        aksa.sendFileFromUrl(dari, resp.data.result.pictHero, 'hero.jpg', anm2, id)
                    } catch (err) {
                        console.error(err.message)
                        await aksa.sendFileFromUrl(dari, errorurl2, 'error.png', '💔️ Maaf, Hero tidak ditemukan')
                        aksa.sendText(ownerNumber, 'Heroml Error : ' + err)
                    }
                    break

                case `${prefix}indohot`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    if (isGroupMsg) {
                        if (!isNsfw) return aksa.reply(dari, 'Command/Perintah NSFW belum diaktifkan di group ini!', id)
                        const dsa = await get.get(`https://arugaz.herokuapp.com/api/indohot`).json()
                        const {
                            country,
                            durasi,
                            genre,
                            judul,
                            url
                        } = await dsa.result
                        await aksa.sendText(dari, `*Judul* : ${judul}\n*Durasi* : ${durasi}\n*Genre* : ${genre}\n*Negara* : ${country}\n*Link* : ${url}`, id)
                    }
                    break
                case `${prefix}cerpen`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    const skyaaa = await get.get('https://arugaz.herokuapp.com/api/cerpen').json()
                    aksa.reply(dari, skyaaa.result, id)
                    break
                case `${prefix}hilih`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    if (quotedMsg) {
                        const quoteText = quotedMsg.type == 'chat' ? quotedMsg.body : quotedMsg.type == 'image' ? quotedMsg.caption : ''
                        const skyaaara = await get.get('https://freerestapi.herokuapp.com/api/v1/hilih?kata=' + quoteText).json()
                        aksa.reply(dari, skyaaara.result, id)
                    } else {
                        const daasda = body.slice(7)
                        const skyaaara = await get.get('https://freerestapi.herokuapp.com/api/v1/hilih?kata=' + daasda).json()
                        aksa.reply(dari, skyaaara.result, id)
                    }
                    break
                case `${prefix}mock`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    if (quotedMsg) {
                        const quoteText = quotedMsg.type == 'chat' ? quotedMsg.body : quotedMsg.type == 'image' ? quotedMsg.caption : ''
                        const skyaaaras = await get.get('https://arugaz.herokuapp.com/api/bapakfont?kata=' + quoteText).json()
                        aksa.reply(dari, skyaaaras.result, id)
                    } else {
                        const daasdas = body.slice(6)
                        const skyaaaras = await get.get('https://arugaz.herokuapp.com/api/bapakfont?kata=' + daasdas).json()
                        aksa.reply(dari, skyaaaras.result, id)
                    }
                    break
                case `${prefix}lirik`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    if (args.length == 1) return aksa.reply(dari, 'Kirim perintah *!lirik <optional>*, contoh *!lirik aku bukan boneka*', id)
                    const lagu = body.slice(7)
                    const lirik = await liriklagu(lagu)
                    aksa.reply(dari, lirik, id)
                    break
                case `${prefix}chord`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    if (args.length === 1) return aksa.reply(dari, 'Kirim perintah *!chord <query>*, contoh *!chord aku bukan boneka*', id)
                    const query__ = body.slice(7)
                    const chord = await get.get(`https://mhankbarbars.herokuapp.com/api/chord?q=${query__}&apiKey=${apiKey}`).json()
                    if (chord.error) return aksa.reply(dari, chord.error, id)
                    aksa.reply(dari, chord.result, id)
                    break
                case `${prefix}say`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (!isGroupMsg) return aksa.reply(dari, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !ceklimit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    const doto = fs.readFileSync('./lib/say.json')
                    const dotoJson = JSON.parse(doto)
                    const rondIndox = Math.floor(Math.random() * dotoJson.length)
                    const rondKoy = dotoJson[rondIndox]
                    aksa.reply(dari, rondKoy, id)
                    break
                case `${prefix}addsay`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (args.length == 1) return aksa.reply(dari, `Kirim perintah *!addsay [teks]*, contoh *!addsay anjay*`, id)
                    const says = body.slice(8)
                    say.push(says)
                    fs.writeFileSync('./lib/say.json', JSON.stringify(say))
                    aksa.reply(dari, `Add ${says} sukses!`, id)
                    break
                case `${prefix}delsay`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (args.length == 1) return aksa.reply(dari, `Kirim perintah *!addsay [teks]*, contoh *!addsay anjay*`, id)
                    const sayso = body.slice(8)
                    let delsayso = say.indexOf(sayso)
                    say.splice(delsayso, 1)
                    fs.writeFileSync('./lib/say.json', JSON.stringify(say))
                    aksa.reply(dari, `Delete ${sayso} sukses!`, id)
                    break
                case `${prefix}saylist`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    let saylisto = `Random say list\nTotal : ${say.length}\n`
                    for (let i of say) {
                        saylisto += `☛ ${i}\n`
                    }
                    await aksa.reply(dari, saylisto, id)
                    break
                case `${prefix}quote`:
                case `${prefix}quotes`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    const quotez2 = await axios.get('https://tobz-api.herokuapp.com/api/randomquotes')
                    aksa.reply(dari, `➸ *Quotes* : ${quotez2.data.quotes}\n➸ *Author* : ${quotez2.data.author}`, id)
                    break
                case `${prefix}renungan`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    const agggg = await get.get(`https://api-jojo.herokuapp.com/api/renungan`).json()
                    try {
                        const {
                            Isi,
                            judul,
                            pesan
                        } = agggg
                        const rn = `➸ *Judul* : ${judul}\n➸ *Pesan* : ${pesan}\n➸ *Isi* : ${Isi}`
                        aksa.reply(dari, rn, id)
                    } catch (err) {
                        aksa.reply(dari, 'Error!', id)
                    }
                    break
                case `${prefix}ramalpasangan`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    if (args.length === 1) return aksa.reply(dari, 'Kirim perintah *!ramalpasangan [kamu|pasangan]*\nContoh : *!ramalpasangan Lulu|Cya*', id)
                    arg = body.trim().split('|')
                    if (arg.length >= 2) {
                        aksa.reply(dari, mess.wait, id)
                        const kamu = arg[0]
                        const pacar = arg[1]
                        const rpmn = rate[Math.floor(Math.random() * (rate.length))]
                        const rpmn2 = rate[Math.floor(Math.random() * (rate.length))]
                        const rpmn3 = rate[Math.floor(Math.random() * (rate.length))]
                        const rpmn4 = rate[Math.floor(Math.random() * (rate.length))]
                        const rpmn5 = rate[Math.floor(Math.random() * (rate.length))]
                        const rpmn6 = rate[Math.floor(Math.random() * (rate.length))]
                        const rjh2 = `*Hasil Pengamatan!*\nPasangan dengan nama ${kamu} dan ${pacar}\n\n➸ Cinta : ${rpmn}\n➸ Jodoh : ${rpmn2}\n➸ Kemiripan : ${rpmn3}\n➸ Kesukaan : ${rpmn4}\n➸ Kesamaan : ${rpmn5}\n➸ Kebucinan ${rpmn6}`
                        aksa.reply(dari, rjh2, id)
                    } else {
                        await aksa.reply(dari, 'Wrong Format!', id)
                    }
                    break
                case `${prefix}artinama`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    if (args.length === 1) return aksa.reply(dari, 'Kirim perintah *!artinama [query]*\nContoh : *!artinama tobz*', id)
                    try {
                        const resp = await axios.get('https://api.vhtear.com/artinama?nama=' + body.slice(9) + '&apikey=' + vhtear)
                        if (resp.data.error) return aksa.reply(dari, resp.data.error, id)
                        const anm2 = `➸ Artinama : ${resp.data.result.hasil}`
                        aksa.reply(dari, anm2, id)
                    } catch (err) {
                        console.error(err.message)
                        await aksa.sendFileFromUrl(dari, errorurl2, 'error.png', '💔️ Maaf, User tidak ditemukan')
                        aksa.sendText(ownerNumber, 'Artinama Error : ' + err)
                    }
                    break
                case `${prefix}googleimage`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    aksa.reply(dari, mess.wait, id)
                    argz = body.trim().split('|')
                    if (argz.length >= 2) {
                        const qwery = argz[1]
                        const jum = argz[2]
                        if (!qwery) return await aksa.reply(dari, `Kirim perintah *!googleimage [ |Query|Jumlah ]*, contoh = !googleimage |loli|3`, id)
                        if (!jum) return await aksa.reply(dari, `Jumlah gambar diperlukan, contoh = !googleimage |loli|3`, id)
                        if (jum >= 5) return await aksa.reply(dari, 'Jumlah terlalu banyak! Max 4', id)
                        var gis = require('g-i-s');
                        var opts = {
                            searchTerm: qwery
                        };
                        gis(opts, logResults);

                        function logResults(error, results) {
                            if (error) {
                                aksa.reply(dari, 'Maaf, Fitur Sedang Error', id)
                            } else {
                                const item = results.slice(0, jum)
                                item.forEach(async (res) => {
                                    console.log(res)
                                    const yurl = await urlShortener(res.url)
                                    aksa.sendImage(dari, res.url, null, `➸ Link : ${yurl}\n➸ Image size : ${res.height} x ${res.width}`)
                                    limitAdd(serial)
                                })
                            }
                        }
                    }
                    break
                case `${prefix}meme`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    const response = await axios.get('https://meme-api.herokuapp.com/gimme/wholesomeanimemes');
                    const {
                        postlink, title, subreddit, url, nsfw, spoiler
                    } = response.data
                    aksa.sendFileFromUrl(dari, `${url}`, 'meme.jpg', `${title}`)
                    break
                case `${prefix}yourpic`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (!isGroupMsg) return aksa.reply(dari, 'Fitur ini hanya bisa di gunakan dalam group', id)
                    for (let i = 0; i < mentionedJidList.length; i++) {
                        var ypic = await aksa.getProfilePicFromServer(mentionedJidList[i])
                        if (ypic === undefined) {
                            var ypfp = errorurl
                        } else {
                            var ypfp = ypic
                        }
                    }
                    aksa.sendFileFromUrl(dari, ypfp, 'pfpy.jpg', `Nih kak`)
                    break

                case `${prefix}mypic`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    const mpic = await aksa.getProfilePicFromServer(author)
                    if (mpic === undefined) {
                        var mpfp = errorurl
                    } else {
                        var mpfp = mpic
                    }
                    aksa.sendFileFromUrl(dari, mpfp, 'pfpm.jpg', `Nih kak`)
                    break
                case `${prefix}ssweb`:
                    if (!isGroupMsg) return aksa.reply(dari, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    if (args.length === 1) return aksa.reply(dari, 'Kirim perintah *@ssweb [linkWeb]*\nContoh : *@ssweb https://neonime.vip*', id)
                    const ssw = await axios.get('https://mhankbarbars.herokuapp.com/api/url2image?url=' + body.slice(7) + '&apiKey=' + apiKey)
                    const ssww = ssw.data
                    if (ssww.error) return aksa.reply(dari, ssww.error, id)
                    const ssw2 = `Filesize: ${ssww.filesize}`
                    aksa.sendFileFromUrl(dari, ssww.result, 'ssweb.jpg', ssw2, id)
                    break
                case `${prefix}covid`:
                    if (!isGroupMsg) return aksa.reply(dari, 'Perintah ini hanya bisa di gunakan dalam group', id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    arg = body.trim().split(' ')
                    console.log(...arg[1])
                    var slicedArgs = Array.prototype.slice.call(arg, 1);
                    console.log(slicedArgs)
                    const country = await slicedArgs.join(' ')
                    console.log(country)
                    const response2 = await axios.get('https://coronavirus-19-api.herokuapp.com/countries/' + country + '/')
                    const {
                        cases, todayCases, deaths, todayDeaths, active
                    } = response2.data
                    await aksa.sendText(dari, '🌎️ Covid Info - ' + country + ' 🌍️\n\n✨️ Total Cases: ' + `${cases}` + '\n📆️ Today\'s Cases: ' + `${todayCases}` + '\n☣️ Total Deaths: ' + `${deaths}` + '\n☢️ Today\'s Deaths: ' + `${todayDeaths}` + '\n⛩️ Active Cases: ' + `${active}` + '.')
                    break

                case `${prefix}resepmasakan`:
                    if (!isGroupMsg) return aksa.reply(dari, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    if (args.length === 1) return aksa.reply(dari, 'Kirim perintah *@resepmasakan [optional]*\nContoh *@resepmasakan rawon*', id)
                    arg = body.trim().split(' ')
                    console.log(...arg[1])
                    var slicedArgs = Array.prototype.slice.call(arg, 1);
                    console.log(slicedArgs)
                    const rmk = await slicedArgs.join(' ')
                    console.log(rmk)
                    try {
                        const resp = await axios.get('https://api.vhtear.com/resepmasakan?query=' + rmk + '&apikey=' + vhtear)
                        const {
                            bahan,
                            cara,
                            image,
                            title
                        } = resp.data.result
                        const rmk3 = `*Resep Ditemukan!*
➸ *Judul:* ${title}
➸ *Bahan:* ${bahan}
➸ *Cara:* ${cara}`

                        const pictk = await bent("buffer")(image)
                        const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
                        aksa.sendImage(dari, base64, title, rmk3)
                    } catch (err) {
                        console.error(err.message)
                        await aksa.sendFileFromUrl(dari, errorurl2, 'error.png', '💔️ Maaf, Resep tidak ditemukan')
                        aksa.sendText(ownerNumber, 'Resepmasakan Error : ' + err)
                    }
                    break
                case `${prefix}slap`: //thanks to SASHA BOT
                    arg = body.trim().split(' ')
                    const jejiik = author.replace('@c.us', '')
                    await aksa.sendGiphyAsSticker(dari, 'https://media.giphy.com/media/S8507sBJm1598XnsgD/source.gif')
                    aksa.sendTextWithMentions(dari, `${prefix}` + jejiik + ' *slapped* ' + arg[1])
                    break
                case `${prefix}hug`: //thanks to SASHA BOT
                    arg = body.trim().split(' ')
                    const janjing = author.replace('@c.us', '')
                    await aksa.sendGiphyAsSticker(dari, 'https://media.giphy.com/media/od5H3PmEG5EVq/giphy.gif')
                    aksa.sendTextWithMentions(dari, `${prefix}` + janjing + ' *peyuuuk* ' + arg[1])
                    break
                case `${prefix}nye`: //thanks to SASHA BOT
                    arg = body.trim().split('')
                    const jancuk7 = author.replace('@c.us', '')
                    await aksa.sendGiphyAsSticker(dari, 'https://media.giphy.com/media/cute-baka-13LunYkkBppSBa/giphy.gif')
                    aksa.sendTextWithMentions(dari, `${prefix}` + jancuk7 + ' *nye nye ' + arg[1])
                    break
                case `${prefix}pat`: //thanks to SASHA BOT
                    arg = body.trim().split(' ')
                    const jartod = author.replace('@c.us', '')
                    await aksa.sendGiphyAsSticker(dari, 'https://media.giphy.com/media/Z7x24IHBcmV7W/giphy.gif')
                    aksa.sendTextWithMentions(dari, `${prefix}` + jartod + ' *👈 Si Mengelu-elus si👉* ' + arg[1])
                    break


                    //education-------------------------------------------------------------------------------------------------------------------------------

                case `${prefix}nulis`:
                case `${prefix}tulis`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    if (args.length === 1) return aksa.reply(dari, 'Kirim perintah *!nulis <teks>*. Jika kesulitan silakan lihat contoh di *!readme*', id)
                    const nulis = encodeURIComponent(body.slice(7))
                    aksa.reply(dari, mess.wait, id)
                    await aksa.sendFileFromUrl(dari, `https://api.vhtear.com/write?text=${nulis}&apikey=${vhtear}`, 'nulis.jpg', `Nih, jangan jadi males nulis yaa ${pushname}!❤️`, id)
                        .then(() => console.log('Success sending write image!'))
                        .catch(async (err) => {
                            console.error(err)
                            await aksa.reply(dari, 'Error!', id)
                        })
                    break
                case `${prefix}kbbi`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    if (args.length === 1) return aksa.reply(dari, 'Kirim perintah *!kbbi <teks>*. Jika kesulitan silakan lihat contoh di *!readme*', id)
                    const querykbbi = (body.slice(6))
                    try {
                        const resp = await axios.get(`https://api.vhtear.com/kbbi?query=${querykbbi}&apikey=${vhtear}`)
                        if (resp.data.error) return aksa.reply(dari, resp.data.error, id)
                        const kbbu = `➸ *Query* : ${querykbbi}\n➸ *Hasil* : ${resp.data.result.hasil}`
                        aksa.reply(dari, kbbu, id)
                    } catch (err) {
                        console.error(err.message)
                        await aksa.sendFileFromUrl(dari, errorurl2, 'error.png', '💔️ Maaf, tidak ditemukan')
                        aksa.sendText(ownerNumber, 'KBBI Error : ' + err)
                    }
                    break
                case `${prefix}wiki`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    if (args.length === 1) return aksa.reply(dari, 'Kirim perintah *!wiki <query>*\nContoh : *!wiki Indonesia*', id)
                    const query_ = body.slice(6)
                    const wiki = await get.get(`https://mhankbarbars.herokuapp.com/api/wiki?q=${query_}&lang=id&apiKey=${apiKey}`).json()
                    if (wiki.error) {
                        aksa.reply(dari, wiki.error, id)
                    } else {
                        aksa.reply(dari, `➸ *Query* : ${query_}\n\n➸ *Result* : ${wiki.result}`, id)
                    }
                    break
                case `${prefix}puisi1`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    const skyaaaz = await get.get('https://arugaz.herokuapp.com/api/puisi1').json()
                    aksa.reply(dari, skyaaaz.result, id)
                    break
                case `${prefix}puisi2`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    const skyaaaq = await get.get('https://arugaz.herokuapp.com/api/puisi2').json()
                    aksa.reply(dari, skyaaaq.result, id)
                    break
                case `${prefix}puisi3`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    const skyaaar = await get.get('https://arugaz.herokuapp.com/api/puisi3').json()
                    aksa.reply(dari, skyaaar.result, id)
                    break
                case `${prefix}brainly`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    if (args.length === 1) return aksa.reply(dari, 'Kirim perintah *!brainly <teks>*. Jika kesulitan silakan lihat contoh di *!readme*', id)
                    const querykbbia = (body.slice(9))
                    try {
                        const resp = await axios.get(`https://api.vhtear.com/branly?query=${querykbbia}&apikey=${vhtear}`)
                        if (resp.data.error) return aksa.reply(dari, resp.data.error, id)
                        const kbbua = `➸ *Pertanyaan* : ${querykbbia}\n➸ ${resp.data.result.data}`
                        aksa.reply(dari, kbbua, id)
                    } catch (err) {
                        console.error(err.message)
                        await aksa.sendFileFromUrl(dari, errorurl2, 'error.png', '💔️ Maaf, tidak ditemukan')
                        aksa.sendText(ownerNumber, 'Brainly Error : ' + err)
                    }
                    break

                    // ON/OFF & admin group menu--------------------------------------------------------------------------------------------------------------------------------------------------------

                case `${prefix}nobadword`:
                    if (!isGroupMsg) return aksa.reply(dari, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                    if (!isGroupAdmins) return aksa.reply(dari, 'Perintah ini hanya bisa di gunakan oleh Admin group!', id)
                    if (args.length === 1) return aksa.reply(dari, 'Pilih enable atau disable!', id)
                    if (args[1].toLowerCase() === 'enable') {
                        badword.push(chat.id)
                        fs.writeFileSync('./lib/badword.json', JSON.stringify(badword))
                        aksa.reply(dari, 'Fitur Anti BadWord berhasil di aktifkan di group ini!', id)
                    } else if (args[1].toLowerCase() === 'disable') {
                        badword.splice(chat.id, 1)
                        fs.writeFileSync('./lib/badword.json', JSON.stringify(badword))
                        aksa.reply(dari, 'Fitur Anti BadWord berhasil di nonaktifkan di group ini!', id)
                    } else {
                        aksa.reply(dari, 'Pilih enable atau disable udin!', id)
                    }
                    break
                case `${prefix}nolinkgc`:
                    if (!isGroupMsg) return aksa.reply(dari, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                    if (!isGroupAdmins) return aksa.reply(dari, 'Perintah ini hanya bisa di gunakan oleh Admin group!', id)
                    if (args.length === 1) return aksa.reply(dari, 'Pilih enable atau disable!', id)
                    if (args[1].toLowerCase() === 'enable') {
                        NoLink.push(chat.id)
                        fs.writeFileSync('./lib/NoLink.json', JSON.stringify(NoLink))
                        aksa.reply(dari, 'Fitur NoLink berhasil di aktifkan di group ini!', id)
                    } else if (args[1].toLowerCase() === 'disable') {
                        NoLink.splice(chat.id, 1)
                        fs.writeFileSync('./lib/NoLink.json', JSON.stringify(NoLink))
                        aksa.reply(dari, 'Fitur NoLink berhasil di nonaktifkan di group ini!', id)
                    } else {
                        aksa.reply(dari, 'Pilih enable atau disable udin!', id)
                    }
                    break
                case `${prefix}nsfw`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (!isGroupMsg) return aksa.reply(dari, 'Perintah ini hanya bisa digunakan dalam group!', id)
                    if (!isGroupAdmins) return aksa.reply(dari, 'Perintah ini hanya bisa digunakan oleh Admin group!', id)
                    if (args.length === 1) return aksa.reply(dari, 'Pilih enable atau disable!', id)
                    if (args[1].toLowerCase() === 'enable') {
                        nsfw_.push(chat.id)
                        fs.writeFileSync('./lib/NSFW.json', JSON.stringify(nsfw_))
                        aksa.reply(dari, 'NSWF Command berhasil diaktifkan di group ini! kirim perintah *!nsfwMenu* untuk mengetahui menu', id)
                    } else if (args[1].toLowerCase() === 'disable') {
                        nsfw_.splice(chat.id, 1)
                        fs.writeFileSync('./lib/NSFW.json', JSON.stringify(nsfw_))
                        aksa.reply(dari, 'NSFW Command berhasil di nonaktifkan di group ini!', id)
                    } else {
                        aksa.reply(dari, 'Pilih enable atau disable!', id)
                    }
                    break
                case `${prefix}welcome`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (!isGroupMsg) return aksa.reply(dari, 'Perintah ini hanya bisa digunakan dalam group!', id)
                    if (!isGroupAdmins) return aksa.reply(dari, 'Perintah ini hanya bisa digunakan oleh Admin group!', id)
                    if (args.length === 1) return aksa.reply(dari, 'Pilih enable atau disable!', id)
                    if (args[1].toLowerCase() === 'enable') {
                        welkom.push(chat.id)
                        fs.writeFileSync('./lib/welcome.json', JSON.stringify(welkom))
                        aksa.reply(dari, 'Fitur welcome berhasil di aktifkan di group ini!', id)
                    } else if (args[1].toLowerCase() === 'disable') {
                        welkom.splice(chat.id, 1)
                        fs.writeFileSync('./lib/welcome.json', JSON.stringify(welkom))
                        aksa.reply(dari, 'Fitur welcome berhasil di nonaktifkan di group ini!', id)
                    } else {
                        aksa.reply(dari, 'Pilih enable atau disable!', id)
                    }
                    break
                case `${prefix}left`:
                    if (!isGroupMsg) return aksa.reply(dari, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                    if (!isGroupAdmins) return aksa.reply(dari, 'Perintah ini hanya bisa di gunakan oleh Admin group!', id)
                    if (args.length === 1) return aksa.reply(dari, 'Pilih enable atau disable!', id)
                    if (args[1].toLowerCase() === 'enable') {
                        left.push(chat.id)
                        fs.writeFileSync('./lib/left.json', JSON.stringify(left))
                        aksa.reply(dari, 'Fitur left berhasil di aktifkan di group ini!', id)
                    } else if (args[1].toLowerCase() === 'disable') {
                        left.splice(chat.id, 1)
                        fs.writeFileSync('./lib/left.json', JSON.stringify(left))
                        aksa.reply(dari, 'Fitur left berhasil di nonaktifkan di group ini!', id)
                    } else {
                        aksa.reply(dari, 'Pilih enable atau disable udin!', id)
                    }
                    break
                case `${prefix}simi`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (!isGroupMsg) return aksa.reply(dari, 'Fitur ini hanya bisa digunakan dalam group', id)
                    if (!isGroupAdmins) return aksa.reply(dari, 'Fitur ini hanya bisa digunakan oleh admin group', id)
                    if (args.length === 1) return aksa.reply(dari, 'Pilih enable atau disable!', id)
                    if (args[1].toLowerCase() === 'enable') {
                        simi_.push(chat.id)
                        fs.writeFileSync('./lib/Simsimi.json', JSON.stringify(simi_))
                        aksa.reply(dari, 'Simsimi berhasil di aktifkan! Kirim perintah *[teks]*\nContoh : ! halo', id)
                    } else if (args[1].toLowerCase() === 'disable') {
                        simi_.splice(chat.id, 1)
                        fs.writeFileSync('./lib/Simsimi.json', JSON.stringify(simi_))
                        aksa.reply(dari, 'Simsimi berhasil di nonaktifkan', id)
                    } else {
                        aksa.reply(dari, 'Pilih enable atau disable!', id)
                    }
                    break
                case `${prefix}linkgroup`:
                    if (!isBotGroupAdmins) return aksa.reply(dari, 'Perintah ini hanya bisa digunakan ketika Lucya menjadi admin', id)
                    if (isGroupMsg) {
                        const inviteLink = await aksa.getGroupInviteLink(groupId);
                        aksa.sendLinkWithAutoPreview(dari, inviteLink, `\nLink group : `)
                    } else {
                        aksa.reply(dari, 'Perintah ini hanya bisa digunakan dalam group!', id)
                    }
                    break
                case `${prefix}resetlinkgroup`:
                    if (!isGroupMsg) return aksa.reply(dari, `Fitur ini hanya bisa di gunakan dalam group`, id)
                    if (!isGroupAdmins) return aksa.reply(dari, `Fitur ini hanya bisa di gunakan oleh admin group`, id)
                    if (!isBotGroupAdmins) return aksa.reply(dari, `Fitur ini hanya bisa di gunakan ketika bot menjadi admin`, id)
                    if (isGroupMsg) {
                        await aksa.revokeGroupInviteLink(groupId);
                        aksa.sendTextWithMentions(dari, `Link group telah direset oleh admin @${sender.id.replace('@c.us', '')}`)
                    }
                    break
                case `${prefix}adminlist`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (!isGroupMsg) return aksa.reply(dari, 'Perintah ini hanya bisa digunakan dalam group!', id)
                    let mimin = ''
                    for (let admon of groupAdmins) {
                        mimin += `➸ @${admon.replace(/@c.us/g, '')}\n`
                    }
                    await aksa.sendTextWithMentions(dari, mimin)
                    break
                case `${prefix}ownergroup`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (!isGroupMsg) return aksa.reply(dari, 'Perintah ini hanya bisa digunakan dalam group!', id)
                    const Owner_ = chat.groupMetadata.owner
                    await aksa.sendTextWithMentions(dari, `Owner Group : @${Owner_}`)
                    break
                case `${prefix}mentionall`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (!isGroupMsg) return aksa.reply(dari, 'Perintah ini hanya bisa digunakan dalam group!', id)
                    if (!isGroupAdmins) return aksa.reply(dari, 'Perintah ini hanya bisa digunakan oleh admin group', id)
                    const groupMem = await aksa.getGroupMembers(groupId)
                    let hehe = `${body.slice(12)} - ${pushname}\n`
                    for (let i = 0; i < groupMem.length; i++) {
                        hehe += '-'
                        hehe += ` @${groupMem[i].id.replace(/@c.us/g, '')}\n`
                    }
                    hehe += ''
                    await aksa.sendTextWithMentions(dari, hehe)
                    break
                case `${prefix}kickall`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (!isGroupMsg) return aksa.reply(dari, 'Perintah ini hanya bisa digunakan dalam group!', id)
                    const isGroupOwner = sender.id === chat.groupMetadata.owner
                    if (!isGroupOwner) return aksa.reply(dari, 'Perintah ini hanya bisa digunakan oleh Owner group', id)
                    if (!isBotGroupAdmins) return aksa.reply(dari, 'Perintah ini hanya bisa digunakan ketika Lucya menjadi admin', id)
                    const allMem = await aksa.getGroupMembers(groupId)
                    for (let i = 0; i < allMem.length; i++) {
                        if (groupAdmins.includes(allMem[i].id)) {
                            console.log('Upss this is Admin group')
                        } else {
                            await aksa.removeParticipant(groupId, allMem[i].id)
                        }
                    }
                    aksa.reply(dari, 'Succes kick all member', id)
                    break
                case `${prefix}add`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    const orang = args[1]
                    if (!isGroupMsg) return aksa.reply(dari, 'Fitur ini hanya bisa digunakan dalam group', id)
                    if (args.length === 1) return aksa.reply(dari, 'Untuk menggunakan fitur ini, kirim perintah *!add* 628xxxxx', id)
                    if (!isGroupAdmins) return aksa.reply(dari, 'Perintah ini hanya bisa digunakan oleh admin group', id)
                    if (!isBotGroupAdmins) return aksa.reply(dari, 'Perintah ini hanya bisa digunakan ketika Lucya menjadi admin', id)
                    try {
                        await aksa.addParticipant(dari, `${orang}@c.us`)
                    } catch {
                        aksa.reply(dari, mess.error.Ad, id)
                    }
                    break
                case `${prefix}kick`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    if (!isGroupMsg) return aksa.reply(dari, 'Fitur ini hanya bisa digunakan dalam group', id)
                    if (!isGroupAdmins) return aksa.reply(dari, 'Perintah ini hanya bisa digunakan oleh admin group', id)
                    if (!isBotGroupAdmins) return aksa.reply(dari, 'Perintah ini hanya bisa digunakan ketika Lucya menjadi admin', id)
                    if (mentionedJidList.length === 0) return aksa.reply(dari, 'Untuk menggunakan Perintah ini, kirim perintah *!kick* @tagmember', id)
                    await aksa.sendText(dari, `Berdasar perintah ${pushname}, *Lucya* mengeluarkan:\n${mentionedJidList.join('\n')}`)
                    for (let i = 0; i < mentionedJidList.length; i++) {
                        if (groupAdmins.includes(mentionedJidList[i])) return aksa.reply(dari, mess.error.Ki, id)
                        await aksa.removeParticipant(groupId, mentionedJidList[i])
                    }
                    break
                case `${prefix}leave`:
                    if (!isGroupMsg) return aksa.reply(dari, 'Perintah ini hanya bisa digunakan dalam group', id)
                    if (!isGroupAdmins) return aksa.reply(dari, 'Perintah ini hanya bisa digunakan oleh admin group', id)
                    await aksa.sendText(dari, 'bye').then(() => aksa.leaveGroup(groupId))
                    break
                case `${prefix}oleave`:
                    if (!isGroupMsg) return aksa.reply(dari, 'Perintah ini hanya bisa digunakan dalam group', id)
                    if (!isAdmin) return aksa.reply(dari, 'Perintah ini hanya bisa digunakan oleh admin group', id)
                    await aksa.sendText(dari, 'bye').then(() => aksa.leaveGroup(groupId))
                    break
                case `${prefix}promote`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    if (!isGroupMsg) return aksa.reply(dari, 'Fitur ini hanya bisa digunakan dalam group', id)
                    if (!isGroupAdmins) return aksa.reply(dari, 'Fitur ini hanya bisa digunakan oleh admin group', id)
                    if (!isBotGroupAdmins) return aksa.reply(dari, 'Fitur ini hanya bisa digunakan ketika Lucya menjadi admin', id)
                    if (mentionedJidList.length === 0) return aksa.reply(dari, 'Untuk menggunakan fitur ini, kirim perintah *!promote* @tagmember', id)
                    if (mentionedJidList.length >= 2) return aksa.reply(dari, 'Maaf, perintah ini hanya dapat digunakan kepada 1 user.', id)
                    if (groupAdmins.includes(mentionedJidList[0])) return aksa.reply(dari, 'Maaf, user tersebut sudah menjadi admin.', id)
                    await aksa.promoteParticipant(groupId, mentionedJidList[0])
                    await aksa.sendTextWithMentions(dari, `Perintah diterima, menambahkan @${mentionedJidList[0]} sebagai admin.`)
                    break
                case `${prefix}demote`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    if (!isGroupMsg) return aksa.reply(dari, 'Fitur ini hanya bisa digunakan dalam group', id)
                    if (!isGroupAdmins) return aksa.reply(dari, 'Fitur ini hanya bisa digunakan oleh admin group', id)
                    if (!isBotGroupAdmins) return aksa.reply(dari, 'Fitur ini hanya bisa digunakan ketika Lucya menjadi admin', id)
                    if (mentionedJidList.length === 0) return aksa.reply(dari, 'Untuk menggunakan fitur ini, kirim perintah *!demote* @tagadmin', id)
                    if (mentionedJidList.length >= 2) return aksa.reply(dari, 'Maaf, perintah ini hanya dapat digunakan kepada 1 orang.', id)
                    if (!groupAdmins.includes(mentionedJidList[0])) return aksa.reply(dari, 'Maaf, user tersebut tidak menjadi admin.', id)
                    await aksa.demoteParticipant(groupId, mentionedJidList[0])
                    await aksa.sendTextWithMentions(dari, `Perintah diterima, menghapus jabatan @${mentionedJidList[0]}.`)
                    break
                case `${prefix}delete`:
                case `${prefix}del`:
                    if (!isGroupMsg) return aksa.reply(dari, 'Fitur ini hanya bisa digunakan dalam group', id)
                    if (!isGroupAdmins) return aksa.reply(dari, 'Fitur ini hanya bisa digunakan oleh admin group', id)
                    if (!quotedMsg) return aksa.reply(dari, 'Salah!!, kirim perintah *!delete <tagpesanbot>*', id)
                    if (!quotedMsgObj.fromMe) return aksa.reply(dari, 'Salah!, Bot tidak bisa mengahpus chat user lain!', id)
                    aksa.deleteMessage(quotedMsgObj.chatId, quotedMsgObj.id, false)
                    break
                case `${prefix}odel`:
                    if (!isGroupMsg) return aksa.reply(dari, 'Fitur ini hanya bisa digunakan dalam group', id)
                    if (!isAdmin) return aksa.reply(dari, 'Fitur ini hanya bisa digunakan oleh admin Lucya', id)
                    if (!quotedMsg) return aksa.reply(dari, 'Salah!!, kirim perintah *!delete <tagpesanbot>*', id)
                    if (!quotedMsgObj.fromMe) return aksa.reply(dari, 'Salah!, Bot tidak bisa mengahpus chat user lain!', id)
                    aksa.deleteMessage(quotedMsgObj.chatId, quotedMsgObj.id, false)
                    break
                case `${prefix}sider`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (!isGroupMsg) return aksa.reply(dari, 'Hanya untuk di dalam group')
                    if (!quotedMsg) return aksa.reply(dari, 'Tolong reply pesan')
                    if (!quotedMsgObj) return aksa.reply(dari, 'Tolong reply pesan')
                    try {
                        const reader = await aksa.getMessageReaders(quotedMsgObj.id)
                        let lista = ''
                        for (let pembaca of reader) {
                            lista += `- @${pembaca.id.replace(/@c.us/g,'')}\n`
                        }
                        aksa.sendTextWithMentions(dari, `hmm read doang..\n${lista}`)
                    } catch (err) {
                        console.log(err)
                        aksa.reply(dari, 'Maaf, Belum ada yang membaca pesan')
                    }
                    break
                case `${prefix}closegc`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (!isGroupMsg) return aksa.reply(dari, 'Perintah ini hanya bisa digunakan dalam group!', id)
                    if (!isGroupAdmins) return aksa.reply(dari, 'Perintah ini hanya untuk Admin Grup!', id)
                    aksa.setGroupToAdminsOnly(groupId, true)
                    break
                case `${prefix}opengc`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (!isGroupMsg) return aksa.reply(dari, 'Perintah ini hanya bisa digunakan dalam group!', id)
                    if (!isGroupAdmins) return aksa.reply(dari, 'Perintah ini hanya untuk Admin Grup!', id)
                    aksa.setGroupToAdminsOnly(groupId, false)
                    break
                case `${prefix}setdesk`:
                    if (isGroupMsg) {
                        if (isGroupAdmins) {
                            try {
                                const desk = body.slice(9)
                                await aksa.setGroupDescription(dari, `${desk}`, id)
                            } catch {
                                aksa.reply(dari, 'Terjadi kesalahan, tidak dapat mengubah deskripsi grup', message)
                            }
                        } else {
                            aksa.reply(dari, 'Maaf, fitur ini hanya untuk owner grup', message)
                        }
                    } else {
                        aksa.reply(dari, 'Fitur ini hanya bisa di gunakan dalam grup', message)
                    }
                    break

                    //weebs menu--------------------------------------------------------------------------------------------------------------------------------

                case `${prefix}downloadanime`:
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !ceklimit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    if (args.length === 1) return aksa.reply(dari, `Kirim perintah *!downloadanime [query]*\nContoh : *!downloadanime darling in the franxx*`, id)
                    const animeqq = await axios.get('https://mhankbarbars.herokuapp.com/api/kuso?q=' + body.slice(15) + '&apiKey=' + apiKey)
                    if (animeqq.data.error) return aksa.reply(dari, animeqq.data.error, id)
                    const res_animeqq = `${animeqq.data.title}\n\n${animeqq.data.info}\n\n${animeqq.data.sinopsis}\n\n${animeqq.data.link_dl}`
                    aksa.sendFileFromUrl(dari, animeqq.data.thumb, 'kusonime.jpg', res_animeqq, id)
                    break
                case `${prefix}downloadmanga`:
                    if (!isGroupMsg) return aksa.reply(dari, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !ceklimit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    if (args.length === 1) return aksa.reply(dari, `Kirim perintah *!downloadmanga [query]*\nContoh : *!downloadmanga darling in the franxx*`, id)
                    const animep = await axios.get('https://mhankbarbars.herokuapp.com/api/komiku?q=' + body.slice(15) + '&apiKey=' + apiKey)
                    if (animep.data.error) return aksa.reply(dari, animep.data.error, id)
                    const res_animep = `${animep.data.info}\n\n${animep.data.sinopsis}\n\n${animep.data.link_dl}`
                    aksa.sendFileFromUrl(dari, animep.data.thumb, 'komiku.jpg', res_animep, id)
                    break
                case `${prefix}nhinfo`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    if (!args[1] || args.length >= 3) return
                    nhentai(args[1]).then(nhinfo => {
                        aksa.reply(nhinfo)
                    }).catch(err => {
                        aksa.reply('Kode nuklir tidak valid!')
                    })
                    break
                case `${prefix}nhview`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    if (isGroupMsg) {
                        if (!isNsfw) return aksa.reply(dari, 'Command/Perintah NSFW belum diaktifkan di group ini!', id)
                        if (args.length === 1) return aksa.reply(dari, 'Kirim perintah *!nhview [212121]*\nContoh : *!nhview 321421*', id)
                        const nhsh = body.slice(11)
                        const nhsh2 = await axios.get('https://mnazria.herokuapp.com/api/nhentai?code=' + nhsh)
                        for (let i = 0; i < nhsh2.length; i++) {
                            await aksa.sendImage(dari, nhsh2[i].data, 'thumbserc.jpg', '', id)
                        }
                    }
                    break
                case `${prefix}kpop`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    if (args.length === 1) return aksa.reply(dari, `Untuk menggunakan !kpop\nSilahkan ketik: !kpop [query]\nContoh: !kpop bts\n\nquery yang tersedia:\nblackpink, exo, bts`, id)
                    if (args[1] === 'blackpink' || args[1] === 'exo' || args[1] === 'bts') {
                        fetch('https://raw.githubusercontent.com/tobzZ/grabbed-results/main/random/kpop/' + args[1] + '.txt')
                            .then(res => res.text())
                            .then(body => {
                                let randomkpop = body.split('\n')
                                let randomkpopx = randomkpop[Math.floor(Math.random() * randomkpop.length)]
                                aksa.sendFileFromUrl(dari, randomkpopx, '', 'nih..', id)
                            })
                            .catch(() => {
                                aksa.reply(dari, 'Ada yang eror!', id)
                            })
                    } else {
                        aksa.reply(dari, `Maaf query tidak tersedia. Silahkan ketik !kpop untuk melihat list query`)
                    }
                    break
                case `${prefix}wait`:
                    if (!isGroupMsg) return aksa.reply(dari, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    if (isMedia && type === 'image' || quotedMsg && quotedMsg.type === 'image') {
                        if (isMedia) {
                            var mediaData = await decryptMedia(message, uaOverride)
                        } else {
                            var mediaData = await decryptMedia(quotedMsg, uaOverride)
                        }
                        const fetch = require('node-fetch')
                        const imgBS4 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                        aksa.reply(dari, 'Searching....', id)
                        fetch('https://trace.moe/api/search', {
                                method: 'POST',
                                body: JSON.stringify({
                                    image: imgBS4
                                }),
                                headers: {
                                    "Content-Type": "application/json"
                                }
                            })
                            .then(respon => respon.json())
                            .then(resolt => {
                                if (resolt.docs && resolt.docs.length <= 0) {
                                    aksa.reply(dari, 'Maaf, saya tidak tau ini anime apa', id)
                                }
                                const {
                                    is_adult,
                                    title,
                                    title_chinese,
                                    title_romaji,
                                    title_english,
                                    episode,
                                    similarity,
                                    filename,
                                    at,
                                    tokenthumb,
                                    anilist_id
                                } = resolt.docs[0]
                                teks = ''
                                if (similarity < 0.92) {
                                    teks = '*Saya memiliki keyakinan rendah dalam hal ini* :\n\n'
                                }
                                teks += `➸ *Title Japanese* : ${title}\n➸ *Title chinese* : ${title_chinese}\n➸ *Title Romaji* : ${title_romaji}\n➸ *Title English* : ${title_english}\n`
                                teks += `➸ *Ecchi* : ${is_adult}\n`
                                teks += `➸ *Eps* : ${episode.toString()}\n`
                                teks += `➸ *Kesamaan* : ${(similarity * 100).toFixed(1)}%\n`
                                var video = `https://media.trace.moe/video/${anilist_id}/${encodeURIComponent(filename)}?t=${at}&token=${tokenthumb}`;
                                aksa.sendFileFromUrl(dari, video, 'nimek.mp4', teks, id).catch(() => {
                                    aksa.reply(dari, teks, id)
                                })
                            })
                            .catch(() => {
                                aksa.reply(dari, 'Error !', id)
                            })
                    } else {
                        aksa.sendFileFromUrl(dari, tutor, 'Tutor.jpg', 'Neh contoh mhank!', id)
                    }
                    break
                case `${prefix}nsfwmenu`:
                    if (!isNsfw) return
                    aksa.reply(dari, nsfwmenu(), id)
                    break
                case `${prefix}anime`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    if (args.length === 1) return aksa.reply(dari, 'Kirim perintah *!anime <query>*\nContoh : *!anime darling in the franxx*', id)
                    const animeku = await get.get(`https://mhankbarbars.herokuapp.com/api/kuso?q=${body.slice(7)}&apiKey=${apiKey}`).json()
                    if (animeku.error) return aksa.reply(dari, animeku.error, id)
                    const res_animeku = `Title: *${animeku.title}*\n\n${animeku.info}\n\nSinopsis: ${animeku.sinopsis}\n\nLink Download:\n${animeku.link_dl}`
                    aksa.sendFileFromUrl(dari, animeku.thumb, 'kusonime.jpg', res_animeku, id)
                    break
                case `${prefix}nekopoi`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    if (isGroupMsg) {
                        if (!isNsfw) return aksa.reply(dari, 'Command/Perintah NSFW belum diaktifkan di group ini!', id)
                        rugapoi.getLatest()
                            .then((result) => {
                                rugapoi.getVideo(result.link)
                                    .then((res) => {
                                        let heheq = '\n'
                                        for (let i = 0; i < res.links.length; i++) {
                                            heheq += `${res.links[i]}\n`
                                        }
                                        aksa.reply(dari, `Title: ${res.title}\n\nLink:\n${heheq}\nmasih tester bntr :v`)
                                    })
                            })
                            .catch(() => {
                                aksa.reply(dari, 'Ada yang Error!', id)
                            })
                    }
                    break
                case `${prefix}otakudesu`:
                    if (!isGroupMsg) return aksa.reply(dari, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    if (args.length === 1) return aksa.reply(dari, 'Kirim perintah *@otakudesu [query]*\nContoh : *@otakudesu darling in the franxx*', id)
                    const animes = await axios.get('https://mhankbarbars.herokuapp.com/api/otakudesu?q=' + body.slice(7) + '&apiKey=' + apiKey)
                    if (animes.data.error) return aksa.reply(dari, animes.data.error, id)
                    const res_animes = `${animes.data.title}\n\n${animes.data.info}\n\n${animes.data.sinopsis}`
                    aksa.sendFileFromUrl(dari, animes.data.thumb, 'otakudesu.jpg', res_animes, id)
                    break
                case `${prefix}kusonime`:
                    if (!isGroupMsg) return aksa.reply(dari, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    if (args.length === 1) return aksa.reply(dari, 'Kirim perintah *@kusonime [query]*\nContoh : *@kusonime darling in the franxx*', id)
                    const animeq = await axios.get('https://mhankbarbars.herokuapp.com/api/kuso?q=' + body.slice(7) + '&apiKey=' + apiKey)
                    if (animeq.data.error) return aksa.reply(dari, animeq.data.error, id)
                    const res_animeq = `${animeq.data.title}\n\n${animeq.data.info}\n\n${animeq.data.sinopsis}\n\n${animeq.data.link_dl}`
                    aksa.sendFileFromUrl(dari, animeq.data.thumb, 'kusonime.jpg', res_animeq, id)
                    break
                case `${prefix}dewabatch`:
                    if (!isGroupMsg) return aksa.reply(dari, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    if (args.length === 1) return aksa.reply(dari, 'Kirim perintah *@dewabatch [query]*\nContoh : *@dewabatch darling in the franxx*', id)
                    const animek = await axios.get('https://mhankbarbars.herokuapp.com/api/dewabatch?q=' + body.slice(7) + '&apiKey=' + apiKey)
                    if (animek.data.error) return aksa.reply(dari, animek.data.error, id)
                    const res_animek = `${animek.data.result}\n\n${animek.data.sinopsis}`
                    aksa.sendFileFromUrl(dari, animek.data.thumb, 'dewabatch.jpg', res_animek, id)
                    break
                case `${prefix}komiku`:
                    if (!isGroupMsg) return aksa.reply(dari, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    if (args.length === 1) return aksa.reply(dari, 'Kirim perintah *@komiku [query]*\nContoh : *@komiku darling in the franxx*', id)
                    const animepo = await axios.get('https://mhankbarbars.herokuapp.com/api/komiku?q=' + body.slice(7) + '&apiKey=' + apiKey)
                    if (animepo.data.error) return aksa.reply(dari, animepo.data.error, id)
                    const res_animepo = `${animepo.data.info}\n\n${animepo.data.sinopsis}\n\n${animepo.data.link_dl}`
                    aksa.sendFileFromUrl(dari, animepo.data.thumb, 'komiku.jpg', res_animepo, id)
                    break
                case `${prefix}nhview`:
                    if (!isGroupMsg) return aksa.reply(dari, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                    if (args.length === 1) return aksa.reply(dari, 'Kirim perintah *@nhview [212121]*\nContoh : *@nhview 321421*', id)
                    const nhsh = body.slice(11)
                    const nhsh2 = await axios.get('https://mnazria.herokuapp.com/api/nhentai?code=' + nhsh)
                    for (let i = 0; i < nhsh2.length; i++) {
                        await aksa.sendImage(dari, nhsh2[i].data, 'thumbserc.jpg', '', id)
                    }
                    break
                case `${prefix}loli`:
                    if (!isGroupMsg) return aksa.reply(dari, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    const loli = await axios.get(`https://api.vhtear.com/randomloli&apikey=${vhtear}`)
                    const loly = loli.data.result
                    aksa.sendFileFromUrl(dari, loly.result, 'loli.jpeg', '*LOLI*', id)
                    break
                case `${prefix}shota`:
                    if (!isGroupMsg) return aksa.reply(dari, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    const imageToBase64 = require('image-to-base64')
                    var shouta = ['shota anime', 'anime shota'];
                    var shotaa = shouta[Math.floor(Math.random() * shouta.length)];
                    var urlshot = "https://api.fdci.se/rep.php?gambar=" + shotaa;

                    axios.get(urlshot)
                        .then((result) => {
                            var sht = JSON.parse(JSON.stringify(result.data));
                            var shotaak = sht[Math.floor(Math.random() * sht.length)];
                            imageToBase64(shotaak)
                                .then(
                                    (response) => {
                                        let img = 'data:image/jpeg;base64,' + response
                                        aksa.sendFile(dari, img, "shota.jpg", `*SHOTA*`, id)
                                    })
                                .catch(
                                    (error) => {
                                        console.log(error);
                                    })
                        })
                    break
                case `${prefix}waifu`:
                    if (!isGroupMsg) return aksa.reply(dari, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    const waifu = await axios.get('https://mhankbarbars.herokuapp.com/api/waifu' + '?apiKey=' + apiKey)
                    aksa.sendFileFromUrl(dari, waifu.data.image, 'Waifu.jpg', `➸ Name : ${waifu.data.name}\n➸ Description : ${waifu.data.desc}\n\n➸ Source : ${waifu.data.source}`, id)
                    break
                case `${prefix}husbu`:
                    if (!isGroupMsg) return aksa.reply(dari, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    const diti = fs.readFileSync('./lib/husbu.json')
                    const ditiJsin = JSON.parse(diti)
                    const rindIndix = Math.floor(Math.random() * ditiJsin.length)
                    const rindKiy = ditiJsin[rindIndix]
                    aksa.sendFileFromUrl(dari, rindKiy.image, 'Husbu.jpg', rindKiy.teks, id)
                    break
                case `${prefix}randomnekonime`:
                    if (!isGroupMsg) return aksa.reply(dari, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    const nekonime = await axios.get(`https://api.vhtear.com/randomnekonime&apikey=${vhtear}`)
                    const nekon = nekonime.data
                    if (nekon.result.endsWith('.png')) {
                        var ext = '.png'
                    } else {
                        var ext = '.jpg'
                    }
                    aksa.sendFileFromUrl(dari, nekon.result, `Nekonime${ext}`, 'Nekonime!', id)
                    break
                case `${prefix}randomtrapnime`:
                    if (!isGroupMsg) return aksa.reply(dari, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                    if (!isNsfw) return aksa.reply(dari, 'command/Perintah NSFW belum di aktifkan di group ini!', id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    const trapnime = await axios.get('https://tobz-api.herokuapp.com/api/nsfwtrap')
                    const trapn = trapnime.data.result
                    if (trapn.result.endsWith('.png')) {
                        var ext = '.png'
                    } else {
                        var ext = '.jpg'
                    }
                    aksa.sendImage(dari, trapn.result, `trapnime${ext}`, 'Trapnime!', id)
                    break
                case `${prefix}randomhentai`:
                    if (!isGroupMsg) return aksa.reply(dari, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                    if (!isNsfw) return aksa.reply(dari, 'command/Perintah NSFW belum di aktifkan di group ini!', id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    const hentai = await axios.get(`https://tobz-api.herokuapp.com/api/hentai`)
                    const henta = hentai.data
                    if (henta.result.endsWith('.png')) {
                        var ext = '.png'
                    } else {
                        var ext = '.jpg'
                    }
                    aksa.sendImage(dari, henta.result, `RandomHentai${ext}`, 'Random Hentai!', id)
                    break
                case `${prefix}randomnsfwneko`:
                    if (!isGroupMsg) return aksa.reply(dari, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                    if (!isNsfw) return aksa.reply(dari, 'command/Perintah NSFW belum di aktifkan di group ini!', id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    const nsfwneko = await axios.get('https://tobz-api.herokuapp.com/api/nsfwneko')
                    const nsfwn = nsfwneko.data
                    if (nsfwn.result.endsWith('.png')) {
                        var ext = '.png'
                    } else {
                        var ext = '.jpg'
                    }
                    aksa.sendImage(dari, nsfwn.result, `NsfwNeko${ext}`, 'NsfwNeko!', id)
                    break
                case `${prefix}randomanime`:
                    if (!isGroupMsg) return aksa.reply(dari, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    const ranime = await axios.get('https://api.computerfreaker.cf/v1/anime')
                    const ranimen = ranime.data
                    if (ranimen.url.endsWith('.png')) {
                        var ext = '.png'
                    } else {
                        var ext = '.jpg'
                    }
                    aksa.sendFileFromUrl(dari, ranime.url, `RandomAnime${ext}`, 'Random Anime!', id)
                    break
                case `${prefix}nhder`:
                    if (!isGroupMsg) return aksa.reply(dari, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                    if (!isNsfw) return aksa.reply(dari, 'command/Perintah NSFW belum di aktifkan di group ini!', id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    if (args.length >= 2) {
                        const code = args[1]
                        const url = 'https://nhder.herokuapp.com/download/nhentai/' + code + '/zip'
                        const short = []
                        const shortener = await urlShortener(url)
                        url['short'] = shortener
                        short.push(url)
                        const caption = `*NEKOPOI DOWNLOADER*\n\nLink: ${shortener}`
                        aksa.sendText(dari, caption)
                    } else {
                        aksa.sendText(dari, 'Maaf tolong masukan code nuclear')
                    }
                    break
                case `${prefix}wallanime`:
                    if (!isGroupMsg) return aksa.reply(dari, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                    const walnime = ['https://wallpaperaccess.com/full/395986.jpg', 'https://wallpaperaccess.com/full/21628.jpg', 'https://wallpaperaccess.com/full/21622.jpg', 'https://wallpaperaccess.com/full/21612.jpg', 'https://wallpaperaccess.com/full/21611.png', 'https://wallpaperaccess.com/full/21597.jpg', 'https://cdn.nekos.life/wallpaper/QwGLg4oFkfY.png', 'https://wallpaperaccess.com/full/21591.jpg', 'https://cdn.nekos.life/wallpaper/bUzSjcYxZxQ.jpg', 'https://cdn.nekos.life/wallpaper/j49zxzaUcjQ.jpg', 'https://cdn.nekos.life/wallpaper/YLTH5KuvGX8.png', 'https://cdn.nekos.life/wallpaper/Xi6Edg133m8.jpg', 'https://cdn.nekos.life/wallpaper/qvahUaFIgUY.png', 'https://cdn.nekos.life/wallpaper/leC8q3u8BSk.jpg', 'https://cdn.nekos.life/wallpaper/tSUw8s04Zy0.jpg', 'https://cdn.nekos.life/wallpaper/sqsj3sS6EJE.png', 'https://cdn.nekos.life/wallpaper/HmjdX_s4PU4.png', 'https://cdn.nekos.life/wallpaper/Oe2lKgLqEXY.jpg', 'https://cdn.nekos.life/wallpaper/GTwbUYI-xTc.jpg', 'https://cdn.nekos.life/wallpaper/nn_nA8wTeP0.png', 'https://cdn.nekos.life/wallpaper/Q63o6v-UUa8.png', 'https://cdn.nekos.life/wallpaper/ZXLFm05K16Q.jpg', 'https://cdn.nekos.life/wallpaper/cwl_1tuUPuQ.png', 'https://cdn.nekos.life/wallpaper/wWhtfdbfAgM.jpg', 'https://cdn.nekos.life/wallpaper/3pj0Xy84cPg.jpg', 'https://cdn.nekos.life/wallpaper/sBoo8_j3fkI.jpg', 'https://cdn.nekos.life/wallpaper/gCUl_TVizsY.png', 'https://cdn.nekos.life/wallpaper/LmTi1k9REW8.jpg', 'https://cdn.nekos.life/wallpaper/sbq_4WW2PUM.jpg', 'https://cdn.nekos.life/wallpaper/QOSUXEbzDQA.png', 'https://cdn.nekos.life/wallpaper/khaqGIHsiqk.jpg', 'https://cdn.nekos.life/wallpaper/iFtEXugqQgA.png', 'https://cdn.nekos.life/wallpaper/deFKIDdRe1I.jpg', 'https://cdn.nekos.life/wallpaper/OHZVtvDm0gk.jpg', 'https://cdn.nekos.life/wallpaper/YZYa00Hp2mk.jpg', 'https://cdn.nekos.life/wallpaper/R8nPIKQKo9g.png', 'https://cdn.nekos.life/wallpaper/_brn3qpRBEE.jpg', 'https://cdn.nekos.life/wallpaper/ADTEQdaHhFI.png', 'https://cdn.nekos.life/wallpaper/MGvWl6om-Fw.jpg', 'https://cdn.nekos.life/wallpaper/YGmpjZW3AoQ.jpg', 'https://cdn.nekos.life/wallpaper/hNCgoY-mQPI.jpg', 'https://cdn.nekos.life/wallpaper/3db40hylKs8.png', 'https://cdn.nekos.life/wallpaper/iQ2FSo5nCF8.jpg', 'https://cdn.nekos.life/wallpaper/meaSEfeq9QM.png', 'https://cdn.nekos.life/wallpaper/CmEmn79xnZU.jpg', 'https://cdn.nekos.life/wallpaper/MAL18nB-yBI.jpg', 'https://cdn.nekos.life/wallpaper/FUuBi2xODuI.jpg', 'https://cdn.nekos.life/wallpaper/ez-vNNuk6Ck.jpg', 'https://cdn.nekos.life/wallpaper/K4-z0Bc0Vpc.jpg', 'https://cdn.nekos.life/wallpaper/Y4JMbswrNg8.jpg', 'https://cdn.nekos.life/wallpaper/ffbPXIxt4-0.png', 'https://cdn.nekos.life/wallpaper/x63h_W8KFL8.jpg', 'https://cdn.nekos.life/wallpaper/lktzjDRhWyg.jpg', 'https://cdn.nekos.life/wallpaper/j7oQtvRZBOI.jpg', 'https://cdn.nekos.life/wallpaper/MQQEAD7TUpQ.png', 'https://cdn.nekos.life/wallpaper/lEG1-Eeva6Y.png', 'https://cdn.nekos.life/wallpaper/Loh5wf0O5Aw.png', 'https://cdn.nekos.life/wallpaper/yO6ioREenLA.png', 'https://cdn.nekos.life/wallpaper/4vKWTVgMNDc.jpg', 'https://cdn.nekos.life/wallpaper/Yk22OErU8eg.png', 'https://cdn.nekos.life/wallpaper/Y5uf1hsnufE.png', 'https://cdn.nekos.life/wallpaper/xAmBpMUd2Zw.jpg', 'https://cdn.nekos.life/wallpaper/f_RWFoWciRE.jpg', 'https://cdn.nekos.life/wallpaper/Y9qjP2Y__PA.jpg', 'https://cdn.nekos.life/wallpaper/eqEzgohpPwc.jpg', 'https://cdn.nekos.life/wallpaper/s1MBos_ZGWo.jpg', 'https://cdn.nekos.life/wallpaper/PtW0or_Pa9c.png', 'https://cdn.nekos.life/wallpaper/32EAswpy3M8.png', 'https://cdn.nekos.life/wallpaper/Z6eJZf5xhcE.png', 'https://cdn.nekos.life/wallpaper/xdiSF731IFY.jpg', 'https://cdn.nekos.life/wallpaper/Y9r9trNYadY.png', 'https://cdn.nekos.life/wallpaper/8bH8CXn-sOg.jpg', 'https://cdn.nekos.life/wallpaper/a02DmIFzRBE.png', 'https://cdn.nekos.life/wallpaper/MnrbXcPa7Oo.png', 'https://cdn.nekos.life/wallpaper/s1Tc9xnugDk.jpg', 'https://cdn.nekos.life/wallpaper/zRqEx2gnfmg.jpg', 'https://cdn.nekos.life/wallpaper/PtW0or_Pa9c.png', 'https://cdn.nekos.life/wallpaper/0ECCRW9soHM.jpg', 'https://cdn.nekos.life/wallpaper/kAw8QHl_wbM.jpg', 'https://cdn.nekos.life/wallpaper/ZXcaFmpOlLk.jpg', 'https://cdn.nekos.life/wallpaper/WVEdi9Ng8UE.png', 'https://cdn.nekos.life/wallpaper/IRu29rNgcYU.png', 'https://cdn.nekos.life/wallpaper/LgIJ_1AL3rM.jpg', 'https://cdn.nekos.life/wallpaper/DVD5_fLJEZA.jpg', 'https://cdn.nekos.life/wallpaper/siqOQ7k8qqk.jpg', 'https://cdn.nekos.life/wallpaper/CXNX_15eGEQ.png', 'https://cdn.nekos.life/wallpaper/s62tGjOTHnk.jpg', 'https://cdn.nekos.life/wallpaper/tmQ5ce6EfJE.png', 'https://cdn.nekos.life/wallpaper/Zju7qlBMcQ4.jpg', 'https://cdn.nekos.life/wallpaper/CPOc_bMAh2Q.png', 'https://cdn.nekos.life/wallpaper/Ew57S1KtqsY.jpg', 'https://cdn.nekos.life/wallpaper/hVpFbYJmZZc.jpg', 'https://cdn.nekos.life/wallpaper/sb9_J28pftY.jpg', 'https://cdn.nekos.life/wallpaper/JDoIi_IOB04.jpg', 'https://cdn.nekos.life/wallpaper/rG76AaUZXzk.jpg', 'https://cdn.nekos.life/wallpaper/9ru2luBo360.png', 'https://cdn.nekos.life/wallpaper/ghCgiWFxGwY.png', 'https://cdn.nekos.life/wallpaper/OSR-i-Rh7ZY.png', 'https://cdn.nekos.life/wallpaper/65VgtPyweCc.jpg', 'https://cdn.nekos.life/wallpaper/3vn-0FkNSbM.jpg', 'https://cdn.nekos.life/wallpaper/u02Y0-AJPL0.jpg', 'https://cdn.nekos.life/wallpaper/_-Z-0fGflRc.jpg', 'https://cdn.nekos.life/wallpaper/3VjNKqEPp58.jpg', 'https://cdn.nekos.life/wallpaper/NoG4lKnk6Sc.jpg', 'https://cdn.nekos.life/wallpaper/xiTxgRMA_IA.jpg', 'https://cdn.nekos.life/wallpaper/yq1ZswdOGpg.png', 'https://cdn.nekos.life/wallpaper/4SUxw4M3UMA.png', 'https://cdn.nekos.life/wallpaper/cUPnQOHNLg0.jpg', 'https://cdn.nekos.life/wallpaper/zczjuLWRisA.jpg', 'https://cdn.nekos.life/wallpaper/TcxvU_diaC0.png', 'https://cdn.nekos.life/wallpaper/7qqWhEF_uoY.jpg', 'https://cdn.nekos.life/wallpaper/J4t_7DvoUZw.jpg', 'https://cdn.nekos.life/wallpaper/xQ1Pg5D6J4U.jpg', 'https://cdn.nekos.life/wallpaper/aIMK5Ir4xho.jpg', 'https://cdn.nekos.life/wallpaper/6gneEXrNAWU.jpg', 'https://cdn.nekos.life/wallpaper/PSvNdoISWF8.jpg', 'https://cdn.nekos.life/wallpaper/SjgF2-iOmV8.jpg', 'https://cdn.nekos.life/wallpaper/vU54ikOVY98.jpg', 'https://cdn.nekos.life/wallpaper/QjnfRwkRU-Q.jpg', 'https://cdn.nekos.life/wallpaper/uSKqzz6ZdXc.png', 'https://cdn.nekos.life/wallpaper/AMrcxZOnVBE.jpg', 'https://cdn.nekos.life/wallpaper/N1l8SCMxamE.jpg', 'https://cdn.nekos.life/wallpaper/n2cBaTo-J50.png', 'https://cdn.nekos.life/wallpaper/ZXcaFmpOlLk.jpg', 'https://cdn.nekos.life/wallpaper/7bwxy3elI7o.png', 'https://cdn.nekos.life/wallpaper/7VW4HwF6LcM.jpg', 'https://cdn.nekos.life/wallpaper/YtrPAWul1Ug.png', 'https://cdn.nekos.life/wallpaper/1p4_Mmq95Ro.jpg', 'https://cdn.nekos.life/wallpaper/EY5qz5iebJw.png', 'https://cdn.nekos.life/wallpaper/aVDS6iEAIfw.jpg', 'https://cdn.nekos.life/wallpaper/veg_xpHQfjE.jpg', 'https://cdn.nekos.life/wallpaper/meaSEfeq9QM.png', 'https://cdn.nekos.life/wallpaper/Xa_GtsKsy-s.png', 'https://cdn.nekos.life/wallpaper/6Bx8R6D75eM.png', 'https://cdn.nekos.life/wallpaper/zXOGXH_b8VY.png', 'https://cdn.nekos.life/wallpaper/VQcviMxoQ00.png', 'https://cdn.nekos.life/wallpaper/CJnRl-PKWe8.png', 'https://cdn.nekos.life/wallpaper/zEWYfFL_Ero.png', 'https://cdn.nekos.life/wallpaper/_C9Uc5MPaz4.png', 'https://cdn.nekos.life/wallpaper/zskxNqNXyG0.jpg', 'https://cdn.nekos.life/wallpaper/g7w14PjzzcQ.jpg', 'https://cdn.nekos.life/wallpaper/KavYXR_GRB4.jpg', 'https://cdn.nekos.life/wallpaper/Z_r9WItzJBc.jpg', 'https://cdn.nekos.life/wallpaper/Qps-0JD6834.jpg', 'https://cdn.nekos.life/wallpaper/Ri3CiJIJ6M8.png', 'https://cdn.nekos.life/wallpaper/ArGYIpJwehY.jpg', 'https://cdn.nekos.life/wallpaper/uqYKeYM5h8w.jpg', 'https://cdn.nekos.life/wallpaper/h9cahfuKsRg.jpg', 'https://cdn.nekos.life/wallpaper/iNPWKO8d2a4.jpg', 'https://cdn.nekos.life/wallpaper/j2KoFVhsNig.jpg', 'https://cdn.nekos.life/wallpaper/z5Nc-aS6QJ4.jpg', 'https://cdn.nekos.life/wallpaper/VUFoK8l1qs0.png', 'https://cdn.nekos.life/wallpaper/rQ8eYh5mXN8.png', 'https://cdn.nekos.life/wallpaper/D3NxNISDavQ.png', 'https://cdn.nekos.life/wallpaper/Z_CiozIenrU.jpg', 'https://cdn.nekos.life/wallpaper/np8rpfZflWE.jpg', 'https://cdn.nekos.life/wallpaper/ED-fgS09gik.jpg', 'https://cdn.nekos.life/wallpaper/AB0Cwfs1X2w.jpg', 'https://cdn.nekos.life/wallpaper/DZBcYfHouiI.jpg', 'https://cdn.nekos.life/wallpaper/lC7pB-GRAcQ.png', 'https://cdn.nekos.life/wallpaper/zrI-sBSt2zE.png', 'https://cdn.nekos.life/wallpaper/_RJhylwaCLk.jpg', 'https://cdn.nekos.life/wallpaper/6km5m_GGIuw.png', 'https://cdn.nekos.life/wallpaper/3db40hylKs8.png', 'https://cdn.nekos.life/wallpaper/oggceF06ONQ.jpg', 'https://cdn.nekos.life/wallpaper/ELdH2W5pQGo.jpg', 'https://cdn.nekos.life/wallpaper/Zun_n5pTMRE.png', 'https://cdn.nekos.life/wallpaper/VqhFKG5U15c.png', 'https://cdn.nekos.life/wallpaper/NsMoiW8JZ60.jpg', 'https://cdn.nekos.life/wallpaper/XE4iXbw__Us.png', 'https://cdn.nekos.life/wallpaper/a9yXhS2zbhU.jpg', 'https://cdn.nekos.life/wallpaper/jjnd31_3Ic8.jpg', 'https://cdn.nekos.life/wallpaper/Nxanxa-xO3s.png', 'https://cdn.nekos.life/wallpaper/dBHlPcbuDc4.jpg', 'https://cdn.nekos.life/wallpaper/6wUZIavGVQU.jpg', 'https://cdn.nekos.life/wallpaper/_-Z-0fGflRc.jpg', 'https://cdn.nekos.life/wallpaper/H9OUpIrF4gU.jpg', 'https://cdn.nekos.life/wallpaper/xlRdH3fBMz4.jpg', 'https://cdn.nekos.life/wallpaper/7IzUIeaae9o.jpg', 'https://cdn.nekos.life/wallpaper/FZCVL6PyWq0.jpg', 'https://cdn.nekos.life/wallpaper/5dG-HH6d0yw.png', 'https://cdn.nekos.life/wallpaper/ddxyA37HiwE.png', 'https://cdn.nekos.life/wallpaper/I0oj_jdCD4k.jpg', 'https://cdn.nekos.life/wallpaper/ABchTV97_Ts.png', 'https://cdn.nekos.life/wallpaper/58C37kkq39Y.png', 'https://cdn.nekos.life/wallpaper/HMS5mK7WSGA.jpg', 'https://cdn.nekos.life/wallpaper/1O3Yul9ojS8.jpg', 'https://cdn.nekos.life/wallpaper/hdZI1XsYWYY.jpg', 'https://cdn.nekos.life/wallpaper/h8pAJJnBXZo.png', 'https://cdn.nekos.life/wallpaper/apO9K9JIUp8.jpg', 'https://cdn.nekos.life/wallpaper/p8f8IY_2mwg.jpg', 'https://cdn.nekos.life/wallpaper/HY1WIB2r_cE.jpg', 'https://cdn.nekos.life/wallpaper/u02Y0-AJPL0.jpg', 'https://cdn.nekos.life/wallpaper/jzN74LcnwE8.png', 'https://cdn.nekos.life/wallpaper/IeAXo5nJhjw.jpg', 'https://cdn.nekos.life/wallpaper/7lgPyU5fuLY.jpg', 'https://cdn.nekos.life/wallpaper/f8SkRWzXVxk.png', 'https://cdn.nekos.life/wallpaper/ZmDTpGGeMR8.jpg', 'https://cdn.nekos.life/wallpaper/AMrcxZOnVBE.jpg', 'https://cdn.nekos.life/wallpaper/ZhP-f8Icmjs.jpg', 'https://cdn.nekos.life/wallpaper/7FyUHX3fE2o.jpg', 'https://cdn.nekos.life/wallpaper/CZoSLK-5ng8.png', 'https://cdn.nekos.life/wallpaper/pSNDyxP8l3c.png', 'https://cdn.nekos.life/wallpaper/AhYGHF6Fpck.jpg', 'https://cdn.nekos.life/wallpaper/ic6xRRptRes.jpg', 'https://cdn.nekos.life/wallpaper/89MQq6KaggI.png', 'https://cdn.nekos.life/wallpaper/y1DlFeHHTEE.png']
                    let walnimek = walnime[Math.floor(Math.random() * walnime.length)]
                    aksa.sendFileFromUrl(dari, walnimek, 'Nimek.jpg', '', id)
                    break
                case `${prefix}quotesnime`:
                    if (!isGroupMsg) return aksa.reply(dari, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    const skya = await axios.get('https://mhankbarbars.herokuapp.com/api/quotesnime/random')
                    skya_ = skya.data
                    aksa.reply(dari, `➸ *Quotes* : ${skya_.quote}\n➸ *Character* : ${skya_.character}\n➸ *Anime* : ${skya_.anime}`, id)
                    break
                case `${prefix}quoteanime`:
                    if (!isGroupMsg) return aksa.reply(dari, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    if (args[1]) {
                        if (args[1] === 'anime') {
                            const anime = body.slice(13)
                            axios.get('https://animechanapi.xyz/api/quotes?anime=' + anime).then(({
                                data
                            }) => {
                                let quote = data.data[0].quote
                                let char = data.data[0].character
                                let anime = data.data[0].anime
                                aksa.sendText(dari, `"${quote}"\n\nCharacter : ${char}\nAnime : ${anime}`)
                            }).catch(err => {
                                aksa.sendText('Quote Char/Anime tidak ditemukan!')
                            })
                        } else {
                            const char = body.slice(12)
                            axios.get('https://animechanapi.xyz/api/quotes?char=' + char).then(({
                                data
                            }) => {
                                let quote = data.data[0].quote
                                let char = data.data[0].character
                                let anime = data.data[0].anime
                                aksa.sendText(dari, `"${quote}"\n\nCharacter : ${char}\nAnime : ${anime}`)

                            }).catch(err => {
                                aksa.sendText('Quote Char/Anime tidak ditemukan!')
                            })
                        }
                    } else {
                        axios.get('https://animechanapi.xyz/api/quotes/random').then(({
                            data
                        }) => {
                            let penyanyi = data.result[0].penyanyi
                            let judul = data.result[0].judul
                            let linkimg = data.result[0].linkImg
                            let lagu = data.result[0].linkMp3
                            let size = data.result[0].filesize
                            let durasi = data.result[0].duration
                            aksa.sendText(dari, `"${quote}"\n\nCharacter : ${char}\nAnime : ${anime}`)
                        }).catch(err => {
                            console.log(err)
                        })
                    }
                    break
                case `${prefix}malanime`:
                    if (!isGroupMsg) return aksa.reply(dari, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    const keyword = message.body.replace(`${prefix}malanime`, '')
                    try {
                        const data = await fetch(
                            `https://api.jikan.moe/v3/search/anime?q=${keyword}`
                        )
                        const parsed = await data.json()
                        if (!parsed) {
                            await aksa.sendFileFromUrl(dari, errorurl2, 'error.png', '💔️ Maaf, Anime tidak ditemukan', id)
                            return null
                        }
                        const {
                            title,
                            synopsis,
                            episodes,
                            url,
                            rated,
                            score,
                            image_url
                        } = parsed.results[0]
                        const content = `*Anime Ditemukan!*
✨️ *Title:* ${title}
🎆️ *Episodes:* ${episodes}
💌️ *Rating:* ${rated}
❤️ *Score:* ${score}
💚️ *Synopsis:* ${synopsis}
🌐️ *URL*: ${url}`

                        const image = await bent("buffer")(image_url)
                        const base64 = `data:image/jpg;base64,${image.toString("base64")}`
                        aksa.sendImage(dari, base64, title, content)
                    } catch (err) {
                        console.error(err.message)
                        await aksa.sendFileFromUrl(dari, errorurl2, 'error.png', '💔️ Maaf, Anime tidak ditemukan')
                    }
                    break
                case `${prefix}malcharacter`:
                    if (!isGroupMsg) return aksa.reply(dari, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                    if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)

                    await limitAdd(serial)
                    const keywords = message.body.replace(`${prefix}malcharacter`, '')
                    try {
                        const data = await fetch(
                            `https://api.jikan.moe/v3/search/character?q=${keywords}`
                        )
                        const parsed = await data.json()
                        if (!parsed) {
                            await aksa.sendFileFromUrl(dari, errorurl2, 'error.png', '💔️ Maaf, Anime tidak ditemukan', id)
                            return null
                        }
                        const {
                            name,
                            alternative_names,
                            url,
                            image_url
                        } = parsed.results[0]
                        const contentt = `*Anime Ditemukan!*

✨️ *Name:* ${name}
💌️ *Alternative Names:* ${alternative_names}
🌐️ *URL*: ${url}`

                        const image = await bent("buffer")(image_url)
                        const base64 = `data:image/jpg;base64,${image.toString("base64")}`
                        aksa.sendImage(dari, base64, name, contentt)
                    } catch (err) {
                        console.error(err.message)
                        await aksa.sendFileFromUrl(dari, errorurl2, 'error.png', '💔️ Maaf, Anime tidak ditemukan')
                    }
                    break

                    //poll menu--------------------------------------------------------------------------------------------------------------------------

                    //yang ngerasa punya ini bilang jir gue lupa dari siapa
                case `${prefix}pollresult`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    feature.getpoll(tobz, message, pollfile, voterslistfile)
                    break
                case `${prefix}vote`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    feature.voteadapter(tobz, message, pollfile, voterslistfile)
                    break
                case `${prefix}addpoll`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    feature.adminpollreset(tobz, message, message.body.slice(9), pollfile, voterslistfile)
                    break
                case `${prefix}addv`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    feature.addcandidate(tobz, message, message.body.slice(6), pollfile, voterslistfile)
                    break

                    //anonymouschat menu---------------------------------------------------------------------------------------------------------------------------------

                    //special thanks to Gimenz
                case `${prefix}send`:
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (isGroupMsg) return aksa.reply(dari, 'Perintah ini hanya bisa dilakukan di chat personal!', id)
                    var cek = pengirim.includes(sender.id);
                    if (!cek) {
                        return aksa.reply(dari, 'kamu belum terdaftar, untuk mendaftar kirim !daftar no wa kamu\ncontoh : !daftar 6281281817375 ', id) //if user is not registered
                    } else {
                        if (isMedia && args.length >= 1) {
                            const mediaData = await decryptMedia(message, uaOverride)
                            const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                            const opo = body.slice(6)
                            aksa.sendImage(uwong, imageBase64, 'gambar.jpeg', `${opo}\n\npesan from : ${pushname}`)
                                .then(() => aksa.reply(dari, 'Berhasil mengirim pesan\nTunggu pesan from seseorang, kalo ga di bales coba lagi aja', id))
                        } else if (isQuotedImage && args.length >= 1) {
                            const mediaData = await decryptMedia(quotedMsg, uaOverride)
                            const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                            const opo = body.slice(6)
                            aksa.sendImage(uwong, imageBase64, 'gambar.jpeg', `${opo}\n\npesan from : ${pushname}`)
                                .then(() => aksa.reply(dari, 'Berhasil mengirim pesan\nTunggu pesan from seseorang, kalo ga di bales coba lagi aja', id))
                        } else if (args.length >= 1) {
                            const opo = body.slice(6)
                            aksa.sendText(uwong, `${opo}\n\npesan from : ${pushname}`)
                                .then(() => aksa.reply(dari, 'Berhasil mengirim pesan\nTunggu pesan from seseorang, kalo ga di bales coba lagi aja', id))
                        } else {
                            await aksa.reply(dari, 'Format salah! Untuk membuka daftar perintah kirim !help', id)
                        }
                    }

                    break
                case `${prefix}daftar`: { //menambahkan nomor ke database 
                    if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                    if (isGroupMsg) return aksa.reply(dari, 'Perintah ini hanya bisa dilakukan di chat personal!', id)
                    if (args.length === 1) return aksa.reply(dari, 'Nomornya mana kak?\ncontoh: !daftar 6281281817375')
                    const text = body.slice(8).replace(/[-\s+]/g, '') + '@c.us'
                    var cek = pengirim.includes(text);
                    if (cek) {
                        return aksa.reply(dari, 'Nomor sudah ada di database', id) //if number already exists on database
                    } else {
                        const mentah = await aksa.checkNumberStatus(text) //VALIDATE WHATSAPP NUMBER
                        const hasill = mentah.canReceiveMessage ? `Sukses menambahkan nomer ke database\nTotal data nomer sekarang : *${pengirim.length}*` : false
                        if (!hasill) return aksa.reply(dari, 'Nomor WhatsApp tidak valid [ Tidak terdaftar di WhatsApp ] atau gunakan 62 di awal bukan 0', id) {
                            pengirim.push(mentah.id._serialized)
                            fs.writeFileSync('./lib/user.json', JSON.stringify(pengirim))
                            aksa.sendText(dari, hasill)
                        }
                    }
                }
                break
            case `${prefix}remove`: //menghapus nomor from database
                if (!isOwner) return aksa.reply(dari, 'Fitur ini hanya dapat digunakan oleh Owner Lucya')
                if (args.length === 1) return aksa.reply(dari, 'Masukkan nomornya, *GUNAKAN AWALAN 62* contoh: 6281281817375') {
                    let inx = pengirim.indexOf(args[1] + '@c.us')
                    pengirim.splice(inx, 1)
                    fs.writeFileSync('./lib/user.json', JSON.stringify(pengirim))
                    aksa.reply(dari, 'Sukses menghapus nomor from database', id)
                }
                break
            case `${prefix}listno`:
                if (!isOwner) return aksa.reply(dari, 'Fitur ini hanya dapat digunakan oleh Owner Lucya')
                let listno = `Daftar Nomor terdaftar\nTotal : ${pengirim.length}\n`
                for (let i of pengirim) {
                    listno += `☛ ${i.replace(/@c.us/g,'')}\n`
                }
                await aksa.reply(dari, listno, id)
                break

                //pray menu------------------------------------------------------------------------------------------------------------------------------------

            case `${prefix}jadwalshalat`:
            case `${prefix}jadwalsholat`:
                if (!isGroupMsg) return aksa.reply(dari, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
                if (args.length === 1) return aksa.reply(dari, `[❗] Kirim perintah *@jadwalShalat [ Daerah ]*\ncontoh : *@jadwalShalat Tangerang*\nUntuk list daerah kirim perintah *@listDaerah*`)
                const daerah = body.slice(14)
                const jadwalShalat = await axios.get(`https://api.vhtear.com/jadwalsholat?query=${daerah}&apiKey=${vhtear}`)
                if (jadwalShalat.data.error) return aksa.reply(dari, jadwalShalat.data.error, id)
                const {
                    Shubuh, Zduhur, Ashr, Magrib, Isya, kota
                } = await jadwalShalat.data
                arrbulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
                tgl = new Date().getDate()
                bln = new Date().getMonth()
                thn = new Date().getFullYear()
                const resultJadwal = `「 JADWAL SHALAT 」\n\nJadwal shalat di ${kota}, ${tgl}-${arrbulan[bln]}-${thn}\n\nSubuh : ${Shubuh}\nDzuhur : ${Zduhur}\nAshar : ${Ashr}\nMaghrib : ${Magrib}\nIsya : ${Isya}`
                await limitAdd(serial)
                break
            case `${prefix}quran`:
                if (!isGroupMsg) return aksa.reply(dari, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
                if (args.length === 1) return aksa.reply(dari, `Kirim perintah Surah Quran kamu dengan cara ketik perintah :\n*@quran* [ Urutan Surat ]\nContoh :\n*@quran 1*`, id)
                const qura = `https://api.vhtear.com/quran?no=${args[1]}&apikey=${vhtear}`
                const quraan = await axios.get(qura)
                const quraann = quraan.data
                let hasqu = `*「 AL-QURAN 」*\n\n*Surah : ${quraann.result.surah}*\n*Quran* : ${quraann.result.quran}*`
                await aksa.reply(dari, `${hasqu}`, id).catch((e) => aksa.reply(dari, `*Terdapat kesalahan saat mencari surat ${args[1]}*`, id))
                await limitAdd(serial)
                break
            case `${prefix}listsurah`:
                if (!isGroupMsg) return aksa.reply(dari, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                try {
                    axios.get('https://raw.githubusercontent.com/ArugaZ/scraper-results/main/islam/surah.json')
                        .then((response) => {
                            let hehex = '*「 DAFTAR SURAH 」*\n\n___________________________\n'
                            let nmr = 1
                            for (let i = 0; i < response.data.data.length; i++) {
                                hehex += nmr + '. ' + monospace(response.data.data[i].name.transliteration.id.toLowerCase()) + '\n'
                                nmr++
                            }
                            hehex += `${prefix}__________________________`
                            aksa.reply(dari, hehex, id)
                        })
                } catch (err) {
                    aksa.reply(dari, err, id)
                }
                break
            case `${prefix}infosurah`:
                if (!isGroupMsg) return aksa.reply(dari, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
                if (args.length == 1) return aksa.reply(dari, `Kirim perintah *@infosurah [ Nama Surah ]*\nContoh : *@infosurah al-fatihah*`, message.id)
                var responseh = await axios.get('https://raw.githubusercontent.com/ArugaZ/scraper-results/main/islam/surah.json')
                var {
                    data
                } = responseh.data
                var idx = data.findIndex(function (post, index) {
                    if ((post.name.transliteration.id.toLowerCase() == args[1].toLowerCase()) || (post.name.transliteration.en.toLowerCase() == args[1].toLowerCase()))
                        return true;
                });
                try {
                    var pesan = "*「 INFORMASI SURAH 」*\n\n___________________________\n\n"
                    pesan = pesan + "➸ *Nama* : " + data[idx].name.transliteration.id + "\n" + "➸ *Asma* : " + data[idx].name.short + "\n" + "➸ *Arti* : " + data[idx].name.translation.id + "\n" + "➸ *Jumlah ayat* : " + data[idx].numberOfVerses + "\n" + "➸ *Nomor surah* : " + data[idx].number + "\n" + "Jenis : " + data[idx].revelation.id + "\n" + "➸ *Keterangan* : " + data[idx].tafsir.id
                    pesan += '\n\n___________________________'
                    aksa.reply(dari, pesan, message.id)
                    limitAdd(serial)
                } catch {
                    aksa.reply(dari, 'Data tidak ditemukan, atau nama surah salah', id)
                }
                break
            case `${prefix}tafsir`:
                if (!isGroupMsg) return aksa.reply(dari, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
                if (args.length == 1) return aksa.reply(dari, `Kirim perintah *@tafsir [ Nama Surah ] [ Ayat ]*\nContoh : *@tafsir al-fatihah 2*`, message.id)
                var responsh = await axios.get('https://raw.githubusercontent.com/ArugaZ/scraper-results/main/islam/surah.json')
                var {
                    data
                } = responsh.data
                var idx = data.findIndex(function (post, index) {
                    if ((post.name.transliteration.id.toLowerCase() == args[1].toLowerCase()) || (post.name.transliteration.en.toLowerCase() == args[1].toLowerCase()))
                        return true;
                });
                try {
                    nmr = data[idx].number
                    if (!isNaN(nmr)) {
                        var responsih = await axios.get('https://api.quran.sutanlab.id/surah/' + nmr + "/" + args[2])
                        var {
                            data
                        } = responsih.data
                        pesan = ""
                        pesan = pesan + "*「 TAFSIR 」*\n\nTafsir Q.S. " + data.surah.name.transliteration.id + ":" + args[2] + "\n\n"
                        pesan = pesan + data.text.arab + "\n\n"
                        pesan = pesan + "_" + data.translation.id + "_" + "\n\n" + data.tafsir.id.long
                        pesan += '\n\n___________________________'
                        aksa.reply(dari, pesan, message.id)
                        limitAdd(serial)
                    }
                } catch {
                    aksa.reply(dari, 'Data tidak ditemukan, mungkin nama surah/ayat salah', id)
                }
                break

                //media & downloader menu-----------------------------------------------------------------------------------------------------------------------------------

            case `${prefix}ytmp4`:
                if (!isGroupMsg) return aksa.reply(dari, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
                if (args.length === 1) return aksa.reply(dari, `Kirim perintah *@ytmp4 [ Link Yt ]*, untuk contoh silahkan kirim perintah *@readme*`)
                let isLin = args[1].match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)
                if (!isLin) return aksa.reply(dari, mess.error.Iv, id)
                try {
                    aksa.reply(dari, mess.wait, id)
                    const ytvh = await fetch(`http://api.vhtear.com/ytdl?link=${args[1]}&apikey=${vhtear}`)
                    if (!ytvh.ok) throw new Error(`Error Get Video : ${ytvh.statusText}`)
                    const ytvh2 = await ytvh.json()
                    if (ytvh2.status == false) {
                        aksa.reply(dari, `*Maaf Terdapat kesalahan saat mengambil data, mohon pilih media lain...*`, id)
                    } else {
                        if (Number(ytvh2.result.size.split(' MB')[0]) > 75.00) return aksa.reply(dari, `Maaf durasi video sudah melebihi batas maksimal 30 MB!`, id)
                        const {
                            title,
                            UrlVideo,
                            imgUrl,
                            size
                        } = await ytvh2.result
                        aksa.sendFileFromUrl(dari, imgUrl, 'thumb.jpg', `*「 YOUTUBE MP4 」*\n\n➸ *Judul* : ${title}\n➸ *Filesize* : ${size}\n\n_*Untuk durasi lebih dari batas disajikan dalam bentuk link*._\n${UrlVideo}`, id)
                        await aksa.sendFileFromUrl(dari, UrlVideo, `${title}.mp4`, '', id).catch(() => aksa.reply(dari, mess.error.Yt4, id))
                        await limitAdd(serial)
                    }
                } catch (err) {
                    aksa.sendText(ownerNumber, 'Error ytmp4 : ' + err)
                    aksa.reply(dari, mess.error.Yt4, id)
                    console.log(err)
                }
                break
            case `${prefix}ytmp3`:
                if (!isGroupMsg) return aksa.reply(dari, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
                if (args.length === 1) return aksa.reply(dari, `Kirim perintah *!ytmp3 [ Link Yt ]*, untuk contoh silahkan kirim perintah *@readme*`, id)
                let isLinks = args[1].match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)
                if (!isLinks) return aksa.reply(dari, mess.error.Iv, id)
                try {
                    aksa.reply(dari, mess.wait, id)
                    const vhtearyt3 = await fetch(`https://api.vhtear.com/ytdl?link=${args[1]}&apikey=${vhtear}`)
                    if (!vhtearyt3.ok) throw new Error(`Error ytmp3 3 : ${vhtearyt3.statusText}`)
                    const vhtearyt33 = await vhtearyt3.json()
                    if (vhtearyt33.status == false) {
                        aksa.reply(dari, `*Maaf Terdapat kesalahan saat mengambil data, mohon pilih media lain...*`, id)
                    } else {
                        if (Number(vhtearyt33.result.size.split(' MB')[0]) >= 50.00) return aksa.reply(dari, 'Maaf durasi audio sudah melebihi batas maksimal 10 MB!', id)
                        const {
                            title,
                            ext,
                            size,
                            UrlMp3,
                            status,
                            imgUrl
                        } = await vhtearyt33.result
                        const captions = `*「 YOUTUBE MP3 」*\n\n➸ *Judul* : ${title}\n➸ *Filesize* : ${size}\n\n_*Untuk durasi lebih dari batas disajikan dalam bentuk link*._\n${UrlMp3}`
                        aksa.sendFileFromUrl(dari, imgUrl, `thumb.jpg`, captions, id)
                        await aksa.sendFileFromUrl(dari, UrlMp3, `${title}.mp3`, '', id).catch(() => aksa.reply(dari, mess.error.Yt4, id))
                        await limitAdd(serial)
                    }
                } catch (err) {
                    aksa.sendText(ownerNumber, 'Error ytmp3 : ' + err)
                    aksa.reply(dari, mess.error.Yt3, id)
                }
                break
            case `${prefix}smule`:
                if (!isGroupMsg) return aksa.reply(dari, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)

                await limitAdd(serial)
                if (args.length === 1) return aksa.reply(dari, 'Kirim perintah *@smule [linkSmule]*\nContoh : *@smule https://www.smule.com/p/767512225_3062360163*', id)
                aksa.reply(dari, mess.wait, id)
                arg = body.trim().split(' ')
                console.log(...arg[1])
                var slicedArgs = Array.prototype.slice.call(arg, 1);
                console.log(slicedArgs)
                const sml = await slicedArgs.join(' ')
                console.log(sml)
                try {
                    const resp = await axios.get('https://api.vhtear.com/getsmule?link=' + sml + '&apikey=' + vhtear)
                    const {
                        Type,
                        title,
                        url,
                        image
                    } = resp.data.result
                    const sml3 = `*Music Ditemukan!*

➸ *Judul:* ${title}
➸ *Type:* ${Type}`

                    aksa.sendImage(dari, image, `${title}.jpg`, sml3)
                    aksa.sendFileFromUrl(dari, url, `${title}.mp3`, sml3, id)
                } catch (err) {
                    console.error(err.message)
                    await aksa.sendFileFromUrl(dari, errorurl2, 'error.png', '💔️ Maaf, Music tidak ditemukan')
                    aksa.sendText(ownerNumber, 'Smule Error : ' + err)
                }
                break
            case `${prefix}ytsearch`:
            case `${prefix}searchyt`:
                //premium command, lu tau kemana harus ngehubungi
                break
            case `${prefix}play`:
                if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                if (!isAdmin) return aksa.reply(dari, `Mohon maaf anda tidak bisa menggunakan fitur premium!`, id)
                if (!isGroupMsg) return aksa.reply(dari, 'Perintah ini hanya bisa di gunakan dalam group', id)
                if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik #ceklimit Untuk Mengecek Kuota Limit Kamu`, id)
                if (args.length == 1) return aksa.reply(dari, `Untuk mencari lagu from youtube\n\nPenggunaan: !play judul lagu`, id)
                try {
                    aksa.reply(dari, mess.wait, id)
                    const serplay = body.slice(6)
                    const webplay = await fetch(`https://api.vhtear.com/ytmp3?query=${serplay}&apikey=${vhtear}`)
                    if (!webplay.ok) throw new Error(`Error Get Video : ${webplay.statusText}`)
                    const webplay2 = await webplay.json()
                    if (webplay2.status == false) {
                        aksa.reply(dari, `*Maaf Terdapat kesalahan saat mengambil data, mohon pilih media lain...*`, id)
                    } else {
                        if (Number(webplay2.result.size.split(' MB')[0]) >= 10.00) return aksa.reply(dari, 'Maaf durasi music sudah melebihi batas maksimal 10 MB!', id)
                        const {
                            image,
                            mp3,
                            size,
                            ext,
                            title,
                            duration
                        } = await webplay2.result
                        const captplay = `*「 PLAY 」*\n\n➸ *Judul* : ${title}\n➸ *Durasi* : ${duration}\n➸ *Filesize* : ${size}\n➸ *Exp* : ${ext}\n\n_*Music Sedang Dikirim*_`
                        aksa.sendFileFromUrl(dari, image, `thumb.jpg`, captplay, id)
                        await aksa.sendFileFromUrl(dari, mp3, `${title}.mp3`, '', id).catch(() => aksa.reply(dari, mess.error.Yt4, id))
                        await limitAdd(serial)
                    }
                } catch (err) {
                    aksa.sendText(ownerNumber, 'Error Play : ' + err)
                    aksa.reply(dari, mess.error.Yt3, id)
                }
                break
            case `${prefix}fb`:
            case `${prefix}facebook`:
                if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)

                await limitAdd(serial)
                if (isMedialimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, kuota limit media kamu sudah habis, ketik !limed untuk mengecek kuota Limit media kamu`, id)
                await MedialimitAdd(serial)
                if (args.length === 1) return aksa.reply(dari, `Untuk mendownload video from link facebook\nketik: !fb [link_fb]`, id)
                if (!args[1].match(isUrl) && !args[1].includes('facebook.com')) return aksa.reply(dari, `Maaf, link yang kamu kirim tidak valid. [Invalid Link]`, id)
                await aksa.reply(dari, mess.wait, id);
                try {
                    aksa.reply(dari, mess.wait, id)
                    const respi = await axios.get('https://api.vhtear.com/fbdl?link=' + args[1] + '&apikey=' + vhtear)
                    const {
                        VideoUrl
                    } = respi.data.result
                    aksa.sendFileFromUrl(dari, VideoUrl, `fb.mp4`, '', id)
                } catch (err) {
                    console.error(err.message)
                    await aksa.sendFileFromUrl(dari, errorurl, 'error.png', '💔️ Maaf, Video tidak ditemukan')
                    aksa.sendText(ownerNumber, 'Facebook Error : ' + err)
                }
                break
            case `${prefix}twt`:
            case `${prefix}twitter`:
                if (!isGroupMsg) return aksa.reply(dari, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
                await limitAdd(serial)

                if (isMedialimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, kuota limit media kamu sudah habis, ketik !limed untuk mengecek kuota Limit media kamu`, id)
                await MedialimitAdd(serial)
                if (args.length === 1) return aksa.reply(dari, 'Kirim perintah *!twitter [linkTwitter]* untuk contoh silahkan kirim perintah *!readme*')
                arg = body.trim().split(' ')
                console.log(...arg[1])
                var slicedArgs = Array.prototype.slice.call(arg, 1);
                console.log(slicedArgs)
                const twtdl = await slicedArgs.join(' ')
                console.log(twtdl)
                try {
                    const twtdl2 = await axios.get('ttps://api.vhtear.com/twitter?link=' + twtdl + '&apikey=' + vhtear)
                    const {
                        desk,
                        urlVideo
                    } = twtdl2.data.result
                    const twtdl3 = `*「 TWITTER 」*
• *Aplikasi:* Twitter
• *Deskripsi:* ${desk}`

                    aksa.sendFileFromUrl(dari, urlVideo, `Twitter.mp4`, twtdl3, id)
                    await limitAdd(serial)
                } catch (err) {
                    console.error(err.message)
                    await aksa.sendFileFromUrl(dari, errorurl2, 'error.png', '💔️ Maaf, Video tidak ditemukan')
                }
                break
            case `${prefix}ig`:
            case `${prefix}instagram`:
                if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)

                await limitAdd(serial)
                if (isMedialimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, kuota limit media kamu sudah habis, ketik !limed untuk mengecek kuota Limit media kamu`, id)
                await MedialimitAdd(serial)
                if (args.length === 1) return aksa.reply(dari, `Kirim perintah *!ig [ Link Instagram ]* untuk contoh silahkan kirim perintah *!readme*`)
                if (!args[1].match(isUrl) && !args[1].includes('instagram.com')) return aksa.reply(dari, `Maaf, link yang kamu kirim tidak valid. [Invalid Link]`, id)
                await aksa.reply(dari, mess.wait, id);
                instagram(args[1]).then(async (res) => {
                    let username = res.owner_username;
                    for (let i = 0; i < res.post.length; i++) {
                        if (res.post[i].type == "image") {
                            await aksa.sendFileFromUrl(dari, res.post[i].urlDownload, "ig.jpg", `*「 INSTAGRAM 」*\n\n➸ *Username* : ${username}\n➸ *Tipe* : Image/Jpg`, id);
                            limitAdd(serial)
                        } else if (res.post[i].type == "video") {
                            await aksa.sendFileFromUrl(dari, res.post[i].urlDownload, "ig.mp4", `*「 INSTAGRAM 」*\n\n➸ *Username* : ${username}\n➸ *Tipe* : Video/MP4`);
                            limitAdd(serial)
                        }
                    }
                }).catch((err) => {
                    console.log(err);
                    aksa.reply(dari, `Maaf, Terjadi Kesalahan`, id)
                })
                break
            case `${prefix}igstory`:
                //premium command, lu tau kemana harus ngehubungi
                break
            case `${prefix}xnxx`:
                if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                if (!isGroupMsg) return aksa.reply(dari, 'Perintah ini hanya bisa digunakan dalam group!', id)
                if (!isNsfw) return aksa.reply(dari, 'command/Perintah NSFW belum di aktifkan di group ini!', id)
                if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)

                await limitAdd(serial)
                if (isMedialimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, kuota limit media kamu sudah habis, ketik !limed untuk mengecek kuota Limit media kamu`, id)
                await MedialimitAdd(serial)
                if (args.length === 1) return aksa.reply(dari, 'Kirim perintah *!xnxx [linkXnxx]*, untuk contoh silahkan kirim perintah *!readme*')
                if (!args[1].match(isUrl) && !args[1].includes('xnxx.com')) return aksa.reply(dari, mess.error.Iv, id)
                try {
                    aksa.reply(dari, mess.wait, id)
                    const resq = await axios.get('https://mhankbarbars.herokuapp.com/api/xnxx?url=' + args[1] + '&apiKey=' + apiKey)
                    const resp = resq.data
                    if (resp.error) {
                        aksa.reply(dari, ytvv.error, id)
                    } else {
                        if (Number(resp.result.size.split(' MB')[0]) > 20.00) return aksa.reply(dari, 'Maaf durasi video sudah melebihi batas maksimal 20 menit!', id)
                        aksa.sendFileFromUrl(dari, resp.result.thumb, 'thumb.jpg', `➸ *Judul* : ${resp.result.judul}\n➸ *Deskripsi* : ${resp.result.desc}\n➸ *Filesize* : ${resp.result.size}\n\nSilahkan tunggu sebentar proses pengiriman file membutuhkan waktu beberapa menit.`, id)
                        await aksa.sendFileFromUrl(dari, resp.result.vid, `${resp.result.title}.mp4`, '', id)
                    }
                } catch (err) {
                    console.log(err)
                    await aksa.sendFileFromUrl(dari, errorurl2, 'error.png', '💔️ Maaf, Video tidak ditemukan')
                    aksa.sendText(ownerNumber, 'Xnxx Error : ' + err)
                }
                break
            case `${prefix}images`:
                if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)

                await limitAdd(serial)
                if (args.length === 1) return aksa.reply(dari, `Untuk mencari gambar di pinterest\nketik: !images [search]\ncontoh: !images naruto`, id)
                const cariwall = body.slice(8)
                const hasilwall = await images.fdci(cariwall)
                aksa.sendFileFromUrl(dari, hasilwall, '', '', id)
                    .catch(() => {
                        aksa.reply(dari, 'Ada yang eror!', id)
                    })
                break

            case `${prefix}smulestalk`:
                if (!isGroupMsg) return aksa.reply(dari, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)

                await limitAdd(serial)
                if (args.length === 1) return aksa.reply(dari, 'Kirim perintah *@smulestalk [@username]*\nContoh : *@smulestalk loli*', id)
                arg = body.trim().split(' ')
                console.log(...arg[1])
                var slicedArgs = Array.prototype.slice.call(arg, 1);
                console.log(slicedArgs)
                const sstalk = await slicedArgs.join(' ')
                console.log(sstalk)
                try {
                    const sstalk2 = await axios.get('https://api.vhtear.com/smuleprofile?query=' + sstalk + '&apikey=' + vhtear)
                    const {
                        username,
                        full_name,
                        follower,
                        follow,
                        biography,
                        is_vip,
                        picture,
                        recording
                    } = sstalk2.data.result
                    const smule = `*User Ditemukan!*
➸ *Username:* ${username}
➸ *Full Name:* ${title}
➸ *Biografi:* ${biography}
➸ *Mengikuti:* ${follow}
➸ *Pengikut:* ${follower}
➸ *VIP*: ${is_vip}
➸ *Total Rekaman:* ${recording}`

                    const pictk = await bent("buffer")(picture)
                    const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
                    aksa.sendImage(dari, base64, title, smule)
                } catch (err) {
                    console.error(err.message)
                    await aksa.sendFileFromUrl(dari, errorurl2, 'error.png', '💔️ Maaf, User tidak ditemukan')
                    aksa.sendText(ownerNumber, 'Error Smulestalk : ' + err)
                }
                break
            case `${prefix}starmaker`:
                if (!isGroupMsg) return aksa.reply(dari, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)

                await limitAdd(serial)
                if (args.length === 1) return aksa.reply(dari, 'Kirim perintah *@starmaker [linkStarmaker]* untuk contoh silahkan kirim perintah *@readme*')
                arg = body.trim().split(' ')
                console.log(...arg[1])
                var slicedArgs = Array.prototype.slice.call(arg, 1);
                console.log(slicedArgs)
                const smkr = await slicedArgs.join(' ')
                console.log(smkr)
                try {
                    const smkr2 = await axios.get('https://api.vhtear.com/starmakerdl?link=' + smkr + '&apikey=' + vhtear)
                    const {
                        image,
                        desc,
                        url,
                        title
                    } = smkr2.data.result
                    const smkr3 = `*User Ditemukan!*

➸ *Judul:* ${title}
➸ *Deskripsi:* ${desc}`

                    const pictk = await bent("buffer")(image)
                    const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
                    aksa.sendImage(dari, base64, 'image.jpg', 'nihh mhank')
                    aksa.sendFileFromUrl(dari, url, `${title}.mp4`, '', id)
                } catch (err) {
                    console.error(err.message)
                    await aksa.sendFileFromUrl(dari, errorurl2, 'error.png', '💔️ Maaf, User tidak ditemukan')
                    aksa.sendText(ownerNumber, 'Error Starmaker : ' + err)
                }
                break
            case `${prefix}joox`:
                if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik!limit Untuk Mengecek Kuota Limit Kamu `, id)

                await limitAdd(serial)
                if (isMedialimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, kuota limit media kamu sudah habis, ketik !limed untuk mengecek kuota Limit media kamu`, id)
                await MedialimitAdd(serial)
                if (args.length === 1) return aksa.reply(dari, 'Kirim perintah *!joox [optional]*\nContoh : *!joox Alan Walker*', id)
                aksa.reply(dari, mess.wait, id)
                arg = body.trim().split(' ')
                console.log(...arg[1])
                var slicedArgs = Array.prototype.slice.call(arg, 1);
                console.log(slicedArgs)
                const music = await slicedArgs.join(' ')
                console.log(music)
                try {
                    const music2 = await axios.get('https://api.vhtear.com/music?query=' + music + '&apikey=' + vhtear)
                    const {
                        penyanyi,
                        judul,
                        album,
                        linkImg,
                        linkMp3,
                        filesize,
                        ext,
                        duration,
                        lirik
                    } = music2.data.result[0]
                    const musik = ` * User Ditemukan! *
➸ *Penyanyi: *${penyanyi}
➸ *Judul: *${judul}
➸ *Album: *${album}
➸ *Ext: *${ext}
➸ *Size: *${filesize}
➸ *Durasi: *${duration}
➸ *Lirik: *${lirik}`

                    const pictk = await bent("buffer")(linkImg)
                    const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
                    aksa.sendImage(dari, base64, judul, musik)
                    aksa.sendFile(dari, linkMp3, `${judul}.mp3`, '', id)
                } catch (err) {
                    console.error(err.message)
                    await aksa.sendFileFromUrl(dari, errorurl2, 'error.png', '💔️ Maaf, User tidak ditemukan')
                    aksa.sendText(ownerNumber, 'Error Joox : ' + err)
                }
                break
            case `${prefix}tiktok`:
                if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)

                await limitAdd(serial)
                if (isMedialimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, kuota limit media kamu sudah habis, ketik !limed untuk mengecek kuota Limit media kamu`, id)
                await MedialimitAdd(serial)
                if (args.length === 1) return aksa.reply(dari, 'Kirim perintah *!tiktok [linkTiktok]*\nContoh : *!tiktok https://vt.tiktok.com/yqyjPX/*', id)
                try {
                    aksa.reply(dari, mess.wait, id)
                    const resp = await axios.get('https://api.vhtear.com/tiktokdl?link=' + body.slice(8) + '&apikey=' + vhtear)
                    const {
                        video,
                        title,
                        duration,
                        image,
                        desk,
                        dibuat
                    } = resp.data.result
                    const capss = `*Video Ditemukan!*
➸ Judul : ${title}
➸ Deskripsi : ${desk}
➸ Durasi : ${duration}
➸ Dibuat : ${dibuat}`
                    aksa.sendFileFromUrl(dari, video, `tiktok.mp4`, capss, id)
                } catch (err) {
                    console.error(err.message)
                    await aksa.sendFileFromUrl(dari, errorurl, 'error.png', '💔️ Maaf, Video tidak ditemukan')
                    aksa.sendText(ownerNumber, 'Tiktok Error : ' + err)
                }
                break
            case `${prefix}igstalk`:
                if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)

                await limitAdd(serial)
                if (args.length === 1) return aksa.reply(dari, 'Kirim perintah *!igStalk @username*\nContoh *!igStalk @bdrsmsdn*', id)
                try {
                    const stalk = await get.get(`https://api.vhtear.com/igprofile?query=${args[1]}&apikey=${vhtear}`).json()
                    if (stalk.error) return aksa.reply(dari, stalk.error, id)
                    const {
                        username,
                        full_name,
                        follower,
                        follow,
                        biography,
                        is_private,
                        picture,
                        post_count
                    } = stalk.result
                    const caps = `「 IGSTALK 」\n\n➸ *Nama* : ${full_name}\n➸ *Username* : ${username}\n➸ *Jumlah Followers* : ${follower}\n➸ *Jumlah Following* : ${follow}\n➸ *Jumlah Postingan* : ${post_count}\n➸ *Biodata* : ${biography}\n➸ *Private* : ${is_private}\n\n-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-\n\n${donate()}`
                    await aksa.sendFileFromUrl(dari, picture, 'Profile.jpg', caps, id)
                } catch (err) {
                    console.error(err.message)
                    aksa.sendText(ownerNumber, 'IGSTALK Error : ' + err)
                }
                break
            case `${prefix}twstalk`:
                if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)

                await limitAdd(serial)
                if (args.length === 1) return aksa.reply(dari, 'Kirim perintah *!twstalk @username*\nContoh *!twstalk @bdrsmsdn*', id)
                const twstalk = await get.get(`https://mhankbarbars.herokuapp.com/api/twstalk?username=${args[1]}&apiKey=${apiKey}`).json()
                if (twstalk.error) return aksa.reply(dari, twstalk.error, id)
                const {
                    idd, followers_count, name, full_name, status_count, profile_pic
                } = twstalk
                const twcaps = `➸ *ID* : ${idd}\n➸*Nama Lengkap* : ${full_name}\n➸ *Nama* : ${name}\n➸ *Jumlah Followers* : ${followers_count}\n➸ *Jumlah Tweet* : ${status_count}\n\n-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-\n\n${donate()}`
                await aksa.sendFileFromUrl(dari, profile_pic, 'Profile.jpg', twcaps, id)
                break

                //tools menu----------------------------------------------------------------------------------------------------

            case `${prefix}resi`:
            case `${prefix}cekresi`:
                if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)

                await limitAdd(serial)
                if (args.length === 1) return aksa.reply(dari, `Maaf, format pesan salah.\nSilahkan ketik pesan dengan !resi <kurir> <no_resi>\n\nKurir yang tersedia:\njne, pos, tiki, wahana, jnt, rpx, sap, sicepat, pcp, jet, dse, first, ninja, lion, idl, rex`, id)
                const kurirs = ['jne', 'pos', 'tiki', 'wahana', 'jnt', 'rpx', 'sap', 'sicepat', 'pcp', 'jet', 'dse', 'first', 'ninja', 'lion', 'idl', 'rex']
                if (!kurirs.includes(args[1])) return aksa.sendText(dari, `Maaf, jenis ekspedisi pengiriman tidak didukung layanan ini hanya mendukung ekspedisi pengiriman ${kurirs.join(', ')} Tolong periksa kembali.`)
                console.log('Memeriksa No Resi', args[2], 'dengan ekspedisi', args[1])
                cekResi(args[1], args[2]).then((result) => aksa.sendText(dari, result))
                break
            case `${prefix}shortlink`:
                if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)

                await limitAdd(serial)
                if (args.length === 1) return aksa.reply(dari, `ketik !shortlink <url>`, id)
                if (!args[1].match(isUrl)) return aksa.reply(dari, 'Maaf, url yang kamu kirim tidak valid.', id)
                const shortlink = await urlShortener(args[1])
                await aksa.sendText(dari, shortlink)
                    .catch(() => {
                        aksa.reply(dari, 'Ada yang eror!', id)
                    })
                break
            case `${prefix}url2img`:
                if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)

                await limitAdd(serial)
                const _query = body.slice(9)
                if (!_query.match(isUrl)) return aksa.reply(dari, mess.error.Iv, id)
                if (args.length === 1) return aksa.reply(dari, 'Kirim perintah *!url2img <web>*\nContoh *!url2img https://google.com*', id)
                const url2img = await get.get(`https://mhankbarbars.herokuapp.com/api/url2image?url=${_query}&apiKey=${apiKey}`).json()
                if (url2img.error) return aksa.reply(dari, url2img.error, id)
                aksa.sendFileFromUrl(dari, url2img.result, 'kyaa.jpg', null, id)
                break
            case `${prefix}maps`:
                if (!isGroupMsg) return aksa.reply(dari, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)

                await limitAdd(serial)
                if (args.length === 1) return aksa.reply(dari, 'Kirim perintah *@maps [optional]*, Contoh : *@maps Jakarta*')
                arg = body.trim().split(' ')
                console.log(...arg[1])
                var slicedArgs = Array.prototype.slice.call(arg, 1);
                console.log(slicedArgs)
                const mapz = await slicedArgs.join(' ')
                console.log(mapz)
                try {
                    const mapz2 = await axios.get('https://mnazria.herokuapp.com/api/maps?search=' + mapz)
                    const {
                        gambar
                    } = mapz2.data
                    const pictk = await bent("buffer")(gambar)
                    const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
                    aksa.sendImage(dari, base64, 'maps.jpg', `*Hasil Maps : ${mapz}*`)
                } catch (err) {
                    console.error(err.message)
                    await aksa.sendFileFromUrl(dari, errorurl2, 'error.png', '💔️ Maaf, User tidak ditemukan')
                    aksa.sendText(ownerNumber, 'Error Maps : ' + err)
                }
                break
            case `${prefix}translate`:
                if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                if (args[1] == undefined || args[2] == undefined) return
                if (args.length >= 2) {
                    var codelang = args[1]
                    var text = body.slice(11 + codelang.length);
                    translatte(text, {
                        to: codelang
                    }).then(res => {
                        aksa.sendText(dari, res.text);
                    }).catch(err => {
                        aksa.sendText(dari, `[ERROR] Teks tidak ada, atau kode bahasa ${codelang} tidak support\n~> *!bahasa* untuk melihat list kode bahasa`);
                    });
                }
                break
            case `${prefix}checkip`:
                if (!isGroupMsg) return aksa.reply(dari, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)

                await limitAdd(serial)
                if (args.length === 1) return aksa.reply(dari, 'Kirim perintah *@checkip [ipaddress]*\nContoh : *@checkip 182.0.144.145*', id)
                aksa.reply(dari, mess.wait, id)
                arg = body.trim().split(' ')
                console.log(...arg[1])
                var slicedArgs = Array.prototype.slice.call(arg, 1);
                console.log(slicedArgs)
                const cekip = await slicedArgs.join(' ')
                console.log(cekip)
                try {
                    const cekip2 = await axios.get('https://mnazria.herokuapp.com/api/check?ip=' + cekip)
                    const {
                        city,
                        continent_name,
                        country_name,
                        ip,
                        latitude,
                        location,
                        longitude,
                        region_name
                    } = cekip2.data
                    const cekip3 = `*User Ditemukan!*

➸ *Kota:* ${city}
➸ *Benua:* ${continent_name}
➸ *Negara:* ${country_name}
➸ *Ip Address:* ${ip}
➸ *Garis Lintang:* ${latitude}
➸ *Kode Telepon:* +${location.calling_code}
➸ *Ibu Kota:* +${location.capital}
➸ *Bahasa:* +${location.languages[0].name}
➸ *Garis Bujur:* ${longitude}
➸ *Wilayah:* +${region_name}`

                    const pictk = await bent("buffer")(location.country_flag)
                    const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
                    aksa.sendImage(dari, base64, city, cekip3)
                } catch (err) {
                    console.error(err.message)
                    await aksa.sendFileFromUrl(dari, errorurl2, 'error.png', '💔️ Maaf, User tidak ditemukan')
                    aksa.sendText(ownerNumber, 'Error Check IP : ' + err)
                }
                break
            case `${prefix}imgcompress`:
                if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
                await limitAdd(serial)
                if (isMedia) {
                    const gambar = await decryptMedia(message, uaOverride)
                    await processImg(gambar)
                } else if (quotedMsg && quotedMsg.type == 'image') {
                    const compres = await decryptMedia(quotedMsg)
                    await processImg(compres)
                } else {
                    aksa.sendText(dari, `Tidak ada gambar! untuk !compress kirim gambar dengan caption !compress`)
                }
                async function processImg(gambar) {
                    let image = await Jimp.read(gambar);
                    image.quality(55).write('./quote/compressed.jpeg', function (err) {
                        if (err) console.log(err);
                        aksa.sendFile(dari, './quote/compressed.jpeg', 'compressed.jpg', '_*Processing Sukses!');
                    });
                }
                break
            case `${prefix}jarak`:
                if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)

                await limitAdd(serial)
                arg = body.trim().split('|')
                const jar = arg[1]
                const rak = arg[2]
                try {
                    const resp = await axios.get(`https://api.vhtear.com/distance?from=${jar}&to=${rak}&apikey=${vhtear}`)
                    if (resp.data.error) return aksa.reply(dari, resp.data.error, id)
                    const kbbuaw = `➸ ${resp.data.result.data}`
                    aksa.reply(dari, kbbuaw, id)
                } catch (err) {
                    console.error(err.message)
                    await aksa.sendFileFromUrl(dari, errorurl2, 'error.png', '💔️ Maaf, tidak ditemukan')
                    aksa.sendText(ownerNumber, 'Jarak Error : ' + err)
                }
                break
            case `${prefix}spek`:
                if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)

                await limitAdd(serial)
                const hpnya = body.slice(6)
                try {
                    const resp = await axios.get(`https://api.vhtear.com/gsmarena?query=${hpnya}&apikey=${vhtear}`)
                    if (resp.data.error) return aksa.reply(dari, resp.data.error, id)
                    const kbbuaww = `➸ ${resp.data.result.spec}`
                    aksa.sendFileFromUrl(dari, resp.data.result.image, 'gsm.jpg', kbbuaww, id)
                } catch (err) {
                    console.error(err.message)
                    await aksa.sendFileFromUrl(dari, errorurl2, 'error.png', '💔️ Maaf, tidak ditemukan')
                    aksa.sendText(ownerNumber, 'Spek Error : ' + err)
                }
                break
            case `${prefix}motor`:
                if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)

                await limitAdd(serial)
                const mtr = body.slice(7)
                try {
                    const resp = await axios.get(`https://api.vhtear.com/infomotor?merk=${mtr}&apikey=${vhtear}`)
                    if (resp.data.error) return aksa.reply(dari, resp.data.error, id)
                    const kbbuaww = `➸ *Title* : ${resp.data.result.title}\n➸ *Harga* : ${resp.data.result.harga}\n➸ *Spesifikasi* : ${resp.data.result.spesifikasi}\n➸ *Kelebihan* : ${resp.data.result.kelebihan}\n➸ *Kekurangan* : ${resp.data.result.kekurangan}`
                    aksa.sendFileFromUrl(dari, resp.data.result.image, 'gsm.jpg', kbbuaww, id)
                } catch (err) {
                    console.error(err.message)
                    await aksa.sendFileFromUrl(dari, errorurl2, 'error.png', '💔️ Maaf, tidak ditemukan')
                    aksa.sendText(ownerNumber, 'Motor Error : ' + err)
                }
                break
            case `${prefix}mobil`:
                if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)

                await limitAdd(serial)
                const mbl = body.slice(7)
                try {
                    const resp = await axios.get(`https://api.vhtear.com/infomobil?merk=${mbl}&apikey=${vhtear}`)
                    if (resp.data.error) return aksa.reply(dari, resp.data.error, id)
                    const kbbuaww = `➸ *Title* : ${resp.data.result.title}\n➸ *Harga* : ${resp.data.result.harga}\n➸ *Spesifikasi* : ${resp.data.result.spesifikasi}\n➸ *Kelebihan* : ${resp.data.result.kelebihan}\n➸ *Kekurangan* : ${resp.data.result.kekurangan}`
                    aksa.sendFileFromUrl(dari, resp.data.result.image, 'gsm.jpg', kbbuaww, id)
                } catch (err) {
                    console.error(err.message)
                    await aksa.sendFileFromUrl(dari, errorurl2, 'error.png', '💔️ Maaf, tidak ditemukan')
                    aksa.sendText(ownerNumber, 'Mobil Error : ' + err)
                }
                break
                //words
            case `lucya`:
            case `luu`:
            case `lucyaa`:
            case `lulu`:
            case `luluu`:
                let blsn = jwb[Math.floor(Math.random() * jwb.length)]
                aksa.reply(dari, blsn, id)
                break
            case `assalamualaikum`:
            case `asalamualaikum`:
            case `assalamu\'alaikum`:
                if (args.length === 1) return aksa.reply(dari, `Waalaikumsalam ${pushname}:)`)
                break
            case `${prefix}hitung`:
                if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                if (args.length === 1) return aksa.reply(dari, '[❗] Kirim perintah *!hitung [ Angka ]*\nContoh : !hitung 12*12\n*NOTE* :\n- Untuk Perkalian Menggunakan *\n- Untuk Pertambahan Menggunakan +\n- Untuk Pengurangan Mennggunakan -\n- Untuk Pembagian Menggunakan /')
                const mtk = body.slice(8)
                if (typeof Math_js.evaluate(mtk) !== "number") {
                    aksa.reply(dari, `"${mtk}", bukan angka!\n[❗] Kirim perintah *!hitung [ Angka ]*\nContoh : !hitung 12*12\n*NOTE* :\n- Untuk Perkalian Menggunakan *\n- Untuk Pertambahan Menggunakan +\n- Untuk Pengurangan Mennggunakan -\n- Untuk Pembagian Menggunakan /`, id)
                } else {
                    aksa.reply(dari, `*「 MATH 」*\n\n*Kalkulator*\n${mtk} = ${Math_js.evaluate(mtk)}`, id)
                }
                break
            case `p`:
            case `helo`:
            case `hai`:
            case `halo`:
            case `bot`:
            case `hi`:
            case `hallo`:
            case `wey`:
            case `woy`:
                if (args.length === 1) return aksa.reply(dari, `Hai, *${pushname}!*👋
Terima kasih telah menghubungi. Ketik *!help* untuk melihat perintah yang tersedia. 
        
Jangan lupa follow ya!🍻
Instagram: https://instagram.com/bdrsmsdn 
Twitter: https://twitter.com/bdrsmsdn`)
                break
            case `iri?`:
            case `iri`:
                aksa.sendPtt(dari, './media/iri.mp3', id)
                break
            case `abgjago`:
            case `abangjago`:
                aksa.sendPtt(dari, './media/bgjg.mp3', id)
                break
            case `tarekses`:
            case `tariksis`:
            case `tareksis`:
            case `tareeksis`:
            case `tareekses`:
                aksa.sendPtt(dari, './media/tarekses.mp3', id)
                break
            case `welotka`:
            case `welutka`:
            case `kangcopet`:
                aksa.sendPtt(dari, './media/welot.mp3', id)
                break
                //information
            case `${prefix}cuaca`:
                if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)

                await limitAdd(serial)
                if (args.length === 1) return aksa.reply(dari, 'Kirim perintah *!cuaca [tempat]*\nContoh : *!cuaca tangerang', id)
                const tempat = body.slice(7)
                const weather = await get.get(`https://mhankbarbars.herokuapp.com/api/cuaca?q=${tempat}&apiKey=${apiKey}`).json()
                if (weather.error) {
                    aksa.reply(dari, weather.error, id)
                } else {
                    aksa.reply(dari, `➸ Tempat : ${weather.result.tempat}\n\n➸ Angin : ${weather.result.angin}\n➸ Cuaca : ${weather.result.cuaca}\n➸ Deskripsi : ${weather.result.desk}\n➸ Kelembapan : ${weather.result.kelembapan}\n➸ Suhu : ${weather.result.suhu}\n➸ Udara : ${weather.result.udara}`, id)
                }
                break
            case `${prefix}infogempa`:
                if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                if (isLimit(serial)) return aksa.reply(dari, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik #limit Untuk Mengecek Kuota Limit Kamu`, id)

                await limitAdd(serial)
                const bmkg = await axios.get('http://tobz-api.herokuapp.com/api/infogempa')
                const {
                    potensi, koordinat, lokasi, kedalaman, magnitude, waktu, map
                } = bmkg.data
                const hasil = `*${waktu}*\n📍 *Lokasi* : *${lokasi}*\n〽️ *Kedalaman* : *${kedalaman}*\n💢 *Magnitude* : *${magnitude}*\n🔘 *Potensi* : *${potensi}*\n📍 *Koordinat* : *${koordinat}*`
                aksa.sendFileFromUrl(dari, map, 'shakemap.jpg', hasil, id)
                break
            case `${prefix}listdaerah`:
                if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                const listDaerah = await get('https://mhankbarbars.herokuapp.com/daerah').json()
                aksa.reply(dari, listDaerah.result, id)
                break
                //contact
            case `${prefix}creator`:
            case `${prefix}admin`:
            case `${prefix}owner`:
                if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                aksa.sendContact(dari, '6281281817375@c.us') //ganti
                break
            case `${prefix}bot1`:
                if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                aksa.sendContact(dari, '6282115089860@c.us') //bot gue ini
                break
            case `${prefix}bot2`:
                if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                aksa.sendContact(dari, '6285215130891@c.us') //ini juga
                break
            case `${prefix}bugreport`:
                if (!isRegis) return aksa.reply(dari, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user Lucya, untuk pendaftaran bisa menggunakan *!regis* |nama|no hp. Contoh: !regis |${pushname}|${serial.replace(/@c.us/g,'')}`, id)
                if (args.length === 1) return aksa.reply(dari, '[❗] Kirim perintah !bugreport [teks]\ncontoh : !bugreport Permisi Owner, Ada bug pada command !otakudesu, Tolong diperbaiki')
                const bug = body.slice(11)
                if (isGroupMsg) {
                    aksa.sendText(ownerNumber, `*[BUG REPORT]*\n*WAKTU* : ${time}\n*Nama Pengirim* : ${pushname}\n*Group* : ${formattedTitle}\n\n${bug}`)
                    aksa.reply(dari, 'Masalah telah di laporkan ke owner Lucya, laporan palsu/main2 tidak akan ditanggapi.', id)
                } else {
                    aksa.sendText(ownerNumber, `*[BUG REPORT]*\n*WAKTU* : ${time}\n*Nama Pengirim* : ${pushname}\n\n${bug}`)
                    aksa.reply(dari, 'Masalah telah di laporkan ke owner Lucya, laporan palsu/main2 tidak akan ditanggapi.', id)
                }
                break
            case `${prefix}restart`: // WORK IF YOU RUN USING PM2
                if (isOwner) {
                    aksa.sendText(dari, '*[WARN]* Restarting ...')
                    setting.restartState = true
                    setting.restartId = chatId
                    var obj = []
                    //fs.writeFileSync('./lib/setting.json', JSON.stringify(obj, null,2));
                    fs.writeFileSync('./lib/limit.json', JSON.stringify(obj));
                    fs.writeFileSync('./lib/muted.json', JSON.stringify(obj));
                    fs.writeFileSync('./lib/msgLimit.json', JSON.stringify(obj));
                    fs.writeFileSync('./lib/banned.json', JSON.stringify(obj));
                    fs.writeFileSync('./lib/welcome.json', JSON.stringify(obj));
                    fs.writeFileSync('./lib/left.json', JSON.stringify(obj));
                    fs.writeFileSync('./lib/Simsimi.json', JSON.stringify(obj));
                    fs.writeFileSync('./lib/nsfwz.json', JSON.stringify(obj));
                    const spawn = require('child_process').exec;

                    function os_func() {
                        this.execCommand = function (command) {
                            return new Promise((resolve, reject) => {
                                spawn(command, (error, stdout, stderr) => {
                                    if (error) {
                                        reject(error);
                                        return;
                                    }
                                    resolve(stdout)
                                });
                            })
                        }
                    }
                    var oz = new os_func();
                    oz.execCommand('pm2 restart index').then(res => {}).catch(err => {
                        console.log("os >>>", err);
                    })
                }
                break
            case `${prefix}lucyagroup`:
                aksa.reply(dari, `➥ *Grup Official Informasi Lucya-BOT I* https://chat.whatsapp.com/LuZkEtgJz4kI6cOkAeHL5j
➥ *Grup Official Informasi Lucya-BOT II* https://chat.whatsapp.com/G0MEd2wMcJhKupMqrWI6fB`, id)
                break
            default:
                if (command.startsWith(`${prefix}`)) {
                    aksa.reply(dari, `Maaf ${pushname}, Command *${args[0]}* Tidak Terdaftar Di Dalam *${prefix}menu*!`, id)
                }
                //await aksa.sendSeen(from) 
            }
        }
    } catch (err) {
        console.log(color('[ERROR]', 'red'), err)
        //aksa.kill().then(a => console.log(a))
    }
}