import React, { useEffect, useState } from 'react';
import { API_ENDPOINT, DEFAULT_USER_IMAGE } from '../../utils/constantApi';

function UserComponent(props) {
  const { user } = props;
  const [ imagePath, setImagePath ] = useState(null);

  useEffect(() => {
    const { imagePath } = user;
    if (typeof imagePath === "undefined") {
      setImagePath(DEFAULT_USER_IMAGE);
    } else {
      const requestImage = `${API_ENDPOINT}/${imagePath}`;
      setImagePath(requestImage);
    }
  },[user]);

  return (
    <tr>
      <td>
        <div className="d-flex no-block align-items-center">
          <div className="mr-2"><img alt="user" src={imagePath} className="rounded-circle" style={{ width: "45px", height: "45px" }}/></div>
          <div className="">
            <h5 className="mb-0 font-16 font-medium">{user.name}</h5>
            <span>{user.email}</span>
          </div>
        </div>
      </td>
      <td>{user.email}</td>
      <td>{user.phoneNumber}</td>
      <td>{user.sex}</td>
      <td>{user.point}</td>
    </tr>
  );
}

export default UserComponent;