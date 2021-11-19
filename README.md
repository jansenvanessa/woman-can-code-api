<h1 align="center">
    <br>
    <p align="center">Meu Médico Favorito - Api Rest Nodejs<p>
</h1>

# Aula 1 (Terça) - Introdução a API Rest

## O que é uma API Rest?

Antigamente quando desenvolvíamos uma aplicação WEB, não existia uma separação clara do código de FrontEnd e Backend. O código para fazer as telas (Frontend), era em conjunto com o código de negócio (Backend), criando uma forte dependência entre ambos. Hoje ainda é utilizado esse modelo em alguns casos. É sempre importante avaliarmos o projeto que precisamos fazer, para decidirmos o melhor caminho para desenvolvê-lo.

Nesse curso estamos aprendendo como fazer uma API REST, que é uma API Backend, que irá disponilizar rotas, para que o Frontend (tela), consiga se comunicar com a parte da lógica por trás (Backend). Para isso criamos "Endpoints" na nossa API Rest do Backend e deixamos disponíveis para serem utilizadas pelo Frontend. Em outras palavras, criamos possibilidades de ações que podem ser chamadas pelo Frontend.

![api_rest](https://i.imgur.com/NygVhKO.png)

### Exemplo

Criei um botão na tela (Frontend) que ao ser clicado precisa listar todas as alunas do nosso curso. Para isso, foi necessário criar uma API de alunas, e desenvolver uma rota que fornece como resposta a listagem de alunas do nosso curso. O Frontend então chama essa rota do nosso Backend, que responde a listagem de alunas. Com essa informação em mãos, o Frontend consegue trabalhar com esses dados, podendo colocar essas informção em uma tabela, em uma listagem, ou onde for necessário para a visualização do usuário.

Caso no futuro eu queira mudar as telas (Frontend) ou mesmo o código da API (Backend), mantendo as rotas disponibilizadas, poderei fazer sem precisar trocar a outra parte. Com a API REST o código do Backend é independente do Frontend e vice-versa.

## Relembrando os Verbos HTTP

O protocolo HTTP define alguns verbos para as requisições que indicam uma ação a ser executada. Isso significa que para realizar uma requisicão é necessário utilizar o verbo correto para a chamada que quero fazer. Os verbos mais utilizados são:

| Verbo      | Descrição      
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------|
| POST       | É utilizado quando queremos criar uma informação por meio da api.                                                                    |
| GET        | É utilizado quando queremos recuperar a representação de um recurso. Requisições utilizando esse verbo, devem retornar apenas dados. | 
| PUT        | O verbo PUT é utilizado quando queremos alterar integralmente um recurso.                                                            |
| PATCH      | O verbo PUT é utilizado quando queremos alterar parcialmente um recurso.                                                             |
| DELETE     | O verbo DELETE é utilizado quando queremos remover um recurso.                                                                       |

### PUT vs PATCH

O verbo PUT e o verbo PATCH são ambos utilizados quando queremos modificar um recurso. A diferença é que utilizamos o PUT quando queremos modificar o recurso por completo e utilizamos o PATCH quando queremos modificá-lo parcialmente.

## Relembrando o Http Status

Quando fazemos uma requisição na API (quando chamamos uma rota), como vamos saber se deu tudo certo nessa chamada? Ou como vamos saber se deu algum erro? Como saber qual o status da resposta da chamada que fiz? Para isso existe o Http status, com códigos com uma convenção de resposta. Existem inúmeros códigos, mas vamos nos concentrar nos mais utilizados:

| Código | Status        | Descrição                          | Exemplo de Códigos                                     |
| ------ | ------------- | ---------------------------------- |-------------------------------------------------------- 
| 2xx    | `SUCCESSFUL`  | Quando deu certo o retorno         | 200 OK, 202 Accepted, 204 No Content                   | 
| 3xx    | `REDIRECTION` | Quando ocorre um redirecionamento  | 301 Moved Permanently, 303 See Other, 304 Not Modified | 
| 4xx    | `CLIENT ERROR`| Quando há erro do lado do cliente  | 400 Bad Request, 401 Unauthorized, 403 Forbidden       |
| 5xx    | `SERVER ERROR`| Quando há erro do lado do servidor | 500 Internal Server Error, 501 Not Implemented         |

Então na nossa API devemos informar o código ao responder as requisições feitas pelas rotas que desenvolvemos. Caso nossa resposta seja com sucesso, passamos então um status 200. Caso dê algum erro que foi ocasionado por responsabilidade do usuário, enviamos um erro 4xx. Por exemplo, se um usuário não tem permissão de acesso para chamar uma rota que criamos, devemos retornar para ele um status 401, que significa que ele não está autorizado. Porém caso dê algum erro que seja de responsabilidade da nossa API, poderemos retornar um status 500.

## Projeto Meu Médico Favorito

![minion-doctor](https://i.pinimg.com/originals/e5/39/dd/e539ddb9015127fa465ec849d2860ccb.jpg)

Agora que recordamos o conceito de API Rest, podemos seguir para os próximos passos colocando em prática a teoria aprendida. Vamos desenvolver um novo produto onde o usuário poderá pesquisar médicos e favoritar os preferidos por ele, sendo possível dessa maneira, o paciente ter um acesso mais rápido aos médicos que mais gostou do atendimento. Você será a desenvolvedora backend responsável pelo desenvolvimento da API que deverá ser feito em Nodejs. Em paralelo, o time de Frontend irá desenvolver a página web que irá se comunicar com a API que você irá desenvolver.

O novo produto deverá:

- [x] poder listar todos os médicos
- [x] poder adicionar um novo médico
- [x] poder remover um médico da lista
- [x] poder alterar informações do médico
- [x] poder favoritar/desfavoritar um médico

Sendo assim precisaremos criar 5 rotas:

| Verbo  | Descrição da Rota                     	|
| ------ | ---------------------------------------------|
| POST   | Adicionar novo médico            		|
| GET    | Recuperar médicos                 		|
| DELETE | Remover médico                   		|
| PUT    | Alterar informações do médico    		|
| PATCH  | Marcar/Desmarcar médico como favorito 	|

## Por onde começar nosso projeto?

Como criamos essas rotas e onde vão ficar gravadas as informações do médico que iremos adicionar para então depois podermos favoritá-los? As rotas iremos criar através de um novo projeto em Nodejs, mas os dados dos médicos irão precisar ficar gravados em um banco de dados. Vamos iniciar então criando esse banco de dados?  Para isso iremos usar um banco de dados Postgres que ficará numa cloud, no caso escolhemos o Heroku para isso. Heroku é uma plataforma em nuvem como um serviço que suporta várias linguagens de programação. Nele subiremos nossa aplicação quando tiver sido desenvolvida e também nosso banco de dados.

### Criação de uma conta no Heroku

Para podermos utilizar o Heroku vamos precisar de uma conta. Vá em https://www.heroku.com/ e clique em *Sign up*. Em seguida preencha com seus dados e clique para criar uma conta gratuita. Possivelmente vai ser enviado um e-mail de confirmação que deve ser aberto para confirmar a conta e essa quando confirmada você poderá definir uma senha. Agora que você já possui uma conta ativada, login e senha, você pode acessar o https://dashboard.heroku.com . Ao fazer isso deverá aceitar os termos da plataforma para seguir e feito isso a tela abaixo deverá ser exibida:

![heroku_welcome](https://i.imgur.com/15pAlkd.png)

### Criação de uma aplicação no Heroku

Para criar um banco de dados no Heroku, vamos precisar primeiramente criar uma aplicação. Para isso vamos clicar em *Create new app* e definir um nome para nossa aplicação. O nome de uma aplicação deverá ser único, isso significa que ninguém mais pode ter uma aplicação com o mesmo nome que a sua. Para garantir isso, podemos utilizar como nome de aplicação *seunome-meu-medico-favorito* , substituindo *seunome* pelo seu nome e ao clicar em *Create app* a aplicação será criada para podermos trabalhar:

![new_app](https://i.imgur.com/YInBBRa.png)


### Criando nosso banco de dados no Heroku

Com a aplicação criada, clique no menu, conforme imagem abaixo, e escolha a opção *Data*:

![data](https://i.imgur.com/48fkRiP.png)

Ao fazer isso você será direcionada para o link https://data.heroku.com/ , onde poderá criar um banco de dados Postgres clicando em *Create One*:

![data_postgres](https://i.imgur.com/GrhUiUU.png)

Ao clicar para criar um banco de dados Postgres irá abrir uma janela sobre o Heroku Postgres e nessa, na lateral direita, você deverá clicar em *Install Heroku Postgres*. Ao fazer isso, ele abrirá uma janela solicitando o nome da aplicação onde quer instalar o Heroku Postgres e você deverá informar o nome da aplicação que você criou (ex: *seunome-meu-medico-favorito*) e feito isso deverá clicar em *Submit Order Form*.

![data_postgres_app](https://i.imgur.com/3f7Dt5k.png)

### Conectando no nosso banco de dados

Se formos novamente em https://data.heroku.com/ veremos que o banco de dados que criamos aparecerá listado. Ao clicar nele poderemos ver diversas informações a respeito e indo em *Settings* e então, dentro da sessão *Database Credentials* clicarmos em *View Credentials...* poderemos visualizar informações para nos conectarmos a nossa base de dados.

Na linha do *Heroku Cli* temos um comando que podemos copiar a colar o mesmo no nosso terminal, para se conectar ao banco de dados via linha de comando. Exemplo:

![heroku_cli](https://i.imgur.com/BK4U1qf.png)

Ps: Quando rodar o comando do *Heroku Cli* ele pode abrir uma janela do browser e pedir para você se logar para seguir. Para isso basta se logar pelo browser conforme ele solicitar e depois continuar pelo terminal normalmente.

### Banco de dados criado, e agora?

Agora que temos nosso banco de dados criado, podemos desenvolver a api que vai criar a tabela de banco de dados, salvar novos dados, recuperá-los, enfim, utilizar todas essas informações para nosso produto.

# Aula 2 (Quarta) - Criando uma API Rest em Nodejs

Primeiro, para a construção do backend do nosso produto em Nodejs criaremos uma pasta chamada "meu-medico-favorito". Abriremos a mesma no programa Visual Studio Code e inicializaremos o terminal nessa mesma pasta.

### Iniciando a API Nodejs

Com o terminal aberto na pasta "meu-medico-favorito", para iniciar nossa API Nodejs, precisamos inicializar o *package manager*, que é o gerenciador de pacotes do Node. Para isso executaremos ```npm init``` no terminal. Pressionando “Enter”, serão exibidas uma sequência de perguntas que deverão ser preenchidas ou mantidas o valor padrão.
    
Com isso um arquivo com o nome de package.json será criado. Esse arquivo é muito importante pois define que o nosso projeto como sendo Node.

### Instalando o Express

Feito isso, precisaremos instalar o Express no nosso projeto, que é um framework que nos trará facilidades. Para isso executaremos no terminal:

``` npm install express --save ```

O *--save* é necessário para especificar que esse pacote do express é uma dependência da nossa aplicação e que o nosso projeto obrigatoriamente precisa dela para funcionar. Quando uma outra pessoa baixar seu projeto, ao instalar as dependências, esse pacote também será instalado. Isso porque quando você usa o --save, esse pacote é referenciado em “dependencies” no arquivo package.json. A sessão “ dependencies”, desse arquivo, lista justamente as dependências do nosso projeto.

Ao rodar a instalação do express, uma *pasta node_modules* com os pacotes do meu projeto será criada. Se reparar, dentro dessa pasta teremos uma pasta chamada “express”. Toda vez que você rodar o comando ``` npm install``` essa pasta node_modules será atualizada com as últimas atualizações conforme o que estiver configurado no arquivo *package.json*.

### Criando o arquivo .gitignore

Devemos criar na raíz do "meu-medico-favorito" o arquivo *.gitignore* e escrever nele ```node_modules/``` para o git nao trackear essa pasta para commit.

### Criando a estrutura da nossa API

Primeiramente, iremos criar uma pasta chamada “src” (de “source”) na raiz do nosso projeto, onde armazenaremos todos os códigos da aplicação. Dentro dessa, criaremos três pastas:

- [x] controllers - para armazenar a lógica de controle da nossa api
- [x] models - para armazenar os nossos modelos (ex: nossos médicos)
- [x] routes - para armazenar as rotas

```
meu-medico-favorito
├── src
│   ├── controllers
│   ├── models
│   ├── routes
├── package.json
```

### Criando o servidor

Deveremos criar dentro de *src/* um arquivo chamado *app.js*. Nesse arquivo faremos as configurações da nossa aplicação. Inicializaremos configuraremos a mesma para utilizar o express. Nesse arquivo criaremos uma constante express que receberá o módulo express. Utilizaremos essa constante para configurar nossa aplicação:

```app.js
const express = require("express")
const app = express()

app.use(express.json())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*") // informo que minha api poderá ser chamada de qualquer lugar. Por um browser, por exemplo.
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    )
    next()
    // como criei uma função dentro do app.use, preciso dar um "next()" para mandar ele seguir para a próxima middleware. 
    // se eu não faço isso, a requisição vai ficar travada aí.
})

module.exports = {
	app
}
```
O *app.use* adiciona uma middleware na nossa aplicação. Por exemplo, quando fazemos ```app.use(express.json())```, estou dizendo que minha api irá trabalhar com json. Isso significa, por exemplo, que quando eu fizer um POST, minha api irá entender que vou receber um json.

Criaremos agora, na raíz de "meu-medico-favorito", um arquivo chamado “server.js” para configurarmos nosso servidor. Nesse arquivo criaremos uma constante *app* que receberá nossa aplicação express que criamos no arquivo *app.js*. No caso definimos a porta 3000 para o nosso servidor rodar quando for inicializado.

```server.js
const app = require("./src/app")
const port = 3000;

app.listen(port, () => {
    console.log(`Servidor está rodando na porta ${port}`);
});
```

Quando criamos o servidor utilizando o protocolo HTTP, definimos um callback que será executado sempre que recebermos uma requisição web. Nesse caso, esse callback seria executado quando o nosso servidor for iniciado e aparecerá a mensagem “Servidor está rodando na porta 3000”.

Como nosso arquivo que irá inicializar o servidor se chama "server.js", devemos informar isso no arquivo *package.json* alterando ```"main": "index.js"``` para ```"main": "server.js"```.

### Testando o servidor

Vamos testar nosso servidor? Para isso executaremos o comando ```node server.js``` no terminal. Ao executar o comando, a mensagem informando que o servidor está rodando será exibida.

### Nodemon

Caso você esteja com o servidor rodando e tente alterar algum arquivo, para que o servidor capte essas alterações será necessário reiniciá-lo manualmente. Porém é bem chato ficar fazendo isso. Para evitar esse tipo de problema, podemos utilizar o *nodemon* para inicializar nosso servidor. Para utilizá-lo, deveremos primeiramente instalá-lo rodando o comando ```npm install nodemon --save```. Com o nodemon instalado, para rodar nosso servidor o utilizando, deveremos utilizar o comando ```nodemon server.js```. Com isso nosso servidor será inicializado com o nodemon e você poderá editar seus arquivos sem precisar reiniciá-lo.

### Scripts package.json

Para não precisar ficar escrevendo ```nodemon server.js``` para inicializar o servidor, podemos ir no nosso arquivo *package.json* e editar o atributo "scripts" do json. Poderemos incluir um script de start, informando que quando ele for utilizado, executará o comando ```nodemon server.js```:

```package.json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon server.js"
  }
```
Dessa forma para inicializar o servidor, basta digitar ```npm start``` no terminal e pressionar enter, que o mesmo já chamará automaticamente o comando ```nodemon server.js```.

### Configurando o banco de dados

Como iremos utilizar um banco de dados para guardar as informações dos médicos, vamos precisar de uma lib que nos ajude a fazer a comunicação da api com nossa base de dados. Para isso utilizaremos a lib Sequelize que é um ORM(Object-Relational Mapper) para NodeJs que faz mapeamento de dados relacionais (tabelas, colunas e linhas) para objetos JavaScript. Iremos entender melhor quando formos utilizá-lo, mas nesse momento é importante instalarmos essa biblioteca por meio do comando ```npm install --save sequelize``` e também o driver do postgres por meio do comando ```npm install --save pg pg-hstore``` . Com isso podemos notar que se formos no nosso arquivo *package.json* nossas novas libs estarão lá.

Com o Sequelize instalado, poderemos realizar uma conexão com o nosso banco de dados que criamos no Heroku. Para isso, vamos precisar resgatar nossa string de conexão do nosso banco de dados por meio do link: https://data.heroku.com/

Nesse deveremos clicar no nosso banco de dados listado e ir em *Settings* e clicar em *View Credentials...*. Na lista de informações disponíveis, temos a *URI* que é a string de conexão que iremos precisar utilizar para conectar nossa api a nossa base de dados. Porém, precisamos lembrar que qualquer um que tiver essa string de conexão conseguirá acessar nosso banco de dados e não é isso que queremos. Então devemos deixar nossa string de conexão em um lugar que não fique exposto para qualquer um no código e podemos fazer isso por meio de um arquivo de variáveis de ambiente.

### Criando nosso arquivo .env

Para termos um arquivo env e poder utilizá-lo na nossa api, vamos precisar instalar o *dotenv* por meio do comando ```npm install --save dotenv```. Em seguida podemos criar um arquivo *.env* na raíz do nosso projeto. Nosso arquivo de configurações pode ter nossa string de conexão e qualquer outra informação que possa fazer sentido para facilitar a alteração, como por exemplo a porta da nossa api. Nosso arquivo então ficaria nesse formato:

```.env
API_PORT=3000
DATABASE_URL=postgres://nossa-string-de-conexao-que-pegamos-no-heroku-data
```
Com as informações devidamente cadastradas, devemos fazer a aplicação carregá-las e podemos fazer isso no nosso arquivo *server.js* por meio da linha ```require('dotenv').config()```. Para passarmos a utilizar o nosso API_PORT do nosso arquivo, utilizaremos o comando ```process.env.API_PORT```:

```server.js
require('dotenv').config()
const { app } = require("./src/app")
const port = process.env.API_PORT

app.listen(port, () => {
    console.log(`Servidor está rodando na porta ${port}`)
})
```

Devemos lembrar de adicionar nosso arquivo *.env* no arquivo *.gitignore* para o git nao trackeá-lo para commit.

### Utilizando o Sequelize para conexão com o banco de dados

Agora que já temos nossa string de conexão no nosso arquivo *.env* iremos utilizá-la para nos conectarmos a base de dados. Para isso iremos criar dentro da pasta *src* o arquivo *db.js* com o seguinte conteúdo:

```db.js
const { Sequelize } = require('sequelize');

const database = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
})

database.authenticate()
    .then(() => console.log('Banco de dados conectado com sucesso.'))
    .catch(() => console.error('Não foi possível conectar ao banco de dados.', error))

module.exports = {
    database
}
```

Para verificarmos se conseguimos realizar essa conexão, devemos subir nosso servidor por meio do ```npm start``` e visualizar as mensagens do terminal, informando se o banco de dados foi conectado com sucesso ou não.

### Criando um Model do médico

Legal, nos conectamos ao nosso banco de dados porém não há nada nele, nem uma tabela. Como fazemos para termos nossa tabela de médicos no nosso banco? Para isso podemos criar um Model, que nada mais é que uma abstração do que representa uma tabela no nosso banco de dados. Vamos entender melhor isso?

Dentro da pasta *models* criaremos um arquivo chamado *Doctor.js* que terá o seguinte conteúdo:

```Doctor.js
const { Sequelize, DataTypes } = require('sequelize');
const { database } = require("../db")

const Doctor = database.define('Doctor', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    },
    crm: {
        type: DataTypes.STRING
    },
    specialty: {
        type: DataTypes.STRING
    },
    clinic: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.STRING
    },
    favorite: {
        type: DataTypes.BOOLEAN
    }
});

Doctor.sync()

module.exports = Doctor;
```

Repare que definimos todos os atributos que nossa tabela do banco de dados terá. Ao escrever a linha de código *Doctor.sync()* fazemos com que essa tabela seja criada na base de dados caso ela ainda não exista. Caso rodemos nosso servidor, poderemos reparar que nossa tabela Doctors foi criada. Se quisermos olhar nosso banco de dados pelo terminal, conforme já aprendemos e visualizarmos essa tabela, poderemos utilizar o comando *\dt* para listar todas as tabelas existentes e também utilizar o comando *select * from public."Doctors";* para vermos que não existe nenhuma linha nessa tabela.

# Aula 3 (Quinta) - Vamos criar nossas primeiras rotas (POST e GET)!

Com o projeto configurado e com o servidor rodando, caso a gente tente executar no browser *http://localhost:3000*, vamos receber a mensagem “Cannot GET”. Isso significa que o nosso servidor ainda não está habilitado a devolver uma resposta do método GET no endereço “/“. Isso tudo porque ainda não definimos nenhuma rota no nosso projeto.

Vamos então criar a primeira rota da nossa API! Dentro da pasta *routes/* deveremos criar um arquivo chamado *index.js*. Nesse arquivo iremos criar nossa primeira rota GET. Nesse iremos definir que quando chamarmos *http://localhost:3000* a mesma será chamada:

```index.js
const express = require("express")
const router = express.Router()

router.get("/", function (req, res) {
    res.status(200).send({
        title: "Minha API Rest Nodejs",
        version: "1.0.0"
    })
})

module.exports = router
```
Criamos nossa rota, porém ainda não fizemos nossa aplicação utilizá-la. Para isso temos que ir no arquivo *app.js*, definirmos uma constante para nossa rota "index" e setar para nossa aplicação utilizar:

```app.js
const index = require("./routes/index")
app.use("/", index)
```
Nosso arquivo *app.js* deverá então ficar da seguinte forma:

```app.js
const express = require("express")
const app = express()

//rotas
const index = require("./routes/index")

app.use(express.json())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    )
    next()
})

app.use("/", index)

module.exports = app
```

Agora com a rota desenvolvida, ao executarmos no browser *http://localhost:3000* não deverá mais apresentar o erro de GET.

### Criando a rota POST

Agora que o projeto está devidamente configurado, que tal criarmos uma rota de POST para criar alguns médicos na nossa base de dados que está vazia? 
Para que nosso projeto fique organizado, na pasta *routes* criaremos um arquivo chamado *doctors.js*. Nesse, iremos armazenar todas as rotas referentes aos médicos. Nosso projeto deverá estar com a seguinte estrutura:

```
meu-medico-favorito
├── src
│   ├── controllers
│   ├── models
|       ├── Doctor.js
│   ├── routes
│       ├── index.js
│       ├── doctors.js
|   ├── app.js
|   ├── db.js
├── .env
├── .gitignore
├── package.json
├── server.js
```

Primeiramente, deveremos informar a nossa aplicação que iremos utilizar esse arquivo *doctors.js* para as rotas que iremos criar para os médicos. Para isso deveremos abrir a pasta *src* e editar o arquivo *app.js* 

```app.js
const doctors = require("./routes/doctors")
app.use("/doctors", doctors)
```

Estamos então dizendo para a aplicação utilizar as rotas do arquivo *doctors.js* e utilizar a rota "/doctors" para executá-las. Isso significa que toda vez que você chamar *http://localhost:3000/doctors*, as nossas rotas de doctors serão chamadas. 

Entretanto, ainda não escrevemos nenhuma rota. Para escrever nossa primeira rota que criará um médico, deveremos abrir a pasta *routes* e editar o arquivo *doctors.js*: 

```doctors.js
const express = require("express")
const router = express.Router()
const controller = require("../controllers/doctorController")

router.post("/", controller.createDoctor)

module.exports = router;
```

Nessa estamos dizendo que toda vez que for utilizado o verbo POST na chamada *http://localhost:3000/doctors*, o *controller.createDoctor* será executado. Mas que *controller.createDoctor* é esse? Precisamos criar ele ainda, certo? Então vamos lá!

Primeiramente deveremos criar nosso controller de médicos. Então na pasta *controllers* deveremos criar o arquivo *doctorController.js*. Nesse, deveremos criar a função *createDoctor* que estamos chamando na nossa rota de POST:

```doctorController.js
const Doctor = require("../models/Doctor")

const createDoctor = async (req, res) => {
    const { name, crm, specialty, clinic, phone, favorite } = req.body
    try {
        const doctor = await Doctor.create({ name, crm, specialty, clinic, phone, favorite });
        console.log(`Medico ${doctor.name} criado`);
        res.status(201).send(doctor)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

module.exports = {
    createDoctor,
}
```

Dentro da função createDoctor, extraímos do corpo da requisição enviada pelo cliente (req.body), as informações do médico que iremos adicionar. Em sequência criamos um Doctor (model) com essas informações na nossa base de dados.

Dando algum erro, devolveremos o status 500 com a mensagem de erro. Caso dê certo, devolveremos o status 201, com o médico que adicionamos. Feito isso, nossa rota que grava um médico está pronta e poderemos testá-la.

### Testando a rota POST via Postman

Para testarmos nossa rota usaremos uma ferramenta chamada Postman. Essa ferramenta permite testar serviços RESTful por meio do envio de requisições HTTP e da análise do seu retorno. Você pode salvar todas as suas collections e facilitar o seu dia-a-dia como pessoa desenvolvedora!

Para testar via Postman, a rota POST que cria um novo médico, deveremos clicar em New > Request. Com a nova requisição aberta, deveremos escolher na combobox o verbo HTTP *POST* e digitar *http://localhost:3000/doctors*. Deveremos então, passar a informação do novo médico que iremos adicionar. Para isso deveremos clicar em *body* e clicar em *raw*. Logo após trocar a combobox "text" para *JSON*. Isso significa que estamos definindo que iremos enviar um JSON para nossa API quando enviarmos a requisição. Deveremos então informar o seguinte JSON:

```
{
    "name": "Meredith Grey",
    "crm" : "123456-SP",
    "specialty": "Cirurgia",
    "clinic": "Seattle Grace Hospital",
    "phone": "11991122334",
    "favorite": false
}
```

Ao clicar no botão *send*, enviaremos nosso novo médico para ser criado na nossa API. Dando certo, o médico que enviamos será retornado em tela para a gente e receberemos o status 201. Podemos então criar mais alguns médicos para termos nossa base de dados populada.

![test_post_postman](https://i.imgur.com/h9RHMgY.png)

Agora que criamos nossos médicos que tal criarmos uma rota que lista todos os médicos para podermos visualizá-los?

### Nova rota de GET para retornar os médicos

Para podermos visualizar os médicos existentes na nossa tabela de médicos, poderemos desenvolver uma rota GET que listará os médicos toda vez que uma requisição para listá-los seja chamada. Para escrever nossa rota que listará os médicos deveremos abrir a pasta routes e editar o arquivo doctors.js:

```doctors.js
const express = require("express")
const router = express.Router()
const controller = require("../controllers/doctorController")

router.post("/", controller.createDoctor)
router.get("/", controller.getAllDoctors)

module.exports = router
```

Nessa estamos dizendo que toda vez que for utilizado o verbo GET na chamada http://localhost:3000/doctors, o controller.getAllDoctors será executado. Mas ainda não temos essa função *getAllDoctors* no nosso controller, então vamos criá-la! No arquivo *doctorController* deveremos criar a função:

```doctorController.js
const getAllDoctors = async (req, res) => {
    const favorite = req.query.favorite
    try {
        const where = favorite ? { where: { favorite } } : {}
        const doctors = await Doctor.findAll(where)
        if (doctors && doctors.length > 0) {
            res.status(200).send(doctors)
        } else {
            res.status(204).send()
        }
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

module.exports = {
    createDoctor,
    getAllDoctors,
}
```

Dentro da função getAllDoctors, extraímos do filtro da requisição enviada pelo cliente (req.query.favorite), com a informação de se queremos trazer os médicos favoritos ou os não favoritos quando informado. Caso não passemos esse filtro *favorite*, traremos todos os médicos, independente se é favoritado ou não.

Dando algum erro, devolveremos o status 500 com a mensagem de erro. Caso dê certo, existindo médicos para retornar, devolveremos o status 200 com a listagem de médicos desejada, senão status 204 informando que é um retorno vazio.

Vamos entender melhor como funciona essa rota testando?

### Testando a rota GET via Postman

Para testar nossa rota GET de listagem de todos os médicos no Postman, deveremos clicar em New > Request. Com a nova requisição aberta, deveremos escolher na combobox o verbo HTTP *GET* e digitar *http://localhost:3000/doctors*. Ao clicar no botão *send* o array de json com nossos médicos será exibido.

![test_get_postman](https://i.imgur.com/ddQkTFY.png)

Caso queiramos utilizar nosso filtro para trazer os médicos favoritos ou os médicos não favoritos, basta acrescentar *?favorite=true* ou *?favorite=false* ao final da url. Exemplo: *http://localhost:3000/doctors?favorite=true*

# Aula 4 (Sexta) - Rotas GET by id e PUT

### Criando a rota GET (by id)

Para verificarmos nosso médico criado, o buscando pelo id 1 (o id do médico que criamos). Será necessário criar uma nova rota de GET que trará o médico, dado um id. No caso queremos que quando chamarmos a rota GET *http://localhost:3000/doctors/1* nosso médico que criamos seja retornado.

Para isso, no nosso arquivo de rotas de médicos (*routes/doctors.js*), deveremos incluir a seguinte rota:

```doctors.js
router.get("/:id", controller.getDoctor)
```
Nessa rota informamos que será passado um valor de parâmetro na nossa rota que será o parâmetro id (ex: *http://localhost:3000/doctors/1* ). Mais uma vez nosso controller ainda não possui a função que estamos chamando. Então no arquivo *controllers/doctorController.js* deveremos implementar a função getDoctor com o código abaixo:

```doctorController.js
const getDoctor = async (req, res) => {
    const doctorId = req.params.id
    try {
        const doctor = await Doctor.findOne({
            where: { id: doctorId }
        });
        if (doctor) {
            res.status(200).send(doctor)
        } else {
            res.status(404).send({ message: `Médico não encontrado com o id ${doctorId}` })
        }
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

module.exports = {
    createDoctor,
    getAllDoctors,
    getDoctor
}
```

Nesse, atribuítmos o valor do parametro id (req.params.id) a constante *doctorId*. Com isso sabemos o id que foi passado na requisição. Em seguida buscamos na base de dados um médico com o id informado e como id é a chave primária, podemos utilizar o *Doctor.findOne*. Ao encontrar o médico com o id passado, o mesmo é atribuído a constante "doctor". Se o "doctor" tiver valor, em outras palavras, se o médico foi encontrado pelo id, iremos responder a requisição com status 200 e enviaremos na resposta o médico encontrado. Senão, se ele não for encontrado, retornaremos um status 404 (NOT FOUND) na requisição, informando que o mesmo não foi encontrado. 

### Testando a rota GET by id via Postman

Para testar nossa rota GET passando o id como parâmetro, via Postman, deveremos clicar em New > Request. Com a nova requisição aberta, deveremos escolher na combobox o verbo HTTP *GET* e digitar *http://localhost:3000/doctors/1* (escolhi o id 1 mas você pode testar com outros ids). Ao clicar no botão *send*, se você passou o id de um médico que existe na base de dados, o mesmo deverá ser exibido como resposta. Mas caso você passe um id de um médico que não existe, ele deve retornar um status 404 informando que o médico não foi encontrado.

![test_get_id_postman](https://i.imgur.com/DW3Ubfr.png)

### Criando a rota PUT

Para alterarmos um médico existente na nossa tabela do banco, deveremos implementar uma rota de PUT que deverá permitir realizar essa alteração. Para isso, no nosso arquivo de rotas de médicos (*routes/doctors.js*), deveremos incluir a seguinte rota:

```doctors.js
router.put("/:id", controller.updateDoctor)
```
Nessa rota informamos que será passado um valor de parâmetro na nossa rota que será o parâmetro id (ex: *http://localhost:3000/doctors/1* ). Deveremos ir então no arquivo *controllers/doctorController.js* para implementar a função *updateDoctor*, que ainda não existe, com o código abaixo:

```doctorController.js
const updateDoctor = async (req, res) => {
    const doctorId = req.params.id
    const { name, crm, specialty, clinic, phone, favorite } = req.body
    try {
        const rowsUpdated = await Doctor.update({ name, crm, specialty, clinic, phone, favorite }, {
            where: { id: doctorId }
        });
        if (rowsUpdated && rowsUpdated > 0) {
            res.status(200).send({ message: `${rowsUpdated[0]} medico(s) atualizado(s)` })
        } else {
            res.status(404).send({ message: `Medico com id ${doctorId} não encontrado para atualizar` })
        }
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

module.exports = {
    createDoctor,
    getAllDoctors,
    getDoctor,
    updateDoctor
}
```

### Testando a rota PUT via Postman

Para testar, via Postman, a rota PUT que altera um médico, deveremos clicar em New > Request. Com a nova requisição aberta, deveremos escolher na combobox o verbo HTTP *PUT* e digitar *http://localhost:3000/doctors/1* (escolhi o id 1 mas poderia ter escolhido outro id qualquer existente). Deveremos então, passar a nova informação do médico que iremos atualizar. Para isso deveremos clicar em *body* e clicar em *raw*. Logo após trocar a combobox "text" para *JSON*. Isso significa que estamos definindo que iremos enviar um JSON para nossa API quando enviarmos a requisição. Deveremos então informar o seguinte JSON:

```
{
    "name": "Meredith Grey",
    "crm" : "654321-SP",
    "specialty": "Cirurgia Médica",
    "clinic": "Seattle Grace Hospital LTDA",
    "phone": "11991122336",
    "favorite": false
}
```
Ao clicar no botão *send*, se você passou o id de um médico que existe na listagem, o mesmo deverá ser retornado com a alteração feita na resposta. Mas caso você passe um id de um médico que não existe, ele deve retornar um status 404 informando que o médico não foi encontrado para ser atualizado.

![test_put_postman](https://i.imgur.com/cfdeLFr.png)

# Aula 5 (Sábado) - Rota PATCH, DELETE e publicação da API e Front

### Criando a rota PATCH

Precisamos criar uma rota para podermos favoritar e desfavoritar médicos. Deveremos então implementar uma rota de PATCH que deverá permitir realizar essa alteração de informação no atributo *favorite*. Para isso, no nosso arquivo de rotas de médicos (*routes/doctors.js*), deveremos incluir a seguinte rota:

```doctors.js
router.patch("/:id/favorite", controller.updateFavorite)
```
Nessa rota informamos que será passado um valor de parâmetro na nossa rota que será o parâmetro id (ex: *http://localhost:3000/doctors/1/favorite* ). Deveremos ir então no arquivo *controllers/doctorController.js* para implementar a função *updateFavorite*, que ainda não existe, com o código abaixo:

```doctorController.js
const updateFavorite = async (req, res) => {
    const doctorId = req.params.id
    const favorite = req.body.favorite
    try {
        const rowsUpdated = await Doctor.update({ favorite }, { where: { id: doctorId } });
        if (rowsUpdated && rowsUpdated > 0) {
            res.status(200).send({ message: `${rowsUpdated[0]} medico(s) com informação de favorito atualizada com sucesso` })
        } else {
            res.status(404).send({ message: `Medico com id ${doctorId} não encontrado para atualizar informação de favorito` })
        }
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

module.exports = {
    createDoctor,
    getAllDoctors,
    getDoctor,
    updateDoctor,
    updateFavorite
}
```

### Testando a rota PATCH via Postman

Para testar, via Postman, a rota PATCH que altera a informação de favorito do médico, deveremos clicar em New > Request. Com a nova requisição aberta, deveremos escolher na combobox o verbo HTTP *PATCH* e digitar *http://localhost:3000/doctors/1* (escolhi o id 1 mas poderia ter escolhido outro id qualquer existente na lista). Deveremos então, passar a informação de favorito ou não para enviar junto na requisição. Para isso deveremos clicar em *body* e clicar em *raw*. Logo após trocar a combobox "text" para *JSON*. Deveremos então informar o seguinte JSON:

```
{
    "favorite": true
}
```
Ao clicar no botão *send*, se você passou o id de um médico que existe na listagem, o mesmo deverá ser retornado com a alteração de favorito feita na resposta. Mas caso você passe um id de um médico que não existe, ele deve retornar um status 404 informando que o médico não foi encontrado para ser atualizado.

![test_patch_postman](https://i.imgur.com/FpnuKM0.png)

## Criando a rota de DELETE

Precisamos criar uma rota para poder deletar um médico, dado um id. Deveremos então implementar uma rota de DELETE que deverá permitir deletar o médico da nossa tabela do banco de dados. Para isso, no nosso arquivo de rotas de médicos (*routes/doctors.js*), deveremos incluir a seguinte rota:

```doctors.js
router.delete("/:id", controller.deleteDoctor)
```
Nessa rota informamos que será passado um valor de parâmetro na nossa rota que será o parâmetro id (ex: *http://localhost:3000/doctors/1* ). Deveremos ir então no arquivo *controllers/doctorController.js* para implementar a função *deleteDoctor*, que ainda não existe, com o código abaixo:

```doctorController.js
const deleteDoctor = async (req, res) => {
    const doctorId = req.params.id
    try {
        const rowsDeleted = await Doctor.destroy({ where: { id: doctorId } });
        if (rowsDeleted) {
            res.status(200).send({ message: `${rowsDeleted[0]} medico(s) deletado(s) com sucesso` })
        } else {
            res.status(404).send({ message: `Medico com id ${doctorId} não encontrado para deletar` })
        }
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

module.exports = {
    createDoctor,
    getAllDoctors,
    getDoctor,
    updateDoctor,
    updateFavorite,
    deleteDoctor
}
```

### Testando a rota DELETE via Postman

Para testar, via Postman, a rota DELETE que deleta um médico, deveremos clicar em New > Request. Com a nova requisição aberta, deveremos escolher na combobox o verbo HTTP *DELETE* e digitar *http://localhost:3000/doctors/1* (escolhi o id 1 mas poderia ter escolhido outro id qualquer existente na lista). Ao clicar no botão *send*, se você passou o id de um médico que existe, deverá ser retornado um 200, informando que ok deu tudo certo, não tem nada para retornar. Mas caso você passe um id de um médico que não existe, ele deve retornar um status 404 informando que o médico não foi encontrado para ser deletado.

![test_delete_postman](https://i.imgur.com/u28V8zM.png)

### API Pronta!

Desenvolvemos todas as rotas necessárias para nosso produto do Meu Médico Favorito. Criamos a rota de POST (que cria um novo médico), duas rotas de GET (uma para trazer todos os médicos (favoritos ou não) e uma para trazer um médico dado o id), PUT (para alterar o médico), PATCH (para favoritar um médico) e DELETE (para deletar o médico). Nossas rotas estão todas desenvolvidas, porém estão rodando tudo localmente. Vamos subir para o Heroku?

### Deployando nossa api no Heroku

- TO DO

### Acabamos, e agora?

![exercise](https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQzkx9NbIzjUfe7io1-mvfkRybTZGH-C0RL0A&usqp=CAU)

Agora que nossa API está implementada, podemos e devemos exercitar! Será que podemos melhorar nosso código? Temos linhas se códigos repetidas que poderiam virar funções e serem reaproveitadas? Sempre há algo para melhorar, então fique a vontade para mexer e melhorar o código!

Espero que tenha gostado da atividade e o segredo é praticar!!! Quanto mais exercícios fizer, melhor :) Abs e até mais!
