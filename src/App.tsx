import { useState, useEffect, useReducer } from "react"
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
            const res = await axios.get("http://api.open-notify.org/iss-now.json")
            const data = res.data

            dispatch({
                type: "SET_DATA",
                payload: {
                    latitude: Number(data.iss_position.latitude),
                    longitude: Number(data.iss_position.longitude),
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

  return (
    <div>App</div>
  )
}

export default App