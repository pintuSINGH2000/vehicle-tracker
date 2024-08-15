

const calculateTotalDistance = (route,L) => {
  return route.reduce((acc, cur, idx) => {
    if (idx === 0) return acc;
    return acc + L.latLng(route[idx - 1]).distanceTo(L.latLng(cur));
  }, 0);
};

const interpolatePosition = (from, to, progress) => {
  const lat = from[0] + (to[0] - from[0]) * progress;
  const lng = from[1] + (to[1] - from[1]) * progress;
  return [lat, lng];
};

export const computeRoutePositions = (route, totalPositions,L) => {
  const positions = [];
  const totalDistance = calculateTotalDistance(route,L);

  for (let i = 1; i < route.length; i++) {
    const from = route[i - 1];
    const to = route[i];
    const segmentDistance = L.latLng(from).distanceTo(L.latLng(to));

    const numPositions = Math.ceil(
      (segmentDistance / totalDistance) * totalPositions
    );

    for (let j = 0; j < numPositions; j++) {
      const progress = j / numPositions;
      positions.push({
        position: interpolatePosition(from, to, progress),
        bearing: L.latLng(from).bearingTo(L.latLng(to)),
      });
    }
  }

  return positions;
};
