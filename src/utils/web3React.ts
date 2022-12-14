import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { ConnectorNames } from '@pancakeswap/uikit'
import Web3 from 'web3'
import getNodeUrl from './getRpcUrl'

const rpcUrl = getNodeUrl()
const chainId = parseInt(process.env.REACT_APP_CHAIN_ID, 10)

const injected = new InjectedConnector({ supportedChainIds: [chainId] })

const walletconnect = new WalletConnectConnector({
  rpc: { [chainId]: rpcUrl },
  // bridge: 'https://pancakeswap.bridge.walletconnect.org/',
  // qrcode: true,
  // pollingInterval: POLLING_INTERVAL,
})

// console.log("w",walletconnect, injected, chainId)
// const bscConnector = new BscConnector({ supportedChainIds: [chainId] })

export const connectorsByName: { [connectorName in ConnectorNames]: any } = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.WalletConnect]: walletconnect,
  [ConnectorNames.BSC]: "ETH",
}

export const getLibrary = (provider): Web3 => {
  return provider
}
