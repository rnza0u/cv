const birthDate = new Date(1995, 5, 29, 0, 0, 0)
const currentDate = new Date()

const hadBirthDayThisYear = currentDate.getMonth() > birthDate.getMonth() ||
    (currentDate.getMonth() == birthDate.getMonth() && currentDate.getDay() >= birthDate.getDay())
const age = (currentDate.getFullYear() - birthDate.getFullYear()) - (hadBirthDayThisYear ? 0 : 1)

document.querySelector('#current-age').textContent = age.toString()

const loader = document.querySelector('#loader-wrapper')

if (loader)
    loader.classList.add('faded-out')
