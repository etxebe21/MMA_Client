import * as Keychain from 'react-native-keychain';
import axios from 'axios';
import { setSecureValue,setSecureValueRefresh} from '../keychain';

export const axiosInstance = axios.create({ baseURL: 'https://mmaproject-app.fly.dev' });

const axiosInit = async () => {
    const url = 'https://mmaproject-app.fly.dev/api/users/token'; //FLY 


    const refreshAccessToken = async (refreshToken) => {
        const refreshedToken = await axios.post(url, { token: refreshToken });
        console.log(refreshedToken);
        return refreshedToken;
    }

    console.log("INICIAMOS AXIOS INSTACE");
    // Implementing an Axios interceptor for automatic token refresh

    axiosInstance.interceptors.response.use(
        (response) => response,
        async (error) => {
            if (error.response && error.response.status === 401 || error.response && error.response.status === 403) {
                // Access token has expired, refresh it
                try {
                    console.log("Entramos una vez ha caducado el token");
                    const credentials = await Keychain.getGenericPassword({ service: 'myAppRefresh' });
                    console.log("CREDENTIALS", credentials);
                    const token = credentials?.password;
                    console.log("TOKEN interceptors" + token);
                    const newAccessToken = await refreshAccessToken(token);
                    console.log("NEW ACCESS TOKEN", newAccessToken.data.newToken.accessToken);
                    setSecureValue(newAccessToken.data.newToken);
                    setSecureValueRefresh(newAccessToken.data.newToken);
                    const credentials1 = await Keychain.getGenericPassword({ service: 'myApp' });
                    const token1 = credentials1?.password;
                    //console.log("TOKEN DESPUES DE LOGIN", token1);
                    // Update the request headers with the new access token
                    error.config.headers['Authorization'] = `Bearer ${token1}`;
                    // Retry the original request                                   
                    return axiosInstance(error.config);
                } catch (refreshError) {
                    // Handle token refresh error
                    throw refreshError;
                }
            }
            return Promise.reject(error);
        }
    );

    // Add global request interceptor
    axiosInstance.interceptors.request.use(
        async (config) => {
            // Obtener el token JWT del almacenamiento seguro

            const credentials = await Keychain.getGenericPassword({ service: 'myApp' });
            const token = credentials?.password;
            //console.log("TOKEN DESPUES DE LOGIN", token);
            if (token != null) {
                // Modify request config here, e.g., add headers
                config.headers['Authorization'] = `Bearer ${token}`;
            }


            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
}

export default axiosInit