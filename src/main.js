import axios from 'axios'
import moment from 'moment'

const $walkOfShame = $('#feed')

require('./main.scss')

axios.get('shame.json')
  .then((response) => {
    response.data.map(pieceOfShame => {
      if (pieceOfShame.events.length === 0) {
        return
      }

      const $shameBox = $('<div>')
      const $shamefulName = $(`<h2>${pieceOfShame.name}</h2>`)
      const $shamefulEvents = $('<ol>')

      $shameBox.append($shamefulName)

      pieceOfShame.events.map(cringeMoment => {
        const $cringeInstance = $('<li>')
        const $title = $('<h3 class="title">').text(cringeMoment.title)
          .append($('<span class="date">').text(moment(cringeMoment.eventDate).format("YYYY-MM-DD")))
        $cringeInstance.append($title)
        $cringeInstance.append($('<p class="description">').text(cringeMoment.description))

        $shamefulEvents.append($cringeInstance)
      })

      $shameBox.append($shamefulEvents)
      $walkOfShame.append($shameBox)
    })
  })
  .catch((error) => {
    console.log(error)
  })
