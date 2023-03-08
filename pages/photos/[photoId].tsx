import { useRouter } from "next/router";
import PhotoDetails from "@component/components/photoDetails/PhotoDetails";

const PhotoId = () => {
  const router = useRouter();
  const { photoId, url, title, width, height } = router.query;

  const parsedPhotoId = Array.isArray(photoId)
    ? Number(photoId[0])
    : Number(photoId);
  const parsedUrl = Array.isArray(url) ? url[0] : url;
  const parsedTitle = Array.isArray(title) ? title[0] : title;
  const parsedWidth = Array.isArray(width) ? Number(width[0]) : Number(width);
  const parsedHeight = Array.isArray(height)
    ? Number(height[0])
    : Number(height);

  if (!parsedUrl) {
    return <h1>Loading</h1>;
  }

  return (
    <PhotoDetails
      url={parsedUrl}
      title={parsedTitle}
      id={parsedPhotoId}
      width={parsedWidth}
      height={parsedHeight}
    />
  );
};

export default PhotoId;
