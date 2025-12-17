import { useEffect, useReducer } from "react"
import axios from "axios"
import LiveMap from "./components/LiveMap"

interface ISSState {
    latitude: number
    longitude: number
    timestamp: number
    error: string | null    
}

type ISSAction =
    | { type: "SET_DATA"; payload: { latitude: number; longitude: number; timestamp: number } }
    | { type: "SET_ERROR"; payload: string}

const issReducer = (state: ISSState, action: ISSAction): ISSState => {
    switch (action.type) {
        case "SET_DATA":
            return { ...state, ...action.payload, error: null }
        case "SET_ERROR":
            return { ...state, error: action.payload }
        default:
            return state
    }
}

const App = () => {
    const [state, dispatch] = useReducer(issReducer, {
        latitude: 0,
        longitude: 0,
        timestamp: 0,
        error: null,
    })

    const fetchISS = async () => {
        try {
            const res = await axios.get("https://api.wheretheiss.at/v1/satellites/25544")
            const data = res.data
            console.log(res);            

            dispatch({
                type: "SET_DATA",
                payload: {
                    latitude: data.latitude,
                    longitude: data.longitude,
                    timestamp: data.timestamp,
                }
            })
        } catch (err) {
            dispatch({
                type: "SET_ERROR",
                payload: "Failed to fetch ISS location"
            })
        }
    }

    useEffect(() => {
        fetchISS()
        const interval = setInterval(fetchISS, 5000)
        return () => clearInterval(interval)
    }, [])

  return (
    <div className="container">
        <h1 className="title">International Space Station</h1>

        {state.error ? (
            <p style={{color: "red"}}>{state.error}</p>
            ) : (
                <>
                    <p>Latitude: {state.latitude.toFixed(4)}</p>
                    <p>Longitude: {state.longitude.toFixed(4)}</p>
                    <p>Last Updated: {new Date(state.timestamp * 1000).toLocaleTimeString()}</p>
                </>
            )}

            <div className="map-container">
                <LiveMap latitude={state.latitude} longitude={state.longitude} />
            </div>
        
    </div>
  )
}

export default App