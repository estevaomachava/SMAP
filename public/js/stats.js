function dataStatistics() {

  const student = document.getElementById('student')
  const head = document.getElementById('head')
  const event = document.getElementById('event')
  const worker = document.getElementById('worker')
  const finance = document.getElementById('finance')
  const doc = document.getElementById('doc')

  $.get('/getAllData', data => {
    student.textContent = data.student.length
    head.textContent = data.student.length
    event.textContent = data.event.length
    worker.textContent = data.worker.length
    finance.textContent = data.finance.length
    doc.textContent = data.doc.length
  }, 'json').fail(e => {
    console.log(e)
  })
}

dataStatistics()