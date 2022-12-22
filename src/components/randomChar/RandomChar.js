import { Component } from "react";
import MarvelService from "./../../services/MarvelService";
import Spinner from "../../Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";

class RandomChar extends Component {
  // creating state
  // creating char obj for each character
  state = {
    char: {},
    loading: true,
    error: false,
  };

  //creating new property inside RandomChar class
  marvelService = new MarvelService();

  // launch update func on mount
  //react lifecycle hook
  componentDidMount() {
    this.updateChar();
    // this.timerId = setInterval(this.updateChar, 10000);
  }
  //react lifecycle hook
  //clear update interval
  componentWillUnmount() {
    clearInterval(this.timerId);
  }
  // method to update character
  // modified for loader
  onCharLoaded = (char) => {
    this.setState({ char, loading: false });
  };
  // method for spinner etc.
  onCharLoading = () => {
    this.setState({ loading: true });
  };

  // 404 error handling
  onError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  };

  // new method server request and pass to state
  // catch error and pass to onError
  updateChar = () => {
    //gen random id with min-max range for id value
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    this.onCharLoading();
    this.marvelService
      .getCharacter(id)
      .then(this.onCharLoaded)
      .catch(this.onError);
  };

  render() {
    // destr
    const { char, loading, error } = this.state;
    // handling error and spinner logic
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const charContent = !(loading || error) ? <View char={char} /> : null;

    // loader and View component added
    return (
      <div className="randomchar">
        {errorMessage} {spinner} {charContent}
        <div className="randomchar__static">
          <p className="randomchar__title">
            Random character for today!
            <br />
            Do you want to get to know him better?
          </p>
          <p className="randomchar__title">Or choose another one</p>
          <button className="button button__main" onClick={this.updateChar}>
            <div className="inner">try it</div>
          </button>
          <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
        </div>
      </div>
    );
  }
}

// simple rendering component
const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki } = char;

  return (
    <div className="randomchar__block">
      <img src={thumbnail} alt="Random character" className="randomchar__img" />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{description}</p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">Homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;
