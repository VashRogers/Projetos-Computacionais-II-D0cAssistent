
# README - Instalação e Configuração

## Instalação

```bash
git clone <URL_DO_SEU_REPOSITORIO>
```

## Requisitos ambiente de desenvolvimento

- node v18^
- npm v10^
- php v8.2^
- composer v2^

### 1. Instalação do PHP 8.2 e extensões necessárias

Para garantir que o PHP 8.2 esteja instalado e configurado corretamente com as extensões necessárias, siga os passos abaixo:

#### 1.1 Instalar o PHP 8.2

Adicione o repositório de pacotes do PHP e atualize os pacotes disponíveis:

```bash
sudo add-apt-repository ppa:ondrej/php
sudo apt update
```

Agora, instale o PHP 8.2:

```bash
sudo apt install php8.2
```

#### 1.2 Instalar as extensões PHP necessárias

Após instalar o PHP, instale as extensões listadas abaixo. Execute o comando abaixo para instalar todas as extensões necessárias:

```bash
sudo apt install php8.2-bcmath php8.2-calendar php8.2-ctype php8.2-curl php8.2-date php8.2-dom php8.2-exif php8.2-ffi php8.2-fileinfo php8.2-filter php8.2-ftp php8.2-gd php8.2-gettext php8.2-hash php8.2-iconv php8.2-intl php8.2-json php8.2-libxml php8.2-mbstring php8.2-mysqli php8.2-mysqlnd php8.2-openssl php8.2-pcntl php8.2-pcre php8.2-pdo php8.2-pdo-mysql php8.2-pdo-pgsql php8.2-pgsql php8.2-phar php8.2-posix php8.2-random php8.2-readline php8.2-reflection php8.2-session php8.2-shmop php8.2-simplexml php8.2-soap php8.2-sockets php8.2-sodium php8.2-spl php8.2-standard php8.2-sysvmsg php8.2-sysvsem php8.2-sysvshm php8.2-tokenizer php8.2-xml php8.2-xmlreader php8.2-xmlwriter php8.2-xsl php8.2-opcache php8.2-zip php8.2-zlib
```

#### 1.3 Verificar se as extensões estão instaladas corretamente

Após a instalação, verifique se as extensões estão carregadas corretamente:

```bash
php -m
```

A saída deve listar todas as extensões mencionadas acima, como `pdo_pgsql`, `pdo_mysql`, `bcmath`, etc.

---

### 2. Instalação do PostgreSQL no Ubuntu

Para instalar o PostgreSQL no Ubuntu e configurar o banco de dados, siga as etapas abaixo:

#### 2.1 Instalar o PostgreSQL

Execute o seguinte comando para instalar o PostgreSQL:

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
```

#### 2.2 Alterar a senha do usuário `postgres`

Após a instalação do PostgreSQL, altere a senha do usuário `postgres` para 'postgres'. Para isso:

1. Acesse o shell do PostgreSQL:

   ```bash
   sudo -u postgres psql
   ```

2. No prompt do PostgreSQL, execute o seguinte comando para alterar a senha do usuário `postgres`:

   ```sql
   ALTER USER postgres WITH PASSWORD 'postgres';
   ```

3. Saia do shell do PostgreSQL:

   ```sql
   \q
   ```

#### 2.3 Criar o banco de dados `doc_assistant`

Ainda no shell do PostgreSQL, crie o banco de dados `doc_assistant` com o comando:

```bash
sudo -u postgres createdb doc_assistant
```

Agora, o banco de dados `doc_assistant` está pronto para uso.

---

## Iniciando o Projeto

Após configurar o PHP e o banco de dados, siga as instruções abaixo para iniciar o projeto:

1. **Configurar o arquivo `.env`**

   Antes de iniciar o projeto, certifique-se de ter um banco de dados PostgreSQL configurado e crie o arquivo `.env`:

   ```bash
   cp .env.example .env
   ```

2. **Instalar as dependências do projeto**

   Execute os seguintes comandos para instalar as dependências do PHP e do Node.js:

   ```bash
   composer install
   npm install
   ```

3. **Gerar a chave de aplicação**

   Gere a chave da aplicação Laravel:

   ```bash
   php artisan key:generate
   ```

4. **Executar as migrações do banco de dados**

   Rode as migrações para configurar o banco de dados:

   ```bash
   php artisan migrate
   ```

5. **Iniciar o servidor do Laravel**

   Execute o servidor do Laravel:

   ```bash
   php artisan serve
   ```

6. **Iniciar o servidor de desenvolvimento do Node.js**

   Por fim, execute o servidor de desenvolvimento do Node.js:

   ```bash
   npm run dev
   ```

Agora, seu projeto estará pronto para uso!