var filtersModule = angular.module('filtersModule', [])

filtersModule.filter('checkmark', function() {
  return function(res) {
    var newRes = res.map(function(item){
      return {category: item.category};
    });
    console.log(newRes)
    return newRes;
  };
});
