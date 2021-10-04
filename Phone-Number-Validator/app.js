const phoneIn = document.querySelector('#phone')
const checkBtn = document.querySelector('#check')
const checkRegex = /^\+?[-. ]?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
const result = document.querySelector('#result')
checkBtn.addEventListener('click', () => {
 let phoneNum = phoneIn.value;
 let valid = phoneNum.match(checkRegex)
 if (valid) {
  result.style.color = 'green'
  result.textContent = 'Valid contact Number'
 } else {
  result.style.color = 'red'

  result.textContent = 'Invalid'
 }
})