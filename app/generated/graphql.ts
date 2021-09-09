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

export type CancelPaymentRequest = {
  __typename?: 'CancelPaymentRequest';
  data?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<ApiError>>;
  success: Scalars['Boolean'];
};

export type CancelPaymentRequestDto = {
  paymentRequestId: Scalars['String'];
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

export type GetMeWallet = {
  __typename?: 'GetMeWallet';
  data?: Maybe<WalletSchema>;
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

export type HelloWorld = {
  __typename?: 'HelloWorld';
  data?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<ApiError>>;
  success: Scalars['Boolean'];
};

export type LightningTransaction = {
  __typename?: 'LightningTransaction';
  amount: Scalars['Float'];
  blockHash: Scalars['String'];
  fees: Scalars['Float'];
  hash: Scalars['String'];
  timeStamp: Scalars['Float'];
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

export type Query = {
  __typename?: 'Query';
  getCurrentUser?: Maybe<Me>;
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
  helloWorld?: Maybe<HelloWorld>;
  lightningGetTransactions?: Maybe<LndGetTransactions>;
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
