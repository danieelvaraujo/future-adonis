import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateStoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    title: schema.string.optional({}, [
      rules.maxLength(50),
      rules.unique({ table: 'stores', column: 'title'})
    ]),
    document: schema.string.optional({ escape: true }, [
      rules.maxLength(14),
      rules.unique({ table: 'stores', column: 'document'})
    ]),
    type: schema.string.optional({}, [
      rules.exists({ table: 'business_types', column: 'type'})
    ]),
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {
    'title.maxLength': 'O nome da loja não pode ter mais do que 50 caracteres.',
    'title.unique': 'O nome desta loja já foi cadastrado.',
    'document.maxLength': 'O documento deve ter no máximo 14 caracteres.',
    'document.unique': 'Este documento já foi anteriormente cadastrado.',
    'type.exists': 'O tipo da loja não está dentro dos permitidos.',
  }
}
