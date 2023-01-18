import Database from '@ioc:Adonis/Lucid/Database'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LojasController {
    public async index() {
        return Database.from('lojas').select('*')
    }

    public async store(ctx: HttpContextContract) {
        const requestBody = ctx.request.body();

        await Database
            .table('lojas')
            .insert({
                titulo: requestBody.titulo,
                documento: requestBody.documento,
                tipo: requestBody.tipo,
                horario_abertura: requestBody.horario_abertura,
                horario_fechamento: requestBody.horario_fechamento
            })
            .returning('id') // For PostgreSQL

        return "Loja adicionada com sucesso."
    }
}
