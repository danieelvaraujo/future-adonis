import BusinessType from "App/Models/BusinessType";

export default class BusinessTypesRepository {
    public static async availableBusinessTypes(businessType: string) {
        return await BusinessType
            .query()    
            .where('type', businessType)
            .first();   
    }   
}