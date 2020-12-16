function ban(client, from, quotedMsg) {
    if (quotedMsg) {
        client.sendText(from, 'baned');
        return true;
    }
}

module.exports = {
    ban,
}