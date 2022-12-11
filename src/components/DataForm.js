import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  addUsers,
  editUsers,
  getUsers,
  removeUsers,
  userActions,
} from "../store/UserData";
import DataTable from "./DataTable";
import { useSelector } from "react-redux";
import Form from "./form";

const world = {
  countries: [
    {
      name: "India",
      states: [
        {
          name: "Gujarat",
          cities: ["surat", "rajkot", "navsari"],
        },
        {
          name: "Rajasthan",
          cities: ["jaipur", "jodhpur", "udaipur"],
        },
        {
          name: "Maharastra",
          cities: ["mumbai", "nagpur", "pune"],
        },
      ],
    },
    {
      name: "America",
      states: [
        {
          name: "California",
          cities: ["los angeles", "san diego", "san francisco"],
        },
        {
          name: "Texas",
          cities: ["houston", "austin", "dallas"],
        },
        {
          name: "Florida",
          cities: ["miami", "orlando", "tampa"],
        },
      ],
    },
    {
      name: "Japan",
      states: [
        {
          name: "Aichi",
          cities: ["lnagoya", "toyota", "okazaki"],
        },
        {
          name: "Akita",
          cities: ["Daisen", " Katagami", "kazuno"],
        },
        {
          name: "Aomori",
          cities: ["Towada", "Hirosaki", "Hachinohe"],
        },
      ],
    },
  ],
};
const DataForm = () => {
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const JsonData = await Axios.get("http://localhost:3000/posts");
  //     console.log("getjson data", JsonData.data);
  //   };
  //   fetchData();
  // }, []);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    gender: "",
    country: "",
    state: "",
    city: "",
    mobile: "",
    DOB: "",
    hobby: [],
  });

  const [userEdit, setUserEdit] = useState(false);
  // const [isChecked, setIsChecked] = useState(false);
  const [editid, setEditId] = useState();
  const [selectedCountry, setSelectedCountry] = useState();
  const [selectedState, setSelectedState] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => {
    return state.user;
  });

  useEffect(() => {
    const userSelectedCountry = world.countries.find(
      (country) => country.name === userData.country
    );
    setSelectedCountry(userSelectedCountry);
    if (userSelectedCountry) {
      const userSelectedState = userSelectedCountry.states.find(
        (state) => state.name === userData.state
      );
      setSelectedState(userSelectedState);
    }

    // dispatch(getUsers());
  }, [userData.country, userData.state]);
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const changeHandler = (e) => {
    const { name, value, checked, type } = e.target;

    if (type === "checkbox") {
      if (checked) {
        setUserData({
          ...userData,
          hobby: [...userData.hobby, name],
        });
      } else if (!checked) {
        setUserData({
          ...userData,
          hobby: userData.hobby.filter((hobbie) => hobbie !== name),
        });
      }
      // const allHobbies = userData.hobby.push(name);
    }
    if (type !== "checkbox") {
      setUserData({
        ...userData,
        [name]: value,
      });
    }
  };

  //Add Functionality
  const setId = () => {
    const UID = 1;

    const Ids = users.map((user) => user.id);
    if (users.length === 0) {
      return UID;
    } else if (users.length > 0) {
      let updatedId = Math.max(...Ids);
      updatedId = updatedId + 1;
      return updatedId;
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log("frontend Users", users);
    // console.log("submuit");
    // console.log("After Added checkbox", fullData ? fullData : "none");

    const fullData = {
      id: setId(),
      ...userData,
    };

    // if(hobbies.)

    //Dispatch Before using without Database
    // dispatch(userActions.getUserData(fullData));

    if (userEdit) {
      const EditData = {
        ...userData,
        id: editid,
      };
      // console.log("before backend", EditData);
      dispatch(editUsers(EditData));
      dispatch(getUsers());
    } else {
      // console.log("after", fullData);
      dispatch(addUsers(fullData));
      dispatch(getUsers());
    }
    // dispatch(addUsers(fullData));

    setUserData({
      name: "",
      email: "",
      mobile: "",
      hobby: [],
      DOB: "",
      gender: "",
      country: "",
      city: "",
      state: "",
    });
    setUserEdit(false);
  };

  //Edit Functionality
  const editHandler = (id) => {
    const editUser = users.find((user) => user.id === id);

    // console.log("get Edited user", editUser);

    setUserEdit(true);

    const editedUserDetail = {
      id: editUser.id,
      name: editUser.name,
      email: editUser.email,
      gender: editUser.gender,
      country: editUser.country,
      state: editUser.state,
      city: editUser.city,
      mobile: editUser.mobile,
      DOB: editUser.DOB,
      hobby: editUser.hobby,
      _id: editUser._id,
    };
    console.log("edit");
    setUserData(editedUserDetail);
    // const editedData = {
    //   ...userData,
    //   // ...editedUserDetail,
    //   id: editUser.id,
    // };
    setEditId(editUser.id);
    // dispatch(userActions.editUserData(editedData));
    //Before Using Data base
    // dispatch(userActions.getUserData(editedData));
  };

  //Delete Functionality
  const removeHandler = (idsObj) => {
    // dispatch(userActions.removeUserData(id));
    dispatch(removeUsers(idsObj));
    dispatch(getUsers());
  };

  const logOutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };
  // console.log("End at Data Form", userData);
  return (
    <>
      {/* <form onSubmit={submitHandler}>
        <h1>Please Enter Your Data</h1>
        <label>Name:</label>
        <input
          type="text"
          value={userData.name}
          onChange={changeHandler}
          name="name"
        />
        <br />
        <label>Email:</label>
        <input
          type="text"
          value={userData.email}
          onChange={changeHandler}
          name="email"
        />
        <br />
        <label>Phone No:</label>
        <input
          type="number"
          value={userData.mobile}
          onChange={changeHandler}
          name="mobile"
        />
        <br />
        <label>DOB:</label>
        <input
          type="date"
          value={userData.DOB}
          onChange={changeHandler}
          name="DOB"
        />
        <label>Hobby:</label>
        <textarea
          rows="4"
          cols="50"
          onChange={changeHandler}
          name="hobby"
          value={userData.hobby}
        />
        <br />
        <label>Gender:</label>
          
        <label htmlFor="male">
          <input
            type="radio"
            value="Male"
            name="gender"
            checked={userData.gender === "Male"}
            onChange={changeHandler}
          />
          Male
        </label>
           
        <label htmlFor="female">
          <input
            type="radio"
            value="Female"
            name="gender"
            checked={userData.gender === "Female"}
            onChange={changeHandler}
          />
          Female
        </label>
        <br />
        <label htmlFor="countries">Choose a Country:</label>
        <select
          value={userData.country}
          placeholder="country"
          name="country"
          onChange={changeHandler}
        >
          <option value="--Choose Country--">--Choose Country--</option>
          {world.countries.map((country, index) => {
            return (
              <option value={country.name} key={`Countries-${index}`}>
                {country.name}
              </option>
            );
          })}
        </select>
        <label>State</label>
        <select
          value={userData.state}
          placeholder="State"
          name="state"
          onChange={changeHandler}
        >
          <option value="--Choose State--">--Choose State--</option>
          {selectedCountry === undefined
            ? ""
            : selectedCountry.states.map((state, index) => {
                return (
                  <option value={state.name} key={`state-${index}`}>
                    {state.name}
                  </option>
                );
              })}
        </select>
        <label>Cities</label>
        <select
          value={userData.city}
          placeholder="City"
          name="city"
          onChange={changeHandler}
        >
          <option value="--Choose City--">--Choose City--</option>
          {selectedState === undefined
            ? ""
            : selectedState.cities.map((city, index) => {
                return (
                  <option value={city} key={`city-${index}`}>
                    {city}
                  </option>
                );
              })}
        </select>
        {userEdit ? (
          <button type="submit">Update</button>
        ) : (
          <button type="submit">Submit</button>
        )}
        <button onClick={logOutHandler}>Log Out</button>
      </form> */}
      <Form
        users={users}
        selectedState={selectedState}
        selectedCountry={selectedCountry}
        editid={editid}
        userEdit={userEdit}
        userData={userData}
        world={world}
        onChange={changeHandler}
        onSubmit={submitHandler}
        onLogout={logOutHandler}
      />
      <DataTable onUserUpdate={editHandler} onUserRemove={removeHandler} />
    </>
  );
};

export default DataForm;
