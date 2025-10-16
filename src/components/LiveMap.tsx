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

const LiveMap = () => {
  return (
    <div></div>
  )
}

export default LiveMap