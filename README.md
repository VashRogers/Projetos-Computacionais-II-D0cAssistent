## Instalação

```
git clone git@gitlab.com:e2ti/cpt-novo.git
```

## Requisitos ambiente de desenvolvimento

-   node v18^
-   npm v10^
-   php v8.2^
-   composer v2^

## Iniciando projeto

#### Antes de iniciar o projeto, lembre-se de criar o schema `cpt` no banco de dados do e-cidade (tanto local e produção). A migração de dados do schema antigo (e2ti) é feito nos seeders do projeto.

```
$ cp .env.example .env
$ composer install
$ npm install
$ php artisan key:generate
$ php artisan migrate
$ php artisan serve
$ npm run dev
```

#### Se a base dados da cidade não tem as tabela cpt no schema `e2ti`, executar apenas os seeders `UsersSeeder` e `PermissionSeeder`

```
$ php artisan db:seed --class=UsersSeeder
$ php artisan db:seed --class=PermissionSeeder
```
#### Se tiver e precisar migrar os dados

```
$ php artisan db:seed
```
