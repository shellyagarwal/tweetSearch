angular.module('appname')
.controller('HomeCtrl', [ '$scope', '$http', '$timeout', '$mdToast', 'mzFunctions', function($scope, $http, $timeout, $mdToast, mzFunctions){

	$scope.showLoading = false;

	$scope.fetchTweets = function(){
		$scope.showLoading = true;
		if ($scope.hashTag != undefined && $scope.hashTag != ""){
			$http.post('/api/tags', {name: $scope.hashTag}).then(function(resp){
				$scope.tagId = resp.data.id;
				$http.get('/api/tags/'+$scope.tagId+'/tweets').then(function(res){
					$scope.tweets = res.data;
					$scope.showLoading = false;
					$timeout($scope.fetchNewTweets, 15000);
				});
			}).catch(function(res){
				mzFunctions.showNoty(res.data.message, 'error');
				$scope.showLoading = false;
			});
		}
		else{
			mzFunctions.showNoty('Field is empty', 'error');
			$scope.showLoading = false;
		}
	};

	function showToast(){
		$mdToast.show(
			$mdToast.simple()
			.textContent($scope.newTweets.length+" new tweets")
			.action('Show')
			.highlightAction(true)
			.position('top right')
			.hideDelay(10000)
			).then(function(response) {
				if ( response == 'ok' ) {
					$scope.tweets = $scope.newTweets.concat($scope.tweets);
					$scope.newTweets = [];
					mzFunctions.scrollToTop();
				}
			});
		}

		$scope.fetchNewTweets = function(){
			$http.get('/api/tags/'+$scope.tagId+'/tweets/fresh').then(function(res){
				if(res.data.length > 0){
					$scope.newTweets = res.data.concat($scope.newTweets);
					showToast();
				}
				$timeout($scope.fetchNewTweets, 15000);
			});
		};

	}]);