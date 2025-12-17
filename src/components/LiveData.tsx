import "./LiveData.css"
import { useState } from "react";
import { julianToUTC } from "../utils/timeUtils.ts";

interface LiveDataProps {
    latitude: number;
    longitude: number;
    timestamp: number;
    altitude?: number;
    velocity?: number;
    visibility?: string;
    solar_lat?: number;
    solar_lon?: number;
    daynum?: number;
}

const ISS_LIGHTING_MAP: Record<string, {label: string; description: string}> = {
    "daylight": {
        label: "Sunlit", 
        description: "The ISS is illuminated by the Sun."
    },
    "eclipsed": {
        label: "In Earth's Shadow",
        description: "The ISS is currently passing through Earth's shadow."
    },
};

const LiveData = ({
    latitude,
    longitude,
    timestamp,
    altitude,
    velocity,
    visibility,
    solar_lat,
    solar_lon,
    daynum }: LiveDataProps) => {
        
    const [showAdvanced, setShowAdvanced] = useState(false);
    
    const lighting = ISS_LIGHTING_MAP[visibility ?? ""] ??
        {
            label: "Unknown",
            description: "Lighting condition data is not available."
        }


    return (
    <div className="wrapper">
        <div className="row-1">
            <div className="column-1">
                <h3>Current Position</h3>
                {latitude !== undefined ? (<p>Latitude: {latitude.toFixed(4)}</p>)
                    : (<p>Latitude data not available.</p>)
                }
                {longitude !== undefined ? (<p>Longitude: {longitude.toFixed(4)}</p>)
                    : (<p>Longitude data not available.</p>)
                }
            </div>

            <div className="column-2">
                <h3>Altitude and Velocity</h3>
                {altitude !== undefined ? (<p>Altitude: {altitude.toFixed(2)} km</p>)
                    : (<p>Altitude data not available.</p>)
                }
                {velocity !== undefined ? (<p>Velocity: {velocity.toFixed(2)} km/h</p>)
                    : (<p>Velocity data not available.</p>)
                }
            </div>

            <div className="column-3">
                <h3>Visibility</h3>
                <p>
                    Status: {" "}
                    <strong
                        className={`lighting-status ${visibility === "daylight" ? "sunlit" : "eclipsed" }`}
                    >
                        {lighting.label}
                    </strong>
                </p>

                <p className="hint">{lighting.description}</p>
            </div>
        </div>

        <div className={`advanced-container ${showAdvanced ? "open" : ""}`}>
            <div className="row-2-hidden">
                <div className="column-4">
                    <h3>Time Information</h3>
                    {daynum !== undefined ? (
                        <div className="astronomical-info">
                            <p>
                                <strong>Julian Day (Astronomical Time):</strong> {daynum.toFixed(7)}
                            </p>
                            <p>
                                <strong>UTC Time (Formatted):</strong> {julianToUTC(daynum)}
                            </p>
                        </div>
                    ) : (
                        <p>Day number data not available.</p>
                    )}
                </div>

                <div className="column-5">
                    <h3>Solar Position</h3>
                    {solar_lat !== undefined
                        ? (<p>Solar Latitude: {solar_lat.toFixed(4)}</p>)
                        : (<p>Solar latitude data not available.</p>)
                    }
                    {solar_lon !== undefined
                        ? (<p>Solar Longitude: {solar_lon.toFixed(4)}</p>)
                        : (<p>Solar longitude data not available.</p>)
                    }
                </div>
            </div>
        </div>

        <div className="row-3">
            <div className="row-3-content">
                <button className="advanced-toggle" onClick={() => setShowAdvanced(!showAdvanced)}>
                    {showAdvanced ? "Hide Advanced Info" : "Show Advanced Info"}
                </button>
            
                {timestamp !== undefined 
                    ? (<h4>Last Update: {new Date(timestamp * 1000).toLocaleTimeString()}</h4>)
                    : (<p>Timestamp data not available.</p>)
                }
            </div>
        </div>
    </div>

    );
};

export default LiveData;