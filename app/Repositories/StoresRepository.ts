import { messages } from "App/Controllers/Http/Helpers/Messages";
import BusinessType from "App/Models/BusinessType";
import Store from "App/Models/Store";

export default class StoresRepository {
    public static async getAllStores() {
        return await Store.all()        
    }

    public static async findById(id: Number) {
        return await Store.find(id)
    }

    public static async createStore(payload) {
        const businessType = await BusinessType
            .findByOrFail('type', payload.businessType)

        const created = await Store.create({
            title: payload.title,
            document: payload.document,
            businessTypeId: businessType.id
        })

        return created;
    }

    public static async updateStore(id, payload) {
        const store: any = await Store.findOrFail(id)
        const businessType: BusinessType = await BusinessType.findByOrFail('type', payload.businessType)

        store.title = payload.title ?? store.title
        store.document = payload.document ?? store.document 
        store.businessTypeId = businessType.id ?? store.businessTypeId
        
        await store.save()

        return store
    }

    public static async destroy(id: Number) {
        const store: Store | null = await Store.find(id)
        if (!store) {
            return messages.store.NOT_FOUND
        }

        try {
            await store.delete()
            return messages.store.REMOVED
        } catch (error) {
            return messages.store.ERROR
        }
    }
}