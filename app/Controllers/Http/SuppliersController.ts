import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Supplier from "App/Models/Supplier";

export default class SuppliersController {
  public async index({}: HttpContextContract) {
    const suppliers = await Supplier.all();
    return suppliers;
  }

  public async store({ request }: HttpContextContract) {
    const body = request.body();
    const supplier = await Supplier.create({
      name: body.name,
      email: body.email,
      cnpj: body.cnpj,
      cep: body.cep,
    });
    return supplier;
  }

  public async show({ request }: HttpContextContract) {
    const supplierId = request.param("id");
    const supplier = await Supplier.findOrFail(supplierId);
    return supplier;
  }

  public async update({ request }: HttpContextContract) {
    const supplierId = request.param("id");
    const body = request.body();
    const supplier = await Supplier.findOrFail(supplierId);
    await supplier.merge(body).save();
    return supplier;
  }

  public async destroy({ request }: HttpContextContract) {
    const supplierId = request.param("id");
    const supplier = await Supplier.findOrFail(supplierId);
    await supplier.delete();
    return `Supplier ${supplierId} was deleted`;
  }

  // public async edit({}: HttpContextContract) {}

  // public async create({}: HttpContextContract) {}
}
