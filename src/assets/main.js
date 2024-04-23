const youtubeApi =
  "https://youtube-v31.p.rapidapi.com/search?channelId=UCeLHszkByNZtPKcaVXOCOQQ&part=snippet%2Cid&order=date&maxResults=10";
const spotifyApi =
  "https://spotify23.p.rapidapi.com/artist_albums/?id=246dkjvS1zLTtiykXe5h60&offset=0&limit=8";
const singlesApi =
  "https://spotify23.p.rapidapi.com/artist_singles/?id=246dkjvS1zLTtiykXe5h60&offset=0&limit=20";

const contentVideos = null || document.getElementById("content-videos"); //Access to html element
const contentAlbums = null || document.getElementById("content-albums"); //Access to html element
const contentSingles = null || document.getElementById("content-singles"); //Access to html element

const youtubeOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "32e125e9e5msh4b5c68ddae731fcp150c11jsn6c7cdad207e0",
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};

const spotifyOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "32c778e721mshb791750d0611f09p199d74jsn0e1ee2bba9db",
    "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
  },
};

async function fetchData(urlApi, options) {
  const response = await fetch(urlApi, options);
  const data = response.json();
  return data;
}

async function getVideos() {
  try {
    const videos = await fetchData(youtubeApi, youtubeOptions);
    let view = `
        ${videos.items
          .map(
            (video) => `
        <a href="https://youtube.com/watch?v=${video.id.videoId}" target="_blank">
            <div class="group relative">
                <div
                    class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                    <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
                </div>
                <div class="mt-4 flex justify-between">
                    <h3 class="text-base text-white">
                        <span aria-hidden="true" class="absolute inset-0"></span>
                        ${video.snippet.title}
                    </h3>
                </div>
            </div>
        </a>
        `
          )
          .slice(0, 8)
          .join("")}
    `;
    contentVideos.innerHTML = view;
  } catch (error) {
    console.error(error);
    contentVideos.innerHTML = `Sorry, an error has occurred. Error info: ${error}`;
  }
}

async function getAlbums() {
  try {
    const albums = await fetchData(spotifyApi, spotifyOptions);
    if (!albums.data.artist || !albums.data.artist.discography || !albums.data.artist.discography.albums) {
      throw new Error("Album data structure is invalid.");
    }
    let view = `
        ${albums.data.artist.discography.albums.items
          .map(
            (album) => `
        <div class="bg-red-900 rounded-lg p-4">
        <a href="${album.releases.items[0].sharingInfo.shareUrl}" target="_blank">
            <img class="w-full mb-4 rounded-lg" src="${album.releases.items[0].coverArt.sources[0].url}"
                alt="Portada ${album.releases.items[0].name}">
            <div class="text-center">
                <h3 class="text-2xl font-bold text-white mb-2">${album.releases.items[0].name}</h3>
                <p class="text-white font-medium">
                    Year: ${album.releases.items[0].date.year} <br>
                    Songs: ${album.releases.items[0].tracks.totalCount}
                </p>
            </div>
        </a>
      </div>
        `
          )
          .slice(0)
          .join("")}
    `;
    contentAlbums.innerHTML = view;
  } catch (error) {
    console.error(error);
    contentAlbums.innerHTML = `Sorry, an error has occurred. Error info: ${error}`;
  }
}

async function getSingles() {
  try {
    const singles = await fetchData(singlesApi, spotifyOptions);
    if (!singles.data.artist || !singles.data.artist.discography || !singles.data.artist.discography.singles) {
      throw new Error("Singles data structure is invalid.");
    }
    let view = `
        ${singles.data.artist.discography.singles.items
          .map(
            (single) => `
        <div class="bg-red-900 rounded-lg p-4">
        <a href="${single.releases.items[0].sharingInfo.shareUrl}" target="_blank">
            <img class="w-full mb-4 rounded-lg" src="${single.releases.items[0].coverArt.sources[0].url}"
                alt="Portada ${single.releases.items[0].name}">
            <div class="text-center">
                <h3 class="text-2xl font-bold text-white mb-2">${single.releases.items[0].name}</h3>
                <p class="text-white font-medium">
                    Released: ${single.releases.items[0].date.day}/${single.releases.items[0].date.month}/${single.releases.items[0].date.year} <br>
                </p>
            </div>
        </a>
      </div>
        `
          )
          .slice(0, 8)
          .join("")}
    `;
    contentSingles.innerHTML = view;
  } catch (error) {
    console.error(error);
    contentSingles.innerHTML = `Sorry, an error has occurred. Error info: ${error}`;
  }
}

(async () => {
  getVideos();
  getAlbums();
  getSingles();
})();
