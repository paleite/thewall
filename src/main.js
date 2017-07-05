import axios from 'axios'
import moment from 'moment'

const $walkOfShame = $('.hotboard')
const $logOfShame = $('.log')

require('./main.scss')
$('.banner').removeClass('hidden')

axios.get('shame.json')
  .then((response) => {
    response.data.map(pieceOfShame => {
      if (pieceOfShame.events.length === 0) {
        return
      }

      const $shameBox = $('<div class="box">')
      const $shamefulName = $(`<h2>${pieceOfShame.name}</h2>`)
      const $shamefulEvents = $('<ol>')

      $shameBox.append($shamefulName)

      pieceOfShame.events.slice(0, 1).map(cringeMoment => {
        const $cringeInstance = $('<li>')
        const $title = $('<h3 class="title">').text(cringeMoment.title)
          .append($('<span class="date">').text(moment(cringeMoment.eventDate).format('YYYY-MM-DD')))
        $cringeInstance.append($title)
        $cringeInstance.append($('<p class="description">').text(cringeMoment.description))

        $shamefulEvents.append($cringeInstance)
      })

      $shameBox.append($shamefulEvents)
      $walkOfShame.append($shameBox)

      /////////////////////////

      const $shameLog = $('<div class="log__item">')
      const $shamefulLogEvents = $('<ol>')

      $shameLog.append($shamefulName)

      pieceOfShame.events.map(cringeMoment => {
        const $cringeInstance = $('<li>')
        const $title = $('<h3 class="title">').text(cringeMoment.title)
          .append($('<span class="date">').text(moment(cringeMoment.eventDate).format('YYYY-MM-DD')))
        $cringeInstance.append($title)
        $cringeInstance.append($('<p class="description">').text(cringeMoment.description))

        $shamefulLogEvents.append($cringeInstance)
      })

      $shameLog.append($shamefulLogEvents)
      $logOfShame.append($shameLog)
    })
  })
  .catch((error) => {
    console.log(error)
  })
