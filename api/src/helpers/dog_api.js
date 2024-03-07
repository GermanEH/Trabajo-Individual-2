// const { API_KEY } = process.env;
// // ?api_key=${API_KEY}

const NAME = 'thedogapi',
  DOMAIN = `https://api.${NAME}.com`,
  API = `${DOMAIN}/v1`,
  BREEDS = `${API}/breeds`,
  IMAGES = `${API}/images`,
  SEARCH = `${BREEDS}/search?q=`;
(SEARCHIMAGE = `${IMAGES}/search?id=`),
  (module.exports = {
    NAME,
    DOMAIN,
    API,
    BREEDS,
    IMAGES,
    SEARCH,
    SEARCHIMAGE,
  });
