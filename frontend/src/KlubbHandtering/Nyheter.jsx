// Author: Bjarne Hovd Beruldsen
import React, { useEffect, useState } from "react";
import Nyhetsliste from "./Nyhetsliste";

const Nyheter = () => {
  const [nyheter, setNyheter] = useState([]);
  const [laster, setLaster] = useState(true);

  useEffect(() => {
    const hentNyheter = async () => {
      try {
        const respons = await fetch(`${process.env.REACT_APP_API_BASE_URL}/nyheter`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await respons.json();
        setNyheter(data);
      } catch (error) {
        console.error("Feil ved henting av nyheter:", error);
      } finally {
        setLaster(false);
      }
    };

    hentNyheter();
  }, []);

  if (laster) {
    return <p className="text-center text-gray-700 mt-10">Laster inn...</p>;
  }

  return (
    <div className="bg-gray-100 p-4">
      <Nyhetsliste nyheter={nyheter} />
    </div>
  )
};

export default Nyheter;