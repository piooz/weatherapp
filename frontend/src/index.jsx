import React from 'react';
import ReactDOM from 'react-dom';

const baseURL = process.env.ENDPOINT;
const geoAPI = navigator.geolocation;

const getWeatherFromApi = async (longitude, latitude) => {
  try {
    const url = new URL(`${baseURL}/weather`);
    const params = { lon: longitude, lat: latitude };
    Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));

    // const response = await fetch(`${baseURL}/weather?lat=12&lon=3`);
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }

  return {};
};

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      icon: '',
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
    });
  };

  getGeoError = async () => {
    this.setState({ icon: '' });
  };

  render() {
    const { icon } = this.state;

    return (
      icon !== ''
        ? (
          <div className="icon">
            { icon && <img src={`/img/${icon}.svg`} alt="weather status icon" />}
          </div>
        )
        : <div><h1>Click allow geolocation to get current weather information</h1></div>
    );
  }
}

ReactDOM.render(
  <Weather />,
  document.getElementById('app'),
);
