import { IStore } from "../reducers/index.interface";
import _ from "lodash";

export interface IChallengers {
}

export const getTokenBallances: (
  store: IStore
) => IChallengers = (store: IStore) => {
  const { symbolsForAddress } = store.data;
  const symbols = _.cloneDeep(symbolsForAddress);;
  
  return symbols;
};
