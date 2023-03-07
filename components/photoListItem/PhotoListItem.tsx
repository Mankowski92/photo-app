import { ItemWrapper, Title } from "./PhotoListItem.styled";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { Photo } from "../../lib/types/photo";

const PhotoListItem: React.FC<Photo> = ({ id, title, url }) => {
  const router = useRouter();
  const [isFavorited, setIsFavorited] = useState<boolean>(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorited(favorites.includes(id));
  }, [id]);

  const handleClick = (url: string, title: string) => {
    router.push({
      pathname: `/photos/${id}`,
      query: { url: url, title: title },
    });
  };

  const handleFavoriteToggle = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    if (isFavorited) {
      localStorage.setItem(
        "favorites",
        JSON.stringify(favorites.filter((favId: number) => favId !== id))
      );
      setIsFavorited(false);
    } else {
      localStorage.setItem("favorites", JSON.stringify([...favorites, id]));
      setIsFavorited(true);
    }
  };

  return (
    <ItemWrapper>
      <Title>{title != "" ? title : "No title on that :("}</Title>
      <Image src={url} alt={title} width={500} height={500} />
      <button onClick={handleFavoriteToggle}>
        {isFavorited ? "Remove from favorites" : "Add to favorites"}
      </button>
      <button onClick={() => handleClick(url, title)}>Enter detail page</button>
    </ItemWrapper>
  );
};

export default PhotoListItem;
