import BusinessTime from "App/Models/BusinessTime"

export default class FilterPossibilitiesService {
    public static applyFilter (possibilities: BusinessTime[], dateGMT: any) {
        possibilities.filter((possibility) => {
            const [openingHours, openingMinutes, openingSeconds] = possibility.openingHour.split(':')
            const [closingHours, closingMinutes, closingSeconds] = possibility.closingHour.split(':')            

            const possibilityLowerDateLimit = new Date(dateGMT)
            possibilityLowerDateLimit.setHours(Number(openingHours))
            possibilityLowerDateLimit.setMinutes(Number(openingMinutes))
            possibilityLowerDateLimit.setSeconds(Number(openingSeconds))

            const possibilityUpperDateLimit = new Date(dateGMT)            
            possibilityUpperDateLimit.setHours(Number(closingHours))
            possibilityUpperDateLimit.setMinutes(Number(closingMinutes))
            possibilityUpperDateLimit.setSeconds(Number(closingSeconds))

            return possibilityLowerDateLimit <= dateGMT && 
                possibilityUpperDateLimit >= dateGMT
        })

        return possibilities
    }
}