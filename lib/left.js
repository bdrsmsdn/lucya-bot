const fs = require('fs-extra')

module.exports = left = async(client, event) => {
    //console.log(event.action)
    const left = JSON.parse(fs.readFileSync('./lib/left.json'))
    const isLeft = left.includes(event.chat)
    try {
        if (event.action == 'remove' && left) {
            const gChat = await client.getChatById(event.chat)
            const pChat = await client.getContact(event.who)
            const { contact, groupMetadata, name } = gChat
            const pepe = await client.getProfilePicFromServer(event.who)
            const capt = `Good bye @${event.who.replace('@c.us', '')}, We'll miss you✨`
            if (pepe == '' || pepe == undefined) {
                await client.sendFileFromUrl(event.chat, 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQcODjk7AcA4wb_9OLzoeAdpGwmkJqOYxEBA&usqp=CAU', 'profile.jpg')
            } else {
                await client.sendFileFromUrl(event.chat, pepe, 'profile.jpg')
                client.sendTextWithMentions(event.chat, capt)
            }
        }
    } catch (err) {
        console.log(err)
    }
}