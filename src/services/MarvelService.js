// creating plain JS class without React

// fetch resources
// handling errors
// returns json object
class MarvelService {
  // optimizing API usage
  _apiBase = "https://gateway.marvel.com:443/v1/public/";
  _apiKey = "apikey=0035f282508bc66b43767a3b05726668";

  getResources = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return await res.json();
  };

  // API requests

  // All Characters
  getAllCharacters = () => {
    return this.getResources(
      `${this.apiBase}characters?limit=9&offset=205&${this._apiKey}`
    );
  };
  // One Character by id
  getCharacter = (id) => {
    return this.getResources(`${this.apiBase}characters/${id}?${this._apiKey}`);
  };
}

export default MarvelService;
