import React, { ReactNode } from "react";
import dynamic from "next/dynamic";

const NoSSRWrapper = (props: { children: ReactNode }) => (
  <React.Fragment>{props.children}</React.Fragment>
);
export default dynamic(() => Promise.resolve(NoSSRWrapper), {
  ssr: false,
});
