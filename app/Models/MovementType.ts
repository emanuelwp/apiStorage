import { BaseModel, HasMany, column, hasMany } from "@ioc:Adonis/Lucid/Orm";
import Movement from "./Movement";

export default class MovementType extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @hasMany(() => Movement, {
    localKey: "id",
    foreignKey: "movementId",
  })
  public movements: HasMany<typeof Movement>;
}
