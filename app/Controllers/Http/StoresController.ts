import { schema, rules } from '@ioc:Adonis/Core/Validator'
import BusinessTime from 'App/Models/BusinessTime';
import BusinessType from 'App/Models/BusinessType';

import Store from 'App/Models/Store';
import StoresRepository from 'App/Repositories/StoresRepository';

export default class StoresController {
    public async index({ response }) {
        const stores = await StoresRepository.getAllStores()

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
        const availableBusinessTypes = await BusinessType
            .query()    
            .where('type', request.requestBody.businessType)
            .first();
        
        if (!availableBusinessTypes) {
            return response.json({ error: 'O tipo do restaurante não é aceitável.' })
        }

        const storeSchema = schema.create({
            title: schema.string({ trim: true }, [
                rules.required(),
                rules.maxLength(100)
            ]),
            document: schema.string({ escape: true }, [
                rules.maxLength(14)
            ])
        })

        const payload: any = await request.validate({ schema: storeSchema })
        const store: Store = await StoresRepository.createStore(payload, availableBusinessTypes)
        
        const businessTimesArray = request.requestBody.businessTimes.map(
            (businessTime: BusinessTime): BusinessTime => {
                businessTime.storeId = store.id

                return businessTime
        })
        
        await BusinessTime.createMany(businessTimesArray)

        return response.ok(store)
    }

    public async update({ request, params, response }) {
        const dataToUpdate = request.requestBody;
        const storeSchema = schema.create({
            title: schema.string.optional(),
            document: schema.string.optional({ escape: true }, [
                rules.maxLength(14),
            ]),
            type: schema.string.optional(),
        })

        const payload: any = await request.validate({ schema: storeSchema })
        const { id }: { id: Number } = params

        const store: any = await StoresRepository.findById(id)
        if (!store) {
            return response.notFound({ message: 'A loja não foi encontrada.' })
        }

        store.title = dataToUpdate.title ?? payload.title
        store.document = dataToUpdate.document ?? payload.document
        store.type = dataToUpdate.type ?? payload.type

        await store.save()

        return response.ok(store)
    }

    public async destroy({ params, response }) {
        const { id }: { id: Number } = params

        const store: any = await StoresRepository.findById(id)
        if (!store) {
            return response.notFound({ message: 'A loja não foi encontrada' })
        }

        await store.delete()

        return response.ok({ message: 'A loja foi removida com sucesso.' })
    }StoresController
    
}
