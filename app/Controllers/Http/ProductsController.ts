import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Product from "App/Models/Product";

export default class ProductsController {
  public async index({}: HttpContextContract) {
    const products = await Product.query().preload("category");
    return products;
  }

  public async store({ request }: HttpContextContract) {
    const body = request.body();
    const product = await Product.create({
      name: body.name,
      stockQuantity: body.stockQuantity,
      showcaseQuantity: body.showcaseQuantity,
      minStockQuantity: body.minStockQuantity,
      minShowcaseQuantity: body.minShowcaseQuantity,
      categoryId: body.categoryId,
    });

    return product;
  }

  public async show({ request }: HttpContextContract) {
    const productId = request.param("id");
    const product = Product.query().where("id", productId).preload("category");
    return product;
  }

  public async update({ request }: HttpContextContract) {
    const productId = request.param("id");
    const body = request.body();
    const product = await Product.findOrFail(productId);
    await product.merge(body).save();
    return product;
  }

  public async destroy({ request }: HttpContextContract) {
    const productId = request.param("id");
    const product = await Product.findOrFail(productId);
    await product.delete();
    return `Product ${productId} was deleted`;
  }

  // public async create({}: HttpContextContract) {}

  // public async edit({}: HttpContextContract) {}
}
