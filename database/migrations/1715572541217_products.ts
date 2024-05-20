import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "products";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").notNullable().primary();
      table.string("name").notNullable();
      table.integer("stock_quantity").notNullable();
      table.integer("showcase_quantity").notNullable();
      table.integer("min_stock_quantity").notNullable();
      table.integer("min_showcase_quantity").notNullable();
      table.integer("category_id").nullable();
      table
        .foreign("category_id")
        .references("categories.id")
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
