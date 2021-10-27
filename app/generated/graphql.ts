export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AddNewContact = {
  __typename?: 'AddNewContact';
  data?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<ApiError>>;
  success: Scalars['Boolean'];
};

export type AddNewContactDto = {
  userId: Scalars['String'];
};

export type ApiError = {
  __typename?: 'ApiError';
  message: Scalars['String'];
  path: Scalars['String'];
};

export type BankAccountAchSchema = {
  __typename?: 'BankAccountAchSchema';
  account: Scalars['String'];
  id: Scalars['ID'];
  routingNumber: Scalars['String'];
  wire_routing: Scalars['String'];
};

export type BankAccountBalanceSchema = {
  __typename?: 'BankAccountBalanceSchema';
  availableBalance?: Maybe<Scalars['Float']>;
  currentBalance?: Maybe<Scalars['Float']>;
  id: Scalars['ID'];
  isoCurrencyCode?: Maybe<Scalars['String']>;
  limitBalance?: Maybe<Scalars['Float']>;
  unofficialCurrencyCode?: Maybe<Scalars['String']>;
};

export type BankAccountSchema = {
  __typename?: 'BankAccountSchema';
  accountId: Scalars['String'];
  ach: BankAccountAchSchema;
  addedAt: Scalars['String'];
  balance: BankAccountBalanceSchema;
  id: Scalars['ID'];
  institution?: Maybe<InstitutionSchema>;
  name: Scalars['String'];
  officialName?: Maybe<Scalars['String']>;
  subType?: Maybe<Scalars['String']>;
  type: BankAccountType;
  userId: Scalars['String'];
};

/** Values of the Bank Account Type field */
export enum BankAccountType {
  Brokerage = 'Brokerage',
  Credit = 'Credit',
  Depository = 'Depository',
  Investment = 'Investment',
  Loan = 'Loan',
  Other = 'Other'
}

export type BankTransfer = {
  __typename?: 'BankTransfer';
  account_id: Scalars['String'];
  ach_class: Scalars['String'];
  amount: Scalars['String'];
  cancellable: Scalars['Boolean'];
  created: Scalars['String'];
  currency: Scalars['String'];
  customTag: Scalars['String'];
  description: Scalars['String'];
  direction: Scalars['String'];
  failure_reason: Scalars['String'];
  id: Scalars['String'];
  legalName: Scalars['String'];
  network: Scalars['String'];
  originationAccountId: Scalars['String'];
  status: Scalars['String'];
  type: Scalars['String'];
};

export type BtcAddress = {
  __typename?: 'BtcAddress';
  chainInvoice: ChainInvoiceSchema;
  lightningInvoice: LightningInvoiceSchema;
};

export type BtcAddresses = {
  __typename?: 'BtcAddresses';
  chainInvoices: Array<ChainInvoiceSchema>;
  lightningInvoices: Array<LightningInvoiceSchema>;
};

export type CancelPaymentRequest = {
  __typename?: 'CancelPaymentRequest';
  data?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<ApiError>>;
  success: Scalars['Boolean'];
};

export type CancelPaymentRequestDto = {
  paymentRequestId: Scalars['String'];
};

export type ChainInvoiceSchema = {
  __typename?: 'ChainInvoiceSchema';
  address: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  userId: Scalars['String'];
};

export type CheckLightningStatus = {
  __typename?: 'CheckLightningStatus';
  data?: Maybe<LightningStatusResponse>;
  errors?: Maybe<Array<ApiError>>;
  success: Scalars['Boolean'];
};

export type CheckLightningStatusDto = {
  userId: Scalars['String'];
};

export type CheckOnChainStatus = {
  __typename?: 'CheckOnChainStatus';
  data?: Maybe<OnChainStatusResponse>;
  errors?: Maybe<Array<ApiError>>;
  success: Scalars['Boolean'];
};

export type CheckOnChainStatusDto = {
  amount: Scalars['Float'];
  createdAt: Scalars['Float'];
  txFee: Scalars['Float'];
  userId: Scalars['String'];
};

export type CheckTransactionStatus = {
  __typename?: 'CheckTransactionStatus';
  data?: Maybe<CheckTransactionStatusResponse>;
  errors?: Maybe<Array<ApiError>>;
  success: Scalars['Boolean'];
};

export type CheckTransactionStatusDto = {
  transactionId: Scalars['String'];
};

