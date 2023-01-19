import BusinessTime from "App/Models/BusinessTime";
import Days from "Contracts/Enums/Days";

export default class BusinessTimesRepository {
    public static async createMany(payload: BusinessTime[]) {        
        return await BusinessTime.createMany(payload) 
    }   

    public static async possibilities(weekDay: string | Days, id: number) {
        return BusinessTime
            .query()
            .where({day: weekDay, store_id: id})
    }
}