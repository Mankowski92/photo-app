import { ItemWrapper, Title } from "./PhotoListItem.styled";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export interface PhotoListItemProps {
  id: number;
  photoUrl: string;
  photoTitle: string;
}

const PhotoListItem: React.FC<PhotoListItemProps> = ({
  id,
  photoUrl,
  photoTitle,
}) => {
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
      <Title>{photoTitle != "" ? photoTitle : "No title on that :("}</Title>
      <Image src={photoUrl} alt={photoTitle} width={500} height={500} />
      <button onClick={handleFavoriteToggle}>
        {isFavorited ? "Remove from favorites" : "Add to favorites"}
      </button>
      <button onClick={() => handleClick(photoUrl, photoTitle)}>
        Enter detail page
      </button>
    </ItemWrapper>
  );
};

export default PhotoListItem;