export type CheckTransactionStatusResponse = {
  __typename?: 'CheckTransactionStatusResponse';
  method: Scalars['String'];
  paidAmount: Scalars['Float'];
  status: TransactionStatus;
  transactionId: Scalars['String'];
};

export type ConnectBankAccount = {
  __typename?: 'ConnectBankAccount';
  data?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<ApiError>>;
  success: Scalars['Boolean'];
};

export type ConnectBankAccountDto = {
  /** account id [Plaid] */
  accountId: Scalars['String'];
  institutionId: Scalars['String'];
  publicToken: Scalars['String'];
};

export type ConnectDebitCard = {
  __typename?: 'ConnectDebitCard';
  data?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<ApiError>>;
  success: Scalars['Boolean'];
};

export type DeleteBankAccount = {
  __typename?: 'DeleteBankAccount';
  data?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<ApiError>>;
  success: Scalars['Boolean'];
};

export type DeleteBankAccountDto = {
  bankAccountId: Scalars['String'];
};

export type Deposit = {
  __typename?: 'Deposit';
  data?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<ApiError>>;
  success: Scalars['Boolean'];
};

export type DepositDto = {
  accountName: Scalars['String'];
  /** The user's account number. */
  accountNumber: Scalars['String'];
  /** The type of the bank account (checking or savings). */
  accountType: Scalars['String'];
  amount: Scalars['Float'];
  currency: Scalars['String'];
  /** The user's routing number. */
  routingNumber: Scalars['String'];
};

export type ExchangeTokenDto = {
  publicToken: Scalars['String'];
};

/** Fiat currency */
export enum FiatCurrency {
  Cad = 'CAD',
  Usd = 'USD',
  Vnd = 'VND'
}

export type ForgotPassword = {
  __typename?: 'ForgotPassword';
  data?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<ApiError>>;
  success: Scalars['Boolean'];
};

export type ForgotPasswordChangeDto = {
  key: Scalars['String'];
  newPassword: Scalars['String'];
};

export type GenerateChainInvoice = {
  __typename?: 'GenerateChainInvoice';
  data?: Maybe<ChainInvoiceSchema>;
  errors?: Maybe<Array<ApiError>>;
  success: Scalars['Boolean'];
};

export type GenerateLightningInvoice = {
  __typename?: 'GenerateLightningInvoice';
  data?: Maybe<LightningInvoiceSchema>;
  errors?: Maybe<Array<ApiError>>;
  success: Scalars['Boolean'];
};

export type GenerateLightningInvoiceDto = {
  amount: Scalars['Float'];
  currency: Scalars['String'];
  description: Scalars['String'];
};

export type GetBankAccount = {
  __typename?: 'GetBankAccount';
  data?: Maybe<BankAccountSchema>;
  errors?: Maybe<Array<ApiError>>;
  success: Scalars['Boolean'];
};

export type GetBankAccountDto = {
  bankAccountId: Scalars['String'];
};

export type GetBankAccounts = {
  __typename?: 'GetBankAccounts';
  data: Array<BankAccountSchema>;
  errors?: Maybe<Array<ApiError>>;
  success: Scalars['Boolean'];
};

export type GetBankTransfer = {
  __typename?: 'GetBankTransfer';
  data?: Maybe<BankTransfer>;
  errors?: Maybe<Array<ApiError>>;
  success: Scalars['Boolean'];
};

export type GetBankTransferDto = {
  bankTransferId: Scalars['String'];
};

export type GetBankTransfers = {
  __typename?: 'GetBankTransfers';
  data: Array<BankTransfer>;
  errors?: Maybe<Array<ApiError>>;
  success: Scalars['Boolean'];
};

export type GetBankTransfersDto = {
  count: Scalars['Float'];
  direction: Scalars['String'];
  endDate: Scalars['String'];
  offset: Scalars['Float'];
  originationAccountId: Scalars['String'];
  startDate: Scalars['String'];
};

export type GetBtcAddress = {
  __typename?: 'GetBtcAddress';
  data?: Maybe<BtcAddress>;
  errors?: Maybe<Array<ApiError>>;
  success: Scalars['Boolean'];
};

export type GetBtcAddresses = {
  __typename?: 'GetBtcAddresses';
  data?: Maybe<BtcAddresses>;
  errors?: Maybe<Array<ApiError>>;
  success: Scalars['Boolean'];
};

