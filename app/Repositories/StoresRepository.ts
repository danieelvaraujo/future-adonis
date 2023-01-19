import Store from "App/Models/Store";

export default class StoresRepository {
    public static async getAllStores() {
        return await Store.all()        
    }

    public static async findById(id: Number) {
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

    public static async destroy(id: Number) {
        const store: any = await Store.find(id)
        if (!store) {
            return 'A loja não foi encontrada.'
        }

        try {
            await store.delete()
            return 'A loja foi removida com sucesso.'
        } catch (error) {
            return 'Houve um problema ao tentar remover a loja.'
        }
    }
}