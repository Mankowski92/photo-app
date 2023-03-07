import {useRouter} from "next/router";
import PhotoDetails from "@component/components/photoDetails/PhotoDetails";

const PhotoId = () => {
  const router = useRouter();

  const photoId = Array.isArray(router.query.photoId)
      ? Number(router.query.photoId[0])
      : Number(router.query.photoId);
  const photoUrl = Array.isArray(router.query.url)
      ? router.query.url[0]
      : router.query.url;
  const photoTitle = Array.isArray(router.query.title)
      ? router.query.title[0]
      : router.query.title;

  return (
      <div>
        <h1>Photo {router.query.photoId}</h1>
        {router.query.url && router.query.title ? (
            <PhotoDetails
                photoUrl={photoUrl || ""}
                photoTitle={photoTitle || ""}
                photoId={photoId}
            />
        ) : (
            <h1>Loading</h1>
        )}
      </div>
  );
};
export default PhotoId;
