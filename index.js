const fs = require('fs')
const Promise = require('bluebird')
const axios = require('axios')
const cheerio = require('cheerio')
const moment = require('moment')

const baseUrl = 'http://downdetector.se/problem-storningar/'
const servicesList = [
  'bankik', // BankID
  'getswish',
  'handelsbanken',
  'nordea',
  'seb',
  'skandia-banken',
  'sparbanken-oresund',
  'swedbank'
]
const prettyNames = {
  bankik: 'BankID',
  getswish: 'Swish',
  handelsbanken: 'Handelsbanken',
  nordea: 'Nordea',
  seb: 'SEB',
  'skandia-banken': 'Skandiabanken',
  'sparbanken-oresund': 'Sparbanken Öresund',
  swedbank: 'Swedbank'
}
const output = []

Promise.map(servicesList, (serviceId) => {
  const url = `${baseUrl}${serviceId}/storningar-oversikt/`
  const events = []

  return axios
    .get(url)
    .then((response) => {
      const $ = cheerio.load(response.data)
      moment.locale($('html').attr('lang'))

      $('.event').each((i, elm) => {
        const eventDateString = $('h2 span.date', elm).text().trim()
        const eventDate = moment(eventDateString, 'D MMM YYYY').format()
        $('h2 span.date', elm).remove()
        const title = $('h2', elm).text().trim()
        const link = `http://downdetector.se${$('.content a', elm).attr('href')}`
        $('.content a', elm).remove()
        const description = $('.content', elm).text().trim()

        events.push({
          eventDate,
          title,
          link,
          description
        })
      })

      return events
    })
    .then((events) => {
      output.push({
        name: prettyNames[serviceId],
        events
      })
    })
})
  .then(() => fs.writeFileSync('./dist/shame.json', JSON.stringify(output, null, 2)))
  .catch((reason) => console.error('Error:', reason))
