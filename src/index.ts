import { Elysia, NotFoundError, t } from "elysia";
const userController = require('../controllers/userController')

const app = new Elysia()

function getUserById(id: string): any {
  throw new Error("Function not implemented.");
}


app.onError(({ code, error, set }) => {
  if (code === 'NOT_FOUND') {
      set.status = 404
  
      return 'Not Found :('
  }
})
app.get('/ping', () => 'Pong')


app.post('/posting', async ({body, set}) => {
  set.status = 200
  const name : string = body.name;
  const password: string = await Bun.password.hash(body.password, {
    algorithm: "bcrypt",
    cost: 4, // number between 4-31
  });
  return {name, password}
})  

app.post('/signIn', async ({ body, set }) => {
  const signed = await userController.signIn(body)
  console.log(signed)
  if(signed)
    return 'Welcome back'
  set.status = 403
  return 'Invalid username or password'
}, {
  body: t.Object({
    name: t.String(),
    password: t.String()
  })
})

app.get('/', () => 'Hello', {
  beforeHandle: ({ set, request: { headers } }) => {
      console.log(headers)
      if(!userController.isSignIn(headers)) {
          set.status = 401
          return 'Unauthorized'
      }
  }
})
app.get('/id/:id', ({ params: { id } }) => userController.getUserById(id))

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

