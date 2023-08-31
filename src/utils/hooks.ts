import React, { useEffect, useState } from "react";

export const useCountry = () => {
  const [location, setLocation] = useState<string>();

  useEffect(() => {
    if (window.localStorage.getItem("loc") === null) {
      (async () => {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        setLocation(data);
        window.localStorage.setItem("loc", data.country_code);
        setLocation(data.country_code);
        return;
      })();
    } else {
      const loc = window.localStorage.getItem("loc");
      if (loc !== null) {
        setLocation(loc);
      }
    }
  }, []);
  return location;
};
