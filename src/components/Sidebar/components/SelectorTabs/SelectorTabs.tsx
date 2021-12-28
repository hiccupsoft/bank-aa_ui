import { Tabs } from "antd";
import React from "react";
import Scrollbar from "react-scrollbars-custom";
import padEnd from "lodash.padend";

import { TokenHeader } from "../TokenHeader/TokenHeader";
import { TokenItem } from "../TokenItem/TokenItem";

// import { ICurrentSymbol } from "store/selectors/interfaces/currentSymbol.interface";
import { ISelectorTabs } from "./SelectorTabs.interface";

const { TabPane } = Tabs;

const truncateSymbolOrAsset = (symbolOrAsset: string, width: number) => {
  if (width <= 480) {
    if (symbolOrAsset.length >= 11) {
      return padEnd(symbolOrAsset.substring(0, 11), 14, "...");
    } else {
      return symbolOrAsset;
    }
  } else {
    if (symbolOrAsset.length >= 18) {
      return padEnd(symbolOrAsset.substring(0, 15), 18, "...");
    } else {
      return symbolOrAsset;
    }
  }
};

export const SelectorTabs: React.FC<ISelectorTabs> = (props) => {
  return (
    <Tabs
      defaultActiveKey="1"
      animated={false}
      tabBarStyle={{
        marginBottom: 0,
        userSelect: "none",
      }}
    >
      <TabPane tab="" key="1" forceRender={true}>
      <TokenHeader />
      <Scrollbar
        style={{
          height: props.height,
        }}
      >
        {console.log("======props========", props)}
        {props.currentList.map((current) => (
          <TokenItem
            current={current}
            // sidebarType={props.sidebarType}
            key={"token-all-" + current.symbol}
            isDispute={false}
            truncatedSymbolOrAsset={truncateSymbolOrAsset(current.symbol, props.width)}
          />
        ))}
      </Scrollbar>
      </TabPane>
    </Tabs>
  );
};
