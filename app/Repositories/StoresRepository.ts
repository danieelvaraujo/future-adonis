import Store from "App/Models/Store";

export default class StoresRepository {
    public static async getAllStores() {
        return await Store.all()        
    }

    public static async findOneStore(id) {
        return await Store.find(id)
    }
}