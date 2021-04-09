const email = document.getElementById('email')
const password = document.getElementById('password')
const form = document.getElementById('form')
const span = document.getElementById('msg')
const warning = $('#warning_message')

form.onsubmit = e => {
  if (email.value === '' || !email.value) {
    message('Digite a seu email!')
    return false
  }
  if (password.value === '' || !password.value) {
    message('Digite a sua senha!')
    return false
  }
  if (password.value.length < 2) {
    message('A senha deve ter pelo menos 10 caracteres!')
    password.value = ''
    return false
  }
  return true
}

function message(msg) {
  span.classList.add('alert_warning')
  span.innerHTML = msg
  setTimeout(() => {
    span.classList.remove('alert_warning')
    span.innerHTML = ''
  }, 3000)
}

function removeWarning() {
  if (warning.text().length > 0) {
    warning.fadeIn()
    setTimeout(() => {
      warning.fadeOut(5000)
    }, 3000)
  }
}

removeWarning()