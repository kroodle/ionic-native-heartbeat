(function(){
  try {
   if(typeof angular !== 'undefined'){
     angular.module('ngCordova.plugins.heartbeat', [])
      .factory('$cordovaHeartbeat', ['$timeout', '$window', function ($q, $window) {
        return {
          start: function() {
            return $window.Heartbeat.start();
          },
          stop: function() {
            return $window.Heartbeat.stop();
          },
          onBpm: function () {
            $timeout(function () {
              $window.Heartbeat.on('bpm', function (bpm) {
                $rootScope.$emit('$cordovaHeartbeat:bpm', bpm);
              });
            });
          },
          onProgress: function () {
            $timeout(function () {
              $window.Heartbeat.on('percentage', function (percentage) {
                $rootScope.$emit('$cordovaHeartbeat:progress', percentage);
              });
            });
          },
          onGraphUpdate: function () {
            $timeout(function () {
              $window.Heartbeat.on('graph', function (graph) {
                $rootScope.$emit('$cordovaHeartbeat:graphUpdate', graph);
              });
            });
          },
          onStatusChange: function () {
            $timeout(function () {
              $window.Heartbeat.on('status', function (status) {
                $rootScope.$emit('$cordovaHeartbeat:statusChange', status);
              });
            });
          },
          onWarning: function () {
            $timeout(function () {
              $window.Heartbeat.on('warning', function (warning) {
                $rootScope.$emit('$cordovaHeartbeat:warning', warning);
              });
            });
          },
          onError: function () {
            $timeout(function () {
              $window.Heartbeat.on('error', function (error) {
                $rootScope.$emit('$cordovaHeartbeat:error', error);
              });
            });
          },
          onHrv: function () {
            $timeout(function () {
              $window.Heartbeat.on('hrv', function (hrv) {
                $rootScope.$emit('$cordovaHeartbeat:hrv', hrv);
              });
            });
          },
        };
      }]);
      // .run(['$injector', function ($injector) {
      //   $injector.get('$cordovaHeartbeat'); // Ensure the factory always gets initialised
      // }]);

     angular.module('ngCordova.plugins').requires.push('ngCordova.plugins.heartbeat');
     console.log('[Heartbeat]: ngCordova plugin loaded');
   }
  } finally { }
})();
