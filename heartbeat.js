(function(){
  try {
   if(typeof angular !== 'undefined'){
     angular.module('ngCordova.plugins.heartbeat', [])
      .factory('$cordovaHeartbeat', ['$timeout', '$window', function ($q, $window) {
        var heartbeat;
        return {
          _init: function() {
            heartbeat = $window.Heartbeat;
            $timeout(function () {
              heartbeat.on('bpm', function (bpm) {
                $rootScope.$emit('$cordovaHeartbeat:bpm', bpm);
              });
              heartbeat.on('percentage', function (percentage) {
                $rootScope.$emit('$cordovaHeartbeat:progress', percentage);
              });
              heartbeat.on('graph', function (graph) {
                $rootScope.$emit('$cordovaHeartbeat:graphUpdate', graph);
              });
              heartbeat.on('status', function (status) {
                $rootScope.$emit('$cordovaHeartbeat:statusChange', status);
              });
              heartbeat.on('warning', function (warning) {
                $rootScope.$emit('$cordovaHeartbeat:warning', warning);
              });
              heartbeat.on('error', function (error) {
                $rootScope.$emit('$cordovaHeartbeat:error', error);
              });
              heartbeat.on('hrv', function (hrv) {
                $rootScope.$emit('$cordovaHeartbeat:hrv', hrv);
              });
            });
          },
          start: function() {
            _init();
            var q = $q.defer();
            heartbeat.start();
            q.resolve(heartbeat);
            return q.promise;
          },
          stop: function() {
            var q = $q.defer();
            if (heartbeat === undefined) {
              q.reject(new Error('start must be called before any other operation'));
            } else {
              heartbeat.stop();
              q.resolve(heartbeat);
            }
            return q.promise;
          }
        };
      }]);
     angular.module('ngCordova.plugins').requires.push('ngCordova.plugins.heartbeat');
   }
  } finally { }
})();
