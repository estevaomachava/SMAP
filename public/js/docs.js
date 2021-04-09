const list = document.querySelector('.view_list')
const addWorker = document.getElementById('add_finance')
const mainWorker = document.getElementById('main_finance')
const mainAddWorker = document.getElementById('main_add_finance')
const backBtn = document.getElementById('back-btn')
const viewWorkerList = document.getElementById('view_finance_list')
const viewList = document.getElementById('view_list')
const backBtnView = document.getElementById('back-btn-view')
const warning = $('#warning_message')
const success = $('#success_content')
const tableWorkers = document.getElementById('table_finances')
const displayList = document.querySelector('.display_list')
const spanNoWorker = document.getElementById('no_finance')


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
      <td>Nome do Documento</td>
      <td>Descrição</td>
      <td>Abrir</td>
      <td>Atualizar</td>
      <td>Eliminar</td>
    </tr>`

  tableWorkers.innerHTML = trWorker

  $.get('/getDocs', data => {
    if (data.length > 0) {
      data.forEach(element => {
        let tr = document.createElement('tr')
        let tdName = document.createElement('td')
        let tdDescrição = document.createElement('td')
        let tdAbrir = document.createElement('td')
        let tdUpdate = document.createElement('td')
        let tdDelete = document.createElement('td')
        let a1 = document.createElement('a')
        let a2 = document.createElement('a')
        let a3 = document.createElement('a')

        a1.setAttribute('href', `/editDoc/${element._id}`)
        a2.setAttribute('href', `/deleteDoc/${element._id}`)
        a3.setAttribute('href', `${element.file}`)
        a1.innerHTML = '<i class="fa fa-edit"></i>'
        a2.innerHTML = '<i class="fa fa-close"></i>'
        a3.innerHTML = '<i class="fa fa-picture-o"></i>'

        tdName.textContent = `${element.name}`
        tdDescrição.textContent = `${element.description}`
        tdUpdate.appendChild(a1)
        tdDelete.appendChild(a2)
        tdAbrir.appendChild(a3)
        tr.appendChild(tdName)
        tr.appendChild(tdDescrição)
        tr.appendChild(tdAbrir)
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