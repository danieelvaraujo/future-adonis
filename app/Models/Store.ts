import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import BusinessTime from './BusinessTime'
import BusinessType from './BusinessType'

export default class Store extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public document: string

  @column()
  public businessTypeId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => BusinessType, {
    localKey: 'businessTypeId'
  })
  public businessType: HasOne<typeof BusinessType>

  @hasMany(() => BusinessTime, {
    localKey: 'storeId'
  })
  public businessTimes: HasMany<typeof BusinessTime>
}
 