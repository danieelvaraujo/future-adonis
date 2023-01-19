import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Days from 'Contracts/Enums/Days'
import Store from './Store'

export default class BusinessTime extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public storeId: number

  @column()
  public day: Days

  @column()
  public openingHour: string

  @column()
  public closingHour: string  

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Store, {
    foreignKey: 'storeId'
  })
  public store: HasOne<typeof Store>
}
