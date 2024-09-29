

const calculateTotalTime = (totalPositions,L) => {
  const startTime = new Date(totalPositions[0].timestamp);
  const endTime = new Date(totalPositions[totalPositions.length - 1].timestamp);
  const timeDiffMs = endTime - startTime;
  const timeDiffSeconds = timeDiffMs / 1000;
  return timeDiffSeconds;
};

const interpolatePosition = (from, to, progress) => {
  const lat = from.latitude + (to.latitude - from.latitude) * progress;
  const lng = from.longitude + (to.longitude - from.longitude) * progress;
  return [lat, lng];
};

export const computeRoutePositions = (route, totalPositions,L) => {
  const positions = [];
  const totalTime = calculateTotalTime(route,L);

  for (let i = 1; i < route.length; i++) {
    const from = route[i - 1];
    const to = route[i];
    const startTime = new Date(from.timestamp);
    const endTime = new Date(to.timestamp);
    const timeDiffMs = endTime - startTime;
    const timeDiffSeconds = timeDiffMs / 1000;

    const timeInterval = Math.ceil(
      (timeDiffSeconds / totalTime) * totalPositions
    );
    for (let j = 0; j < timeInterval; j++) {
      const progress = j / timeInterval;
      positions.push({
        position: interpolatePosition(from, to, progress),
        bearing: L.latLng([from.latitude,from.longitude]).bearingTo(L.latLng([to.latitude,to.longitude])),
        timeDiffSeconds
      });
    }
  }

  return positions;
};
