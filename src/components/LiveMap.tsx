import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import L from "leaflet"
import { useEffect } from "react"
import "leaflet/dist/leaflet.css"
import sateliteIcon from "../assets/img/Icon.png"

interface LiveMapProps {
    latitude: number
    longitude: number
}

const RecenterMap = ({ latitude, longitude }: { latitude: number; longitude: number }) => {
    const map = useMap()

    useEffect(() => {
        map.setView([latitude, longitude], map.getZoom(), { animate: true })
    }, [latitude, longitude, map])

    return null
}

const issIcon = new L.DivIcon({
    html: `<div class="iss-icon-wrapper"><img src=${sateliteIcon} alt="ISS"/><div>`,
    className: "",
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20],
})

const LiveMap = ({ latitude, longitude }: LiveMapProps) => {
  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={5}
      minZoom={2}
      maxZoom={10}
      scrollWheelZoom={true}
      className="map-wrapper"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <Marker position={[latitude, longitude]} icon={issIcon}>
          <Popup>
            <h1>ISS is here!</h1><br/>
            <h3>Latitude: {latitude.toFixed(2)}</h3>
            <h3>Longitude: {longitude.toFixed(2)}</h3>
          </Popup>
        </Marker>
        <RecenterMap latitude={latitude} longitude={longitude}/>
    </MapContainer>
  )
}

export default LiveMap