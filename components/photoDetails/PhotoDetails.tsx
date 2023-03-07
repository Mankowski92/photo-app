import { PhotoDetailsWrapper } from "./PhotoDetails.styled";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Photo } from "../../lib/types/photo";

const PhotoDetails: React.FC<Photo> = ({ id, title, url }) => {
  const router = useRouter();
  const [isFavorited, setIsFavorited] = useState<boolean>(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorited(favorites.includes(id));
  }, [id]);

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
    <PhotoDetailsWrapper>
      <h1>{title != "" ? title : "No title on that :("}</h1>
      <Image src={url} alt={title} width={800} height={800} />
      <button onClick={() => router.back()}>Go back</button>
      <button onClick={handleFavoriteToggle}>
        {isFavorited ? "Remove from favorites" : "Add to favorites"}
      </button>
    </PhotoDetailsWrapper>
  );
};
export default PhotoDetails;
