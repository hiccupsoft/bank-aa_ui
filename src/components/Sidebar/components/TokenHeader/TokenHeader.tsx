import React from "react";
// import { useDispatch, useSelector } from "react-redux";

// import { IStore } from "store/reducers/index.interface";
// import { changeSidebarType } from "store/actions/settings/changeSidebarType";

import styles from "./TokenHeader.module.css";

export const TokenHeader = () => {
  // const dispatch = useDispatch();
  // const sidebarType = useSelector<IStore>(
  //   (state) => state.settings.sidebarType
  // );

  return (
    <div className={styles.tokenHeader}>
      <div className={styles.headerWrap}>
        <div className={styles.symbolOrAsset}>
          Symbol
        </div>
        <div className={styles.support}>Balance</div>
        {/* <div className={styles.rivalSupport}>Rival support</div> */}
      </div>
      <div className={styles.rate} />
    </div>
  );
};
