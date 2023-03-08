import { PhotoDetailsWrapper } from "./PhotoDetails.styled";
import { Button, ButtonWrapper } from "@component/styles/CommonStyles.styled";
import React from "react";
import { useRouter } from "next/router";
import { Photo } from "../../lib/types/photo";
import ResponsiveImage from "@component/components/ResponsiveImage/ResponsiveImage";
import WebShare from "@component/components/WebShare/WebShare";
import { noTitleMessage } from "@component/lib/constants";
import useFavoriteToggle from "@component/utils/hooks/useFavoriteToggle";

const PhotoDetails: React.FC<Photo> = ({ id, title, url, width, height }) => {
  const router = useRouter();

  const { isFavorited, handleFavoriteToggle } = useFavoriteToggle(id);

  const { asPath } = useRouter();
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  const fullUrl = `${origin}${asPath}`;

  return (
    <PhotoDetailsWrapper>
      <h1>Detail page of: {title != "" ? title : noTitleMessage}</h1>
      <ResponsiveImage
        src={url}
        alt={title || noTitleMessage}
        width={width}
        height={height}
        bigVariant={true}
      />
      <ButtonWrapper>
        <Button onClick={() => router.back()}>Go back</Button>
        <Button onClick={handleFavoriteToggle}>
          {isFavorited ? "Remove from favorites" : "Add to favorites"}
        </Button>
        <WebShare url={fullUrl} />
      </ButtonWrapper>
    </PhotoDetailsWrapper>
  );
};
export default PhotoDetails;
