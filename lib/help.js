const { groupChangeEvent } = require("@open-wa/wa-automate/dist/api/model/group-metadata")
const fs = require('fs-extra')
const moment = require('moment-timezone')
const speed = require('performance-now')
const {
    prefix
} = JSON.parse(fs.readFileSync('./lib/setting.json'))

exports.admeen = () => {
    return `
╭──「 *MENU ADMIN GROUP* 」──
│+ *${prefix}add* 6281281XXXX
│+ *${prefix}kick* @tagmember
│+ *${prefix}promote* @tagmember
│+ *${prefix}demote* @tagmember
│+ *${prefix}mentionall*
│+ *${prefix}del* <reply chat bot>
│+ *${prefix}leave*
│+ *${prefix}kickall*
│+ *${prefix}opengc*
│+ *${prefix}closegc*
│+ *${prefix}seticon*
│+ *${prefix}groupinfo*
│+ *${prefix}linkgroup*
│+ *${prefix}ownergroup*
│+ *${prefix}sider*
│+ *${prefix}resetlinkgroup*
│+ *${prefix}setgroupname*
│+ *${prefix}nobadword* enable/disable
│+ *${prefix}nolinkgc* enable/disable
│+ *${prefix}welcome* enable/disable
│+ *${prefix}left* enable/disable
│+ *${prefix}nsfw* enable/disable
╰───────────────────
Terima kasih telah menggunakan Lucya-BOT.💓
`
}

exports.prem = () => {
    return `Hi!!👋
Selamat Datang di Menu Prem.
Berikut adalah beberapa perintah yang tersedia:

╭──「 *MENU PREMIUM* 」──
│+ *${prefix}snbg*
│+ *${prefix}stgif* <text>
│+ *${prefix}ttp* <text>
│+ *${prefix}stickerfire*
│+ *${prefix}stickerlight*
│+ *${prefix}s2img*
│+ *${prefix}musik* <query>
│+ *${prefix}getmusik*
│+ *${prefix}video* <query>
│+ *${prefix}getvideo*
│+ *${prefix}google* <query>
│+ *${prefix}ptlvid*
│+ *${prefix}nhentai* <query>
│+ *${prefix}getnhentai*
│+ *${prefix}play* <query>
│+ *${prefix}playstore* <query>
│+ *${prefix}shopee* <query>
│+ *${prefix}news*
│+ *${prefix}jadwalbola*
│+ *${prefix}jurnalotaku* <query>
│+ *${prefix}movie* <query>
│+ *${prefix}xvideos* <query>
│+ *${prefix}getxvideos*
│+ *${prefix}phdl <link>
│+ *${prefix}lewds
│+ *${prefix}fetish <query>
│+ *${prefix}moviecs
│+ *${prefix}giftlimit <jml> @user
╰───────────────────
Terima kasih telah menggunakan Lucya-BOT.💓
`

}

