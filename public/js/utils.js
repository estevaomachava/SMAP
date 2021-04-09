const main = document.querySelector('.main_add_student')
const list = document.querySelector('.view_list')
const chart = document.querySelector('.display_students_charts')
const box = document.querySelector('.second_li')
const menu = document.getElementById('menu')
const addStudent = document.getElementById('add_student')
const mainStudent = document.getElementById('main_student')
const mainAddStudent = document.getElementById('main_add_student')
const backBtn = document.getElementById('back-btn')
const viewStudentList = document.getElementById('view_student_list')
const viewList = document.getElementById('view_list')
const backBtnView = document.getElementById('back-btn-view')
const selectClass = document.getElementById('class')
const classes = $('#class')
const displayStudentsCharts = document.getElementById('display_students_charts')
const studentsCharts = document.getElementById('students_charts')
const backBtnChart = document.getElementById('back-btn-chart')
const bi = document.getElementById('bi')
const biMessage = document.getElementById('bi_msg')
const warning = $('#warning_message')
const success = $('#success_content')
const table = document.querySelector('.display_list table')
const spanOfTable = document.querySelector('.display_list')

bi.addEventListener('onblur', () => {
  if (bi.value.length != 14) {
    biMessage.textContent = 'A quantidade de números no campo BI tem de ser 14'
    setTimeout(() => {
      biMessage.textContent = ''
    }, 3000)
    return false
  }
})

box.addEventListener('mouseover', () => {
  main.classList.add('mt-150')
  list.classList.add('mt-150')
  chart.classList.add('mt-150')
})
box.addEventListener('mouseout', () => {
  main.classList.remove('mt-150')
  list.classList.remove('mt-150')
  chart.classList.remove('mt-150')
})
addStudent.addEventListener('click', () => {
  mainStudent.classList.add('d_none')
  mainAddStudent.classList.remove('d_none')
})
backBtn.addEventListener('click', () => {
  mainStudent.classList.remove('d_none')
  mainAddStudent.classList.add('d_none')
})
viewStudentList.addEventListener('click', () => {
  mainStudent.classList.add('d_none')
  viewList.classList.remove('d_none')
})
backBtnView.addEventListener('click', () => {
  mainStudent.classList.remove('d_none')
  viewList.classList.add('d_none')
})

selectClass.addEventListener('change', () => {
  if (selectClass.value != '') {
    const trHead = `<tr class="first_tr">
    <td>Fotografia</td>
    <td>Nome</td>
    <td>Encarregado 1</td>
    <td>Encarregado 2</td>
    <td>Data de Nascimento</td>
    <td>BI</td>
    <td>Cidade</td>
    <td>Bairro</td>
    <td>Proveniência</td>
    <td>Gênero</td>
    <td>Estado Civil</td>
    <td>Classe</td>
    <td>Status</td>
    <td>Observações</td>
    <td>Secretária</td>
    <td>Atualizar</td>
    <td>Eliminar</td>
  </tr>`

  table.innerHTML = trHead
  
    $.post('/getStudents', { classe: selectClass.value }, data => {
      if(data.length > 0){
        data.forEach(element => {
          let [date, ] = element.born.split('T')
          let [year, month, day] = date.split('-')
          let tr = document.createElement('tr')
          let tdName = document.createElement('td')
          let tdFather = document.createElement('td')
          let tdMother = document.createElement('td')
          let tdBorn = document.createElement('td')
          let tdBI = document.createElement('td')
          let tdCity = document.createElement('td')
          let tdNeighbor = document.createElement('td')
          let tdBackground = document.createElement('td')
          let tdGender = document.createElement('td')
          let tdCivil = document.createElement('td')
          let tdClasse = document.createElement('td')
          let tdEnrol = document.createElement('td')
          let tdObs = document.createElement('td')
          let tdSecretary = document.createElement('td')
          let tdFile = document.createElement('td')
          let tdUpdate = document.createElement('td')
          let tdDelete = document.createElement('td')
          let img = document.createElement('img')
          let a1 = document.createElement('a')
          let a2 = document.createElement('a')

          a1.setAttribute('href', `/editStudent/${element._id}`)
          a2.setAttribute('href', `/deleteStudent/${element._id}`)
          a1.innerHTML = '<i class="fa fa-edit"></i>'
          a2.innerHTML = '<i class="fa fa-close"></i>'
          img.setAttribute('src', `/images/${element.file}`)
          img.classList.add('image_classes')

          tdName.textContent = `${element.name}`
          tdFather.textContent = `${element.father}`
          tdMother.textContent = `${element.mother}`
          tdBorn.textContent = `${day}/${month}/${year}`
          tdBI.textContent = `${element.bi}`
          tdCity.textContent = `${element.city}`
          tdNeighbor.textContent = `${element.neighbor}`
          tdBackground.textContent = `${element.background}`
          tdGender.textContent = `${element.gender}`
          tdCivil.textContent = `${element.civil}`
          tdClasse.textContent = `${element.classe}`
          tdEnrol.textContent = `${element.enrol}`
          tdObs.textContent = `${element.observation}`
          tdSecretary.textContent = `${element.secretary}`
          tdFile.appendChild(img)
          tdUpdate.appendChild(a1)
          tdDelete.appendChild(a2)
          tr.appendChild(tdFile)
          tr.appendChild(tdName)
          tr.appendChild(tdFather)
          tr.appendChild(tdMother)
          tr.appendChild(tdBorn)
          tr.appendChild(tdBI)
          tr.appendChild(tdCity)
          tr.appendChild(tdNeighbor)
          tr.appendChild(tdBackground)
          tr.appendChild(tdGender)
          tr.appendChild(tdCivil)
          tr.appendChild(tdClasse)
          tr.appendChild(tdEnrol)
          tr.appendChild(tdObs)
          tr.appendChild(tdSecretary)
          tr.appendChild(tdUpdate)
          tr.appendChild(tdDelete)

          table.appendChild(tr)
        });
      }else{
        let span = document.createElement('span')
        span.classList.add('alert_warning')
        span.textContent = 'Não há lista disponível!'
        spanOfTable.appendChild(span)

        setTimeout(() => {
          spanOfTable.removeChild(span)
        }, 3000)
      }
    }, 'json').fail(e => {
      console.log(e)
    })
  }
})

