import assert from 'assert'
import {Chain, ChainContext, EventContext, Event, Result} from './support'

export class TokensTransferEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Tokens.Transfer')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * Transfer succeeded.
   */
  get isV1(): boolean {
    return this._chain.getEventHash('Tokens.Transfer') === 'd02b411d552a8c2e6d90c70aa7f3ff856688d4b5e4a933253a8560ce04da6f04'
  }

  /**
   * Transfer succeeded.
   */
  get asV1(): {currencyId: number, from: Uint8Array, to: Uint8Array, amount: bigint} {
    assert(this.isV1)
    return this._chain.decodeEvent(this.event)
  }
}
