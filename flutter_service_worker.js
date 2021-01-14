'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "33c56eb116e766a1bd0f9b81be0e546e",
"assets/FontManifest.json": "2191e285c262df09b47fbba7e6d2f725",
"assets/fonts/MaterialIcons-Regular.otf": "1288c9e28052e028aba623321f7826ac",
"assets/NOTICES": "579795f6b77503368100eeacaff4f231",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "115e937bb829a890521f72d2e664b632",
"assets/packages/font_awesome_flutter/lib/fonts/fa-brands-400.ttf": "51d23d1c30deda6f34673e0d5600fd38",
"assets/packages/font_awesome_flutter/lib/fonts/fa-regular-400.ttf": "d51b09f7b8345b41dd3b2201f653c62b",
"assets/packages/font_awesome_flutter/lib/fonts/fa-solid-900.ttf": "0ea892e09437fcaa050b2b15c53173b7",
"assets/resources/fonts/Muli-Black.ttf": "ba313804f1ed0a7dbe5437ec2e33abf3",
"assets/resources/fonts/Muli-BlackItalic.ttf": "f3ee2503b785e7bf3dfd7bf446554198",
"assets/resources/fonts/Muli-Bold.ttf": "44ea8275e878ed72a9c8a393f9de12d2",
"assets/resources/fonts/Muli-BoldItalic.ttf": "b0a60ec1073a03679d8a3ddbfaa617c0",
"assets/resources/fonts/Muli-ExtraBold.ttf": "bc7c6887977f1ea2e272e71ebaa87649",
"assets/resources/fonts/Muli-ExtraBoldItalic.ttf": "ef29f4779b694d44dec4c58694303b09",
"assets/resources/fonts/Muli-ExtraLight.ttf": "e43348aaf94887a6a72b6e470844b7f7",
"assets/resources/fonts/Muli-ExtraLightItalic.ttf": "e0a3f8659fd3a0ae099a4c32a3387d40",
"assets/resources/fonts/Muli-Italic.ttf": "42ba31045765427e247a38c7e2c50e41",
"assets/resources/fonts/Muli-Light.ttf": "d80af0828fe7e5236cb28e3bbcdf9e87",
"assets/resources/fonts/Muli-LightItalic.ttf": "70c475e998d8e642b30de75a5784ec5f",
"assets/resources/fonts/Muli-Regular.ttf": "e063a333cc9d58a3ad85d5cd86bf92d5",
"assets/resources/fonts/Muli-SemiBold.ttf": "3217b2cde8e4451eb8a8572d39798598",
"assets/resources/fonts/Muli-SemiBoldItalic.ttf": "17c1038fa865fea142dfd68676518105",
"assets/resources/fonts/muli_bold.ttf": "44ea8275e878ed72a9c8a393f9de12d2",
"assets/resources/fonts/muli_italic.ttf": "42ba31045765427e247a38c7e2c50e41",
"assets/resources/fonts/muli_regular.ttf": "e063a333cc9d58a3ad85d5cd86bf92d5",
"assets/resources/fonts/Ubuntu-Bold.ttf": "e00e2a77dd88a8fe75573a5d993af76a",
"assets/resources/fonts/Ubuntu-BoldItalic.ttf": "48c161df9991f9b0f6e4a858e95e415e",
"assets/resources/fonts/Ubuntu-Italic.ttf": "4b96047e4af086277cdaeb9e60857534",
"assets/resources/fonts/Ubuntu-Light.ttf": "277289c53af7cb469c1dc5dca3adca35",
"assets/resources/fonts/Ubuntu-LightItalic.ttf": "d96027148c57a715e372789a90f69e8f",
"assets/resources/fonts/Ubuntu-Medium.ttf": "8e22c2a6e3a3c679787e763a97fa11f7",
"assets/resources/fonts/Ubuntu-MediumItalic.ttf": "0fbe070c207e3a869cc9e02f234f81e5",
"assets/resources/fonts/Ubuntu-Regular.ttf": "2505bfbd9bde14a7829cc8c242a0d25c",
"assets/resources/fonts/ubuntu_bold.ttf": "e00e2a77dd88a8fe75573a5d993af76a",
"assets/resources/fonts/ubuntu_italic.ttf": "4b96047e4af086277cdaeb9e60857534",
"assets/resources/fonts/ubuntu_regular.ttf": "2505bfbd9bde14a7829cc8c242a0d25c",
"assets/resources/images/default-product.png": "a97b169021f4ffc17d9309c1da63b974",
"assets/resources/locales/en.json": "788b74be80dcdb1dd5dbc5e0e30bcd88",
"assets/resources/locales/es.json": "b342bc55c601cdfe15bd509742cdea81",
"assets/resources/locales/fr.json": "ba3eed2fb323b796293b29ab5476211e",
"favicon.png": "6ffffe9a5a55ae966d33513599927d78",
"icons/Icon-192.png": "aee96030137c7e6a4f220c339ef390a9",
"icons/Icon-512.png": "2e63e39ccfa13cc7e5772720a751f95e",
"index.html": "bb85c4be25dd36b08898ad579eaf703f",
"/": "bb85c4be25dd36b08898ad579eaf703f",
"main.dart.js": "0b9e5b6e2c937bd60ce2e2fee90f9d6b",
"manifest.json": "62ca234e9705917be184137a9970bf73",
"version.json": "5ff54591763571a7b48b4ad01d6dccc3"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value + '?revision=' + RESOURCES[value], {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey in Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
