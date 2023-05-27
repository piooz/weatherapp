import React from 'react';
import ReactDOM from 'react-dom';
import Forecast from './components/Forecast';

const baseURL = process.env.ENDPOINT;
const geoAPI = navigator.geolocation;

const getWeatherFromApi = async (longitude, latitude) => {
  try {
    const response = await fetch(`${baseURL}/weather?lat=${longitude}&lon=${latitude}`);
    return response.json();
  } catch (error) {
    console.error(error);
  }

  return {};
};

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lon: '',
      lat: '',
      icon: '',
      main: '',
      description: '',
    };
  }

  async componentDidMount() {
    geoAPI.getCurrentPosition(this.getGeoSuccess, this.getGeoError, { enableHighAccuracy: false });
  }

  getGeoSuccess = async (geolocationPosition) => {
    const weather = await getWeatherFromApi(geolocationPosition.coords.longitude,
      geolocationPosition.coords.latitude);

    this.setState({
      icon: weather.icon.slice(0, -1),
      lon: geolocationPosition.coords.longitude,
      lat: geolocationPosition.coords.latitude,
      main: weather.main,
      description: weather.description,
    });
  };

  getGeoError = async () => {
    this.setState({ icon: '' });
  };

  render() {
    const {
      icon, lon, lat, main, description,
    } = this.state;

    return (
      icon !== ''
        ? (
          <>
            <div className="icon">
              { icon && <img src={`/img/${icon}.svg`} alt="weather status icon" />}
              <h2>{`Now: ${main}`}</h2>
              <p>{description}</p>
            </div>
            <Forecast longitude={lon} latitude={lat} />
          </>
        )
        : <div><h1>Click allow geolocation to get current weather information 🫠</h1></div>
    );
  }
}

ReactDOM.render(
  <Weather />,
  document.getElementById('app'),
);