export type GetChainInvoice = {
  __typename?: 'GetChainInvoice';
  data?: Maybe<ChainInvoiceSchema>;
  errors?: Maybe<Array<ApiError>>;
  success: Scalars['Boolean'];
};

export type GetChainInvoiceDto = {
  address: Scalars['String'];
};

export type GetInstitutionById = {
  __typename?: 'GetInstitutionById';
  data?: Maybe<InstitutionSchema>;
  errors?: Maybe<Array<ApiError>>;
  success: Scalars['Boolean'];
};

export type GetInstitutionDto = {
  institutionId: Scalars['String'];
};

export type GetInstitutions = {
  __typename?: 'GetInstitutions';
  data: Array<InstitutionSchema>;
  errors?: Maybe<Array<ApiError>>;
  success: Scalars['Boolean'];
};

export type GetLightningInvoice = {
  __typename?: 'GetLightningInvoice';
  data?: Maybe<LightningInvoiceSchema>;
  errors?: Maybe<Array<ApiError>>;
  success: Scalars['Boolean'];
};

export type GetLightningInvoiceDto = {
  paymentRequest: Scalars['String'];
};

export type GetMeWallet = {
  __typename?: 'GetMeWallet';
  data?: Maybe<WalletSchema>;
  errors?: Maybe<Array<ApiError>>;
  success: Scalars['Boolean'];
};

export type GetMyBankAccounts = {
  __typename?: 'GetMyBankAccounts';
  data: Array<BankAccountSchema>;
  errors?: Maybe<Array<ApiError>>;
  success: Scalars['Boolean'];
};

export type GetMyContacts = {
  __typename?: 'GetMyContacts';
  data: Array<UserSchema>;
  errors?: Maybe<Array<ApiError>>;
  success: Scalars['Boolean'];
};

export type GetMyPaymentRequests = {
  __typename?: 'GetMyPaymentRequests';
  data: Array<TransactionRequestSchema>;
  errors?: Maybe<Array<ApiError>>;
  success: Scalars['Boolean'];
};

export type GetMyWalletTransactions = {
  __typename?: 'GetMyWalletTransactions';
  data: Array<TransactionSchema>;
  errors?: Maybe<Array<ApiError>>;
  success: Scalars['Boolean'];
};

export type GetNodeTransactions = {
  __typename?: 'GetNodeTransactions';
  data: Array<LightningTransaction>;
  errors?: Maybe<Array<ApiError>>;
  success: Scalars['Boolean'];
};

export type GetPaymentRequest = {
  __typename?: 'GetPaymentRequest';
  data?: Maybe<TransactionRequestSchema>;
  errors?: Maybe<Array<ApiError>>;
  success: Scalars['Boolean'];
};

export type GetPaymentRequestDto = {
  paymentRequestId: Scalars['String'];
};

export type GetPaymentRequests = {
  __typename?: 'GetPaymentRequests';
  data: Array<TransactionRequestSchema>;
  errors?: Maybe<Array<ApiError>>;
  success: Scalars['Boolean'];
};

export type GetTransaction = {
  __typename?: 'GetTransaction';
  data?: Maybe<TransactionSchema>;
  errors?: Maybe<Array<ApiError>>;
  success: Scalars['Boolean'];
};

export type GetTransactionDto = {
  transactionId: Scalars['String'];
};

export type GetTransactions = {
  __typename?: 'GetTransactions';
  data: Array<TransactionSchema>;
  errors?: Maybe<Array<ApiError>>;
  success: Scalars['Boolean'];
};

export type GetUser = {
  __typename?: 'GetUser';
  data?: Maybe<UserSchema>;
  errors?: Maybe<Array<ApiError>>;
  success: Scalars['Boolean'];
};

export type GetUserDto = {
  userId: Scalars['String'];
};

export type GetUsers = {
  __typename?: 'GetUsers';
  data: Array<UserSchema>;
  errors?: Maybe<Array<ApiError>>;
  success: Scalars['Boolean'];
};

export type GetWallet = {
  __typename?: 'GetWallet';
  data?: Maybe<WalletSchema>;
  errors?: Maybe<Array<ApiError>>;
  success: Scalars['Boolean'];
};

export type GetWalletDto = {
  userId?: Maybe<Scalars['String']>;
  walletId?: Maybe<Scalars['String']>;
};

export type GetWallets = {
  __typename?: 'GetWallets';
  data: Array<WalletSchema>;
  errors?: Maybe<Array<ApiError>>;
  success: Scalars['Boolean'];
};

