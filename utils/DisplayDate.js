const hari = [ "Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu" ]

const separator = "-"

const checkMoreThanTen = (val) => {
    if(val < 10) return "0" + val
    return val
}

export const DisplayedDate = (val) => {
    const date = new Date(val)
    const day = checkMoreThanTen(date.getDate())
    const month = checkMoreThanTen(date.getMonth() + 1)
    const year = date.getFullYear()
    const displayDate = day + separator + month + separator + year

    return displayDate
}

export const DisplayedDateWithName = (val) => {
    const date = new Date(val)
    const dayName = hari[date.getDay()]
    const day = checkMoreThanTen(date.getDate())
    const month = checkMoreThanTen(date.getMonth() + 1)
    const year = date.getFullYear()
    const displayDateWithName = dayName + " " + day + separator + month + separator + year

    return displayDateWithName
}