import Store from "App/Models/Store";

export default class StoresRepository {
    public static async getAllStores() {
        return await Store.all()        
    }

    public static async findById(id) {
        return await Store.find(id)
    }

    public static async createStore(payload, availableBusinessTypes) {
        const created = await Store.create({
            title: payload.title,
            document: payload.document,
            businessTypeId: availableBusinessTypes.id
        })

        return created;
    }
}