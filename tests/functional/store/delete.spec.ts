import { test } from '@japa/runner'
import { messages } from 'App/Controllers/Http/Helpers/Messages'
import StoreFactory from 'Database/factories/StoreFactory'

test.group('Store delete', () => {
  test('get an error message when deleting a non existing store', async ({ client }) => {
    const response = await client.delete('/stores/51')

    response.assertBodyContains({ message: messages.store.NOT_FOUND })
  })

  test('get a success message when deleting existing store', async ({ client }) => {
    const store = await StoreFactory.create()
    const response = await client.delete(`/stores/${store.id}`)

    response.assertStatus(200)    
  })
})
