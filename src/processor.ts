import { lookupArchive } from "@subsquid/archive-registry";
import * as ss58 from "@subsquid/ss58";
import assert from "assert";
import {
  BatchContext,
  BatchProcessorItem,
  EventHandlerContext,
  SubstrateBatchProcessor,
  SubstrateProcessor
} from "@subsquid/substrate-processor";
import { Store, TypeormDatabase } from "@subsquid/typeorm-store";
import { AssetsInfoAssetsInfoStorage } from "./types/storage";
import { AssetsInfo } from "./model/generated";

const database = new TypeormDatabase();
const processor = new SubstrateProcessor(database);

processor.setBatchSize(500);
processor.setDataSource({
  archive: "http://localhost:8888/graphql",
  chain: "wss://mangata-x.api.onfinality.io/public-ws"
});

async function processTransfers(
  ctx: EventHandlerContext<Store, { event: { args: true } }>
) {
  ctx.log.debug(`Debug Log example, ${ctx}`);
}

processor.addPreHook({ range: { from: 0, to: 0 } }, async (ctx) => {
  console.info("Context: This is working", ctx.block.id);
  let assets = new AssetsInfoAssetsInfoStorage(ctx, ctx.block);
  const ourAssets = await assets.getManyAsV1([0, 3]);
  console.info("Assets", assets);
});

processor.run();
