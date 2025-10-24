export const config = {
  navitia: {
    apiKey: process.env.NEXT_PUBLIC_NAVITIA_API_KEY || 'your_navitia_api_key_here',
    baseUrl: process.env.NEXT_PUBLIC_NAVITIA_BASE_URL || 'https://api.navitia.io/v1',
  },
  map: {
    center: {
      lat: parseFloat(process.env.NEXT_PUBLIC_MAP_CENTER_LAT || '46.603354'),
      lng: parseFloat(process.env.NEXT_PUBLIC_MAP_CENTER_LNG || '1.888334'),
    },
    defaultZoom: parseInt(process.env.NEXT_PUBLIC_MAP_DEFAULT_ZOOM || '6'),
  },
  sncf: {
    // Base cost per km for regional trains (approximate)
    costPerKm: 0.15,
    // Minimum ticket price
    minTicketPrice: 5,
    // Maximum ticket price for regional trains
    maxRegionalPrice: 50,
  },
}
