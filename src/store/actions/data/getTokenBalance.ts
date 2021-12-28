
import { ThunkActionWithArguments } from "../index.interface";
import _ from "lodash";
import { LOAD_DATA_FAILURE, LOAD_DATA_REQUEST, LOAD_TOKEN_BALANCE_SUCCESS } from "store/types/data";
import config from "config";
import { ISymbols } from "store/reducers/data.interface";

export interface IStateVars {
  [key: string]: string;
}

export const getTokenBalance: ThunkActionWithArguments = () =>async(
  dispatch,
  getState,
  socket
) => { 
  dispatch({
    type: LOAD_DATA_REQUEST,
  });
  let state: any = getState();
  let symbolsForAddress: ISymbols = {};
  let symbols: any[];

  const getSymbolByAssets = async(walletInfo: any, index:number) => {
    if(!walletInfo) return;
    if(symbols.length === index) {
        dispatch({
          type: LOAD_TOKEN_BALANCE_SUCCESS,
          payload: { symbolsForAddress },
        });
      return;
    }
    socket.api.getSymbolByAsset(config.ADDRESS, symbols[index]).then(symbol=>{
      console.log(symbol);
      if(symbol !== "GBYTE") {
        _.set(symbolsForAddress, symbol, _.get(walletInfo, [state.settings.activeWallet, symbols[index]]));
      }
      const i = index + 1;
      getSymbolByAssets(walletInfo, i);
    });
  };

  try {
    await socket.api.getBalances([state.settings.activeWallet], async(err: any, res: any)=>{
      console.log("11111err",err);
      console.log("11111res", _.keys(_.get(res, state.settings.activeWallet)));
      symbols = _.keys(_.get(res, state.settings.activeWallet));
      getSymbolByAssets(res, 0);      
    });
  } catch (e) {
    dispatch({
      type: LOAD_DATA_FAILURE
    });
  }
};
