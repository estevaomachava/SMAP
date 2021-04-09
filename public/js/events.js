const list = document.querySelector('.view_list')
const addEvent = document.getElementById('add_event')
const mainEvent = document.getElementById('main_event')
const mainAddEvent = document.getElementById('main_add_event')
const backBtn = document.getElementById('back-btn')
const viewEventList = document.getElementById('view_event_list')
const viewList = document.getElementById('view_list')
const backBtnView = document.getElementById('back-btn-view')
const warning = $('#warning_message')
const success = $('#success_content')
const tableEvents = document.getElementById('table_events')
const displayList = document.querySelector('.display_list')
const spanNoEvent = document.getElementById('no_event')


addEvent.addEventListener('click', () => {
  mainEvent.classList.add('d_none')
  mainAddEvent.classList.remove('d_none')
})
backBtn.addEventListener('click', () => {
  mainEvent.classList.remove('d_none')
  mainAddEvent.classList.add('d_none')
})
viewEventList.addEventListener('click', () => {
  mainEvent.classList.add('d_none')
  viewList.classList.remove('d_none')
})
backBtnView.addEventListener('click', () => {
  mainEvent.classList.remove('d_none')
  viewList.classList.add('d_none')
})

function removeWarning() {
  if (warning.text().length > 0) {
    warning.fadeIn()
    setTimeout(() => {
      warning.fadeOut(5000)
    }, 3000)
  }
}

function removeSuccess() {
  if (success.text().length > 0) {
    success.fadeIn()
    setTimeout(() => {
      success.fadeOut(5000)
    }, 3000)
  }
}

function eventsList() {
  const trEvent = `
    <tr class="first_tr">
      <td>Nome</td>
      <td>Data</td>
      <td>Descrição</td>
      <td>Objectivos</td>
      <td>Intervenientes</td>
      <td>Atualizar</td>
      <td>Eliminar</td>
    </tr>`

  tableEvents.innerHTML = trEvent

  $.get('/getEvents', data => {
    if (data.length > 0) {
      data.forEach(element => {
        let [date,] = element.date.split('T')
        let [year, month, day] = date.split('-')
        let tr = document.createElement('tr')
        let tdName = document.createElement('td')
        let tdDate = document.createElement('td')
        let tdDescription = document.createElement('td')
        let tdReasons = document.createElement('td')
        let tdPartakers = document.createElement('td')
        let tdUpdate = document.createElement('td')
        let tdDelete = document.createElement('td')
        let a1 = document.createElement('a')
        let a2 = document.createElement('a')

        a1.setAttribute('href', `/editEvent/${element._id}`)
        a2.setAttribute('href', `/deleteEvent/${element._id}`)
        a1.innerHTML = '<i class="fa fa-edit"></i>'
        a2.innerHTML = '<i class="fa fa-close"></i>'

        tdName.textContent = `${element.name}`
        tdDate.textContent = `${day}/${month}/${year}`
        tdDescription.textContent = `${element.description}`
        tdReasons.textContent = `${element.reasons}`
        tdPartakers.textContent = `${element.partakers}`
        tdUpdate.appendChild(a1)
        tdDelete.appendChild(a2)
        tr.appendChild(tdName)
        tr.appendChild(tdDate)
        tr.appendChild(tdDescription)
        tr.appendChild(tdReasons)
        tr.appendChild(tdPartakers)
        tr.appendChild(tdUpdate)
        tr.appendChild(tdDelete)

        tableEvents.appendChild(tr)
      });
    } else {
      let span = document.createElement('span')
      span.classList.add('alert_warning')
      span.textContent = 'Não há lista disponível!'
      spanNoEvent.appendChild(span)

      setTimeout(() => {
        spanNoEvent.removeChild(span)
      }, 3000)
    }
  }, 'json').fail(e => {
    console.log(e)
  })
}


eventsList()
removeWarning()
removeSuccess()