import React, {useEffect, useState} from "react";

function index() {
  const [message, setMessage] = useState("Loading");

  useEffect(() => {
    fetch("http://localhost:8080/home")
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
      });
  }, []);


  return <p>{message}</p>;
}

export default index;