export type InstitutionSchema = {
  __typename?: 'InstitutionSchema';
  id: Scalars['ID'];
  institutionId: Scalars['String'];
  institutionLogo?: Maybe<Scalars['String']>;
  institutionName: Scalars['String'];
  primaryColor?: Maybe<Scalars['String']>;
  websiteUrl?: Maybe<Scalars['String']>;
};

export type LightningInvoiceSchema = {
  __typename?: 'LightningInvoiceSchema';
  addIndex: Scalars['Float'];
  createdAt: Scalars['String'];
  expiresAt: Scalars['String'];
  id: Scalars['ID'];
  payReq: Scalars['String'];
  rHash: Scalars['String'];
  userId: Scalars['String'];
};

export type LightningStatusResponse = {
  __typename?: 'LightningStatusResponse';
  amtPaid: Scalars['Float'];
  amtPaidMsat: Scalars['Float'];
  amtPaidSat: Scalars['Float'];
  cltvExpiry: Scalars['Float'];
  creationDate: Scalars['Float'];
  memo: Scalars['String'];
  paymentRequest: Scalars['String'];
  rHash: Scalars['String'];
  settleDate: Scalars['Float'];
  settled: Scalars['Boolean'];
  value: Scalars['Float'];
};

export type LightningTransaction = {
  __typename?: 'LightningTransaction';
  amount: Scalars['Float'];
  blockHash: Scalars['String'];
  fees: Scalars['Float'];
  hash: Scalars['String'];
  timeStamp: Scalars['Float'];
};

export type LinkTokenCreateResponseImpl = {
  __typename?: 'LinkTokenCreateResponseImpl';
  expiration: Scalars['String'];
  link_token: Scalars['String'];
  request_id: Scalars['String'];
};

export type Login = {
  __typename?: 'Login';
  data?: Maybe<TokenResponse>;
  errors?: Maybe<Array<ApiError>>;
  success: Scalars['Boolean'];
};

export type LoginDto = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Logout = {
  __typename?: 'Logout';
  data?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<ApiError>>;
  success: Scalars['Boolean'];
};

export type LookupLightningInvoice = {
  __typename?: 'LookupLightningInvoice';
  data?: Maybe<LightningStatusResponse>;
  errors?: Maybe<Array<ApiError>>;
  success: Scalars['Boolean'];
};

export type LookupLightningInvoiceDto = {
  rHash: Scalars['String'];
};

export type LookupOnChainTransactionDto = {
  address: Scalars['String'];
};

export type LookupOnchainTransaction = {
  __typename?: 'LookupOnchainTransaction';
  data: Array<OnchainTransaction>;
  errors?: Maybe<Array<ApiError>>;
  success: Scalars['Boolean'];
};

export type Me = {
  __typename?: 'Me';
  data?: Maybe<UserSchema>;
  errors?: Maybe<Array<ApiError>>;
  success: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addNewContact?: Maybe<AddNewContact>;
  cancelPaymentRequest?: Maybe<CancelPaymentRequest>;
  checkTransactionStatus?: Maybe<CheckTransactionStatus>;
  connectBankAccount?: Maybe<ConnectBankAccount>;
  connectDebitCard?: Maybe<ConnectDebitCard>;
  createLinkToken?: Maybe<PlaidCreateLinkToken>;
  deleteBankAccount?: Maybe<DeleteBankAccount>;
  deposit?: Maybe<Deposit>;
  forgotPasswordChange?: Maybe<SendForgotPassword>;
  generateLightningInvoice?: Maybe<GenerateLightningInvoice>;
  generateOnChainInvoice?: Maybe<GenerateChainInvoice>;
  login?: Maybe<Login>;
  logout?: Maybe<Logout>;
  register?: Maybe<Register>;
  respondPaymentRequest?: Maybe<RespondPaymentRequest>;
  sendForgotPasswordEmail?: Maybe<ForgotPassword>;
  sendInAppPayment?: Maybe<SendInAppPayment>;
  sendLightningPayment?: Maybe<SendLightningPayment>;
  sendOnchainPayment?: Maybe<SendOnchainPayment>;
  sendPaymentRequest?: Maybe<SendPaymentRequest>;
  withdraw?: Maybe<Withdraw>;
};


export type MutationAddNewContactArgs = {
  data: AddNewContactDto;
};


