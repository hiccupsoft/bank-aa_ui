import { ISymbolBalances } from "store/reducers/data.interface";
import { IStore } from "../reducers/index.interface";

export const getCurrentDisputeSymbolList: (
  store: IStore
) => ISymbolBalances[] = (store: IStore) => {
  const { symbols, supportLinks, assets, symbolsForAddress } = store.data;
  const favoriteSymbols = store.settings.favorites.symbols;
  const result: ISymbolBalances[] = [];
  for (let symbol in symbolsForAddress) {
    const { total } = symbolsForAddress[symbol];

    if ( total ) {
      const current = {
        symbol,
        total,
      };
      // result.push(current);
    }
  }
  return result;
};
