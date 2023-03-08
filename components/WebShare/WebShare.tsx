import React from "react";
import { RWebShare } from "react-web-share";
import { Button } from "@component/styles/CommonStyles.styled";

interface WebShareProps {
  url: string;
}

const WebShare: React.FC<WebShareProps> = ({ url }) => {
  return (
    <RWebShare
      data={{
        url: url,
        title: "Share this page!",
      }}
    >
      <Button>Share</Button>
    </RWebShare>
  );
};

export default WebShare;
