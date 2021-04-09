const list = document.querySelector('.view_list')
const addWorker = document.getElementById('add_worker')
const mainWorker = document.getElementById('main_worker')
const mainAddWorker = document.getElementById('main_add_worker')
const backBtn = document.getElementById('back-btn')
const viewWorkerList = document.getElementById('view_worker_list')
const viewList = document.getElementById('view_list')
const backBtnView = document.getElementById('back-btn-view')
const warning = $('#warning_message')
const success = $('#success_content')
const tableWorkers = document.getElementById('table_workers')
const displayList = document.querySelector('.display_list')
const spanNoWorker = document.getElementById('no_worker')


addWorker.addEventListener('click', () => {
  mainWorker.classList.add('d_none')
  mainAddWorker.classList.remove('d_none')
})
backBtn.addEventListener('click', () => {
  mainWorker.classList.remove('d_none')
  mainAddWorker.classList.add('d_none')
})
viewWorkerList.addEventListener('click', () => {
  mainWorker.classList.add('d_none')
  viewList.classList.remove('d_none')
})
backBtnView.addEventListener('click', () => {
  mainWorker.classList.remove('d_none')
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

function workersList() {
  const trWorker = `
    <tr class="first_tr">
      <td>Nome</td>
      <td>Área de Atuação</td>
      <td>Turno</td>
      <td>Responsabilidade</td>
      <td>Observações</td>
      <td>Atualizar</td>
      <td>Eliminar</td>
    </tr>`

  tableWorkers.innerHTML = trWorker

  $.get('/getWorkers', data => {
    if (data.length > 0) {
      data.forEach(element => {
        let tr = document.createElement('tr')
        let tdName = document.createElement('td')
        let tdArea = document.createElement('td')
        let tdTurno = document.createElement('td')
        let tdResponsabilidade = document.createElement('td')
        let tdObservações = document.createElement('td')
        let tdUpdate = document.createElement('td')
        let tdDelete = document.createElement('td')
        let a1 = document.createElement('a')
        let a2 = document.createElement('a')

        a1.setAttribute('href', `/editWorker/${element._id}`)
        a2.setAttribute('href', `/deleteWorker/${element._id}`)
        a1.innerHTML = '<i class="fa fa-edit"></i>'
        a2.innerHTML = '<i class="fa fa-close"></i>'

        tdName.textContent = `${element.name}`
        tdArea.textContent = `${element.area}`
        tdTurno.textContent = `${element.shift}`
        tdResponsabilidade.textContent = `${element.responsability}`
        tdObservações.textContent = `${element.observations}`
        tdUpdate.appendChild(a1)
        tdDelete.appendChild(a2)
        tr.appendChild(tdName)
        tr.appendChild(tdArea)
        tr.appendChild(tdTurno)
        tr.appendChild(tdResponsabilidade)
        tr.appendChild(tdObservações)
        tr.appendChild(tdUpdate)
        tr.appendChild(tdDelete)

        tableWorkers.appendChild(tr)
      });
    } else {
      let span = document.createElement('span')
      span.classList.add('alert_warning')
      span.textContent = 'Não há lista disponível!'
      spanNoWorker.appendChild(span)

      setTimeout(() => {
        spanNoWorker.removeChild(span)
      }, 3000)
    }
  }, 'json').fail(e => {
    console.log(e)
  })
}


workersList()
removeWarning()
removeSuccess()