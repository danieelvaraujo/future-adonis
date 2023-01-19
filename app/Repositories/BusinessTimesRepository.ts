import BusinessTime from "App/Models/BusinessTime";

export default class BusinessTimesRepository {
    public static async createMany(payload: BusinessTime[]) {        
        return await BusinessTime.createMany(payload) 
    }   
}