import React from "react";

interface Props {
  condition: string;
}

const WeatherBackground: React.FC<Props> = ({ condition }) => {
  let background = "/images/sunny.jpg";
  let weatherEffect = null;

  if (condition.toLowerCase().includes("rain")) {
    background = "/images/rainy.jpg";
    const drops = Array.from({ length: 70 });
    weatherEffect = drops.map((_, i) => (
      <div
        key={i}
        className="rain"
        style={{
          left: Math.random() * 100 + "vw",
          animationDelay: Math.random() * 1 + "s",
          animationDuration: 0.4 + Math.random() * 0.6 + "s",
        }}
      ></div>
    ));
  } else if (condition.toLowerCase().includes("cloud")) {
    background = "/images/cloudy.jpg";
    weatherEffect = (
      <>
        <img src="/images/cloud1.png" className="cloud" alt="cloud" />
        <img src="/images/cloud2.png" className="cloud" alt="cloud" />
        <img src="/images/cloud3.png" className="cloud" alt="cloud" />
      </>
    );
  } else if (condition.toLowerCase().includes("snow")) {
    background = "/images/snowy.jpg";
    const flakes = Array.from({ length: 50 });
    weatherEffect = flakes.map((_, i) => (
      <div
        key={i}
        className="snow"
        style={{
          left: Math.random() * 100 + "vw",
          animationDelay: Math.random() * 2 + "s",
          animationDuration: 3 + Math.random() * 2 + "s",
        }}
      ></div>
    ));
  } else if (condition.toLowerCase().includes("thunder")) {
    background = "/images/storm.jpg";
    const drops = Array.from({ length: 70 });
    weatherEffect = (
      <>
        {drops.map((_, i) => (
          <div
            key={i}
            className="rain"
            style={{
              left: Math.random() * 100 + "vw",
              animationDelay: Math.random() * 1 + "s",
              animationDuration: 0.4 + Math.random() * 0.6 + "s",
            }}
          ></div>
        ))}
        <div className="lightning"></div>
      </>
    );
  }

  return (
    <div
      className="absolute inset-0 -z-10 overflow-hidden"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 1s ease-in-out",
      }}
    >
      {weatherEffect}
    </div>
  );
};

export default WeatherBackground;
