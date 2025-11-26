Actor: Admin/User

Use Cases:

- Manage Customer (Create, Read, Update, Delete)
- Manage Deposito Type (Create, Read, Update, Delete)
- Manage Account (Create, Read, Update, Delete)
- Deposit Money
- Withdraw Money (includes Calculate Interest)
- View Transaction History

Class Diagram:

Customer

- id: UUID
- name: String

* getAccounts()
* create()
* update()
* delete()

DepositoType

- id: UUID
- name: String
- yearlyReturn: Decimal

* calculateMonthlyReturn()
* create()
* update()
* delete()

Account

- id: UUID
- customerId: UUID
- packetId: UUID
- balance: Decimal

* deposit()
* withdraw()
* calculateInterest()
* getTransactions()

Transaction

- id: UUID
- accountId: UUID
- type: Enum
- amount: Decimal
- transactionDate: Date
- balanceBefore: Decimal
- balanceAfter: Decimal
- interestEarned: Decimal

* create()
* getHistory()
