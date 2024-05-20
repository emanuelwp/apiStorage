import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "movements";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").notNullable().primary();
      table.integer("movement_quantity");
      table.dateTime("date_time").notNullable();
      table.string("description").nullable();
      table.integer("user_id").notNullable();
      table.integer("product_id").notNullable();
      table.integer("movement_type_id").notNullable();
      table.integer("supplier_id").nullable();
      table.foreign("product_id").references("products.id").onDelete("CASCADE");
      table.foreign("user_id").references("users.id").onDelete("CASCADE");
      table
        .foreign("movement_type_id")
        .references("movement_types.id")
        .onDelete("CASCADE");
      table
        .foreign("supplier_id")
        .references("suppliers.id")
        .onDelete("CASCADE");

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
