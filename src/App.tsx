import { useState, useEffect } from "react"
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

const App = () => {
  return (
    <div>App</div>
  )
}

export default App