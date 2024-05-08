/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from "@ioc:Adonis/Core/Route";

//verifica se a API está online
Route.get("/", async () => {
  return "A api-estoque está online!";
});

//gera o token de acesso do usuário
Route.post("/login", async ({ auth, request, response }) => {
  const email = request.input("email");
  const password = request.input("password");
  await auth.use("api").attempt(email, password);
  try {
    const token = await auth.use("api").attempt(email, password);
    return token;
  } catch {
    return response.unauthorized("Invalid credentials");
  }
});

//verifica se o usuário tem ou não token de acesso
Route.get("dashboard", async ({ auth }) => {
  await auth.use("api").authenticate();
  return `Olá ${auth.user?.name}, você está autenticado(a)!`;
});

//revoga o token
Route.post("/logout", async ({ auth }) => {
  try {
    await auth.use("api").authenticate();
    await auth.use("api").revoke();
    return {
      revoked: true,
    };
  } catch (error) {
    console.log(error);
  }
});

Route.resource("/users", "UsersController");

Route.resource("/categories", "CategoriesController");

Route.resource("/suppliers", "SuppliersController");
