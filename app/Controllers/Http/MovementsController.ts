import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Movement from "App/Models/Movement";
import MovementType from "App/Models/MovementType";
import Product from "App/Models/Product";
import { DateTime } from "luxon";

export default class MovementsController {
  public async index({}: HttpContextContract) {
    const movements = await Movement.all();
    return movements;
  }

  public async store({ request, auth }: HttpContextContract) {
    const body = request.body();
    const user = await auth.authenticate();
    const movementType = await MovementType.findOrFail(body.movementTypeId);

    const movementQuantity = parseInt(body.movementQuantity, 10);

    if (movementType?.name === "Entrada") {
      const product = await Product.findOrFail(body.productId);
      product.stockQuantity = product.stockQuantity + movementQuantity;
      product.quantity = product.stockQuantity + product.showcaseQuantity;
      product.save();
    } else if (movementType?.name === "Transferência") {
      const product = await Product.findOrFail(body.productId);
      if (product.stockQuantity < movementQuantity) {
        throw new Error("Quantia insuficiente em estoque");
      } else {
        product.stockQuantity = product.stockQuantity - movementQuantity;
        product.showcaseQuantity = product.showcaseQuantity + movementQuantity;
        product.quantity = product.stockQuantity + product.showcaseQuantity;
        product.save();
      }
    } else if (movementType?.name === "Saída") {
      const product = await Product.findOrFail(body.productId);
      if (product.showcaseQuantity < movementQuantity) {
        throw new Error("Quantia insuficiente em vitrine");
      } else {
        product.showcaseQuantity = product.showcaseQuantity - movementQuantity;
        product.quantity = product.stockQuantity + product.showcaseQuantity;
        product.save();
      }
    } else if (movementType?.name === "Descarte") {
      const product = await Product.findOrFail(body.productId);
      product.stockQuantity = 0;
      product.showcaseQuantity = 0;
      product.quantity = product.stockQuantity + product.showcaseQuantity;
      product.save();
    }

    const date = DateTime.now();
    const dateFormatted = date.toFormat("dd/MM/yyyy HH:mm:ss");

    const movement = await Movement.create({
      movementQuantity: body.movementQuantity,
      dateTime: body.dateTime || dateFormatted,
      description: body.description,
      userId: user.id,
      productId: body.productId,
      supplierId: body.supplierId,
      movementTypeId: body.movementTypeId,
    });
    return movement;
  }

  public async show({ request }: HttpContextContract) {
    const movementId = request.param("id");
    const movement = await Movement.query().where("id", movementId);
    return movement;
  }

  // public async update({ request }: HttpContextContract) {
  //   const movementId = request.param("id");
  //   const body = request.body();
  //   const movement = await Movement.findOrFail(movementId);
  //   await movement.merge(body).save();
  //   return movement;
  // }

  // public async destroy({ request }: HttpContextContract) {
  //   const movementId = request.param("id");
  //   const movement = await Movement.findOrFail(movementId);
  //   await movement.delete();
  //   return `Movement ${movementId} was deleted`;
  // }

  // public async edit({}: HttpContextContract) {}

  // public async create({}: HttpContextContract) {}
}
