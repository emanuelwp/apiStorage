import Hash from "@ioc:Adonis/Core/Hash";
import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "users";

  public async up() {
    const AdminUsers = [
      {
        name: "Usuário teste 1",
        email: "teste1@gmail.com",
        password: "1234",
      },
      {
        name: "Usuário teste 2",
        email: "teste2@gmail.com",
        password: "1234",
      },
    ];

    async function hashPassword(users) {
      for (const user of users) {
        user.password = await Hash.make(user.password);
      }
      return users;
    }

    const AdminUsersHashed = await hashPassword(AdminUsers);

    await this.db.table(this.tableName).insert(AdminUsersHashed);
  }
}
