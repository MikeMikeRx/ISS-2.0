import "./LiveData.css"

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

const LiveData = ({ latitude, longitude, timestamp, altitude, velocity, visibility, solar_lat, solar_lon, daynum }: LiveDataProps) => {
    
    const lighting = ISS_LIGHTING_MAP[visibility ?? ""] ?? {
    label: "Unknown",
    description: "Lighting condition data is not available."
}


    return (
    <div className="wrapper">
        <div className="row-1">
            <div className="column-1">
                <h3>Current Position</h3>
                {longitude !== undefined ? (<p>Latitude: {latitude.toFixed(4)}</p>) : (<p>Latitude data not available.</p>)}
                {longitude !== undefined ? (<p>Longitude: {longitude.toFixed(4)}</p>) : (<p>Longitude data not available.</p>)}
            </div>

            <div className="column-2">
                <h3>Altitude and Velocity</h3>
                {altitude !== undefined ? (<p>Altitude: {altitude.toFixed(2)} km</p>) : (<p>Altitude data not available.</p>)}
                {velocity !== undefined ? (<p>Velocity: {velocity.toFixed(2)} km/h</p>) : (<p>Velocity data not available.</p>)}
            </div>

            <div className="column-3">
                <h3>Visibility</h3>
                <p>Status: <strong>{lighting.label}</strong></p>
                <p className="hint">{lighting.description}</p>
            </div>
        </div>

        <div className="row-2-hidden">
            <div className="column-4">
                <h3>Time Information</h3>
                {daynum !== undefined ? (<p>Julian Day (astronomical time): {daynum}</p>) : (<p>Day number data not available.</p>)}
            </div>

            <div className="column-5">
                <h3>Solar Position</h3>
                {solar_lat !== undefined ? (<p>Solar Latitude: {solar_lat.toFixed(4)}</p>) : (<p>Solar latitude data not available.</p>)}
                {solar_lon !== undefined ? (<p>Solar Longitude: {solar_lon.toFixed(4)}</p>) : (<p>Solar longitude data not available.</p>)}
            </div>
        </div>

        <div className="row-3">
    {timestamp !== undefined ? (<h4>Last Update: {new Date(timestamp * 1000).toLocaleTimeString()}</h4>) : (<p>Timestamp data not available.</p>)}
        </div>
    </div>

    );
};

export default LiveData;