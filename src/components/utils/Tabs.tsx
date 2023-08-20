import classNames from "classnames";
import { pipe } from "fp-ts/lib/function";
import { PropsWithChildren, useState } from "react";
import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPaneProps,
  TabPane as TabPaneRaw,
} from "reactstrap";
import { withVisibility } from "../../enhancers";

export type TabsProps = PropsWithChildren<{
  tabs: string[];
}>;

export const Tabs: React.FC<TabsProps> = ({ tabs, children }) => {
  const [tab, setTab] = useState(0);

  return (
    <>
      <Nav tabs>
        {tabs.map((name, idx) => (
          <NavItem key={`${name}-${idx}`}>
            <NavLink
              className={classNames({ active: idx === tab })}
              onClick={() => setTab(idx)}
            >
              {name}{" "}
            </NavLink>
          </NavItem>
        ))}
      </Nav>
      <TabContent activeTab={tab}>{children}</TabContent>
    </>
  );
};

export const TabPane = pipe(
  TabPaneRaw as unknown as React.FC<TabPaneProps>,
  withVisibility
);
