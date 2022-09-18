import { createContext } from 'react'

const ApiCallsContext = createContext({});

export const ApiCallsProvider = ({ children }) => {

    const apiData = {
        BASE_URL: "http://localhost:3600/api",
    }

    return (
        <ApiCallsContext.Provider value={apiData}>
            {children}
        </ApiCallsContext.Provider>
    )
}

export default ApiCallsContext;