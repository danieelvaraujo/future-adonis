import { schema, rules } from '@ioc:Adonis/Core/Validator'

import Loja from 'App/Models/Loja';
export default class LojasController {
    public async index({ response }) {
        const lojas = await Loja.all()

        return response.ok(lojas)
    }

    public async show({ params, response }) {
        const { id }: { id: Number } = params

        const loja: any = await Loja.find(id)
        if (!loja) {
            return response.notFound({ message: 'Loja não encontrada.' })
        }

        return response.ok(loja)
    }

    public async store({ request, response }) {
        const storeSchema = schema.create({
            titulo: schema.string({ trim: true }, [
                rules.required(),
                rules.maxLength(100)
            ]),
            documento: schema.string({ escape: true }, [
                rules.maxLength(14)
            ]),
            tipo: schema.string({ escape: true }, [
                rules.required(),
            ]),
            horario_abertura: schema.string({ escape: true }, [
                rules.required(),
            ]),
            horario_fechamento: schema.string({ escape: true }, [
                rules.required(),
            ]),
        })

        const payload: any = await request.validate({ schema: storeSchema })
        const loja: Loja = await Loja.create(payload)

        return response.ok(loja)
    }
}
