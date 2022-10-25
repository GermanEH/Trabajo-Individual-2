// const { API_KEY } = process.env;
// // ?api_key=${API_KEY}

const NAME = "thedogapi",
DOMAIN = `https://api.${NAME}.com`,
API = `${DOMAIN}/v1`,
BREEDS = `${API}/breeds`,
SEARCH = `${BREEDS}/search?q=`;

module.exports = {
    NAME,
    DOMAIN,
    API,
    BREEDS,
    SEARCH
}

