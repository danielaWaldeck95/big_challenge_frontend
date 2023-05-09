/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prop-types */
import React from "react";
import dynamic from "next/dynamic";

const NoSSRWrapper = (props: {
  children:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}) => <React.Fragment>{props.children}</React.Fragment>;
export default dynamic(() => Promise.resolve(NoSSRWrapper), {
  ssr: false,
});
