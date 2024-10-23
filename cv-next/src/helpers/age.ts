export function getAge(): number {
    const birthDate = new Date(1995, 5, 29, 0, 0, 0)
    const currentDate = new Date()

    const hadBirthDayThisYear = currentDate.getMonth() > birthDate.getMonth() ||
        (currentDate.getMonth() == birthDate.getMonth() && currentDate.getDay() >= birthDate.getDay())
    return (currentDate.getFullYear() - birthDate.getFullYear()) - (hadBirthDayThisYear ? 0 : 1)
}