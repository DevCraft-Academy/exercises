# UE - Chrome Experiments

Choose 3 [Chrome Experiemnts](https://experiments.withgoogle.com/collection/chrome) and answer the following questions:

1. Why do I like this Experiment?
2. Which Browser-APIs are used?
3. Which third-party frameworks or libraries are used?
4. Which third-party APIs are used?
5. Is internal or external Javascript used in the files? How are the scripts getting loaded?
6. Is a code transpiler being used?
7. What would I change to make the experiment better?

## Experiment 1 - [Roadtrip](https://experiments.withgoogle.com/roadtrip)

1. The use of static images from Google StreetView to create a stop-motion style video seemed interesting.
2. Canvas, WebGL
3. GLFX.js
4. Google StreetView
5. Some file have inline code definitions, most are loaded through `<script>` tags in the `<head>`.
6. No
7. All scripts seem to be loaded upfront/blocking. Some might be defer-able to improve initial paint. Also experiment uses a lot of bandwidth due to many streetview images being loaded. Maybe some middleware to deal with loading this images and cache them.

## Experiment 2 - [Sandspiel](https://experiments.withgoogle.com/sandspiel)

1. Playful, dynamic, smooth. Particle simulation seems hard to achieve in browser.
2. WebGL
3. React, WASM, Google Tags (analytics)
4. -
5. External JS mostly from react, loaded at the end of body tag, but also using both `defer` and `async` which seems redundant. Some other scripts (e.g analytics) loaded in head tag.
6. Yes, Babel.
7. Seems pretty complicated app so hard to say. Maybe usage of React for this is a bit overkill, but not sure how easy it is to bundle in WASM stuff directly.

## Experiment 3 - [ShibuyaCrowd](https://experiments.withgoogle.com/shibuyacrowd)

1. Weird graphical experiment, interesting use of graphic rendering, has an artsy aspect to it.
2. WebGL
3. Three.js
4. -
5. Various external files. Three.js gets loaded upfront in the head, the rest of the app gets loaded at the end of the body tag through one main js script file.
6. Yes, Babel.
7. Not sure how this would be better, it's already nicely set up and code is easy to follow.