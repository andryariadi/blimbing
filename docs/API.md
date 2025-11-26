GET /customers - List all customers
GET /customers/:id - Get customer by ID
POST /customers - Create new customer
PUT /customers/:id - Update customer
DELETE /customers/:id - Delete customer

GET /deposito-types - List all deposito types
GET /deposito-types/:id - Get deposito type by ID
POST /deposito-types - Create new deposito type
PUT /deposito-types/:id - Update deposito type
DELETE /deposito-types/:id - Delete deposito type

GET /accounts - List all accounts
GET /accounts/:id - Get account by ID
POST /accounts - Create new account
PUT /accounts/:id - Update account
DELETE /accounts/:id - Delete account

GET /transactions - List all transactions
GET /transactions/:id - Get transaction by ID
POST /transactions/deposit - Create deposit transaction
POST /transactions/withdraw - Create withdraw transaction
POST /transactions/calculate-interest - Calculate interest for withdrawal

Request Body Examples:

POST /customers:

{
"name": "John Doe"
}

POST /accounts:

{
"customerId": "uuid-here",
"packetId": "uuid-here"
}

POST /transactions/deposit:

{
"accountId": "uuid-here",
"amount": 1000000,
"transaction_date": "2024-01-15"
}

POST /transactions/withdraw:

{
"accountId": "uuid-here",
"amount": 1000000,
"transaction_date": "2024-01-15"
}
