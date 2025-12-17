import { useISSLocation } from "./hooks/useISSLocation";
import LiveMap from "./components/LiveMap";
import LiveData from "./components/LiveData";

const App = () => {
    const {
        latitude,
        longitude,
        timestamp,
        error,
        loading,
    } = useISSLocation(5000);

    if(loading && !latitude) return <p>Loading...</p>;

  return (
    <div className="container">
        <h1 className="title">International Space Station</h1>

        {error ? (
            <p style={{color: "red"}}>{error}</p>
            ) : (
                <LiveData latitude={latitude} longitude={longitude} timestamp={timestamp} />
            )}

            <div className="map-container">
                <LiveMap latitude={latitude} longitude={longitude} />
            </div>
        
    </div>
  )
}

export default App