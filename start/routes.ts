import Route from "@ioc:Adonis/Core/Route";

//Verifica se a API está online
Route.get("/", async () => {
  return { apiStorage: "online" };
});

//Gera o token de acesso do usuário
Route.post("/login", "SessionsController.store");

//Verifica se o usuário tem ou não token de acesso
Route.get("/session", "SessionsController.show").middleware("auth:api");

//Users routes
Route.post("/", "UsersController.store").prefix("users");
Route.group(() => {
  Route.get("/", "UsersController.index");
  Route.get("/:id", "UsersController.show");
  Route.put("/:id", "UsersController.update");
  Route.delete("/:id", "UsersController.destroy");
})
  .middleware("auth:api")
  .prefix("users");

//Categories routes
Route.group(() => {
  Route.get("/", "CategoriesController.index");
  Route.get("/:id", "CategoriesController.show");
  Route.post("/", "CategoriesController.store");
  Route.put("/:id", "CategoriesController.update");
  Route.delete("/:id", "CategoriesController.destroy");
})
  .middleware("auth:api")
  .prefix("categories");

//Suppliers routes
Route.group(() => {
  Route.get("/", "SuppliersController.index");
  Route.get("/:id", "SuppliersController.show");
  Route.post("/", "SuppliersController.store");
  Route.put("/:id", "SuppliersController.update");
  Route.delete("/:id", "SuppliersController.destroy");
})
  .middleware("auth:api")
  .prefix("suppliers");

//Products routes
Route.group(() => {
  Route.get("/dashboard", "ProductsController.dashboard");
  Route.get("/", "ProductsController.index");
  Route.get("/:id", "ProductsController.show");
  Route.post("/", "ProductsController.store");
  Route.put("/:id", "ProductsController.update");
  Route.delete("/:id", "ProductsController.destroy");
})
  .middleware("auth:api")
  .prefix("products");

//Movements routes
Route.group(() => {
  Route.get("/", "MovementsController.index");
  Route.get("/:id", "MovementsController.show");
  Route.post("/", "MovementsController.store");
})
  .middleware("auth:api")
  .prefix("movements");
