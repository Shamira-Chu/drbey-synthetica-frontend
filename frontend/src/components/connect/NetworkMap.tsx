'use client';

import React, { useEffect, useState } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
  useMap,
} from '@vis.gl/react-google-maps';
import { Team } from '@/types';

interface NetworkMapProps {
  teams: Team[];
  selectedTeamId: string | null;
  onSelectTeam: (teamId: string) => void;
}

// Ultra Dark Cyberpunk Google Maps Theme Style
const DARK_CYBERPUNK_MAP_STYLE = [
  { elementType: 'geometry', stylers: [{ color: '#090a18' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#090a18' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#8b9bb4' }] },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#00f0ff' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#6b7280' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#0e122b' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#1a1f3d' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#0d1024' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#2a1a40' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#160928' }],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#141833' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#04050d' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#3d4b68' }],
  },
];

// Helper Component to draw Polyline connections on Google Map
const MapLines: React.FC<{ teams: Team[] }> = ({ teams }) => {
  const map = useMap();

  useEffect(() => {
    const win = typeof window !== 'undefined' ? (window as unknown as { google?: typeof google }) : null;
    if (!map || !win?.google || !win.google.maps) return;

    // Filter valid team coordinates
    const coords = teams
      .map((t) => t.location)
      .filter((loc): loc is { lat: number; lng: number } => !!loc);

    if (coords.length < 2) return;

    // Draw connecting lines between Brazil derby hubs
    const line = new win.google.maps.Polyline({
      path: coords,
      geodesic: true,
      strokeColor: '#FF2E97',
      strokeOpacity: 0.65,
      strokeWeight: 2,
      map: map,
    });

    return () => {
      line.setMap(null);
    };
  }, [map, teams]);

  return null;
};

export const NetworkMap: React.FC<NetworkMapProps> = ({
  teams,
  selectedTeamId,
  onSelectTeam,
}) => {
  const apiKey =
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ||
    'AIzaSyBptjzmCGBd1OQYHIRnFLEU13ANtOKuMuE';

  const [activeInfoWindowId, setActiveInfoWindowId] = useState<string | null>(
    selectedTeamId
  );

  useEffect(() => {
    setActiveInfoWindowId(selectedTeamId);
  }, [selectedTeamId]);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-cyan-500/30 bg-[#050611] shadow-[0_0_30px_rgba(0,240,255,0.15)]">
      {/* Header bar */}
      <div className="px-6 py-3 bg-[#0a0c20]/90 backdrop-blur-md border-b border-white/10 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-cyan-300 font-bold tracking-widest uppercase">
            REDE NACIONAL INTERATIVA (GOOGLE MAPS API)
          </span>
        </div>
        <span className="text-slate-400">{teams.length} POLOS CONECTADOS</span>
      </div>

      {/* Google Map Container */}
      <div className="relative w-full h-[380px] sm:h-[460px]">
        <APIProvider apiKey={apiKey}>
          <Map
            defaultCenter={{ lat: -22.5, lng: -47.0 }}
            defaultZoom={5}
            mapId="DEMO_MAP_ID"
            styles={DARK_CYBERPUNK_MAP_STYLE}
            internalUsageAttributionIds={["gmp_mcp_codeassist_v1_aistudio"]}
            disableDefaultUI={false}
            zoomControl={true}
            className="w-full h-full"
          >
            <MapLines teams={teams} />

            {teams.map((team) => {
              if (!team.location) return null;
              const isSelected = selectedTeamId === team.id;

              return (
                <React.Fragment key={team.id}>
                  <AdvancedMarker
                    position={team.location}
                    onClick={() => {
                      onSelectTeam(team.id);
                      setActiveInfoWindowId(team.id);
                    }}
                    title={team.name}
                  >
                    <div
                      className={`relative flex items-center justify-center cursor-pointer group transition-transform duration-300 ${
                        isSelected ? 'scale-125 z-30' : 'hover:scale-110 z-10'
                      }`}
                    >
                      {/* Pulsing ring */}
                      <span
                        className={`absolute w-8 h-8 rounded-full transition-all ${
                          isSelected
                            ? 'bg-pink-500/40 animate-ping'
                            : 'bg-cyan-500/20 group-hover:animate-ping'
                        }`}
                      />

                      {/* Custom Cyberpunk Pin */}
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center font-mono text-[10px] font-bold shadow-lg transition-all ${
                          isSelected
                            ? 'bg-gradient-to-r from-pink-500 to-purple-600 border-white text-white shadow-[0_0_20px_rgba(255,46,151,0.9)]'
                            : 'bg-[#0a0c20] border-cyan-400 text-cyan-300 group-hover:border-pink-400 group-hover:text-white'
                        }`}
                      >
                        {team.state}
                      </div>
                    </div>
                  </AdvancedMarker>

                  {/* InfoWindow for Active/Selected Team */}
                  {activeInfoWindowId === team.id && (
                    <InfoWindow
                      position={team.location}
                      onCloseClick={() => setActiveInfoWindowId(null)}
                    >
                      <div className="p-2 max-w-xs text-black font-mono space-y-1">
                        <div className="text-[11px] font-bold text-pink-600 uppercase">
                          {team.alias} — {team.city}
                        </div>
                        <h4 className="text-sm font-bold">{team.name}</h4>
                        <p className="text-[11px] text-gray-700 line-clamp-2">
                          {team.description}
                        </p>
                        <div className="pt-1 text-[10px] text-cyan-700 font-semibold">
                          {team.rosterCount} atletas · {team.homeTrack}
                        </div>
                      </div>
                    </InfoWindow>
                  )}
                </React.Fragment>
              );
            })}
          </Map>
        </APIProvider>
      </div>
    </div>
  );
};