export type MutationCancelPaymentRequestArgs = {
  data: CancelPaymentRequestDto;
};


export type MutationCheckTransactionStatusArgs = {
  data: CheckTransactionStatusDto;
};


export type MutationConnectBankAccountArgs = {
  data: ConnectBankAccountDto;
};


export type MutationDeleteBankAccountArgs = {
  data: DeleteBankAccountDto;
};


export type MutationDepositArgs = {
  data: DepositDto;
};


export type MutationForgotPasswordChangeArgs = {
  data: ForgotPasswordChangeDto;
};


export type MutationGenerateLightningInvoiceArgs = {
  data: GenerateLightningInvoiceDto;
};


export type MutationLoginArgs = {
  data: LoginDto;
};


export type MutationRegisterArgs = {
  data: RegisterDto;
};


export type MutationRespondPaymentRequestArgs = {
  data: RespondPaymentRequestDto;
};


export type MutationSendForgotPasswordEmailArgs = {
  data: SendForgotPasswordDto;
};


export type MutationSendInAppPaymentArgs = {
  data: SendInAppPaymentDto;
};


export type MutationSendLightningPaymentArgs = {
  data: SendLightningPaymentDto;
};


export type MutationSendOnchainPaymentArgs = {
  data: SendOnchainPaymentDto;
};


export type MutationSendPaymentRequestArgs = {
  data: SendRequestPaymentDto;
};


export type MutationWithdrawArgs = {
  data: WithdrawDto;
};

export type OnChainStatusResponse = {
  __typename?: 'OnChainStatusResponse';
  amount: Scalars['Float'];
  status: TransactionStatus;
  timeStamp: Scalars['Float'];
  txHash: Scalars['String'];
};

export type OnchainTransaction = {
  __typename?: 'OnchainTransaction';
  amount: Scalars['Float'];
  blockHash: Scalars['String'];
  blockHeight: Scalars['Float'];
  destAddresses: Array<Scalars['String']>;
  label: Scalars['String'];
  numConfirmations: Scalars['Float'];
  rawTxHex: Scalars['String'];
  timeStamp: Scalars['Float'];
  totalFees: Scalars['Float'];
  txHash: Scalars['String'];
};

export type PaginationInputType = {
  limit?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
};

export type PlaidCreateLinkToken = {
  __typename?: 'PlaidCreateLinkToken';
  data?: Maybe<LinkTokenCreateResponseImpl>;
  errors?: Maybe<Array<ApiError>>;
  success: Scalars['Boolean'];
};

export type PlaidExchangePublicToken = {
  __typename?: 'PlaidExchangePublicToken';
  data?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<ApiError>>;
  success: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  checkLightningStatus?: Maybe<CheckLightningStatus>;
  checkOnChainStatus?: Maybe<CheckOnChainStatus>;
  exchangePublicToken?: Maybe<PlaidExchangePublicToken>;
  getBankAccount?: Maybe<GetBankAccount>;
  getBankAccounts?: Maybe<GetBankAccounts>;
  getBankTransfer?: Maybe<GetBankTransfer>;
  getBankTransfers?: Maybe<GetBankTransfers>;
  getBtcAddresses?: Maybe<GetBtcAddresses>;
  getChainInvoice?: Maybe<GetChainInvoice>;
  getCurrentUser?: Maybe<Me>;
  getInstitution?: Maybe<GetInstitutionById>;
  getInstitutions?: Maybe<GetInstitutions>;
  getLightningInvoice?: Maybe<GetLightningInvoice>;
  getMyBankAccounts?: Maybe<GetMyBankAccounts>;
  getMyBtcAddress?: Maybe<GetBtcAddress>;
  getMyContacts?: Maybe<GetMyContacts>;
  getMyPaymentRequests?: Maybe<GetMyPaymentRequests>;
  getMyWallet?: Maybe<GetMeWallet>;
  getMyWalletTransactions?: Maybe<GetMyWalletTransactions>;
  getNodeTransactions?: Maybe<GetNodeTransactions>;
  getPaymentRequest?: Maybe<GetPaymentRequest>;
  getPaymentRequests?: Maybe<GetPaymentRequests>;
  getTransaction?: Maybe<GetTransaction>;
  getTransactions?: Maybe<GetTransactions>;
  getUser?: Maybe<GetUser>;
  getUsers?: Maybe<GetUsers>;
  getWallet?: Maybe<GetWallet>;
  getWallets?: Maybe<GetWallets>;
  lookupLightningInvoice?: Maybe<LookupLightningInvoice>;
  lookupOnchainTransaction?: Maybe<LookupOnchainTransaction>;
  searchUser?: Maybe<SearchUser>;
};


