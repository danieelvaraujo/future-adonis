import { test } from '@japa/runner'
import StoreFactory from 'Database/factories/StoreFactory'

test.group('Store update', () => {
  test('get a success message when updating store with optional values', async ({ client }) => {
    const store = await StoreFactory.create()
    const body = {
      title: "Tenda do Joaquim",
    }

    const response = await client.put(`/stores/${store.id}`)
      .form(body)
    console.log(response.error())
    response.assertStatus(200)
    response.assertBodyContains({ title: body.title })
  })
})
