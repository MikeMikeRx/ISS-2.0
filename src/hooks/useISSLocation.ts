import { useReducer, useEffect, useCallback } from "react";
import axios from "axios";

interface ISSState {
    latitude: number;
    longitude: number;
    timestamp: number;
    error: string | null;
    loading: boolean
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
};

export const useISSLocation = (intervalMs: number = 5000) => {
    const [state, dispatch] = useReducer(issReducer, {
        latitude: 0,
        longitude: 0,
        timestamp: 0,
        error: null,
        loading: true,
    });

    const fetchISS = useCallback(async () => {
        try {
            const res = await axios.get("https://api.wheretheiss.at/v1/satellites/25544");
            dispatch({
                type: "SET_DATA",
                payload: {
                    latitude: res.data.latitude,
                    longitude: res.data.longitude,
                    timestamp: res.data.timestamp,
                },
            });
        } catch (err) {
            dispatch({
                type: "SET_ERROR",
                payload: "Failed to fetch ISS location"
            });
        }
    }, []);

    useEffect(() => {
        fetchISS()
        const interval = setInterval(fetchISS, intervalMs)
        return () => clearInterval(interval)
    }, [intervalMs, fetchISS]);

    return state;
};