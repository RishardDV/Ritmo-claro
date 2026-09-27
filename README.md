# Ritmo Claro API

## Problema

Ritmo claro tiene varios problemas, entre esos consiste en:

Manejan el sistema de información de los hábitos a través de formularios y hojas compartidas de forma básica para sus empleados, para ello persisten algunas situaciones como:

- Autenticación inválida: la gente puede hacer y deshacer como quiera sin tener una cuenta válida, y también se confunden los roles, por lo que un visitante puede hacer lo que hace un soporte.
- Correos duplicados: gente con el mismo correo y el sistema actual no lo detecta.
- También solo la persona que tiene ese formulario y hoja compartida funciona desde un computador.

## Alcance

### Personas usuarias

#### VISITANTE

- Requisito: el visitante solo puede crear una cuenta o iniciar sesión.

#### USUARIO

- Requisito: el usuario podrá organizar sus propios hábitos con privacidad.
- Crear, consultar, editar y eliminar sus hábitos.

#### ADMIN

- Requisito: el admin podrá atender los casos y revisar el estado general de las personas.
- Administrar y consultar los hábitos de todas las personas.

### Historias de usuario

#### VISITANTE

- Como visitante quiero crear mi cuenta para poder tener acceso al sistema.
- Como visitante quiero iniciar sesión para acceder a las opciones disponibles para mí.

#### USUARIO

- Como usuario quiero crear mis propios hábitos para tener una organización de ellos.
- Como usuario quiero consultar cada uno de mis hábitos para ver cuáles tengo.
- Como usuario me gustaría editar o actualizar alguna información de mis hábitos.
- Como usuario quiero eliminar algunos hábitos que ya no estoy colocando en marcha.

#### ADMIN

- Como admin quiero administrar cada uno de los hábitos de las personas.
- Como admin quiero consultar todos los hábitos para ver el estado general y atender los casos.

## Arquitectura

La solución está construida con:

- NestJS + TypeScript
- Prisma ORM
- PostgreSQL
- JWT para autenticación
- Swagger para documentación de endpoints
- Docker para entorno reproducible

## URLs y documentación

- API local: http://localhost:3000
- Swagger: http://localhost:3000/docs
- Swagger JSON: http://localhost:3000/docs-json

## Instalación local

1. Clona el repositorio.
2. Entra a la carpeta del proyecto:

```bash
cd ritmo-claro-api
```

3. Instala dependencias:

```bash
npm install
```

4. Crea un archivo `.env` en la raíz del proyecto con las variables requeridas.

## Variables requeridas

```env
PORT=3000
DATABASE_URL="postgresql://usuario:password@localhost:5432/ritmo_claro"
JWT_SECRET="tu_clave_secreta_muy_segura"
JWT_EXPIRES_IN="1d"
```

Ejemplo de configuración local para PostgreSQL:

```env
PORT=3000
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ritmo_claro"
JWT_SECRET="ritmo-claro-secret"
JWT_EXPIRES_IN="1d"
```

> Si usas un plan gratuito de base de datos o hosting, es posible que la activación tarde unos minutos. En ese caso, espera a que el servicio quede listo antes de volver a probar la conexión.

## Base de datos y migración

Genera el cliente de Prisma y aplica migraciones:

```bash
npx prisma generate
npx prisma migrate dev
```

Si solo necesitas sincronizar el esquema localmente:

```bash
npx prisma db push
```

## Ejecutar la API

Modo desarrollo:

```bash
npm run start:dev
```

Modo normal:

```bash
npm run start
```

Build de producción:

```bash
npm run build
npm run start:prod
```

## Cómo ejecutar la colección / pruebas

Puedes probar la API desde Postman, Insomnia o Thunder Client importando la colección del proyecto o ejecutando las peticiones manualmente.

Flujo recomendado de prueba:

1. Registrar usuario:
   - `POST /auth/register`
2. Iniciar sesión:
   - `POST /auth/login`
3. Copiar el token JWT del response.
4. Enviar el token en el header `Authorization: Bearer <token>`.
5. Probar endpoints de hábitos:
   - `POST /habitos`
   - `GET /habitos`
   - `GET /habitos/:id`
   - `PATCH /habitos/:id`
   - `DELETE /habitos/:id`

También puedes abrir Swagger para probar los endpoints desde la interfaz visual:

```text
http://localhost:3000/docs
```

## Pruebas

Ejecutar pruebas unitarias:

```bash
npm test
```

Ejecutar pruebas e2e:

```bash
npm run test:e2e
```

Cobertura:

```bash
npm run test:cov
```

## Docker

Ejemplo básico:

```bash
docker build -t ritmo-claro-api .
docker run -p 3000:3000 --env-file .env ritmo-claro-api
```

## Deploy

Para desplegar la API en un servidor o plataforma cloud, asegúrate de configurar estas variables de entorno en producción:

- `PORT`
- `DATABASE_URL`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`

Luego compila la aplicación:

```bash
npm run build
npm run start:prod
```

## Rutas principales

| Rol | Método | Endpoint | Descripción |
|---|---|---|---|
| Visitante | POST | `/auth/register` | Crear cuenta |
| Visitante | POST | `/auth/login` | Iniciar sesión |
| Usuario | POST | `/habitos` | Crear hábito |
| Usuario | GET | `/habitos` | Listar hábitos propios |
| Usuario | GET | `/habitos/:id` | Ver hábito propio |
| Usuario | PATCH | `/habitos/:id` | Actualizar hábito |
| Usuario | DELETE | `/habitos/:id` | Eliminar hábito |
| Admin | GET | `/habitos/admin/todos` | Ver todos los hábitos |

## Notas finales

- La documentación interactiva queda en Swagger para facilitar pruebas y validación.
- La API está preparada para funcionar con autentificación por JWT y control de permisos por rol.
- La colección de pruebas puede ejecutarse desde Postman o cualquier cliente HTTP compatible.



