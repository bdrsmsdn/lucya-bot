/* eslint-disable prefer-promise-reject-errors */
const { fetchJson } = require('../utils/fetcher')
const { promisify } = require('util')
const { twitter } = require('video-url-link')

const twtGetInfo = promisify(twitter.getInfo)


/**
 * Get Twitter Metadata
 *
 * @param  {String} url
 */
const tweet = (url) => new Promise((resolve, reject) => {
    console.log('Get metadata from =>', url)
    twtGetInfo(url, {})
        .then((content) => resolve(content))
        .catch((err) => {
            console.error(err)
            reject(err)
        })
})


module.exports = {
    tweet
}