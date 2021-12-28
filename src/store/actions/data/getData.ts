import config from "config";

import {
  LOAD_DATA_FAILURE,
  LOAD_DATA_REQUEST,
  LOAD_DATA_SUCCESS,
} from "store/types/data";

import { ThunkActionWithArguments } from "../index.interface";
import {
  IAssets,
  ISymbols,
  IDescriptions,
  IDrawers,
  ISupportLinks,
} from "store/reducers/data.interface";
import { regSymbol } from "../../../utils/regSymbol";

export interface IStateVars {
  [key: string]: string;
}

export const getData: ThunkActionWithArguments = () => async (
  dispatch,
  getState,
  socket
) => {
  dispatch({
    type: LOAD_DATA_REQUEST,
  });

  await socket.justsaying("light/new_aa_to_watch", {
    aa: config.ADDRESS,
  });

  let data: IStateVars = {};
  // let symbolsA: ISymbols = {};

  // let state: any = getState();

  try {
    let lastKey = "";
    while (true) {
      const chunkData = (await socket.api.getAaStateVars({
        address: config.ADDRESS,
        var_prefix_from: lastKey
      })) as IStateVars;
      const keys = Object.keys(chunkData);
      if (keys.length > 1) {
        data = {...data, ...chunkData};
        lastKey = keys[keys.length - 1];
      } else {
        break;
      }
    }
  } catch (e) {
    console.log("Error: ", e);
    return dispatch({
      type: LOAD_DATA_FAILURE,
    });
  }

  // try {
  //   await socket.api.getBalances([state.settings.activeWallet], async(err: any, res: any)=>{
  //     console.log("11111err",err);
  //     console.log("11111res", _.keys(_.get(res, state.settings.activeWallet)));
  //     const keys = _.keys(_.get(res, state.settings.activeWallet));
  //     _.map(keys, async(i)=>{
  //       if(i === "base") return;
  //       const symbol = await socket.api.getSymbolByAsset(config.ADDRESS, i);
  //       console.log(symbol, _.get(res, [state.settings.activeWallet, i]));
  //       _.set(symbolsA, symbol, _.get(res, [state.settings.activeWallet, i]));
  //     });
  //   });
  // } catch (e) {

  // }

  const assets: IAssets = {};
  const descriptions: IDescriptions = {};
  const symbols: ISymbols = {};
  const drawers: IDrawers = {};
  const supportLinks: ISupportLinks = {};
  // let symbolsForAddress: ISymbols = {};

  for (const row in data) {
    if (row.includes("by_largest_a2s_")) {
      const asset = row.split("_").slice(3)[0];
      if (!(asset in assets)) assets[asset] = {};
      assets[asset].largestSymbol = data[row];
    } else if (row.includes("by_largest_s2a_")) {
      const dataRow = row.split("_").slice(3);
      let oSymbol = [];
      for (let i = 0; i < dataRow.length; i++) {
        oSymbol.push(dataRow[i]);
      }
      const symbol = oSymbol.join("_");
      if (!(symbol in symbols)) symbols[symbol] = {};
      symbols[symbol].largestAsset = data[row];
    } else if (row.includes("a2s_")) {
      const asset = row.split("_").slice(1)[0];
      if (!(asset in assets)) assets[asset] = {};
      assets[asset].currentSymbol = data[row];
    } else if (row.includes("s2a_")) {
      const dataRow = row.split("_").slice(1);
      let oSymbol = [];
      for (let i = 0; i < dataRow.length; i++) {
        oSymbol.push(dataRow[i]);
      }
      const symbol = oSymbol.join("_");
      if (!(symbol in symbols)) symbols[symbol] = {};
      symbols[symbol].currentAsset = data[row];
    } else if (row.includes("decimals_")) {
      const hash = row.split("_").slice(1)[0];
      const decimals: number = Number(data[row]);
      if (!(hash in descriptions)) descriptions[hash] = {};
      descriptions[hash].decimals = decimals;
    } else if (row.includes("desc_support_")) {
      const assetAndHash = row.split("_").slice(2);
      const [asset, hash] = assetAndHash;
      const support: number = Number(data[row]);
      if (!(hash in descriptions)) descriptions[hash] = {};
      if (!("support" in descriptions[hash])) {
        descriptions[hash].support = {};
      }
      descriptions[hash].support = {
        ...descriptions[hash].support,
        [asset]: support,
      };
    } else if (row.includes("current_desc_")) {
      const asset = row.split("_").slice(2)[0];
      if (!(asset in assets)) assets[asset] = {};
      assets[asset].currentDescHash = data[row];
    } else if (row.includes("desc_choice_")) {
    } else if (row.includes("desc_")) {
      const hash = row.split("_").slice(1)[0];
      if (!(hash in descriptions)) descriptions[hash] = {};
      descriptions[hash].text = data[row];
    } else if (row.includes("support_")) {
      const symbAndAsset = row.split("_").slice(1);
      const asset = symbAndAsset[symbAndAsset.length - 1];
      let oSymbol = [];
      for (let i = 0; i < symbAndAsset.length - 1; i++) {
        oSymbol.push(symbAndAsset[i]);
      }
      const symbol = oSymbol.join("_");
      const link = symbol + "_" + asset;
      if (!(link in supportLinks)) supportLinks[link] = {};
      supportLinks[link] = { support: Number(data[row]), asset, symbol };
    } else if (row.includes("balance_")) {
      const AdrAndAsset = row.split("_").slice(1);
      const [address, asset] = AdrAndAsset;
      const balance: number = Number(data[row]);
      if (!(asset in assets)) assets[asset] = {};
      assets[asset].balances = {
        ...assets[asset].balances,
        [address]: balance,
      };
    } else if (row.includes("grace_expiry_ts_")) {
      const asset = row.split("_").slice(3)[0];
      if (!(asset in assets)) assets[asset] = {};
      assets[asset].grace_expiry_ts = Number(data[row]);
    } else if (row.includes("_expiry_ts")) {
      const dataRow = row.split("_").slice(0, 4);
      const address = dataRow[0];
      const drawer = dataRow[1];
      const asset = dataRow[dataRow.length - 1];
      let oSymbol = [];
      for (let i = 2; i < dataRow.length - 1; i++) {
        oSymbol.push(dataRow[i]);
      }
      const symbol = oSymbol.join("_");
      const link = symbol + "_" + asset;
      drawers[link] = {
        ...drawers[link],
        [address + "_" + drawer]: {
          ...drawers[link][address + "_" + drawer],
          expiry_ts: Number(data[row]),
        },
      };
    } else if (row.includes("expiry_ts")) {
      const symbolOrAsset = row.split("_").slice(2)[0];
      if (symbolOrAsset.length === 44) {
        if (!(symbolOrAsset in assets)) assets[symbolOrAsset] = {};
        assets[symbolOrAsset].expiry_ts = Number(data[row]);
      } else {
        const dataRow = row.split("_").slice(2);
        let oSymbol = [];
        for (let i = 0; i < dataRow.length; i++) {
          oSymbol.push(dataRow[i]);
        }
        const symbol = oSymbol.join("_");
        if (!(symbol in symbols)) symbols[symbol] = {};
        symbols[symbol].expiry_ts = Number(data[row]);
      }
    } else {
      const dataRow = row.split("_");
      const address = dataRow[0];
      const drawer = Number(dataRow[1]);
      const asset = dataRow[dataRow.length - 1];
      let oSymbol = [];
      for (let i = 2; i < dataRow.length - 1; i++) {
        oSymbol.push(dataRow[i]);
      }
      const symbol = oSymbol.join("_");
      const link = symbol + "_" + asset;
      const support = Number(data[row]);
      drawers[link] = {
        ...drawers[link],
        [address + "_" + drawer]: { drawer, asset, symbol, support, address },
      };
    }
  }
  for (let symbol in symbols) {
    if (!regSymbol.test(symbol)) {
      delete symbols[symbol];
    }
  }
  for (let drawer in drawers) {
    const currentDrawerByAddress = drawers[drawer];
    for (let link in currentDrawerByAddress) {
      const currentDrawer = currentDrawerByAddress[link];
      if (currentDrawer.drawer !== 0) {
        const { asset, symbol } = currentDrawer;
        const supportLinkKey = symbol + "_" + asset;
        const currentSupportLink = supportLinks[supportLinkKey];
        if (currentSupportLink && currentDrawer.support)
          if (currentSupportLink.lockSupport !== undefined) {
            currentSupportLink.lockSupport += currentDrawer.support;
          } else {
            currentSupportLink.lockSupport = currentDrawer.support;
          }
      }
    }
  }

  // symbolsForAddress = _.cloneDeep(symbolsA);
  dispatch({
    type: LOAD_DATA_SUCCESS,
    payload: { drawers, symbols, assets, descriptions, supportLinks/*, symbolsForAddress */ },
  });
};
