// Author: Bjarne Hovd Beruldsen
import React, { useEffect, useState } from "react";
import BaneListe from "./Baneliste";

const Baner = () => {
  const [baner, setBaner] = useState([]);
  const [laster, setLaster] = useState(true);

  useEffect(() => {
    const hentBaner = async () => {
      try {
        const respons = await fetch(`${process.env.REACT_APP_API_BASE_URL}/baner`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await respons.json();
        setBaner(data);
      } catch (error) {
        console.error("Feil ved henting av baner:", error);
      } finally {
        setLaster(false);
      }
    };

    hentBaner();
  }, []);

  if (laster) {
    return <p className="text-center text-gray-700 mt-10">Laster inn...</p>;
  }

  return (
    <div className="bg-gray-100 p-4">
      <BaneListe baner={baner} />
    </div>
  )
};

export default Baner;