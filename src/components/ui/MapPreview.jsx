import React from 'react';
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Map continent names from topojson to our regions
const getRegionName = (geo) => {
  const continent = geo.properties.continent || geo.properties.REGION_UN;
  if (!continent) return null;
  
  if (continent.includes("Asia")) return "Asia";
  if (continent.includes("Europe")) return "Europe";
  if (continent.includes("Africa")) return "Africa";
  if (continent.includes("Americas") || continent.includes("America")) return "Americas";
  if (continent.includes("Oceania")) return "Oceania";
  return null;
};

export function MapPreview({ coordinates, destinationName, interactiveWorld = false, hoveredRegion = null, onRegionHover = null, onRegionClick = null }) {
  if (!interactiveWorld && (!coordinates || typeof coordinates.lat === 'undefined' || typeof coordinates.lng === 'undefined')) {
    return (
      <div className="h-64 bg-stone/10 rounded-2xl flex items-center justify-center border border-stone/20">
        <p className="text-stone font-medium">Map data not available</p>
      </div>
    );
  }

  // Projection config depends on mode
  const projectionConfig = interactiveWorld ? {
    scale: 140,
    center: [0, 20]
  } : {
    scale: 400,
    center: [coordinates.lng, coordinates.lat]
  };

  const mapBgClass = interactiveWorld ? "bg-[#aadaff]" : "bg-[#f8f9fa]";
  const landColor = interactiveWorld ? "#cae0b8" : "#E4D9C4";
  const hoverColor = interactiveWorld ? "#ffea8c" : "#D4B483";
  const strokeColor = interactiveWorld ? "#ffffff" : "#FAF7F0";

  return (
    <div className={`${mapBgClass} rounded-2xl overflow-hidden border border-stone/20 relative ${interactiveWorld ? 'w-full h-full' : 'h-64 sm:h-80'}`}>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={projectionConfig}
        width={800}
        height={400}
        style={{ width: "100%", height: "100%" }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const region = getRegionName(geo);
              const isHoveredRegion = interactiveWorld && hoveredRegion === region && region !== null;
              
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={isHoveredRegion ? hoverColor : landColor}
                  stroke={strokeColor}
                  strokeWidth={0.5}
                  onMouseEnter={() => interactiveWorld && onRegionHover && onRegionHover(region)}
                  onMouseLeave={() => interactiveWorld && onRegionHover && onRegionHover(null)}
                  onClick={() => interactiveWorld && onRegionClick && region && onRegionClick(region)}
                  style={{
                    default: { outline: "none", transition: "all 0.3s" },
                    hover: { fill: hoverColor, outline: "none", cursor: interactiveWorld && region ? "pointer" : "default" },
                    pressed: { outline: "none" }
                  }}
                />
              );
            })
          }
        </Geographies>
        {!interactiveWorld && coordinates && (
          <Marker coordinates={[coordinates.lng, coordinates.lat]}>
            <circle r={6} fill="#B08D57" stroke="#FAF7F0" strokeWidth={2} />
            <circle r={14} fill="#B08D57" opacity={0.3} className="animate-pulse" />
          </Marker>
        )}
      </ComposableMap>
      
      {!interactiveWorld && destinationName && (
        <div className="absolute bottom-4 left-4 bg-ivory/90 backdrop-blur px-4 py-2 rounded-lg shadow-sm font-medium text-sm text-charcoal">
          {destinationName}
        </div>
      )}
    </div>
  );
}
