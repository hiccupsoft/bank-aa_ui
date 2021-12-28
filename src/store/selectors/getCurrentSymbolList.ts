import _ from "lodash";
import { IStore } from "../reducers/index.interface";
import { ICurrentSymbol } from "./interfaces/currentSymbol.interface";

export const getCurrentSymbolList: (store: IStore) => ICurrentSymbol[] = (
  store: IStore
) => {
  const { symbolsForAddress } = store.data;
  // const favoriteSymbols = store.settings.favorites.symbols;
  const result: ICurrentSymbol[] = [];
  console.log("---------symbolsForAddress-------",symbolsForAddress, _.keys(symbolsForAddress));
  _.map(_.keys(symbolsForAddress),  symbol=>{
    const tmp = {symbol, balance:  _.get(symbolsForAddress, [symbol, "total"])};
    result.push(tmp);
    console.log("===tmp======",tmp);
  });
    // const { currentAsset, expiry_ts, largestAsset } = symbolsForAddress[symbol];

    // const expiry_ts_asset = currentAsset
    //   ? assets[currentAsset].expiry_ts
    //   : false;
    // const isFavorite = favoriteSymbols.find(
    //   (FavoriteSymbol) => FavoriteSymbol === symbol
    // );

    // let rivalSupportBySymbol: number | undefined = 0;
    // let rivalSupportByAsset: number | undefined = 0;
    // let rivalSupport;

    // if (expiry_ts) {
    //   rivalSupportBySymbol = supportLinks[symbol + "_" + largestAsset]?.support;
    // }
    // if (expiry_ts_asset && currentAsset) {
    //   const largestSymbol = assets[currentAsset].largestSymbol;
    //   rivalSupportByAsset =
    //     supportLinks[largestSymbol + "_" + currentAsset]?.support;
    // }
    // if (rivalSupportByAsset && rivalSupportBySymbol) {
    //   rivalSupport = Math.max(rivalSupportByAsset, rivalSupportBySymbol);
    // } else if (rivalSupportByAsset) {
    //   rivalSupport = rivalSupportByAsset;
    // } else if (rivalSupportBySymbol) {
    //   rivalSupport = rivalSupportBySymbol;
    // }

    // if (currentSupport && largestSupport && currentAsset && largestAsset) {
    //   const current = {
    //     symbol,
    //     largestAsset,
    //     currentAsset,
    //     expiry_ts_symbol: expiry_ts || null,
    //     expiry_ts_asset: expiry_ts_asset || null,
    //     currentSupport: currentSupport.support || 0,
    //     largestSupport: largestSupport.support || 0,
    //     isFavorite: !!isFavorite,
    //     rivalSupport,
    //   };
      // result.push(current);
    // }
    return result;
  };
