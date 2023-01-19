import { test } from '@japa/runner'
import { messages } from 'App/Controllers/Http/Helpers/Messages'
import StoreFactory from 'Database/factories/StoreFactory'

test.group('Store list', () => {
  test('get a error message when listing stores with empty db', async ({ client }) => {
    const response = await client.get('/stores')

    response.assertStatus(404)
    response.assertBodyContains({ message: messages.store.EMPTY })
  })

  test('get a list of stores', async ({ client }) => {
    await StoreFactory.create()
    const response = await client.get('/stores')

    response.assertStatus(200)
    response.assertBodyContains([{ id: 1 }])
  })

  test('get a single store', async ({ client }) => {
    const store = await StoreFactory.create()
    const response = await client.get(`/stores/${store.id}`)

    response.assertStatus(200)
    response.assertBodyContains({ id: store.id })
  })

})
