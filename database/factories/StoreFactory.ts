import Store from 'App/Models/Store'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(Store, ({ faker }) => {
  return {
    title: faker.random.word(),
    document: faker.random.numeric(14),
    businessTypeId: faker.datatype.number({
      min: 1,
      max: 5
    }),
  }
}).build()
