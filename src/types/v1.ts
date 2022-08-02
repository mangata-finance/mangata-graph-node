import type {Result} from './support'

export interface AssetInfo {
  name: (Uint8Array | undefined)
  symbol: (Uint8Array | undefined)
  description: (Uint8Array | undefined)
  decimals: (number | undefined)
}
