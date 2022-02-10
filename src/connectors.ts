import { UAuthConnector } from "@uauth/web3-react";
import type { AbstractConnector } from "@web3-react/abstract-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

export const injected = new InjectedConnector({ supportedChainIds: [1] });

export const walletconnect = new WalletConnectConnector({
  infuraId: process.env.REACT_APP_INFURA_ID!,
  qrcode: true,
});

export const uauth = new UAuthConnector({
  clientID: "ZGs3ShBdqoqwZg0awAzn/KErH9MJ4XkQjt+YQwIqD7s=",
  clientSecret: "wRekh70XEd1v4kccauHljlL8kufnM6w4lVezOpgC9hg=",
  redirectUri: "http://localhost:3001/callback",
  fallbackIssuer: process.env.REACT_APP_FALLBACK_ISSUER!,
  scope: "openid wallet",
  connectors: { injected, walletconnect },
});

const connectors: Record<string, AbstractConnector> = {
  injected,
  walletconnect,
  uauth,
};

export default connectors;