exports.readme = () => {
    return `
❉──────────────────❉
*_PANDUAN PENGGUNAAN_*
❉──────────────────❉

*<linkYt>* Diisi dengan link YouTube yang valid tanpa tanda “<” dan “>”
Contoh : *!ytmp3 https://youtu.be/Bskehapzke8*

*<linkYt>* Diisi dengan link YouTube yang valid tanpa tanda “<” dan “>”
Contoh : *!ytmp4 https://youtu.be/Bskehapzke8*

*<linkIg>* Diisi dengan link Instagram yang valid tanpa tanda “<” dan “>”
Contoh : *!ig https://www.instagram.com/p/CFqRZTlluAi/?igshid=1gtxkbdqhnbbe*

*<linkFb>* Diisi dengan link Facebook yang valid tanpa tanda “<” dan “>”
Contoh : *!fb https://www.facebook.com/EpochTimesTrending/videos/310155606660409*

*<linkTweet>* Diisi dengan link Twitter yang valid tanpa tanda "<" dan ">"
Contoh : *!twt https://twitter.com/9GAG/status/13326691430019067904?s=19*

*<daerah>* Diisi dengan daerah yang valid, tanpa tanda “<” dan “>”
Contoh : *!jadwalshalat Bandung*

*<tempat>* Diisi dengan tempat/lokasi yang valid, tanpa tanda “<” dan “>“
Contoh : *!cuaca Jakarta*

*<kode bhs>* Diisi dengan kode bahasa, contoh *id*, *en*, dll. Dan *<teks>* Diisi dengan teks yang ingin di jadikan voice, tanpa tanda “<” dan “>”
Kode bahasa bisa dicek di https://bit.ly/3kAELDe
Contoh : *!tts id Test*
Note : Max 250 huruf

*<@username>* Diisi dengan username Instagram yang valid, tanpa tanda “<” dan “>”
Contoh : *!igstalk @bdrsmsdn*

*<|teks|author|theme>* Diisi dengan teks, author, dan theme, tanpa tanda “<” dan “>”
Contoh : *!quotemaker |Odading|Mang Oleh|Shark*

*<linkGroup>* Diisi dengan link group whatsapp yang valid, tanpa tanda “<” dan “>”
Contoh : *!join https://chat.whatsapp.com/LuZkEtgJz4kI6cOkAeHL5j*

*<key>* Key yang berisikan 19 character secara acak yang berguna untuk memasukkan bot ke dalam grup, tanpa tanda "<" dan ">".

*<optional>* Diisi dengan teks|title lirik lagu, tanpa tanda “<” dan “>”.
Contoh : *!lirik aku bukan boneka*`
}

exports.info = () => {
    return `
╔════════════════════
╭────❉ *_INFO_* ❉──
│++ _*LUCYAV2*_
│+ 3.1.X
│+ OWNER : _*AKSARA*_
│+ wa.me/6281281817375
╰───────────────────
╠════ _*AKSARA*_ ═════
╚════════════════════
Primary Source Code BOT https://github.com/mhankbarbar
Special Thanks to:
- Mhankbarbar
- ArugaZ
- Tobz
- AlenSaito
- Gimenz
- dkk.`
}

exports.snk = () => {
    return `
❉──────────────────❉
*_Syarat dan Ketentuan_*
❉──────────────────❉

1. Teks dan nama pengguna WhatsApp anda akan disimpan di dalam server selama bot aktif.
2. Data anda akan dihapus ketika bot Offline.
3. BOT tidak menyimpan gambar, video, file, audio, dan dokumen yang anda kirim.
4. BOT tidak akan pernah meminta anda untuk memberikan informasi pribadi.
5. Jika menemukan Bug/Error silahkan langsung lapor ke Owner bot.
6. BOT tidak boleh digunakan untuk layanan yang bertujuan/berkontribusi dalam: 
    • seks / perdagangan manusia
    • perjudian
    • perilaku adiktif yang merugikan 
    • kejahatan
    • kekerasan (kecuali jika diperlukan untuk melindungi keselamatan publik)
    • pembakaran hutan / penggundulan hutan
    • ujaran kebencian atau diskriminasi berdasarkan usia, jenis kelamin, identitas gender, ras, seksualitas, agama, kebangsaan.
7. Dilarang keras melakukan SPAM ke bot, menelpon bot, dan mengirim pesan ke owner bot di luar jam kerja. Jika terindikasi melakukan hal yang tadi disebutkan, akan mendapat BANNED PERMANEN.
8. Selalu ingat bahwa bot ini dalam proses pengembangan jadi diharapkan anda dapat memakluminya jika bot terdapat banyak kekurangan.
9. Dan selalu ingat juga yang menggunakan bot ini bukan hanya anda/grup anda jadi saya memohon agar bersabar jika terjadinya delay. Serta gunakan fitur yang tersedia dengan seperlunya.
10. Apapun yang anda perintah pada bot ini baik ketika menggunakan ataupun sesudahnya, OWNER TIDAK BERTANGGUNG JAWAB!

Terima kasih!✨`
}

