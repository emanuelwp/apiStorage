import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "movement_types";

  public async up() {
    const MovementTypes = [
      { name: "Entrada" },
      { name: "Transferência" },
      { name: "Saída" },
      { name: "Descarte" },
    ];

    await this.db.table(this.tableName).insert(MovementTypes);
  }
}
