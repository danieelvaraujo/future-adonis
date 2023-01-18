import { schema, rules } from '@ioc:Adonis/Core/Validator'

import Store from 'App/Models/Store';

export default class StoresController {
    public async index({ response }) {
        const stores = await Store.all()

        return response.ok(stores)
    }

    public async show({ params, response }) {
        const { id }: { id: Number } = params

        const store: any = await Store.find(id)
        if (!store) {
            return response.notFound({ message: 'Loja não encontrada.' })
        }

        return response.ok(store)
    }

    public async store({ request, response }) {
        const storeSchema = schema.create({
            title: schema.string({ trim: true }, [
                rules.required(),
                rules.maxLength(100)
            ]),
            document: schema.string({ escape: true }, [
                rules.maxLength(14)
            ]),
            type: schema.string({ escape: true }, [
                rules.required(),
            ]),
            opening_hour: schema.string({ escape: true }, [
                rules.required(),
            ]),
            closing_hour: schema.string({ escape: true }, [
                rules.required(),
            ]),
        })

        const payload: any = await request.validate({ schema: storeSchema })
        const store: Store = await Store.create(payload)

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
            opening_hour: schema.string.optional(),
            closing_hour: schema.string.optional(),
        })

        const payload: any = await request.validate({ schema: storeSchema })
        const { id }: { id: Number } = params

        const store: any = await Store.find(id)
        if (!store) {
            return response.notFound({ message: 'Loja não encontrada.' })
        }

        store.title = dataToUpdate.title ?? payload.title
        store.document = dataToUpdate.document ?? payload.document
        store.type = dataToUpdate.type ?? payload.type
        store.opening_hour = dataToUpdate.opening_hour ?? payload.opening_hour
        store.closing_hour = dataToUpdate.closing_hour ?? payload.closing_hour

        await store.save()

        return response.ok(store)
    }
}
