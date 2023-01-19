import BusinessTime from 'App/Models/BusinessTime';
import Store from 'App/Models/Store';
import BusinessTimesRepository from 'App/Repositories/BusinessTimesRepository';
import BusinessTypesRepository from 'App/Repositories/BusinessTypesRepository';
import StoresRepository from 'App/Repositories/StoresRepository';
import CreateStoreValidator from 'App/Validators/CreateStoreValidator';
import UpdateStoreValidator from 'App/Validators/UpdateStoreValidator';

import { getBusinessTimePayload } from './Helpers/getBusinessTimePayload';

export default class StoresController {
    public async index({ response }) {
        const stores = await StoresRepository.getAllStores()

        if (!stores) {
            return response.notFound({ message: 'Ainda não há lojas cadastradas.' })
        }

        return response.ok(stores)
    }

    public async show({ params, response }) {
        const { id }: { id: Number } = params

        const store = await StoresRepository.findById(id)
        if (!store) {
            return response.notFound({ message: 'A loja não foi encontrada.' })
        }

        return response.ok(store)
    }

    public async store({ request, response }) {
        const availableBusinessTypes = BusinessTypesRepository
            .availableBusinessTypes(request.requestBody.businessType)
        
        if (!availableBusinessTypes) {
            return response.json({ error: 'O tipo da loja não está dentro dos permitidos.' })
        }

        try {
            const payload: any = await request.validate(CreateStoreValidator)
            const store: Store = await StoresRepository.createStore(payload, availableBusinessTypes)
        
            const businessTimePayload: BusinessTime[] = getBusinessTimePayload(
                request.requestBody, 
                store.id
            )            
            await BusinessTimesRepository.createMany(businessTimePayload)
            
            return response.ok(store)
        } catch (error) {
            response.badRequest(error.messages)
        }
    }

    public async update({ request, params, response }) {
        try {
            const payload: any = await request.validate(UpdateStoreValidator)
            const { id }: { id: Number } = params

            const store: any = await StoresRepository.findById(id)
            if (!store) {
                return response.notFound({ message: 'A loja não foi encontrada.' })
            }

            store.merge(payload);
            await store.save()

            return response.ok(store)
        } catch (error) {
            response.badRequest(error.messages)
        }
    }

    public async destroy({ params, response }) {
        const { id }: { id: Number } = params

        const store: any = await StoresRepository.findById(id)
        if (!store) {
            return response.notFound({ message: 'A loja não foi encontrada' })
        }

        await store.delete()

        return response.ok({ message: 'A loja foi removida com sucesso.' })
    }    
}
