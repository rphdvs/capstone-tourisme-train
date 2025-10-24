# 🚂 Capstone Tourisme Train

A prototype web application for discovering affordable train destinations within your budget, promoting sustainable and local tourism.

## 🎯 Features

- **Budget-based destination discovery**: Enter your maximum travel budget and see which destinations are reachable
- **Interactive map**: Visualize destinations using Leaflet with OpenStreetMap tiles
- **Cost estimation**: Smart algorithm based on SNCF open data and distance calculations
- **Touristic POI integration**: Discover points of interest around destinations
- **Modern UI**: Clean, responsive design with TailwindCSS

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Mapping**: Leaflet + React-Leaflet + OpenStreetMap
- **State Management**: React Query (TanStack Query)
- **API Integration**: Navitia.io for multimodal travel data

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Navitia.io API key (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd capstone-tourisme-train
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_NAVITIA_API_KEY=your_navitia_api_key_here
   NEXT_PUBLIC_NAVITIA_BASE_URL=https://api.navitia.io/v1
   NEXT_PUBLIC_MAP_CENTER_LAT=46.603354
   NEXT_PUBLIC_MAP_CENTER_LNG=1.888334
   NEXT_PUBLIC_MAP_DEFAULT_ZOOM=6
   ```

4. **Get a Navitia API key**
   - Visit [Navitia.io](https://navitia.io/)
   - Sign up for a free account
   - Get your API key from the dashboard
   - Add it to your `.env.local` file

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/          # React components
├── lib/                 # Utilities and API clients
├── types/               # TypeScript type definitions
└── data/                # Static data files (CSV, Excel)
```

## 🗺️ Data Sources

The project includes several French tourism and transport datasets:

- **SNCF Stations**: `gares-de-voyageurs.csv`
- **Train Schedules**: `horaires-sncf.csv`
- **Tourism POIs**: `etablissements-labellises-qualite-tourisme.csv`
- **Cultural Events**: `festivals-global-festivals-pl.csv`
- **Heritage Sites**: `entreprises-du-patrimoine-vivant-epv.csv`

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Key Components

- **BudgetInput**: User budget input with validation
- **MapView**: Interactive map with destination markers
- **NavitiaAPI**: Integration with Navitia.io for travel data

## 🌍 API Integration

### Navitia.io
- **Purpose**: Multimodal travel planning and real-time data
- **Coverage**: France and international transport networks
- **Rate Limits**: Free tier includes 1000 requests/day

### Cost Estimation Algorithm
The app uses a heuristic-based approach:
- Base cost per kilometer: €0.15
- Minimum ticket price: €5
- Maximum regional price: €50
- Distance-based calculation with reasonable bounds

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Self-hosting
1. Build the application: `npm run build`
2. Start the production server: `npm run start`
3. Configure reverse proxy (nginx/Apache) if needed

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Navitia.io](https://navitia.io/) for travel data API
- [SNCF Open Data](https://data.sncf.com/) for French rail data
- [OpenStreetMap](https://www.openstreetmap.org/) for map tiles
- [data.gouv.fr](https://www.data.gouv.fr/) for French tourism datasets