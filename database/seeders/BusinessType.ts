import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import BusinessType from 'App/Models/BusinessType'

export default class extends BaseSeeder {
  public async run () {
    await BusinessType.createMany([
      {
        type: 'restaurante',
      },
      {
        type: 'bar',
      },
      {
        type: 'cafeteria',
      },
      {
        type: 'sorveteria',
      },
      {
        type: 'supermercado',
      },
    ])

  }
}
