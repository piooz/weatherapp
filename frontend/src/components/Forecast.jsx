/* eslint-disable camelcase */
import React from 'react';

const baseURL = process.env.ENDPOINT;

const getForecastFromApi = async (longitude, latitude) => {
  if (typeof longitude === 'undefined' || typeof latitude === 'undefined') {
    return {};
  }

  try {
    const response = await fetch(`${baseURL}/forecast?lat=${latitude}&lon=${longitude}`);
    return response.json();
  } catch (error) {
    console.error(error);
  }

  return {};
};

class Forecast extends React.Component {
  constructor(props) {
    super(props);

    this.lon = props.longitude;
    this.lat = props.latitude;

    this.state = {
      forecast: '',
    };
  }

  async componentDidMount() {
    const forecastInfo = await getForecastFromApi(this.lon, this.lat);
    this.setState({
      forecast: forecastInfo,
    });
  }

  render() {
    const { forecast } = this.state;
    return (
      <>
        <h2>Forecast: </h2>

        {forecast.list ? forecast.list.map(({
          dt, dt_txt, weather, main,
        }) => (
          <div className="card" key={dt}>
            <h3>{dt_txt}</h3>
            <p><b>{`${weather[0].main}: ${weather[0].description}`}</b></p>
            <hr />
            <p>{`Temp: ${main.temp}`}</p>
            <p>{`humidity: ${main.humidity}`}</p>
          </div>
        ))
          : <p>blank</p>}
      </>
    );
  }
}

export default Forecast;
