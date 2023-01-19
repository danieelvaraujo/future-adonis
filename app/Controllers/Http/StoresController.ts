import BusinessTime from 'App/Models/BusinessTime';
import Store from 'App/Models/Store';
import BusinessTimesRepository from 'App/Repositories/BusinessTimesRepository';
import StoresRepository from 'App/Repositories/StoresRepository';
import CreateStoreValidator from 'App/Validators/CreateStoreValidator';
import UpdateStoreValidator from 'App/Validators/UpdateStoreValidator';

import { getBusinessTimePayload } from './Helpers/getBusinessTimePayload';
import { messages } from './Helpers/Messages';

export default class StoresController {
    public async index({ response }) {
        const stores: Store[] | null = await StoresRepository.getAllStores()

        if (!stores.length) {
            return response.notFound({ message: messages.store.EMPTY })
        }

        return response.ok(stores)
    }

    public async show({ params, response }) {
        const { id }: { id: Number } = params

        const store: Store | null = await StoresRepository.findById(id)
        if (!store) {
            return response.notFound({ message: messages.store.NOT_FOUND })
        }

        return response.ok(store)
    }

    public async store({ request, response }) {
        try {
            const payload: any = await request.validate(CreateStoreValidator)
            const store: Store = await StoresRepository.createStore(payload)
        
            const businessTimePayload: BusinessTime[] = getBusinessTimePayload(
                request.requestBody, 
                store.id
            )            
            await BusinessTimesRepository.createMany(businessTimePayload)
            
            return response.ok(store)
        } catch (error) {            
            response.badRequest(error)
        }
    }

    public async update({ request, params, response }) {
        try {
            const payload: any = await request.validate(UpdateStoreValidator)
            const { id }: { id: Number } = params

            const store: any = await StoresRepository.updateStore(id, payload)
            
            return response.ok(store)
        } catch (error) {
            response.badRequest(error)
        }
    }

    public async destroy({ params, response }) {
        const { id }: { id: Number } = params

        const message: string = await StoresRepository.destroy(id)        

        return response.json({ message })
    }    
}