studentsCharts.addEventListener('click', () => {
  mainStudent.classList.add('d_none')
  displayStudentsCharts.classList.remove('d_none')
})
backBtnChart.addEventListener('click', () => {
  mainStudent.classList.remove('d_none')
  displayStudentsCharts.classList.add('d_none')
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

function chartNumbers(){
  $.get('/getAllStudents', data => {
    if(data.length > 0){
      handleClasses(data)
    }
  }, 'json').fail(e => {
    console.log(e)
  })
}

function handleClasses(data){
  const start = data.filter(e => e.classe === 'Iniciação')
  const firstGrade = data.filter(e => e.classe === '1ª Classe')
  const secondGrade = data.filter(e => e.classe === '2ª Classe')
  const thirdGrade = data.filter(e => e.classe === '3ª Classe')
  const fourthGrade = data.filter(e => e.classe === '4ª Classe')
  const fifthGrade = data.filter(e => e.classe === '5ª Classe')
  const sixthGrade = data.filter(e => e.classe === '6ª Classe')
  const seventhGrade = data.filter(e => e.classe === '7ª Classe')
  const eigthGrade = data.filter(e => e.classe === '8ª Classe')
  const ninethGrade = data.filter(e => e.classe === '9ª Classe')

  document.getElementById('start').textContent = (start.length > 0) ? `0${start.length}` : '00'
  document.getElementById('firstGrade').textContent = (firstGrade.length > 0) ? `0${firstGrade.length}` : '00'
  document.getElementById('secondGrade').textContent = (secondGrade.length > 0) ? `0${secondGrade.length}` : '00'
  document.getElementById('thirdGrade').textContent = (thirdGrade.length > 0) ? `0${thirdGrade.length}` : '00'
  document.getElementById('fourthGrade').textContent = (fourthGrade.length > 0) ? `0${fourthGrade.length}` : '00'
  document.getElementById('fifthGrade').textContent = (fifthGrade.length > 0) ? `0${fifthGrade.length}` : '00'
  document.getElementById('sixthGrade').textContent = (sixthGrade.length > 0) ? `0${sixthGrade.length}` : '00'
  document.getElementById('seventhGrade').textContent = (seventhGrade.length > 0) ? `0${seventhGrade.length}` : '00'
  document.getElementById('eigthGrade').textContent = (eigthGrade.length > 0) ? `0${eigthGrade.length}` : '00'
  document.getElementById('ninethGrade').textContent = (ninethGrade.length > 0) ? `0${ninethGrade.length}` : '00'
}


removeWarning()
removeSuccess()
chartNumbers()


