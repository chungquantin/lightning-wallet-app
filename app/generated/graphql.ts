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
  isoCurrencyCode: Scalars['String'];
  limitBalance: Scalars['Float'];
  unofficialCurrencyCode: Scalars['String'];
};

export type BankAccountSchema = {
  __typename?: 'BankAccountSchema';
  accountId: Scalars['String'];
  ach: BankAccountAchSchema;
  addedAt: Scalars['String'];
  balance: BankAccountBalanceSchema;
  id: Scalars['ID'];
  institution: InstitutionSchema;
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

export type CancelPaymentRequest = {
  __typename?: 'CancelPaymentRequest';
  data?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<ApiError>>;
  success: Scalars['Boolean'];
};

export type CancelPaymentRequestDto = {
  paymentRequestId: Scalars['String'];
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
  institutionId: Scalars['String'];
  institutionLogo?: Maybe<Scalars['String']>;
  institutionName: Scalars['String'];
  primaryColor?: Maybe<Scalars['String']>;
  websiteUrl?: Maybe<Scalars['String']>;
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

export type LndGetTransactions = {
  __typename?: 'LndGetTransactions';
  data: Array<LightningTransaction>;
  errors?: Maybe<Array<ApiError>>;
  success: Scalars['Boolean'];
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
  connectBankAccount?: Maybe<ConnectBankAccount>;
  connectDebitCard?: Maybe<ConnectDebitCard>;
  createLinkToken?: Maybe<PlaidCreateLinkToken>;
  deleteBankAccount?: Maybe<DeleteBankAccount>;
  forgotPasswordChange?: Maybe<SendForgotPassword>;
  login?: Maybe<Login>;
  logout?: Maybe<Logout>;
  register?: Maybe<Register>;
  respondPaymentRequest?: Maybe<RespondPaymentRequest>;
  sendForgotPasswordEmail?: Maybe<ForgotPassword>;
  sendLightningPayment?: Maybe<SendLightningPayment>;
  sendPayment?: Maybe<SendTransaction>;
  sendPaymentRequest?: Maybe<SendPaymentRequest>;
};


export type MutationAddNewContactArgs = {
  data: AddNewContactDto;
};


export type MutationCancelPaymentRequestArgs = {
  data: CancelPaymentRequestDto;
};


export type MutationConnectBankAccountArgs = {
  data: ConnectBankAccountDto;
};


export type MutationDeleteBankAccountArgs = {
  data: DeleteBankAccountDto;
};


export type MutationForgotPasswordChangeArgs = {
  data: ForgotPasswordChangeDto;
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


export type MutationSendLightningPaymentArgs = {
  data: SendLightningPaymentDto;
};


export type MutationSendPaymentArgs = {
  data: SendPaymentDto;
};


export type MutationSendPaymentRequestArgs = {
  data: SendRequestPaymentDto;
};

export type PaginationInputType = {
  limit?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
};

export type PaymentResponse = {
  __typename?: 'PaymentResponse';
  transaction: TransactionSchema;
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
  exchangePublicToken?: Maybe<PlaidExchangePublicToken>;
  getBankAccount?: Maybe<GetBankAccount>;
  getBankAccounts?: Maybe<GetBankAccounts>;
  getCurrentUser?: Maybe<Me>;
  getMyBankAccounts?: Maybe<GetMyBankAccounts>;
  getMyContacts?: Maybe<GetMyContacts>;
  getMyPaymentRequests?: Maybe<GetMyPaymentRequests>;
  getMyWallet?: Maybe<GetMeWallet>;
  getMyWalletTransactions?: Maybe<GetMyWalletTransactions>;
  getPaymentRequest?: Maybe<GetPaymentRequest>;
  getPaymentRequests?: Maybe<GetPaymentRequests>;
  getTransaction?: Maybe<GetTransaction>;
  getTransactions?: Maybe<GetTransactions>;
  getUser?: Maybe<GetUser>;
  getUsers?: Maybe<GetUsers>;
  getWallet?: Maybe<GetWallet>;
  getWallets?: Maybe<GetWallets>;
  lightningGetTransactions?: Maybe<LndGetTransactions>;
};


export type QueryExchangePublicTokenArgs = {
  data: ExchangeTokenDto;
};


export type QueryGetBankAccountArgs = {
  data: GetBankAccountDto;
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


export type QueryLightningGetTransactionsArgs = {
  Pagination?: Maybe<PaginationInputType>;
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

export type SendForgotPassword = {
  __typename?: 'SendForgotPassword';
  data?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<ApiError>>;
  success: Scalars['Boolean'];
};

export type SendForgotPasswordDto = {
  email: Scalars['String'];
};

export type SendLightningPayment = {
  __typename?: 'SendLightningPayment';
  data?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<ApiError>>;
  success: Scalars['Boolean'];
};

export type SendLightningPaymentDto = {
  paymentRequest: Scalars['String'];
};

export type SendPaymentDto = {
  amount: Scalars['Float'];
  currency: Scalars['String'];
  description: Scalars['String'];
  method: Scalars['String'];
  walletId: Scalars['String'];
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

export type SendTransaction = {
  __typename?: 'SendTransaction';
  data?: Maybe<PaymentResponse>;
  errors?: Maybe<Array<ApiError>>;
  success: Scalars['Boolean'];
};

export type TokenResponse = {
  __typename?: 'TokenResponse';
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
};

/** Transaction method */
export enum TransactionMethod {
  Lightning = 'LIGHTNING',
  OnChain = 'ON_CHAIN'
}

export type TransactionRequestSchema = {
  __typename?: 'TransactionRequestSchema';
  createdAt: Scalars['String'];
  expiredAt: Scalars['String'];
  id: Scalars['ID'];
  requestFrom: Scalars['String'];
  requestTo: Scalars['String'];
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
  btcAmount: Scalars['Float'];
  btcExchangeRate: Scalars['Float'];
  createdAt: Scalars['String'];
  currency: FiatCurrency;
  description: Scalars['String'];
  fromWalletId: Scalars['String'];
  id: Scalars['ID'];
  method: TransactionMethod;
  networkFee: Scalars['Float'];
  status: TransactionStatus;
  toWalletId: Scalars['String'];
  transactionFee: Scalars['Float'];
};

/** Transaction status */
export enum TransactionStatus {
  Done = 'DONE',
  Expired = 'EXPIRED',
  Pending = 'PENDING',
  Unknown = 'UNKNOWN'
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
