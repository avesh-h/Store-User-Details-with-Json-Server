import React, { useEffect } from "react";
import { useSelector } from "react-redux";
// import styles from "../styles/DataTable.module.css";

const DataTable = (props) => {
  const allUserData = useSelector((state) => {
    // debugger;
    console.log("axios array", state.user);
    // const userIds = state.user.map((user)=>user.id)
    for (let index = 0; index < state.user.length; index++) {
      // console.log("condition", [index]);
    }
    return state.user;
  });

  const handleDelete = (useridObj) => {
    // console.log("FOr Delete Id", useridObj);
    props.onUserRemove(useridObj);
  };
  const handleEdit = (userid) => {
    props.onUserUpdate(userid);
  };

  // const hobbie = allUserData.hobby

  return (
    <div>
      <h2>A basic HTML table</h2>
      {allUserData.length === 0 ? (
        <p>There Are No users.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Country</th>
              <th>State</th>
              <th>City</th>
              <th>Contact</th>
              <th>DOB</th>
              <th>Hobbies</th>
              <th>Action</th>
            </tr>
          </thead>
          {allUserData.map((user) => {
            return (
              <tbody key={user._id}>
                <tr>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.gender}</td>
                  <td>{user.country}</td>
                  <td>{user.state}</td>
                  <td>{user.city}</td>
                  <td>{user.mobile}</td>
                  <td>{user.DOB}</td>
                  {/* <td>
                    {user.hobby.map((hob, index) => {
                      return <span key={`${hob},${index}`}> &nbsp;{hob}</span>;
                    })}
                  </td> */}
                  <td>{user.hobby.toString()}</td>
                  <td>
                    <button onClick={() => handleEdit(user.id)}>Edit</button>
                    <button
                      onClick={() =>
                        handleDelete({ mongoId: user._id, userId: user.id })
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      )}
    </div>
  );
};

export default React.memo(DataTable);
