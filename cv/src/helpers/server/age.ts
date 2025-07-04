const birthDate = new Date(1995, 5, 29, 0, 0, 0)

export function getAge(): number {
  const currentDate = new Date()

  const hadBirthDayThisYear = currentDate.getMonth() > birthDate.getMonth() ||
    (currentDate.getMonth() == birthDate.getMonth() &&
      currentDate.getDate() >= birthDate.getDate())
  return (currentDate.getFullYear() - birthDate.getFullYear()) -
    (hadBirthDayThisYear ? 0 : 1)
}
