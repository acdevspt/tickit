<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## API Documentation


## Documentação da API

### Departments

#### Add new department

```http
  POST /department
```

| Body   | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | **Mandatory**. department full name |
| `abreviation` | `string` | **Mandatory**. department abreviation |


  #### Get all departments

```http
  GET /department
```

| Query   | Type      | Description                                   |
| :---------- | :--------- | :------------------------------------------ |
| `brand` (optional)      | `string` | **Mandatory**. The sneakers brand name |

#### Delete a specific department

```http
  DELETE /department/3e563eb4-efdd-406f-af59-d6b71a4c5c16
```

| Param   | Type      | Description                                   |
| :---------- | :--------- | :------------------------------------------ |
| `department_uuid`       | `string` | **Mandatory**. the department uuid |


#### Update the a department abreviation

```http
  PATCH /department/abv/3e563eb4-efdd-406f-af59-d6b71a4c5c16
```

| Param   | Type      | Description                                   |
| :---------- | :--------- | :------------------------------------------ |
| `department_uuid`       | `string` | **Mandatory**. the department uuid |

| Body   | Type      | Description                                   |
| :---------- | :--------- | :------------------------------------------ |
| `abreviation`       | `json` | **Mandatory**. the desired abreviation |


#### Update the a department name

```http
  PATCH /department/name/3e563eb4-efdd-406f-af59-d6b71a4c5c16
```

| Param   | Type      | Description                                   |
| :---------- | :--------- | :------------------------------------------ |
| `department_uuid`       | `string` | **Mandatory**. the department uuid |

| Body (json)   | Type      | Description                                   |
| :---------- | :--------- | :------------------------------------------ |
| `name`       | `string` | **Mandatory**. the desired abreviation |



### Users

#### Add new user

```http
  POST /user
```

| Body (json) | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `firstName` | `string` | **Mandatory**. User first name |
| `lastName` | `string` | **Mandatory**. User last name |
| `departmentUuid` | `integer` | **Mandatory**. User department uuid |

#### Get all the users

```http
  GET /users
```

#### Get the users of a specific department

```http
  GET /user/department/3e563eb4-efdd-406f-af59-d6b71a4c5c16/orders
```

| Param   | Type      | Description                                   |
| :---------- | :--------- | :------------------------------------------ |
| `department_uuid`       | `string` | **Mandatory**. department uuid |


#### Delete a specific user

```http
  DELETE /user/3e563eb4-efdd-406f-af59-d6b71a4c5c16
```

| Param   | Type      | Description                                   |
| :---------- | :--------- | :------------------------------------------ |
| `user_uuid`       | `string` | **Mandatory**. the user uuid |


#### Update a user department

```http
  PATCH /user/department/3e563eb4-efdd-406f-af59-d6b71a4c5c16
```

| Param   | Type      | Description                                   |
| :---------- | :--------- | :------------------------------------------ |
| `user_uuid`       | `string` | **Mandatory**. the user uuid |


| Body (json)   | Type      | Description                                   |
| :---------- | :--------- | :------------------------------------------ |
| `department_uuid`       | `string` | **Mandatory**. the new department uuid |



### Tickets

#### Add new ticket

```http
  POST /ticket
```

| Body (json) | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `userUuid` | `string` | **Mandatory**. the user uuid |
| `departmentUuid` | `string` | **Mandatory**. the target department |
| `priority` | `integer` | **Mandatory**. the ticket priority |
| `title` | `integer` | **Mandatory**. the ticket title |
| `description` | `integer` | **Mandatory**. the ticket description |

#### Get all tickets

```http
  GET /ticket
```

#### Get user tickets

```http
  GET /ticket/filter/?
```

| Query | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `user_uuid (optional)` | `string` | **Mandatory**. the user uuid |
| `priority (optional)` | `string` | **Mandatory**. the ticket priority |


#### Delete a ticket

```http
  DELETE /ticket/3e563eb4-efdd-406f-af59-d6b71a4c5c16
```

| Query | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `user_uuid (optional)` | `string` | **Mandatory**. the user uuid |
| `priority (optional)` | `string` | **Mandatory**. the ticket priority |


#### Update a ticket status

```http
  PATCH /ticket/3e563eb4-efdd-406f-af59-d6b71a4c5c16
```

| Param | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `ticket_uuid (optional)` | `string` | **Mandatory**. the ticket uuid |

| Body (json) | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `status` | `string` | **Mandatory**. the ticket status (Solved or Unsolved) |