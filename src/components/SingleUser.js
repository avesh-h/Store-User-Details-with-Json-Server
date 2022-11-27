import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Form from "./form";
import Axios from "axios";

const SingleUser = () => {
  const { id } = useParams();
  const [getArray, setGetArray] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:3000/users").then((res) => {
      setGetArray(res.data);
    });
  }, []);

  console.log("Full Users Array", getArray);

  console.log("param", id);
  const userObj = getArray.find((user) => user.id === Number(id));
  console.log("user Obj are here", userObj);
  return (
    <>
      {userObj ? <Form disabled userData={userObj} /> : <p>Loading...</p>}

      {/* Second Approach */}
    </>
  );
};

export default SingleUser;

// {userObj ? (
//   <form>
//     <h1>Please Enter Your Data</h1>
//     <label>Name:</label>
//     <input type="text" name="name" defaultValue={userObj.name} disabled />
//     <br />
//     <label>Email:</label>
//     <input
//       type="text"
//       defaultValue={userObj.email}
//       name="email"
//       disabled
//     />
//     <br />
//     <label>Phone No:</label>
//     <input
//       type="number"
//       defaultValue={userObj.mobile}
//       name="mobile"
//       disabled
//     />
//     <br />
//     <label>DOB:</label>
//     <input type="date" defaultValue={userObj.DOB} name="DOB" disabled />
//     <label>Hobby:</label>
//     <textarea
//       rows="4"
//       cols="50"
//       name="hobby"
//       defaultValue={userObj.hobby}
//       disabled
//     />
//     <br />
//     <label>Gender:</label>

//     <label htmlFor="male">
//       <input
//         type="radio"
//         defaultValue="Male"
//         name="gender"
//         defaultChecked={userObj.gender === "Male"}
//         disabled
//         // onChange={changeHandler}
//       />
//       Male
//     </label>

//     <label htmlFor="female">
//       <input
//         type="radio"
//         defaultValue="Female"
//         name="gender"
//         defaultChecked={userObj.gender === "Female"}
//         disabled
//         // onChange={changeHandler}
//       />
//       Female
//     </label>
//     <br />
//     <label htmlFor="countries">Choose a Country:</label>
//     <select
//       defaultValue={userObj.country}
//       placeholder="country"
//       name="country"
//       disabled
//       // onChange={changeHandler}
//     >
//       <option defaultValue="--Choose Country--">{userObj.country}</option>
//       {/* {world.countries.map((country, index) => {
//   return (
//     <option value={country.name} key={`Countries-${index}`}>
//       {country.name}
//     </option>
//   );
// })} */}
//     </select>
//     <label>State</label>
//     <select
//       defaultValue={userObj.state}
//       placeholder="State"
//       name="state"
//       disabled
//       // onChange={changeHandler}
//     >
//       <option defaultValue={userObj.state}>{userObj.state}</option>
//       {/* {selectedCountry === undefined
//   ? ""
//   : selectedCountry.states.map((state, index) => {
//       return (
//         <option value={state.name} key={`state-${index}`}>
//           {state.name}
//         </option>
//       );
//     })} */}
//     </select>
//     <label>Cities</label>
//     <select
//       defaultValue={userObj.city}
//       placeholder="City"
//       name="city"
//       disabled
//       // onChange={changeHandler}
//     >
//       <option defaultValue={userObj.city}>{userObj.city}</option>
//       {/* {selectedState === undefined
//   ? ""
//   : selectedState.cities.map((city, index) => {
//       return (
//         <option value={city} key={`city-${index}`}>
//           {city}
//         </option>
//       );
//     })} */}
//     </select>
//   </form>
// ) : (
//   <p>Loading...</p>
// )}
