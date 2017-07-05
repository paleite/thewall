require('./main.scss')

const axios = require('axios')
const $ = require('zepto')

let walkOfShame = $('#feed')

console.log(walkOfShame) 

axios.get('shame.json')
  .then(function (response) {
    console.log(response.data)
    response.data.forEach(pieceOfShame => {
      let shameBox = $('<div>')

      let shamefulName = $('<span>'+ pieceOfShame.name +'</span>')
      shameBox.append(shamefulName)

      //let shamefulEvents = document.createElement('div')
      //pieceOfShame.events.forEach(cringeMoment => {
        //let cringeInstance = document.createElement('div')
        //cringeInstance.appendChild(document.createTextNode(cringeMoment.message))
        //shamefulEvents.appendChild(cringeInstance)
      //})

      shameBox.append(shamefulEvents)

      walkOfShame.append(shameBox)
    })
  })
  .catch(function (error) {
    console.log(error)
  });
