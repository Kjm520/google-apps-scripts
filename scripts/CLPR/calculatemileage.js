function calculateMileage(origin, destination) {
  var directions = Maps.newDirectionFinder()
    .setRegion('US')
    .setOrigin(origin)
    .setDestination(destination)
    .getDirections();
  var route = directions.routes[0];
  if (route) {
    var legs = route.legs[0];
    var distance = (legs.distance.value) * 0.000621371;
    return distance;
  }
  else {
    return 'error';
  }
}
