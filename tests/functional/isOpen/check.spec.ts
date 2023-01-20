import { test } from '@japa/runner'
import BusinessTimeFactory from 'Database/factories/BusinessTimeFactory'
import StoreFactory from 'Database/factories/StoreFactory'

test.group('Is open check', () => {
  test('returns true if store is open', async ({ client }) => {
    const store = await StoreFactory.create()
    //Segunda - 08:00 as 16:00
    await BusinessTimeFactory.create()
    
    const response = await client.get(`stores/is_open?store=${store.id}&data=2023-01-16T12:14:14.155Z`)

    response.assertStatus(200)
    response.assertBodyContains({ isOpen: true })
  })

  test('returns false if store is closed', async ({ client }) => {
    const store = await StoreFactory.create()
    await BusinessTimeFactory.create()

    //Terça - 08:00 as 16:00
    const response = await client.get(`stores/is_open?store=${store.id}&data=2023-01-17T11:14:14.155Z`)

    response.assertStatus(400)
    response.assertBodyContains({ isOpen: false })
  })
})
