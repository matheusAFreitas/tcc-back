# tcc-back

# para criar o banco de dados no Docker basta usar o comando:

> sudo docker run --name postgres -p 5432:5432 -e POSTGRES_PASSWORD=docker -d postgres

Link para a documentação [Postman](https://documenter.getpostman.com/view/17479822/2s9YR85E3Z)

Rotas disponiveis:


* Company
  * POST /company
  * POST /auth/company
  * GET /company/:cnpj
  * PATCH /company/update/:id
  * DELETE /company/:cnpj


* User
  * POST /user
  * POST /auth/user
  * GET /user/:email
  * PATCH /user/admin/:email
  * PATCH /user/update/:id
  * DELETE /user/:email

* Appointment
  * POST /appointment
  * GET /appointment/get
  * PATCH /appointment/update/:id
  * DELETE /appointment/remove/:id
