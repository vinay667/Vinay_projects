if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./service-worker.js')
             .then(function() { console.log('Service Worker Registered'); });
  }

if (!('Notification' in window)) {
  consol.log('This browser does not support notifications!');
  
}
else
{
alert('This browser supports notification!');
Notification.requestPermission(function(status){
console.log('Notification permission status:',status);
});
 if (Notification.permission == 'granted') {
  navigator.serviceWorker.getRegistration().then(function(reg) {

   
     var options = {
  body: 'First notification!',
  icon: 'img/hello12.png',
  vibrate: [100, 50, 100],
  data: {
    dateOfArrival: Date.now(),
    primaryKey: 1
  },

actions: [
  {action: 'explore', title: 'Go to the site',
    icon: 'img/hello123.png'},
  {action: 'close', title: 'Close the notification',
    icon: 'img/vinay.png'},
]

 
};


    reg.showNotification('My Notification',options);
  });
}
}

pushButton.addEventListener('click', function() {
  pushButton.disabled = true;
  if (isSubscribed) {
    unsubscribeUser();
  } else {
    subscribeUser();
  }
});

swRegistration.pushManager.getSubscription()
.then(function(subscription) {
  isSubscribed = (subscription !== null);

  updateSubscriptionOnServer(subscription);

  if (isSubscribed) {
    console.log('User IS subscribed.');
  } else {
    console.log('User is NOT subscribed.');
  }

  updateBtn();
});
