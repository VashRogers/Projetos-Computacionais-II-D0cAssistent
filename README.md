## Instalação

```
git clone
```

## Requisitos ambiente de desenvolvimento

-   node v18^
-   npm v10^
-   php v8.2^
-   composer v2^

## Iniciando projeto

#### Antes de iniciar o projeto, certifique-se de ter um banco de dados postgres

```
$ cp .env.example .env
$ composer install
$ npm install
$ php artisan key:generate
$ php artisan migrate
$ php artisan serve
$ npm run dev
```