import { Elysia } from "elysia";
import { Context } from "hono";

const app = new Elysia()

app.get('/ping', () => 'Pong')


app.post('/posting', ({body, set}) => {
  console.log(body.nombre)
  set.status = 200  
  return `Hola ${body.nombre}`

})
app.get('/name/:name', (context) => `Hi ${context.params.name}`)

app
  .state('version', 1 as number || null)
  .decorate('getDate', () => Date.now)
  .get('/version', ({
    getDate,
    store: { version }
  }) => `${version} ${getDate()}`)

app.listen(8080)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
