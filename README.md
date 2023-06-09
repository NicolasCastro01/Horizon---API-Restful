
# Surf API Restful - HORIZON

Um sistema moderno de pontuações de surfe.

## Ferraments utilizadas

- Fastify
- Typescript
- Husky
- Eslint
- Babel
- MySQL
- Prisma
- Railway

## Funcionalidades

- Inserir e excluir surfistas
- Alterar nome e país de um surfista
- Obter todos os surfistas cadastrados
- Obter todos os surfistas de determinado país
- Criar novas baterias
- Cadastrar novas ondas em uma bateria
- Cadastrar novas notas em uma ondas
- Obter o vencedor de uma bateria


## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`DATABASE_URL`


## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/NicolasCastro01/Horizon---API-Restful.git
```

Entre no diretório do projeto

```bash
  cd Horizon---API-Restful
```

Instale as dependências

```bash
  npm install
```

Rodar o build do servidor

```bash
  npm run build
```

Inicie o servidor

```bash
  npm run start
```

## Insomnia

Dentro do projeto há uma pasta chamada `.insomnia`, dentro dela há o json que pode ser importado dentro do insomnia. Esse arquivo possui todas as rotas configuradas para o uso.

## Documentação da API

#### Retorna todos os surfistas registrados.

```http
  GET /surfers
```

#### Retorna todos os surfistas filtrados pelo país.

```http
  GET /surfers/search?country=${country}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `country`      | `string` | **Obrigatório**. O nome do país dos surfistas que você quer listar. |

#### Cadastra um novo surfista

```http
  POST /surfers/new
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `number`      | `number` | **Obrigatório**. O número do surfista que será cadastrado. |
| `name`      | `string` | **Obrigatório**. O nome do surfista que será cadastrado. |
| `country`      | `string` | **Obrigatório**. O nome do país do surfista que será cadastrado. |

#### Edita o nome e o país do surfista.

```http
  PATCH /surfers/${surferNumber}/edit
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `surferNumber`      | `number` | **Obrigatório**. O número do surfista que será editado. |
| `name`      | `string` | **Obrigatório**. O novo nome do surfista. |
| `country`      | `string` | **Obrigatório**. O novo nome do país do surfista. |

#### Remove um surfista

```http
  DELETE /surfers/${surferNumber}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `surferNumber`      | `number` | **Obrigatório**. O número do surfista que será removido. |

#### Cria uma nova bateria

```http
  POST /battery/new
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `surfer_number_one`      | `number` | **Obrigatório**. O número do primeiro surfista que será adicionado na bateria. |
| `surfer_number_two`      | `number` | **Obrigatório**. O número do segundo surfista que será adicionado na bateria. |

#### Adiciona uma nova onda na bateria com as notas parciais do surfista.

```http
   POST /battery/${batteryId}/wave/new
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `batteryId`      | `string` | **Obrigatório**. O número da bateria que será adicionado a nova onda. |
| `surfer_number`      | `string` | **Obrigatório**. O número do surfista que receberá a nota da nova onda. |
| `partial_score_one`      | `number` | **Obrigatório**. A nota parcial um que será adicionado a nova onda. |
| `partial_score_two`      | `number` | **Obrigatório**. A nota parcial dois que será adicionado a nova onda. |
| `partial_score_three`      | `number` | **Obrigatório**. A nota parcial três que será adicionado a nova onda. |

#### Retorna o vencedor da bateria

```http
   GET /battery/${batteryId}/winner
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `batteryId`      | `string` | **Obrigatório**. O número da bateria que retornará o vencedor. |

#### Adiciona novas notas na onda

```http
   POST /waves/${waveId}/score/new
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `waveId`      | `string` | **Obrigatório**. O número da bateria que retornará o vencedor. |
| `partial_score_one`      | `number` | **Obrigatório**. A nota parcial do surfista, conquistada na onda. |
| `partial_score_two`      | `number` | **Obrigatório**. A nota parcial do surfista, conquistada na onda. |
| `partial_score_three`      | `number` | **Obrigatório**. A nota parcial do surfista, conquistada na onda. |