exports.donate = () => {
    return `Kamu dapat membantu owner mengembangkan bot ini dengan melakukan donasi.
    
Jika berkenan, silakan langsung saja ke :
- https://saweria.co/bdrsmsdn
- https://trakteer.id/bdrsmsdn
- OVO/DANA 081281817375
- BCA 8480792000 an Badra Samsudin Ramdan N
Jangan lupa follow instagramku yaa! https://instagram.com/bdrsmsdn

Terima kasih!✨`
}

exports.nsfwmenu = () => {
    return `Hi!!👋
Selamat Datang di Menu NSFW.
Berikut adalah beberapa perintah yang tersedia:

╭──「 *NSFW MENU* 」──
│+ *${prefix}nhinfo*
│+ *${prefix}nhview*
│+ *${prefix}nekopoi*
│+ *${prefix}xnxx*
│+ *${prefix}randomhentai*
│+ *${prefix}randomnsfwneko*
│+ *${prefix}dlhentai*
│+ *${prefix}indohot*
╰───────────────────
Terima kasih telah menggunakan Lucya-BOT.💓
`
}

exports.maker = () => {
    return `Hi!!👋
Selamat Datang di Menu Maker.
Berikut adalah beberapa perintah yang tersedia:

╭────「 *MENU MAKER* 」──
│+ *${prefix}sticker*
│+ *${prefix}stickergif*
│+ *${prefix}quotemaker* <text>
│+ *${prefix}textmaker* <text>
│+ *${prefix}url2img* <link>
│+ *${prefix}text2img* <text>
│+ *${prefix}sandwriting* <text>
│+ *${prefix}sth* <text>
│+ *${prefix}esticker* <emoji>
│+ *${prefix}bp* <text>
│+ *${prefix}thunder* <text>
│+ *${prefix}ff* <text>
│+ *${prefix}lg* <text>
│+ *${prefix}phub* |text1|text2
│+ *${prefix}glow* <text>
│+ *${prefix}joker* <text>
│+ *${prefix}codmw* <text>
│+ *${prefix}avengers* |text1|text2
│+ *${prefix}outline* <text>
│+ *${prefix}sunset* <text>
│+ *${prefix}minion* <text>
│+ *${prefix}space* |text1|text2
│+ *${prefix}bloods* <text>
╰───────────────────
Terima kasih telah menggunakan Lucya-BOT.💓
`
}

exports.media = () => {
    return `Hi!!👋
Selamat Datang di Menu Media.
Berikut adalah beberapa perintah yang tersedia:

╭────「 *MENU MEDIA* 」──
│+ *${prefix}ytmp3* <linkyoutube>
│+ *${prefix}ytmp4* <linkYt>
│+ *${prefix}ig* <linkIg>
│+ *${prefix}fb* <linkFb>
│+ *${prefix}igstalk* @username
│+ *${prefix}twitter* <linkTweet>
│+ *${prefix}twstalk* @username
│+ *${prefix}joox* <query>
│+ *${prefix}tiktok* <link>
│+ *${prefix}igstory* <username>
│+ *${prefix}images* <query>
│+ *${prefix}ytsearch <query>
╰───────────────────
Terima kasih telah menggunakan Lucya-BOT.💓
`
}

exports.edukasi = () => {
    return `Hi!!👋
Selamat Datang di Menu Edukasi.
Berikut adalah beberapa perintah yang tersedia:

╭────「 *MENU EDUKASI* 」──
│+ *${prefix}wiki* <query>Wikipedia.
│+ *${prefix}brainly* <query> <.answer>
│+ *${prefix}nulis* <teks>
│+ *${prefix}kbbi* <kata>
╰───────────────────
Terima kasih telah menggunakan Lucya-BOT.💓
`
}

