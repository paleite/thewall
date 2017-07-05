import axios from 'axios'
import moment from 'moment'

const $walkOfShame = $('.hotboard')
const $logOfShame = $('.log')

require('./main.scss')
$('.banner').removeClass('hidden')

const $shameLog = $('<div class="log__item">')

function render(data) {
  const $containerOfRegrets = $('<div>')

  data.forEach(pieceOfShame => {
    if (pieceOfShame.events.length === 0) return

    const $shamefulLogEvents = $('<ol class="feed">')

    $containerOfRegrets.append($(`<h2 class="heading heading--log">${pieceOfShame.name}</h2>`))

    pieceOfShame.events.forEach(cringeMoment => {
      const $cringeInstance = $('<li class="feed__list-item">')
      const $title = $('<h3 class="title">')
        .text(cringeMoment.title)
        .append($('<span class="date">')
        .text(moment(cringeMoment.eventDate).format('YYYY-MM-DD')))
      $cringeInstance.append($title)
      $cringeInstance
        .append($('<p class="description">')
        .text(cringeMoment.description))

      $shamefulLogEvents.append($cringeInstance)
    })

    $containerOfRegrets.append($shamefulLogEvents)
  })

  return $containerOfRegrets
}

axios.get('shame.json')
  .then((response) => {
    response.data.map(pieceOfShame => {
      if (pieceOfShame.events.length === 0) {
        return
      }

      const $shameBox = $('<div class="box">')
      const $shamefulEvents = $('<ol class="hotboard__list">')

      $shameBox.append($(`<h2 class="heading heading--box">${pieceOfShame.name}</h2>`))

      pieceOfShame.events.slice(0, 1).map(cringeMoment => {
        const $cringeInstance = $('<li class="hotboard__list-item">')
        const $title = $('<h3 class="title">').text(cringeMoment.title)
          .append($('<span class="date">').text(moment(cringeMoment.eventDate).format('YYYY-MM-DD')))
        $cringeInstance.append($title)
        $cringeInstance.append($('<p class="description">').text(cringeMoment.description))

        $shamefulEvents.append($cringeInstance)
      })

      $shameBox.append($shamefulEvents)
      $walkOfShame.append($shameBox)
    })

    $logOfShame.append(render(response.data))

    let $anxiety = $('<input class="filter" placeholder="Filter regrets..." />').keyup(embarrassment => {
      let query = embarrassment.currentTarget.value.trim().toLowerCase()

      let filtered = response.data.filter(pieceOfShame => {
        if (!pieceOfShame.events.length) return
        return pieceOfShame.name.toLowerCase().indexOf(query) != -1
      })

      $logOfShame.empty()
      $logOfShame.append(render(filtered))
    })

    $logOfShame.before($anxiety)
  })
  .catch((error) => {
    console.log(error)
  })
