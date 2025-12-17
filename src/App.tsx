import { useISSLocation } from "./hooks/useISSLocation";
import LiveMap from "./components/LiveMap";
import LiveData from "./components/LiveData";

const App = () => {
    const {
        latitude,
        longitude,
        altitude,
        velocity,
        visibility,
        timestamp,
        solar_lat,
        solar_lon,
        daynum,
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
                <LiveData
                    latitude={latitude}
                    longitude={longitude}
                    timestamp={timestamp}
                    altitude={altitude} velocity={velocity}
                    visibility={visibility}
                    solar_lat={solar_lat}
                    solar_lon={solar_lon}
                    daynum={daynum}
                />
            )}

            <div className="map-container">
                <LiveMap latitude={latitude} longitude={longitude} />
            </div>
        
    </div>
  )
}

export default App