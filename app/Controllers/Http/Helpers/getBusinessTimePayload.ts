import BusinessTime from "App/Models/BusinessTime"

export const getBusinessTimePayload = (body, storeId: number) => {
    const payload = body.businessTimes.map(
        (businessTime: BusinessTime): BusinessTime => {
            businessTime.storeId = storeId

            return businessTime
    })

    return payload
}