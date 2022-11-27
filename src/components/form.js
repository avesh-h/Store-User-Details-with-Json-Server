import React, { useState } from "react";

const Form = ({ users, editid, ...props }) => {
  const submitHandler = (e) => {
    e.preventDefault();
    props.onSubmit(e);
  };
  const changeHandler = (e) => {
    props.onChange(e);
  };
  const logOutHandler = () => {
    props.onLogout();
  };
  return (
    <form onSubmit={submitHandler}>
      <h1>Please Enter Your Data</h1>
      <label>Name:</label>
      <input
        type="text"
        value={props.userData.name}
        onChange={changeHandler}
        name="name"
        disabled={props.disabled ? true : false}
      />
      <br />
      <label>Email:</label>
      <input
        type="text"
        value={props.userData.email}
        onChange={changeHandler}
        name="email"
        disabled={props.disabled ? true : false}
      />
      <br />
      <label>Phone No:</label>
      <input
        type="number"
        value={props.userData.mobile}
        onChange={changeHandler}
        name="mobile"
        disabled={props.disabled ? true : false}
      />
      <br />
      <label>DOB:</label>
      <input
        type="date"
        value={props.userData.DOB}
        onChange={changeHandler}
        name="DOB"
        disabled={props.disabled ? true : false}
      />
      <br />
      <label>Hobbies:</label>
      <br />
      {/* <textarea
        rows="4"
        cols="50"
        onChange={changeHandler}
        name="hobby"
        value={props.userData.hobby}
        disabled={props.disabled ? true : false}
      /> */}
      <input
        type="checkbox"
        // name="hobby"
        name="Sports"
        onChange={changeHandler}
        checked={props.userData.hobby.includes("Sports")}
        disabled={props.disabled ? true : false}
      />
      <label>Sports</label>
      <br />
      <input
        type="checkbox"
        // name="hobby"
        name="Travel"
        onChange={changeHandler}
        checked={props.userData.hobby.includes("Travel")}
        disabled={props.disabled ? true : false}
      />
      <label>Travel</label>
      <br />
      <input
        type="checkbox"
        // name="hobby"
        name="Gym"
        onChange={changeHandler}
        checked={props.userData.hobby.includes("Gym")}
        disabled={props.disabled ? true : false}
      />
      <label>Gym/Trainning</label>
      <br />
      <input
        type="checkbox"
        // name="hobby"
        name="Study"
        onChange={changeHandler}
        checked={props.userData.hobby.includes("Study")}
        disabled={props.disabled ? true : false}
      />
      <label>Study</label>
      <br />
      <input
        type="checkbox"
        // name="hobby"
        name="Reading"
        onChange={changeHandler}
        checked={props.userData.hobby.includes("Reading")}
        disabled={props.disabled ? true : false}
      />
      <label>Reading</label>
      <br />
      <label>Gender:</label>
        
      <label htmlFor="male">
        <input
          type="radio"
          value="Male"
          name="gender"
          checked={props.userData.gender === "Male"}
          onChange={changeHandler}
          disabled={props.disabled ? true : false}
        />
        Male
      </label>
         
      <label htmlFor="female">
        <input
          type="radio"
          value="Female"
          name="gender"
          checked={props.userData.gender === "Female"}
          onChange={changeHandler}
          disabled={props.disabled ? true : false}
        />
        Female
      </label>
      <br />
      <label htmlFor="countries">Choose a Country:</label>
      <select
        value={props.userData.country}
        placeholder="country"
        name="country"
        onChange={changeHandler}
        disabled={props.disabled ? true : false}
      >
        <option value="--Choose Country--">
          {props.userData.country
            ? props.userData.country
            : "--Choose Country--"}
        </option>
        {props?.world?.countries.map((country, index) => {
          return (
            <option value={country.name} key={`Countries-${index}`}>
              {country.name}
            </option>
          );
        })}
      </select>
      <label>State</label>
      <select
        value={props.userData.state}
        placeholder="State"
        name="state"
        onChange={changeHandler}
        disabled={props.disabled ? true : false}
      >
        <option value="--Choose State--">
          {props.userData.state ? props.userData.state : "--Choose Country--"}
        </option>
        {props?.selectedCountry === undefined
          ? ""
          : props.selectedCountry.states.map((state, index) => {
              return (
                <option value={state.name} key={`state-${index}`}>
                  {state.name}
                </option>
              );
            })}
      </select>
      <label>Cities</label>
      <select
        value={props.userData.city}
        placeholder="City"
        name="city"
        onChange={changeHandler}
        disabled={props.disabled ? true : false}
      >
        <option value="--Choose City--">
          {props.userData.city ? props.userData.city : "--Choose Country--"}
        </option>
        {props?.selectedState === undefined
          ? ""
          : props.selectedState.cities.map((city, index) => {
              return (
                <option value={city} key={`city-${index}`}>
                  {city}
                </option>
              );
            })}
      </select>
      {props.disabled ? (
        ""
      ) : (
        <>
          {props.userEdit ? (
            <button type="submit">Update</button>
          ) : (
            <button type="submit">Submit</button>
          )}
          <button onClick={logOutHandler}>Log Out</button>
        </>
      )}
    </form>
  );
};

export default Form;
