import { test } from '@japa/runner'

test.group('Store create', () => {
  test('get a success message when creating store with correct values', async ({ client }) => {
    const body = {
      title: "Bard Fodido",
      document: "52266679000169",
      businessType: 'bar',
      businessTimes: [
          {
              day: "SEGUNDA",
              opening_hour: "08:00",
              closing_hour: "12:00"
          },{
            day: "TERCA",
            opening_hour: "08:00",
            closing_hour: "16:00"
        },
        {
            day: "QUARTA",
            opening_hour: "14:00",
            closing_hour: "22:00"
        }
      ]
    }

    const response = await client.post('/stores')
      .form(body)

    response.assertStatus(200)
    response.assertBodyContains({ id: 1 })
  })
})
