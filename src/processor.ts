import { SubstrateProcessor } from "@subsquid/substrate-processor";
import { Store, TypeormDatabase } from "@subsquid/typeorm-store";
import { AssetsInfo } from "./model/generated";

const database = new TypeormDatabase();
const processor = new SubstrateProcessor(database);

processor.setBatchSize(500);
processor.setDataSource({
  archive: "http://localhost:8888/graphql",
  chain: "wss://mangata-x.api.onfinality.io/public-ws"
});

const correctId = (symbol: string) => {
  switch (symbol) {
    case "MGX":
      return "0";
    case "KSM":
      return "4";
    case "ETH":
      return "1";
    case "TKN0x00000004-TKN0x00000000":
      return "5";
    default:
      return "";
  }
};

processor.addPreHook(async (ctx) => {
  const data: AssetsInfo[] = await ctx._chain.queryStorage(
    "0x5a758b8d7516e692be6ba6f6d9749b8af6d2202bfaf0a1dfb48c9ab09bc9282b",
    "AssetsInfo",
    "AssetsInfo",
    [0, 1, 4, 5].map((k) => [k])
  );

  data.forEach(async (d) => {
    const assetInfo = new AssetsInfo();
    assetInfo.id = correctId(d.symbol?.toString()!);
    assetInfo.name = d.name?.toString()!;
    assetInfo.description = d.description?.toString()!;
    assetInfo.decimals = d.decimals!;
    assetInfo.symbol = d.symbol?.toString()!;
    await ctx.store.save(assetInfo);
  });
});

processor.run();
