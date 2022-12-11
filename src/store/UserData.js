import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

const getToken = localStorage.getItem("Token");

// console.log("GetTOkenn", getToken);

export const getUsers = createAsyncThunk("data/users", async () => {
  const data = await Axios.get("http://localhost:3001/data/users", {
    headers: {
      authorization: getToken,
    },
  });
  // console.log("getData", data);
  return data;
});

export const addUsers = createAsyncThunk("user/addUsers", async (Data) => {
  // console.log("dataaaaaa", Data);
  const data = await Axios.post("http://localhost:3001/data/add", Data, {
    headers: {
      authorization: getToken,
    },
  });
  return data;
});

export const editUsers = createAsyncThunk("user/editUsers", async (Data) => {
  console.log("edited", Data);
  console.log("mongo Id", Data._id);
  Axios.put(`http://localhost:3001/data/${Data.id}`, Data, {
    headers: {
      authorization: getToken,
      id: Data._id,
    },
  });
});

export const removeUsers = createAsyncThunk("user/removeUsers", async (ids) => {
  // console.log("from user Data id Objects------------->", ids);
  Axios.delete(`http://localhost:3001/data/${ids.userId}`, {
    headers: {
      authorization: getToken,
      id: ids.mongoId,
    },
  });
});

export const userSlice = createSlice({
  name: "user",
  initialState: [],
  reducers: {
    getUserData(state, action) {
      let Data;
      //Edit Logic
      const editedUser = state.findIndex(
        (user) => user.id === action.payload.id
      );
      if (state.find((user) => user.id === action.payload.id)) {
        state = state.splice(editedUser, 1, action.payload);
      } else {
        Data = {
          ...action.payload,
        };
        state = [...state, ...action.payload];
        console.log(state);
        return state;

        state = state.push(Data);
      }
      // console.log("Edit user", action.payload);
      // if (action.payload.id) {
      //   const editedUserIndex = state.findIndex(
      //     (user) => user.id === action.payload.id
      //   );
      //   state = state.splice(editedUserIndex, 1, action.payload);
      // }
      //Add Logic
      // const UID = 1;
      // const findId = () => {
      //   const IdArr = state.map((data) => data.id);
      //   if (state.length === 0) {
      //     return UID;
      //   } else if (state.length > 0) {
      //     let UpdatedId = Math.max(...IdArr);
      //     UpdatedId = UpdatedId + 1;
      //     return UpdatedId;
      //   }
      // };
      //Add Logic
      // const Data = {
      //   ...action.payload,
      // };
      // state = state.push(Data);
    },

    removeUserData(state, action) {
      return (state = state.filter((user) => user.id !== action.payload));
    },
    // editUserdata(state, action) {
    //   const editUserIndex = state.findIndex(
    //     (user) => user.id === action.payload.id
    //   );
    //   state = state.splice(editUserIndex, 1, action.payload);
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.fulfilled, (state, action) => {
        //This State and action will give you the response which is coming from the JSON-server
        console.log("New Userr", action.payload);
        state = action.payload.data;

        return state;
      })
      .addCase(addUsers.fulfilled)
      .addCase(editUsers.fulfilled)
      .addCase(removeUsers.fulfilled);
  },
});

export const userActions = userSlice.actions;
