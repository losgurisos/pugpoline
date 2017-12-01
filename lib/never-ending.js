var NeverEnding = {}

NeverEnding.getNeverEndingFactor = function (baseValue, tendsToValue, aceleration) {

  // set defaults pameters
  baseValue = baseValue || 0;
  tendsToValue = tendsToValue || 1;
  aceleration = aceleration || 1;

  function NeverEndingFactor (baseValue, tendsToValue, aceleration){
    var b = baseValue;
    var t = tendsToValue;
    var m = 1000/aceleration;

    // calculate value for specific number
    this.getValueFor = function(x){
        return ((m/(-x-m))+1)*(t-b)+b
    }
  }

  return new NeverEndingFactor(baseValue, tendsToValue, aceleration);

}
