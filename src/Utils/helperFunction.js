export function bearingTo(latLng1, latLng2) {
    const lat1 = latLng1.lat;
    const lon1 = latLng1.lng;
    const lat2 = latLng2.lat;
    const lon2 = latLng2.lng;
  
    const dLon = lon2 - lon1;
  
    const y = Math.sin(dLon) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
    const brng = Math.atan2(y, x);
  
    return (brng * 180 / Math.PI + 360) % 360;
  }