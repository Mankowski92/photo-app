const API_KEY = process.env.NEXT_PUBLIC_PEXELS_API_KEY as string;

export const getPhotosList = async (page: number, photosPerPage: number) => {
  const apiUrl = `https://api.pexels.com/v1/curated?page=${page}&per_page=${photosPerPage}`;
  try {
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: API_KEY,
      },
    });
    const data = await response.json();
    return data.photos.map((photo: any) => ({
      id: photo.id,
      url: photo.src.medium,
      title: photo.alt,
    }));
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getQueryPhotos = async (
  page: number,
  photosPerPage: number,
  query: string
) => {
  const apiUrl = `https://api.pexels.com/v1/search/?page=${page}&per_page=${photosPerPage}&query=${query}`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: API_KEY,
      },
    });
    const data = await response.json();
    return data.photos.map((photo: any) => ({
      id: photo.id,
      url: photo.src.medium,
      title: photo.alt,
    }));
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getFavoritesPhotos = async () => {
  const favoriteIds = JSON.parse(localStorage.getItem("favorites") || "[]");
  return await Promise.all(
    favoriteIds.map(async (id: number) => {
      const apiUrl = `https://api.pexels.com/v1/photos/${id}`;
      const headers = {
        Authorization: API_KEY,
      };
      try {
        const response = await fetch(apiUrl, { headers });
        const data = await response.json();
        return {
          id: data.id,
          url: data.src.medium,
          title: data.alt,
        };
      } catch (error) {
        console.log(error);
        return {};
      }
    })
  );
};
