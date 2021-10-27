
const fs = require('fs');
const path = require('path');

module.exports.addNewContact = fs.readFileSync(path.join(__dirname, 'addNewContact.gql'), 'utf8');
module.exports.cancelPaymentRequest = fs.readFileSync(path.join(__dirname, 'cancelPaymentRequest.gql'), 'utf8');
module.exports.checkTransactionStatus = fs.readFileSync(path.join(__dirname, 'checkTransactionStatus.gql'), 'utf8');
module.exports.connectBankAccount = fs.readFileSync(path.join(__dirname, 'connectBankAccount.gql'), 'utf8');
module.exports.connectDebitCard = fs.readFileSync(path.join(__dirname, 'connectDebitCard.gql'), 'utf8');
module.exports.createLinkToken = fs.readFileSync(path.join(__dirname, 'createLinkToken.gql'), 'utf8');
module.exports.deleteBankAccount = fs.readFileSync(path.join(__dirname, 'deleteBankAccount.gql'), 'utf8');
module.exports.deposit = fs.readFileSync(path.join(__dirname, 'deposit.gql'), 'utf8');
module.exports.forgotPasswordChange = fs.readFileSync(path.join(__dirname, 'forgotPasswordChange.gql'), 'utf8');
module.exports.generateLightningInvoice = fs.readFileSync(path.join(__dirname, 'generateLightningInvoice.gql'), 'utf8');
module.exports.generateOnChainInvoice = fs.readFileSync(path.join(__dirname, 'generateOnChainInvoice.gql'), 'utf8');
module.exports.login = fs.readFileSync(path.join(__dirname, 'login.gql'), 'utf8');
module.exports.logout = fs.readFileSync(path.join(__dirname, 'logout.gql'), 'utf8');
module.exports.register = fs.readFileSync(path.join(__dirname, 'register.gql'), 'utf8');
module.exports.respondPaymentRequest = fs.readFileSync(path.join(__dirname, 'respondPaymentRequest.gql'), 'utf8');
module.exports.sendForgotPasswordEmail = fs.readFileSync(path.join(__dirname, 'sendForgotPasswordEmail.gql'), 'utf8');
module.exports.sendInAppPayment = fs.readFileSync(path.join(__dirname, 'sendInAppPayment.gql'), 'utf8');
module.exports.sendLightningPayment = fs.readFileSync(path.join(__dirname, 'sendLightningPayment.gql'), 'utf8');
module.exports.sendOnchainPayment = fs.readFileSync(path.join(__dirname, 'sendOnchainPayment.gql'), 'utf8');
module.exports.sendPaymentRequest = fs.readFileSync(path.join(__dirname, 'sendPaymentRequest.gql'), 'utf8');
module.exports.withdraw = fs.readFileSync(path.join(__dirname, 'withdraw.gql'), 'utf8');
