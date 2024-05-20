import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "movement_types";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").notNullable().primary();
      table.string("name").notNullable().unique();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
