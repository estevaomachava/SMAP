const selectHeader = document.getElementById('header_person_in_charge')
const tableHeader = document.getElementById('table_header')
const spanHeader = document.getElementById('span_header')

selectHeader.addEventListener('change', () => {
  console.log('Something was changed')
  if (selectHeader.value != '') {
    const trHeader = `
    <tr class="first_tr">
    <td>Fotografia</td>
    <td>Nome</td>
    <td>Encarregado 1</td>
    <td>Encarregado 2</td>
    <td>Cidade</td>
    <td>Bairro</td>
    <td>Classe</td>
  </tr>`

  tableHeader.innerHTML = trHeader
  
    $.post('/getStudents', { classe: selectHeader.value }, data => {
      if(data.length > 0){
        console.log(data)
        data.forEach(element => {
          let tr = document.createElement('tr')
          let tdName = document.createElement('td')
          let tdFather = document.createElement('td')
          let tdMother = document.createElement('td')
          let tdCity = document.createElement('td')
          let tdNeighbor = document.createElement('td')
          let tdClasse = document.createElement('td')
          let tdFile = document.createElement('td')
          let img = document.createElement('img')

          img.setAttribute('src', `${element.file}`)
          img.classList.add('image_classes')

          tdName.textContent = `${element.name}`
          tdFather.textContent = `${element.father}`
          tdMother.textContent = `${element.mother}`
          tdCity.textContent = `${element.city}`
          tdNeighbor.textContent = `${element.neighbor}`
          tdClasse.textContent = `${element.classe}`
          tdFile.appendChild(img)
          tr.appendChild(tdFile)
          tr.appendChild(tdName)
          tr.appendChild(tdFather)
          tr.appendChild(tdMother)
          tr.appendChild(tdCity)
          tr.appendChild(tdNeighbor)
          tr.appendChild(tdClasse)

          tableHeader.appendChild(tr)
        });
      }else{
        let span = document.createElement('span')
        span.classList.add('alert_warning')
        span.textContent = 'Não há lista disponível!'
        spanHeader.appendChild(span)

        setTimeout(() => {
          spanHeader.removeChild(span)
        }, 3000)
      }
    }, 'json').fail(e => {
      console.log(e)
    })
  }
})
