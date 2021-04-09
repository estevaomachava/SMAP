const menulUl = document.getElementById('menu_ul')
const body = document.body
const background = document.querySelectorAll('#background ul li')

background.forEach(li => {
  li.addEventListener('click', () => {
    updateBackground(li.nextElementSibling.innerText, li.getAttribute('color-type'))
  })
})

function updateBackground(name, color) {
  $.post('/updateColor', { name: name, color: color }, data => {

    getBackground()

  }, 'json').fail(e => {
    body.className = 'body_background-4'
    console.log(e)
  })
}

function getBackground() {
  $.get('/getColor', data => {
    if (data.length > 0) {
      switch (data[0].color) {
        case 'back2.jpg':
          body.className = 'body_background-2'
          break;
        case 'back3.jpg':
          body.className = 'body_background-3'
          break;
        case 'back4.jpg':
          body.className = 'body_background-4'
          break;
        default:
          body.className = 'body_background-1'
          break;
      }

    } else {
      body.className = 'body_background-4'
    }

  }, 'json').fail(e => {
    body.className = 'body_background-4'
    console.log(e)
  })
}

getBackground()
menulUl.style.height = `${innerHeight}px`