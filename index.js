const userlocation = document.getElementById("userlocation");
const weatherIcon = document.querySelector(".weatherIcon");
const temprature = document.querySelector(".temprature");
const feelslike = document.querySelector(".feelslike");
const description = document.querySelector(".description");
const city = document.querySelector(".city");

const HValue = document.getElementById("HValue");
const WValue = document.getElementById("WValue");
const WGValue = document.getElementById("WGValue");
const VValue = document.getElementById("VValue");
const CValue = document.getElementById("CValue");
const UVValue = document.getElementById("UVValue");
const DValue = document.getElementById("DValue");
const PValue = document.getElementById("PValue");
const PrValue = document.getElementById("PrValue");

const WEATHER_API_ENDPOINT = 'https://weatherapi-com.p.rapidapi.com/forecast.json?q=';

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "1094c62795msh7931f79057bd5p1293c1jsn58865abc4a727",
    "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
  },
};

function findUserLocation() {

  const location = userlocation.value.trim() || "Kanpur";
  fetch(${WEATHER_API_ENDPOINT}${location}, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error(Weather API error: ${response.status});
      }
      return response.json();
    })
    .then((data) => {
      console.log("Current Weather Data:", data);

      city.innerHTML = ${data.location.name}, ${data.location.country};

      weatherIcon.style.backgroundImage = url(https://${data.current.condition.icon});

      temprature.innerHTML = ${data.current.temp_c} °C;
      feelslike.innerHTML = Feels like: ${data.current.feelslike_c} °C;

      description.innerHTML = <i class="fa-brands fa-cloudversify"></i> ${data.current.condition.text};

      HValue.innerHTML = ${data.current.humidity}%;
      WValue.innerHTML = ${data.current.wind_kph} km/h;
      PValue.innerHTML = ${data.current.pressure_mb} mb;
      WGValue.innerHTML = ${data.current.gust_kph} km/h;
      DValue.innerHTML = ${data.current.dewpoint_c} °C;
      VValue.innerHTML = ${data.current.vis_km} km;
      CValue.innerHTML = ${data.current.cloud}%;
      UVValue.innerHTML = ${data.current.uv};
      PrValue.innerHTML = ${data.current.precip_mm} mm;

      
      const SrValue = document.getElementById("SrValue");
      const SsValue = document.getElementById("SsValue");
      const MrValue = document.getElementById("MrValue");
      const MsValue = document.getElementById("MsValue");
      const Date = document.getElementById("Date");
      const Description = document.querySelector(".Description");
      const max_temp = document.getElementById("max_temp");
      const min_temp = document.getElementById("min_temp");
      //`<i class="fa-brands fa-cloudversify"></i> 
      Description.innerHTML = <i class="fa-brands fa-cloudversify"></i> ${data.forecast.forecastday[0].day.condition.text};
      SrValue.innerHTML = ${data.forecast.forecastday[0].astro.sunrise};
      SsValue.innerHTML = ${data.forecast.forecastday[0].astro.sunset};
      MrValue.innerHTML = ${data.forecast.forecastday[0].astro.moonrise};
      MsValue.innerHTML = ${data.forecast.forecastday[0].astro.moonset};
      Date.innerHTML = ${data.forecast.forecastday[0].date};
      max_temp.innerHTML = ${data.forecast.forecastday[0].day.maxtemp_c}°C;
      min_temp.innerHTML = ${data.forecast.forecastday[0].day.mintemp_c}°C;

      const SrValue1 = document.getElementById("SrValue1");
      const SsValue1 = document.getElementById("SsValue1");
      const MrValue1 = document.getElementById("MrValue1");
      const MsValue1 = document.getElementById("MsValue1");
      const Date1 = document.getElementById("Date1");
      const Description1 = document.querySelector(".Description1");
      const max_temp1 = document.getElementById("max_temp1");
      const min_temp1 = document.getElementById("min_temp1");
      //`<i class="fa-brands fa-cloudversify"></i> 
      Description1.innerHTML = <i class="fa-brands fa-cloudversify"></i> ${data.forecast.forecastday[1].day.condition.text};
      SrValue1.innerHTML = ${data.forecast.forecastday[1].astro.sunrise};
      SsValue1.innerHTML = ${data.forecast.forecastday[1].astro.sunset};
      MrValue1.innerHTML = ${data.forecast.forecastday[1].astro.moonrise};
      MsValue1.innerHTML = ${data.forecast.forecastday[1].astro.moonset};
      Date1.innerHTML = ${data.forecast.forecastday[1].date};
      max_temp1.innerHTML = ${data.forecast.forecastday[1].day.maxtemp_c}°C;
      min_temp1.innerHTML = ${data.forecast.forecastday[1].day.mintemp_c}°C;

      const SrValue2 = document.getElementById("SrValue2");
      const SsValue2 = document.getElementById("SsValue2");
      const MrValue2 = document.getElementById("MrValue2");
      const MsValue2 = document.getElementById("MsValue2");
      const Date2 = document.getElementById("Date2");
      const Description2 = document.querySelector(".Description2");
      const max_temp2 = document.getElementById("max_temp2");
      const min_temp2 = document.getElementById("min_temp2");
      //`<i class="fa-brands fa-cloudversify"></i> 
      Description2.innerHTML = <i class="fa-brands fa-cloudversify"></i> ${data.forecast.forecastday[2].day.condition.text};
      SrValue2.innerHTML = ${data.forecast.forecastday[2].astro.sunrise};
      SsValue2.innerHTML = ${data.forecast.forecastday[2].astro.sunset};
      MrValue2.innerHTML = ${data.forecast.forecastday[2].astro.moonrise};
      MsValue2.innerHTML = ${data.forecast.forecastday[2].astro.moonset};
      Date2.innerHTML = ${data.forecast.forecastday[2].date};
      max_temp2.innerHTML = ${data.forecast.forecastday[2].day.maxtemp_c}°C;
      min_temp2.innerHTML = ${data.forecast.forecastday[2].day.mintemp_c}°C;

    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      alert("An error occurred while fetching weather data. Please try again.");
    });
}
