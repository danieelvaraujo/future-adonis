import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import Days from 'Contracts/Enums/Days'

export default class extends BaseSchema {
  protected tableName = 'business_times'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.enu('day', Object.values(Days).slice(0, 7)).notNullable()
      table.time('opening_hour').notNullable()
      table.time('closing_hour').notNullable()

      table.integer('store_id')
        .unsigned()
        .references('id')
        .inTable('stores')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
