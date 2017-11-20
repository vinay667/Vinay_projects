var cacheName = 'Vinay-Singh-Creation-1';
var filesToCache = [
'/',
'/index.html',
'/style.css',
'/js/my.js',
'/img/bullet.gif',
'/img/logo.jpg',
'/img/top_bg.gif',
'/source/about.html',
'/source/bio.html'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});

self.addEventListener('push', function(e) {
  var options = {
    body: 'This notification was generated from a push!',
    icon: 'img/hello12.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '-push-notification'
    },
    actions: [
      {action: 'explore', title: 'Go to the site',
        icon: 'img/hello123.png'},
      {action: 'close', title: 'Close the notification',
        icon: 'img/vinay.png'},
    ]
  };
  e.waitUntil(
    self.registration.showNotification('Hello world!', options)
  );
});


self.addEventListener('notificationclick', function(e) {
  var notification = e.notification;
  var primaryKey = notification.data.primaryKey;
  var action = e.action;

  if (action === 'close') {
    notification.close();
  } else {
    clients.openWindow('http://www.google.com');
    notification.close();
  }

  // TODO 5.3 - close all notifications when one is clicked

});