export type QueryCheckLightningStatusArgs = {
  data: CheckLightningStatusDto;
};


export type QueryCheckOnChainStatusArgs = {
  data: CheckOnChainStatusDto;
};


export type QueryExchangePublicTokenArgs = {
  data: ExchangeTokenDto;
};


export type QueryGetBankAccountArgs = {
  data: GetBankAccountDto;
};


export type QueryGetBankTransferArgs = {
  data: GetBankTransferDto;
};


export type QueryGetBankTransfersArgs = {
  data: GetBankTransfersDto;
};


export type QueryGetChainInvoiceArgs = {
  data: GetChainInvoiceDto;
};


export type QueryGetInstitutionArgs = {
  data: GetInstitutionDto;
};


export type QueryGetLightningInvoiceArgs = {
  data: GetLightningInvoiceDto;
};


export type QueryGetMyContactsArgs = {
  Pagination?: Maybe<PaginationInputType>;
};


export type QueryGetMyPaymentRequestsArgs = {
  Pagination?: Maybe<PaginationInputType>;
};


export type QueryGetMyWalletTransactionsArgs = {
  Pagination?: Maybe<PaginationInputType>;
};


export type QueryGetNodeTransactionsArgs = {
  Pagination?: Maybe<PaginationInputType>;
};


export type QueryGetPaymentRequestArgs = {
  data: GetPaymentRequestDto;
};


export type QueryGetPaymentRequestsArgs = {
  Pagination?: Maybe<PaginationInputType>;
};


export type QueryGetTransactionArgs = {
  data: GetTransactionDto;
};


export type QueryGetTransactionsArgs = {
  Pagination?: Maybe<PaginationInputType>;
};


export type QueryGetUserArgs = {
  data: GetUserDto;
};


export type QueryGetUsersArgs = {
  Pagination?: Maybe<PaginationInputType>;
};


export type QueryGetWalletArgs = {
  data: GetWalletDto;
};


export type QueryGetWalletsArgs = {
  Pagination?: Maybe<PaginationInputType>;
};


export type QueryLookupLightningInvoiceArgs = {
  data: LookupLightningInvoiceDto;
};


export type QueryLookupOnchainTransactionArgs = {
  data: LookupOnChainTransactionDto;
};


export type QuerySearchUserArgs = {
  data: SearchUserDto;
};

export type Register = {
  __typename?: 'Register';
  data?: Maybe<UserSchema>;
  errors?: Maybe<Array<ApiError>>;
  success: Scalars['Boolean'];
};

export type RegisterDto = {
  avatar: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  phoneNumber: Scalars['String'];
  username: Scalars['String'];
};

export type RespondPaymentRequest = {
  __typename?: 'RespondPaymentRequest';
  data?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Array<ApiError>>;
  success: Scalars['Boolean'];
};

export type RespondPaymentRequestDto = {
  confirmed: Scalars['Boolean'];
  paymentRequestId: Scalars['String'];
};

export type SearchUser = {
  __typename?: 'SearchUser';
  data?: Maybe<UserSchema>;
  errors?: Maybe<Array<ApiError>>;
  success: Scalars['Boolean'];
};

export type SearchUserDto = {
  searchInput: Scalars['String'];
};

export type SendForgotPassword = {
  __typename?: 'SendForgotPassword';
  data?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<ApiError>>;
  success: Scalars['Boolean'];
};

export type SendForgotPasswordDto = {
  email: Scalars['String'];
};

export type SendInAppPayment = {
  __typename?: 'SendInAppPayment';
  data?: Maybe<TransactionSchema>;
  errors?: Maybe<Array<ApiError>>;
  success: Scalars['Boolean'];
};

export type SendInAppPaymentDto = {
  amount: Scalars['Float'];
  currency: Scalars['String'];
  description: Scalars['String'];
  method: Scalars['String'];
  walletId?: Maybe<Scalars['String']>;
};

export type SendLightningPayment = {
  __typename?: 'SendLightningPayment';
  data?: Maybe<TransactionSchema>;
  errors?: Maybe<Array<ApiError>>;
  success: Scalars['Boolean'];
};

