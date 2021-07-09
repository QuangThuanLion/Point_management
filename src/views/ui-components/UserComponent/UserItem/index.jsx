/* -----------START IMPORT IMAGE----------- */
import React, { useEffect, useState } from "react";
import { FcEditImage, FcFullTrash, FcViewDetails } from "react-icons/fc";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { getDeleteUserById } from "../../../../apis/userApi";
import {
  AlertDeleteFailed,
  AlertDeleteSuccess,
} from "../../../../utils/functionConstant";
import defaultUser from "../../../../assets/images/users/userDefault.png";
import { API_ENDPOINT } from "../../../../utils/constantApi";

/*-----------END IMPORT IMAGE----------- */

const styles = {
  fontSize: "20px",
};

function UserItemComponent(props) {
  const { user } = props;
  const { name, email, phoneNumber, sex, point, _id } = user;
  const [ imagePath, setImagePath] = useState(null);

  useEffect(() => {
    const { imagePath } = user;
    if (typeof imagePath === "undefined") {
      setImagePath(defaultUser);
    } else {
      const requestImage = `${API_ENDPOINT}/${imagePath}`;
      setImagePath(requestImage);
    }
  },[user]);

  function showMessageBeforeDeleteUser() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#28a745  ",
      cancelButtonColor: "#dc3545",
      confirmButtonText: "Yes, Delete It!",
    }).then((result) => {
      if (result.isConfirmed) {
        async function deleteUserById() {
          const requestAPI = await getDeleteUserById(_id);
          const response = requestAPI.data;
          if (response.success) {
            props.callBack(true);
            AlertDeleteSuccess();
          } else {
            AlertDeleteFailed();
          }
        }
        deleteUserById();
      }
    });
  }

  return (
    <tr>
      <td>
        <div className="d-flex no-block align-items-center">
          <div className="mr-2">
            <img src={imagePath} alt="user" className="rounded-circle" style={{ width: "45px", height: "45px" }}/>
          </div>
          <div className="">
            <h5 className="mb-0 font-16 font-medium">{name}</h5>
            <span>{email}</span>
          </div>
        </div>
      </td>
      <td>{email}</td>
      <td>{phoneNumber}</td>
      <td>{sex}</td>
      <td>{point}</td>
      <td
        className="blue-grey-text  text-darken-4 font-medium"
        style={{ maxWidth: "1px", textAlign: "center" }}
      >
        <Link to={`/dashboard/user-information/${_id}`} title="Detail">
          <FcViewDetails style={styles} />
        </Link>
        <Link to={`/dashboard/user-update/${_id}`} title="Update">
          <FcEditImage style={styles} />
        </Link>
        <span
          title="Delete"
          style={{ cursor: "pointer" }}
          onClick={showMessageBeforeDeleteUser}
        >
          <FcFullTrash style={styles} />
        </span>
      </td>
    </tr>
  );
}
UserItemComponent.propTypes = {};

export default UserItemComponent;
