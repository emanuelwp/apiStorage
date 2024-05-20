import { DateTime } from "luxon";
import {
  BaseModel,
  column,
  hasMany,
  HasMany,
  hasOne,
  HasOne,
} from "@ioc:Adonis/Lucid/Orm";
import {} from "@ioc:Adonis/Lucid/Orm";
import Category from "./Category";
import Movement from "./Movement";

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public stockQuantity: number;

  @column()
  public showcaseQuantity: number;

  @column()
  public minStockQuantity: number;

  @column()
  public minShowcaseQuantity: number;

  @column()
  public categoryId: number;

  @hasOne(() => Category, {
    localKey: "categoryId",
    foreignKey: "id",
  })
  public category: HasOne<typeof Category>;

  @hasMany(() => Movement, {
    localKey: "id",
    foreignKey: "movementId",
  })
  public movements: HasMany<typeof Movement>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
