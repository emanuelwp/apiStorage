import Hash from "@ioc:Adonis/Core/Hash";
import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "users";

  public async up() {
    const AdminUsers = [
      {
        name: "Rosane Wagner Pereira",
        email: "rosanewp@gmail.com",
        password: "jair61",
      },
      {
        name: "Emanuel Wagner Pereira",
        email: "emanuelwp0@gmail.com",
        password: "Ewp@2004",
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
