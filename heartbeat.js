(function(){
  try {
   if(typeof angular !== 'undefined'){
     angular.module('ngCordova.plugins.heartbeat', [])
      .factory('$cordovaHeartbeat', ['$timeout','$window','$q','$rootScope', function ($timeout, $window, $q, $rootScope) {

        var heartbeat;
        var service = {
          isAvailable: isAvailable,
          start: start,
          stop: stop,
          setPointsForGraph: setPointsForGraph,
          setMeasureTime: setMeasureTime,
        };
        return service;

        function _init() {
          heartbeat = $window.Heartbeat;
          $timeout(function () {
            heartbeat.on('bpm', function (bpm) {
              $rootScope.$emit('$cordovaHeartbeat:bpm', bpm);
            });
            heartbeat.on('progress', function (percentage) {
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
        }

        function isAvailable() {
          return ($window.Heartbeat ? true : false);
        }

        function start() {
          if (!heartbeat) {
            _init();
          }
          var q = $q.defer();
          heartbeat.start();
          q.resolve(heartbeat);
          return q.promise;
        }

        function stop(){
          var q = $q.defer();
          if (!heartbeat) {
            q.reject(new Error('start must be called before any other operation'));
          } else {
            heartbeat.stop();
            q.resolve(heartbeat);
          }
          return q.promise;
        }

        function setPointsForGraph(points) {
          if (!heartbeat) {
            _init();
          }
          heartbeat.setPointsForGraph(points);
        }

        function setMeasureTime(measureTime) {
          if (!heartbeat) {
            _init();
          }
          heartbeat.setMeasureTime(measureTime);
        }

      }]);
     angular.module('ngCordova.plugins').requires.push('ngCordova.plugins.heartbeat');
   }
  } finally { }
})();
