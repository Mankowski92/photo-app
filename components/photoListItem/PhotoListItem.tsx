import { ItemWrapper, Title } from "./PhotoListItem.styled";
import { useRouter } from "next/router";
import React from "react";
import { Photo } from "../../lib/types/photo";
import { Button, ButtonWrapper } from "@component/styles/CommonStyles.styled";
import ResponsiveImage from "@component/components/ResponsiveImage/ResponsiveImage";
import { noTitleMessage } from "@component/lib/constants";
import useFavoriteToggle from "@component/utils/hooks/useFavoriteToggle";

const PhotoListItem: React.FC<Photo> = ({ id, title, url, width, height }) => {
  const router = useRouter();

  const { isFavorited, handleFavoriteToggle } = useFavoriteToggle(id);

  const handleOpenDetails = () => {
    router.push({
      pathname: `/photos/${id}`,
      query: { url, title, width, height },
    });
  };

  return (
    <ItemWrapper>
      <Title>{title || noTitleMessage}</Title>
      <ResponsiveImage
        src={url}
        alt={title || noTitleMessage}
        width={width}
        height={height}
      />
      <ButtonWrapper>
        <Button onClick={handleOpenDetails}>Detail page</Button>
        <Button onClick={handleFavoriteToggle}>
          {isFavorited ? "Remove from favorites" : "Add to favorites"}
        </Button>
      </ButtonWrapper>
    </ItemWrapper>
  );
};

export default PhotoListItem;
