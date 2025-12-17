interface LiveDataProps {
    latitude: number;
    longitude: number;
    timestamp: number;
}

const LiveData = ({ latitude, longitude, timestamp }: LiveDataProps) => (
    <div className="iss-data">
        <p>Latitude: {latitude.toFixed(4)}</p>
        <p>Longitude: {longitude.toFixed(4)}</p>
        <p>Last Updated: {new Date(timestamp * 1000).toLocaleTimeString()}</p>
    </div>
);

export default LiveData;