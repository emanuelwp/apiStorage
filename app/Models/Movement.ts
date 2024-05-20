import { DateTime } from "luxon";
import { BaseModel, HasOne, column, hasOne } from "@ioc:Adonis/Lucid/Orm";
import MovementType from "./MovementType";
import Product from "./Product";
import Supplier from "./Supplier";
import User from "./User";

export default class Movement extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public movementQuantity: number;

  @column()
  public dateTime: DateTime;

  @column()
  public description: string;

  @column()
  public userId: number;

  @column()
  public productId: number;

  @column()
  public movementTypeId: number;

  @column()
  public supplierId: number;

  @hasOne(() => User, {
    localKey: "userId",
    foreignKey: "id",
  })
  public user: HasOne<typeof User>;

  @hasOne(() => Product, {
    localKey: "productId",
    foreignKey: "id",
  })
  public product: HasOne<typeof Product>;

  @hasOne(() => MovementType, {
    localKey: "movementTypeId",
    foreignKey: "id",
  })
  public movementType: HasOne<typeof MovementType>;

  @hasOne(() => Supplier, {
    localKey: "supplierId",
    foreignKey: "id",
  })
  public supplier: HasOne<typeof Supplier>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
