export type token = string;

export interface Token {
  id: string;
}

export interface Tokens {
  accessToken: token;
  refreshToken: token;
}
