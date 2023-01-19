import BusinessTime from "App/Models/BusinessTime";
import BusinessType from "App/Models/BusinessType";

export default class BusinessTimesRepository {
    public static async createMany(payload: BusinessTime[]) {
        return await BusinessType.createMany(payload) 
    }   
}