export type SendLightningPaymentDto = {
  paymentRequest: Scalars['String'];
};

export type SendOnchainPayment = {
  __typename?: 'SendOnchainPayment';
  data?: Maybe<TransactionSchema>;
  errors?: Maybe<Array<ApiError>>;
  success: Scalars['Boolean'];
};

export type SendOnchainPaymentDto = {
  /** Bitcoin Address */
  address: Scalars['String'];
  /** Bitcoin Amount */
  amount: Scalars['Float'];
  description: Scalars['String'];
};

export type SendPaymentRequest = {
  __typename?: 'SendPaymentRequest';
  data?: Maybe<TransactionRequestSchema>;
  errors?: Maybe<Array<ApiError>>;
  success: Scalars['Boolean'];
};

export type SendRequestPaymentDto = {
  amount: Scalars['Float'];
  currency: Scalars['String'];
  description: Scalars['String'];
  method: Scalars['String'];
  walletId: Scalars['String'];
};

export type TokenResponse = {
  __typename?: 'TokenResponse';
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
};

/** Transaction method */
export enum TransactionMethod {
  Deposit = 'DEPOSIT',
  Lightning = 'LIGHTNING',
  OnChain = 'ON_CHAIN',
  Other = 'OTHER',
  Withdraw = 'WITHDRAW'
}

export type TransactionRequestSchema = {
  __typename?: 'TransactionRequestSchema';
  createdAt: Scalars['String'];
  expiredAt: Scalars['String'];
  id: Scalars['ID'];
  requestFrom: Scalars['String'];
  requestTo: Scalars['String'];
  settledAt?: Maybe<Scalars['String']>;
  status: TransactionRequestStatus;
  transaction: TransactionSchema;
};

/** Transaction request status */
export enum TransactionRequestStatus {
  Canceled = 'CANCELED',
  Confirmed = 'CONFIRMED',
  Pending = 'PENDING',
  Rejected = 'REJECTED',
  Unknown = 'UNKNOWN'
}

export type TransactionSchema = {
  __typename?: 'TransactionSchema';
  amount: Scalars['Float'];
  amountLessFee: Scalars['Float'];
  btcAmount: Scalars['Float'];
  btcExchangeRate: Scalars['Float'];
  createdAt: Scalars['String'];
  currency: FiatCurrency;
  description: Scalars['String'];
  fromWalletId: Scalars['String'];
  id: Scalars['ID'];
  method: TransactionMethod;
  networkFee: Scalars['Float'];
  paidAmount: Scalars['Float'];
  settledAt?: Maybe<Scalars['String']>;
  status: TransactionStatus;
  toWalletId: Scalars['String'];
  transactionFee: Scalars['Float'];
};

/** Transaction status */
export enum TransactionStatus {
  Expired = 'EXPIRED',
  Paid = 'PAID',
  PartiallyPaid = 'PARTIALLY_PAID',
  Pending = 'PENDING',
  Unpaid = 'UNPAID'
}

export type UserSchema = {
  __typename?: 'UserSchema';
  avatar: Scalars['String'];
  contacts: Array<UserSchema>;
  createdAt: Scalars['String'];
  email: Scalars['String'];
  emailVerified: Scalars['Boolean'];
  firstName: Scalars['String'];
  forgotPasswordLock: Scalars['Boolean'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  name: Scalars['String'];
  phoneNumber: Scalars['String'];
  phoneNumberVerified: Scalars['Boolean'];
  twoFactorVerified: Scalars['Boolean'];
  username: Scalars['String'];
};

export type WalletSchema = {
  __typename?: 'WalletSchema';
  balance: Scalars['Float'];
  createdAt: Scalars['String'];
  defaultCurrency: FiatCurrency;
  id: Scalars['ID'];
  transactions: Array<TransactionSchema>;
  userId: Scalars['ID'];
};

export type Withdraw = {
  __typename?: 'Withdraw';
  data?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<ApiError>>;
  success: Scalars['Boolean'];
};

export type WithdrawDto = {
  accountName: Scalars['String'];
  /** The user's account number. */
  accountNumber: Scalars['String'];
  /** The type of the bank account (checking or savings). */
  accountType: Scalars['String'];
  amount: Scalars['Float'];
  currency: Scalars['String'];
  /** The user's routing number. */
  routingNumber: Scalars['String'];
};
