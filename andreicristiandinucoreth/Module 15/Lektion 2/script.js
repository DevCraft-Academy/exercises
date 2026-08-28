const imageContainer = document.getElementById("imageContainer");
const loadImageButton = document.getElementById("load");
const cache = new Map(); // to store cached images with their timestamps

async function getRandomImageUrl() {
  const apiUrl = "https://randomfox.ca/floof/";
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data.image;
}

function isImageInCache(url) {
  if (cache.has(url)) {
    const { timestamp } = cache.get(url);
    const isExpired = Date.now() - timestamp > 5 * 60 * 1000; // 5 minutes
    return !isExpired;
  }
  return false;
}

async function loadImageButtonHandler() {
  // get a random image URL
  const imageUrl = await getRandomImageUrl();

  // check if this image exists in cache
  if (isImageInCache(imageUrl)) {
    const cachedImage = cache.get(imageUrl).imgElement;
    displayImage(cachedImage, true);
  } else {
    try {
      const response = await fetch(imageUrl);
      const imgBlob = await response.blob();
      const imgObjectUrl = URL.createObjectURL(imgBlob);
      const imgElement = document.createElement("img");
      imgElement.src = imgObjectUrl;
      cache.set(imageUrl, { imgElement, timestamp: Date.now() });
      displayImage(imgElement, false);
      return;
    } catch (error) {
      // The exercise mentioned that in case of request failure we should check if the image is in cache
      // but since we first check the cache before making the request, this scenario is not possible.
      // So we only log the error here.
      console.error("Error fetching image:", error);
    }
  }
}

function displayImage(imgElement, isCached) {
  // clear previous images
  imageContainer.innerHTML = "";
  // append the new image
  imageContainer.appendChild(imgElement);
  if (isCached) {
    // set the border to green if from cache
    imgElement.style.border = "5px solid green";
  } else {
    // set the border to red if newly fetched
    imgElement.style.border = "5px solid red";
  }
}

loadImageButton.addEventListener("click", loadImageButtonHandler);
