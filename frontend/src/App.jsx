import React, { useState, useMemo } from "react";
import AboutCard from "./components/AboutCard/AboutCard";

// backend data

// Testing

function App() {
  const [data, setData] = useState();
  useMemo(() => {
    fetch("/api/about")
      .then((res) => res.json())
      .then((ex) => setData(ex))
      .catch((err) => console.log(err));
    return data;
  }, [data]);
  return <AboutCard data={data} />;
}

export default App;
