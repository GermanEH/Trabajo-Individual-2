import axios from 'axios'

export default function helpHTTP () {
    const customAxios = async (endpoint, options) => {
        const defaultHeader = {
            accept: "application/json",
        };
    
        const controller = new AbortController();       //te da el dominio de decidir hasta cuando esperar, y sino ya de inmediato lanzas el mensaje de "servidor no disponible" o lo que sea
        options.signal = controller.signal;             //ganas control sobre el tiempo de respuesta y la falta de comunicación a la API, permite ganar libertad con un plan B para esos casos 
    
        options.method = options.method || "GET";
        options.headers = options.headers
            ? { ...defaultHeader, ...options.headers }
            : defaultHeader;
    
        options.body = JSON.stringify(options.body) || false;
        if (!options.body) delete options.body;
    
        // console.log(options);

        setTimeout(() => controller.abort(), 10000);
    
        return await axios(endpoint, options)
            .then((res) => res, async (res) => 
            {if(!!res.response) {
                await Promise.reject({
                    err: true,
                    status: res.response.status || "00",
                    statusText: res.response.statusText || "Ocurrió un error",
                })
            } else {
                await Promise.reject({
                        err: true,
                        status: "404",
                        statusText: res.message,
                    })
            }})
                // await Promise.reject({
                //     err: true,
                //     status: res.response.status || "00",
                //     statusText: res.response.statusText || "Ocurrió un error",
                // })
            .catch(error => {return error });
        };
    
        const get = (url, options = {}) => customAxios(url, options);
    
        const post = (url, options = {}) => {
        options.method = "POST";
        return customAxios(url, options);
        };
    
        const put = (url, options = {}) => {
        options.method = "PUT";
        return customAxios(url, options);
        };
    
        const del = (url, options = {}) => {
        options.method = "DELETE";
        return customAxios(url, options);
        };
    
        return {
        get,
        post,
        put,
        del,
        };
    };