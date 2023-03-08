const API_KEY = process.env.NEXT_PUBLIC_PEXELS_API_KEY as string;

//TODO implement React Query

const fetchJson = async (url: string, headers: HeadersInit) => {
  const response = await fetch(url, { headers });
  return await response.json();
};

const getTitleFromUrl = (url: string) => {
  const match = url.match(/\/photo\/(.+)\//);
  if (match && match.length > 1) {
    let title = match[1].replace(/-/g, " ");
    title = title.replace(/\d+$/, "");
    return title.charAt(0).toUpperCase() + title.slice(1);
  }
  return null;
};

const parsePhoto = (photo: any) => ({
  id: photo.id,
  url: photo.src.medium,
  title: getTitleFromUrl(photo.url),
  width: photo.width,
  height: photo.height,
});

export const getPhotosList = async (page: number, photosPerPage: number) => {
  const apiUrl = `https://api.pexels.com/v1/curated?page=${page}&per_page=${photosPerPage}`;
  try {
    const data = await fetchJson(apiUrl, { Authorization: API_KEY });
    return data.photos.map(parsePhoto);
  } catch (error) {
    //TODO appropriate error handling
    console.log(error);
    return [];
  }
};

export const getQueryPhotos = async (
  page: number,
  photosPerPage: number,
  query: string
) => {
  console.log(photosPerPage);
  const apiUrl = `https://api.pexels.com/v1/search?query=${query}&page=${page}`;

  try {
    const data = await fetchJson(apiUrl, { Authorization: API_KEY });
    return data.photos.map(parsePhoto);
  } catch (error) {
    //TODO appropriate error handling
    console.log(error);
    return [];
  }
};

export const getFavoritesPhotos = async () => {
  const favoriteIds = JSON.parse(localStorage.getItem("favorites") || "[]");
  try {
    const photoPromises = favoriteIds.map(async (id: number) => {
      const apiUrl = `https://api.pexels.com/v1/photos/${id}`;
      const headers = { Authorization: API_KEY };
      const data = await fetchJson(apiUrl, headers);
      return parsePhoto(data);
    });
    return await Promise.all(photoPromises);
  } catch (error) {
    //TODO appropriate error handling
    console.log(error);
    return [];
  }
};
