export const getDataGMT = (dateToCheck): Date => {
    const dateGMT = new Date(dateToCheck)
    const requestHours = dateGMT.getHours()
    dateGMT.setHours(requestHours - 3)

    return dateGMT
}