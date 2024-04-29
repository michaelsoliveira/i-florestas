export type LocationType = {
    latitude: number;
    longitude: number;
}

export const getCurrentLocation = (): any => {
    const coords = navigator.geolocation.getCurrentPosition(function success(position: any) {
      const { latitude, longitude } = position.coords

      return {
        latitude,
        longitude
      }
    }, function error() {
      console.log('Error tentando obter a localização')
    })

    return coords
  }