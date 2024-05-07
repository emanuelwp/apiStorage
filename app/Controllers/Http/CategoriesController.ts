import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Category from "App/Models/Category";

export default class CategoriesController {
  //lista todas as categorias criadas
  public async index({}: HttpContextContract) {
    const category = await Category.all(); //lista todas as categorias
    return category;
  }

  //armazena uma nova categoria no banco
  public async store({ request }: HttpContextContract) {
    const body = request.body(); //pega todas as informações que estão sendo passadas no corpo da requisição
    const category = await Category.create({
      //atribui as iformações do corpo da requisição na nova categoria
      name: body.name,
      description: body.description,
    });
    return category;
  }

  //exibe as informações de uma categoria
  public async show({ request }: HttpContextContract) {
    const categoryId = request.param("id"); //pega o id da categoria que foi passado como parâmetro pela url
    const category = await Category.findOrFail(categoryId);
    return category;
  }

  //atualiza as informações de uma categoria
  public async update({ request }: HttpContextContract) {
    const body = request.body(); //pega todas as informações que estão sendo passadas no corpo da requisição
    const categoryId = request.param("id"); //pega o id da categoria que foi passado como parâmetro pela url
    const category = await Category.findOrFail(categoryId);
    await category.merge(body).save(); //substitui as informações originais da categoria pelas do corpo da requisição
    return category;
  }

  //deleta uma categoria
  public async destroy({ request }: HttpContextContract) {
    const categoryId = request.param("id"); //pega o id da categoria que foi passado como parâmetro pela url
    const category = await Category.findOrFail(categoryId);
    await category.delete();
    return `Category ${categoryId} was deleted`;
  }

  // public async create({}: HttpContextContract) {}

  // public async edit({}: HttpContextContract) {}
}
