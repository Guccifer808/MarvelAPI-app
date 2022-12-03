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
  getAllCharacters = async () => {
    const res = await this.getResources(
      `${this._apiBase}characters?limit=9&offset=205&${this._apiKey}`
    );
    // receiving obj and mapping
    return res.data.results.map(this._transformCharacter);
  };
  // One Character by id
  // improved w saving into const and async
  getCharacter = async (id) => {
    const res = await this.getResources(
      `${this._apiBase}characters/${id}?${this._apiKey}`
    );

    return this._transformCharacter(res.data.results[0]);
  };

  // method to transform response obj into more suitable for us object to work w updateChar()
  _transformCharacter = (char) => {
    return {
      name: char.name,
      description: char.description,
      thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
    };
  };
}

export default MarvelService;