exports.poll = () => {
    return `Hi!!👋
Selamat Datang di Menu Poll/Voting.
Berikut adalah beberapa perintah yang tersedia:

╭────「 *POLL MENU* 」──
│+ *${prefix}addpoll* <query>
│+ *${prefix}addv* <candidates>
│+ *${prefix}pollresult*
│+ *${prefix}vote* <number>
╰───────────────────
Terima kasih telah menggunakan Lucya-BOT.💓
`
}

exports.anonymous = () => {
    return `Hi!!👋
Selamat Datang di Menu Anonymous Chat.
Berikut adalah beberapa perintah yang tersedia:

╭「 *ANONYMOUS CHAT MENU* 」
│+ *${prefix}daftar* 6281XXX
│+ *${prefix}send* <text>
│+ *${prefix}remove* 6281XXX
│+ *${prefix}listno*
╰───────────────────
Terima kasih telah menggunakan Lucya-BOT.💓
`
}

exports.funmenu = () => {
    return `Hi!!👋
Selamat Datang di Fun Menu.
Berikut adalah beberapa perintah yang tersedia:

╭────「 *FUN MENU* 」──
│+ *${prefix}tebakgambar*
│+ *${prefix}family100*
│+ *${prefix}caklontong*
│+ *${prefix}profile*
│+ *${prefix}koin*
│+ *${prefix}dadu*
│+ *${prefix}tts* <kode bhs> <text>
│+ *${prefix}artinama* <name>
│+ *${prefix}ramalpasangan* <name>
│+ *${prefix}simi*
│+ *${prefix}say*
│+ *${prefix}addsay* <text>
│+ *${prefix}delsay* <text>
│+ *${prefix}saylist*
│+ *${prefix}mypic*
│+ *${prefix}yourpic* @
│+ *${prefix}meme*
│+ *${prefix}ptl*
│+ *${prefix}cerpen*
│+ *${prefix}puisi1*
│+ *${prefix}puisi2*
│+ *${prefix}puisi3*
│+ *${prefix}artimimpi* <query>
│+ *${prefix}ptlvid*
│+ *${prefix}hilih*
│+ *${prefix}mock*
│+ *${prefix}heroml* <query>
│+ *${prefix}zodiak* <query>
│+ *${prefix}spamcall* <no.>
│+ *${prefix}babi*
│+ *${prefix}ganteng*
│+ *${prefix}ToD*
│+ *${prefix}apakah* <text>
│+ *${prefix}kapankah* <text>
│+ *${prefix}bisakah* <text>
│+ *${prefix}nilai* <text>
│+ *${prefix}savesticker* <text>
│+ *${prefix}sendsticker* <text>
│+ *${prefix}pat* @user
│+ *${prefix}slap* @user
│+ *${prefix}nye* @user
│+ *${prefix}hug* @user
╰───────────────────
Terima kasih telah menggunakan Lucya-BOT.💓
`
}

exports.weebs = () => {
    return `Hi!!👋
Selamat Datang di Menu Weebs.
Berikut adalah beberapa perintah yang tersedia:

╭────「 *MENU WEEBS* 」──
│+ *${prefix}downloadanime*
│+ *${prefix}downloadmanga*
│+ *${prefix}nhinfo*
│+ *${prefix}nhview*
│+ *${prefix}wait*
│+ *${prefix}anime*
│+ *${prefix}otakudesu*
│+ *${prefix}kusonime*
│+ *${prefix}dewabatch*
│+ *${prefix}komiku*
│+ *${prefix}loli*
│+ *${prefix}shota
│+ *${prefix}waifu*
│+ *${prefix}husbu*
│+ *${prefix}randomnekonime*
│+ *${prefix}randomtrapnime*
│+ *${prefix}randomhentai*
│+ *${prefix}randomnsfwneko*
│+ *${prefix}randomanime*
│+ *${prefix}nhder*
│+ *${prefix}wallanime*
│+ *${prefix}quotesnime*
│+ *${prefix}quoteanime* anime
│+ *${prefix}malanime*
│+ *${prefix}malcharacter*
╰───────────────────
Terima kasih telah menggunakan Lucya-BOT.💓
`
}

