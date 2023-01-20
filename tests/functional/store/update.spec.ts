import { test } from '@japa/runner'
import StoreFactory from 'Database/factories/StoreFactory'

test.group('Store update', () => {
  test('get a success message when updating store with optional values', async ({ client }) => {
    const store = await StoreFactory.create()
    const body = {
      document: "62290108000113"
    }

    const response = await client.put('/stores/' + store.id)      
      .form(body)
          
    response.assertStatus(200)
    response.assertBodyContains({ document: body.document })
  })
})
