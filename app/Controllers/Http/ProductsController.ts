import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Product from "App/Models/Product";

export default class ProductsController {
  public async index({}: HttpContextContract) {
    const products = await Product.query().preload("category");
    return products;
  }

  public async store({ request }: HttpContextContract) {
    const body = await request.body();

    const stockQuantity = parseInt(body.stockQuantity);
    const showcaseQuantity = parseInt(body.showcaseQuantity);
    const minStockQuantity = parseInt(body.minStockQuantity);
    const minShowcaseQuantity = parseInt(body.minShowcaseQuantity);
    const categoryId = parseInt(body.categoryId);

    const quantity = stockQuantity + showcaseQuantity;

    const product = await Product.create({
      name: body.name,
      quantity,
      stockQuantity,
      showcaseQuantity,
      minStockQuantity,
      minShowcaseQuantity,
      categoryId,
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

  public async dashboard({}: HttpContextContract) {
    //Faz uma query para pegar os produtos que tem o estoque
    const productsWithStock = await Product.query().where((query) => {
      query.where("quantity", ">", 0);
    });
    const amountWithStock = productsWithStock.length;

    //Pega os nomes
    const nameWithStock: string[] = [];
    for (const product of productsWithStock) {
      nameWithStock.push(product.name);
    }

    //Faz uma query para pegar os produtos que não tem o estoque
    const productsWithoutStock = await Product.query().where((query) => {
      query.where("quantity", "=", 0);
    });
    const amountWithoutStock = productsWithoutStock.length;

    //Pega os nomes
    const nameWithoutStock: string[] = [];
    for (const product of productsWithoutStock) {
      nameWithoutStock.push(product.name);
    }

    //Faz uma query para pegar os produtos que estão abaixo do mínimo no estoque
    const belowStockMin = await Product.query().where((query) => {
      query.whereRaw("stock_quantity < min_stock_quantity");
    });
    const amountStockMin = belowStockMin.length;

    //Pega os nomes
    const nameStockMin: string[] = [];
    for (const product of belowStockMin) {
      nameStockMin.push(product.name);
    }

    //Faz uma query para pegar os produtos que estão abaixo do mínimo na vitrine
    const belowShowcaseMin = await Product.query().where((query) => {
      query.whereRaw("showcase_quantity < min_showcase_quantity");
    });
    const amountShowcaseMin = belowShowcaseMin.length;

    //Pega os nomes
    const nameShowcaseMin: string[] = [];
    for (const product of belowShowcaseMin) {
      nameShowcaseMin.push(product.name);
    }

    const result = {
      amountWithStock,
      nameWithStock,
      amountWithoutStock,
      nameWithoutStock,
      amountStockMin,
      nameStockMin,
      amountShowcaseMin,
      nameShowcaseMin,
    };

    return result;
  }

  // public async create({}: HttpContextContract) {}

  // public async edit({}: HttpContextContract) {}
}
