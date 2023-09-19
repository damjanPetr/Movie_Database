import { useEffect, useState } from "react";

export const useCountry = () => {
  const [location, setLocation] = useState<string | null>(null);

  useEffect(() => {
    async function getData() {
      if (window.localStorage.getItem("loc") == null) {
        console.log("if");
        const response = await fetch("https://ipapi.co/json/");

        const data = await response.json();
        window.localStorage.setItem("loc", data.country_code);
        setLocation(data.country_code);
      } else {
        const loc = window.localStorage.getItem("loc");

        setLocation(loc);
      }
    }
    getData();
  }, []);

  return location;
};
