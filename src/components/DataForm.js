import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  addUsers,
  editUsers,
  getUsers,
  removeUsers,
  sendUsers,
  userActions,
} from "../store/UserData";
import DataTable from "./DataTable";
import { useSelector } from "react-redux";
import Form from "./form";
import Axios from "axios";

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
    // hobby: {
    //   Sports: false,
    //   Travel: false,
    //   Gym: false,
    //   Study: false,
    //   Reading: false,
    // },
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
  }, [userData.country, userData.state]);
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const changeHandler = (e) => {
    const { name, value, checked, type } = e.target;
    // debugger;
    if (type === "checkbox") {
      if (checked) {
        setUserData({
          ...userData,
          hobby: [...userData.hobby, name],
        });
      } else {
        setUserData({
          ...userData,
          hobby: userData.hobby.filter((hobby) => hobby !== name),
        });
      }
    }
    if (type !== "checkbox") {
      setUserData({
        ...userData,
        [name]: value,
      });
    }
  };

  //Add Functionality
  const submitHandler = (e) => {
    e.preventDefault();
    // console.log("After Added checkbox", fullData ? fullData : "none");
    const UID = 1;
    const setId = () => {
      const Ids = users.map((user) => user.id);
      if (users.length === 0) {
        return UID;
      } else if (users.length > 0) {
        let updatedId = Math.max(...Ids);
        updatedId = updatedId + 1;
        return updatedId;
      }
    };

    const fullData = {
      id: setId(),
      ...userData,
    };
    console.log(":fullData", fullData);
    // if(hobbies.)
    dispatch(userActions.getUserData(fullData));
    if (userEdit) {
      const EditData = {
        ...userData,
        id: editid,
      };
      dispatch(editUsers(EditData));
    } else {
      dispatch(addUsers(fullData));
    }
    // dispatch(addUsers(fullData));

    setUserData({
      name: "",
      email: "",
      mobile: "",
      // hobby: {
      //   Sports: false,
      //   Travel: false,
      //   Gym: false,
      //   Study: false,
      //   Reading: false,
      // },
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
    };
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
  const removeHandler = (id) => {
    dispatch(userActions.removeUserData(id));
    dispatch(removeUsers(id));
  };

  const logOutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };
  return (
    <>
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
