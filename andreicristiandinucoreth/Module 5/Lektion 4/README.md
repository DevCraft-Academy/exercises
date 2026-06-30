# UE - Inspecting the network

1. The 3 images take the longest time to load. They can be further optimized, by using a better image format (webp) and by loading a lower-res version of the image first (or even using a lower res if the context of the page allows).

2. The script was probably supposed to be the 'bottleneck' as it is simulating some action that is supposed to take a long time, but in reality it was faster than the pictures. Nevertheless, in a real scenario, such a file should be analyzed to see how it could be optimized. Also the fetch it is doing seems to not be used anywhere, so this would be a good candidate for optimization.