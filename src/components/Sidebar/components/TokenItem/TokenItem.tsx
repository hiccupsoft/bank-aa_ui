import { Rate } from "antd";
import React from "react";
import { useDispatch } from "react-redux";

import styles from "./TokenItem.module.css";
import { addFavoriteSymbol } from "store/actions/settings/addFavoriteSymbol";
// import { removeFavoriteSymbol } from "store/actions/settings/removeFavoriteSymbol";
import { changeActiveSymbol } from "store/actions/active/changeActiveSymbol";
import { ICurrentSymbol } from "store/selectors/interfaces/currentSymbol.interface";

export interface ITokenItem {
  key: string;
  truncatedSymbolOrAsset: string;
  isDispute: boolean;

  current: ICurrentSymbol;
}

export const TokenItem: React.FC<ITokenItem> = (props) => {
  const { isDispute, truncatedSymbolOrAsset, current } = props;

  const {
    symbol,
    balance
    // currentSupport,
    // isFavorite,
    // currentAsset,
    // rivalSupport,
  } = current;

  const symbolOrAsset = symbol;

  const dispatch = useDispatch();

  const handleChangeRate = () => {
    dispatch(addFavoriteSymbol(symbol));
  };

  return (
    <div
      className={`${styles.tokenItem} ${
        isDispute ? styles.dispute : styles.notDispute
      }`}
    >
      <div
        className={styles.itemWrap}
        onClick={() => dispatch(changeActiveSymbol(symbol))}
      >
        <div className={styles.symbolOrAsset} title={symbolOrAsset}>
          {truncatedSymbolOrAsset}
        </div>

         <div className={styles.support}>
          {balance}
        </div>
{/*
        <div className={styles.rivalSupport}>
          {rivalSupport ? (rivalSupport / 1e9).toFixed(3) : "-"}
        </div> */}
      </div>

      <div className={styles.rateWrap}>
        <Rate
          // value={isFavorite ? 1 : 0}
          onChange={handleChangeRate}
          count={1}
          style={{ fontSize: 16 }}
        />
      </div>
    </div>
  );
};
