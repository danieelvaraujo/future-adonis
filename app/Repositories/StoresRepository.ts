import Store from "App/Models/Store";

export default class StoresRepository {
    public static async getAllStores() {
        return await Store.all()        
    }
}