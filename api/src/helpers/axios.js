import axios from 'axios';

export const axiosFunction = async (props) => {
  let { url, cbSuccess, arr, id } = props;
  try {
    const response = await axios.get(url);
    cbSuccess(response);
  } catch (error) {
    return { error: error.message }; //desde acá podría manejar de forma centralizada los errores de las peticiones axios (incluso con mensaje personalizado)
  } finally {
    //le da agilidad a la declaración de peticiones
    console.log('done');
  }
};
