import Factory from '@ioc:Adonis/Lucid/Factory'
import BusinessTime from 'App/Models/BusinessTime'
import Days from 'Contracts/Enums/Days'

export default Factory.define(BusinessTime, () => {
  return {
    storeId: 1,
    day: Days.SEGUNDA,
    openingHour: '08:00',
    closingHour: '16:00'
  }
}).build()
