import Route from "@ioc:Adonis/Core/Route";

//verifica se a API está online
Route.get("/", async () => {
  return "A api-estoque está online!";
});

//gera o token de acesso do usuário
Route.post("/login", async ({ auth, request, response }) => {
  const email = request.input("email");
  const password = request.input("password");

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

//Users routes
Route.group(() => {
  Route.get("/", "UsersController.index");
  Route.get("/:id", "UsersController.show");
  Route.post("/", "UsersController.store");
  Route.put("/:id", "UsersController.update");
  Route.delete("/:id", "UsersController.destroy");
}).prefix("users");

//Categories routes
Route.group(() => {
  Route.get("/", "CategoriesController.index");
  Route.get("/:id", "CategoriesController.show");
  Route.post("/", "CategoriesController.store");
  Route.put("/:id", "CategoriesController.update");
  Route.delete("/:id", "CategoriesController.destroy");
}).prefix("categories");

//Suppliers routes
Route.group(() => {
  Route.get("/", "SuppliersController.index");
  Route.get("/:id", "SuppliersController.show");
  Route.post("/", "SuppliersController.store");
  Route.put("/:id", "SuppliersController.update");
  Route.delete("/:id", "SuppliersController.destroy");
}).prefix("suppliers");