exports.tools = () => {
    return `Hi!!👋
Selamat Datang di Tools Menu.
Berikut adalah beberapa perintah yang tersedia:

╭────「 *TOOLS MENU* 」──
│+ *${prefix}cekresi*
│+ *${prefix}shortlink* <link>
│+ *${prefix}imgcompress*
│+ *${prefix}qrcode* <text>
│+ *${prefix}translate* <kode> <teks>
│+ *${prefix}hitung*
│+ *${prefix}ping*
│+ *${prefix}bugreport* <text>
│+ *${prefix}maps* <query>
╰───────────────────
Terima kasih telah menggunakan Lucya-BOT.💓
`
}

exports.infor = () => {
    return `Hi!!👋
Selamat Datang di Menu Informasi.
Berikut adalah beberapa perintah yang tersedia:

╭──「 *INFORMATION MENU* 」──
│+ *${prefix}jadwalshalat* <daerah>
│+ *${prefix}cuaca* <daerah>
│+ *${prefix}listdaerah*
│+ *${prefix}infogempa*
│+ *${prefix}listchannel*
│+ *${prefix}covid* <query>
╰───────────────────
Terima kasih telah menggunakan Lucya-BOT.💓
`
}

exports.pray = () => {
    return `Hi!!👋
Selamat Datang di Pray Menu.
Berikut adalah beberapa perintah yang tersedia:

╭──「 *PRAY MENU* 」──
│+ *${prefix}jadwalshalat* <daerah>
│+ *${prefix}quran* <no. surah>
│+ *${prefix}listsurah*
│+ *${prefix}infosurah* <query>
│+ *${prefix}tafsir* <nama surah> <ayat>
│+ *${prefix}renungan*
│+ *${prefix}alkitab* <query>
╰───────────────────
Terima kasih telah menggunakan Lucya-BOT.💓
`
}

exports.contact = () => {
    return `Hi!!👋
Selamat Datang di Menu Kontak.
Berikut adalah beberapa perintah yang tersedia:

╭──「 *CONTACT* 」──
│+ *${prefix}creator*
│+ *${prefix}bot1*
│+ *${prefix}bot2*
╰───────────────────
Terima kasih telah menggunakan Lucya-BOT.💓
`
}

exports.tnc = () => {
    return `Hi!!👋
Selamat Datang di Menu TNC.
Berikut adalah beberapa perintah yang tersedia:

╭──「 *TNC* 」──
│+ *${prefix}info*
│+ *${prefix}readme*
│+ *${prefix}snk*
╰───────────────────
Terima kasih telah menggunakan Lucya-BOT.💓
`
}

exports.others = () => {
    return `Hi!!👋
Selamat Datang di Others Menu.
Berikut adalah beberapa perintah yang tersedia:

╭──「 *OTHERS* 」──
│+ *${prefix}googleimage* <query>
│+ *${prefix}lirik* <query>
│+ *${prefix}chord* <query>
│+ *${prefix}kpop* <query>
│+ *${prefix}listprem*
│+ *${prefix}listgroup*
│+ *${prefix}listblock*
╰───────────────────
Terima kasih telah menggunakan Lucya-BOT.💓
`
}

exports.listChannel = () => {
    return `Daftar channel: 
1. ANTV
2. GTV
3. Indosiar
4. iNewsTV
5. KompasTV
6. MNCTV
7. METROTV
8. NETTV
9. RCTI
10. SCTV
11. RTV
12. Trans7
13. TransTV`
}

exports.sewa = () => {
    return `
GAADA IKLAN MENDING FOLLOW IG AKU AJA
https://instagram.com/bdrsmsdn`
}