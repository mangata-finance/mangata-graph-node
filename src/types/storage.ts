import assert from 'assert'
import {Block, Chain, ChainContext, BlockContext, Result} from './support'
import * as v1 from './v1'

export class AssetsInfoAssetsInfoStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  get isV1() {
    return this._chain.getStorageItemTypeHash('AssetsInfo', 'AssetsInfo') === '5ffb88e5617598016316099c4bcb6af1f4b04a38a42bb4463ed1708f15d2c695'
  }

  async getAsV1(key: number): Promise<v1.AssetInfo> {
    assert(this.isV1)
    return this._chain.getStorage(this.blockHash, 'AssetsInfo', 'AssetsInfo', key)
  }

  async getManyAsV1(keys: number[]): Promise<(v1.AssetInfo)[]> {
    assert(this.isV1)
    return this._chain.queryStorage(this.blockHash, 'AssetsInfo', 'AssetsInfo', keys.map(k => [k]))
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('AssetsInfo', 'AssetsInfo') != null
  }
}
