import { IStore } from "../reducers/index.interface";
import { ICurrentSymbol } from "./interfaces/currentSymbol.interface";

export const getCurrentFavoriteSymbolList: (
  store: IStore
) => ICurrentSymbol[] = (store: IStore) => {
  const result: ICurrentSymbol[] = [];
  return result;
};
