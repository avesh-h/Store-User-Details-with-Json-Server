import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Form from "./form";
import Axios from "axios";

const SingleUser = () => {
  const { id } = useParams();
  const [getArray, setGetArray] = useState([]);
  const getToken = localStorage.getItem("Token");
  useEffect(() => {
    Axios.get("http://localhost:3001/data/users", {
      headers: {
        authorization: getToken,
      },
    }).then((res) => {
      setGetArray(res.data);
    });
  }, []);

  // console.log("Full Users Array", getArray);

  // console.log("param", id);

  const userObj = getArray.find((user) => user.id === Number(id));
  // console.log("user Obj are here", userObj);
  return (
    <>{userObj ? <Form disabled userData={userObj} /> : <p>Loading...</p>}</>
  );
};

export default SingleUser;
