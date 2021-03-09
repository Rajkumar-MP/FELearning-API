# FELearning-API

### Login API
```
Type : POST
URL : "/login"
``` 
```json
{
  "username": "String",
  "password": "String"
}
```
### Account Details API
```
Type : GET
URL : "/accountinfo/:id"
``` 


### Validate OTP API
```
Type : POST
URL : "/otp"
``` 
```json
{
  "code": "String"
}
```

### New Payee API
```
Type : POST
URL : "/add-payee"
``` 
```json

{
  "id": "String",
  "payeeDetail": {
      "nickName":"String",
      "accountHolderName":"String",
      "accountNo":"String",
      "ifsc":"String",
  }
}
```
### Fund Transfer API
```
Type : POST
URL : "/fund-transfer"
``` 
```json
{
  "id": "String",
  "fromAccountNumber": "String",
  "toAccountNumber": "String",
  "amount": "String"
}
```