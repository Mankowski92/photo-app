import { useRouter } from "next/router";
import PhotoDetails from "@component/components/photoDetails/PhotoDetails";

const PhotoId = () => {
  const router = useRouter();
  const { photoId, url, title } = router.query;

  const parsedPhotoId = Array.isArray(photoId)
    ? Number(photoId[0])
    : Number(photoId);
  const parsedUrl = Array.isArray(url) ? url[0] : url;
  const parsedTitle = Array.isArray(title) ? title[0] : title;

  if (!parsedUrl || !parsedTitle) {
    return <h1>Loading</h1>;
  }

  return (
    <div>
      <h1>Photo {parsedPhotoId}</h1>
      <PhotoDetails url={parsedUrl} title={parsedTitle} id={parsedPhotoId} />
    </div>
  );
};

export default PhotoId;
