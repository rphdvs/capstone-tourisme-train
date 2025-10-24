import { Destination } from '@/types'

export const sampleDestinations: Destination[] = [
  {
    station: {
      id: '1',
      name: 'Lille',
      coordinates: { lat: 50.629, lng: 3.057 },
      region: 'Hauts-de-France'
    },
    estimatedCost: 65,
    travelTime: 60,
    imageUrl: 'https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    station: {
      id: '2',
      name: 'Nantes',
      coordinates: { lat: 47.218, lng: -1.553 },
      region: 'Pays de la Loire'
    },
    estimatedCost: 70,
    travelTime: 120,
    imageUrl: 'https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    station: {
      id: '3',
      name: 'Strasbourg',
      coordinates: { lat: 48.583, lng: 7.747 },
      region: 'Grand Est'
    },
    estimatedCost: 85,
    travelTime: 90,
    imageUrl: 'https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    station: {
      id: '4',
      name: 'Bordeaux',
      coordinates: { lat: 44.837, lng: -0.579 },
      region: 'Nouvelle-Aquitaine'
    },
    estimatedCost: 95,
    travelTime: 180,
    imageUrl: 'https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    station: {
      id: '5',
      name: 'Lyon',
      coordinates: { lat: 45.764, lng: 4.835 },
      region: 'Auvergne-Rhône-Alpes'
    },
    estimatedCost: 110,
    travelTime: 120,
    imageUrl: 'https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    station: {
      id: '6',
      name: 'Marseille',
      coordinates: { lat: 43.296, lng: 5.369 },
      region: 'Provence-Alpes-Côte d\'Azur'
    },
    estimatedCost: 125,
    travelTime: 180,
    imageUrl: 'https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    station: {
      id: '7',
      name: 'Nice',
      coordinates: { lat: 43.71, lng: 7.261 },
      region: 'Provence-Alpes-Côte d\'Azur'
    },
    estimatedCost: 140,
    travelTime: 240,
    imageUrl: 'https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    station: {
      id: '8',
      name: 'Toulouse',
      coordinates: { lat: 43.604, lng: 1.444 },
      region: 'Occitanie'
    },
    estimatedCost: 105,
    travelTime: 150,
    imageUrl: 'https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    station: {
      id: '9',
      name: 'Montpellier',
      coordinates: { lat: 43.61, lng: 3.876 },
      region: 'Occitanie'
    },
    estimatedCost: 130,
    travelTime: 180,
    imageUrl: 'https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    station: {
      id: '10',
      name: 'Rennes',
      coordinates: { lat: 48.117, lng: -1.677 },
      region: 'Bretagne'
    },
    estimatedCost: 75,
    travelTime: 90,
    imageUrl: 'https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
]

export const ITEMS_PER_PAGE = 4
