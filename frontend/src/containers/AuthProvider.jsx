/**
    @author: Anthony D'Alesandro
*/
import { useEffect } from "react"
import { Provider, useDispatch } from 'react-redux'
import { store } from "../redux/store";
import { refreshUser } from "../redux/commands";

// allows children components to access user and isAuthenicated
// eslint-disable-next-line react/prop-types
export const AuthProvider = ({children}) => {
    return (
        <Provider store={store}>
            <FetchUser/>
            {children}
        </Provider>
    )
}

// fetches the user on a page grab. token lasts ~2hr
const FetchUser = () => {
    const dispatch = useDispatch();

    // dispatches a request to fetch the user. updates state.loading in redux/store.js
    useEffect(() => {
        const fetchUser = async () => {
            await dispatch(refreshUser());
        }
        fetchUser().then().catch();
    }, [dispatch]) // anytime dispatch updates (the state updates), the user is fetched again. Might be better to prevent that dependency?

    return (<></>)
}