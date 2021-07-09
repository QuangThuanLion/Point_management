import React, { useEffect, useState } from "react";
import { CardTitle, Button } from "reactstrap";
import { getAllPointHistory, getUserById } from "../../../../apis/userApi";
import FormComponent from "./form";
import PointHistoryComponent from "./pointHistory";
const UserDetailComponent = (props) => {
  const [update, setUpdate] = useState(false);
  const [user, setUser] = useState({});
  const [pointHistory, setPointHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const { match } = props;
    if (match != null) {
      const id = match.params.id;
      async function findUserById(callBack) {
        const requestAPI = await getUserById(id);
        try {
          const response = requestAPI.data;
          if (response.success) {
            const data = response.data;
            setUser(data);
            callBack();
          }
        } catch (error) {
          console.log(error);
        }
      }
      async function getAllPointHistoryById() {
        const requestAPI = await getAllPointHistory(id);
        try {
          const response = requestAPI.data;
          if (response.success) {
            const { data } = response;
            if (data.length > 0) {
              setPointHistory(data);
              setShowHistory(true);
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
      findUserById(getAllPointHistoryById);
    }
  }, [props]);

  useEffect(() => {
    let typeInput = document.getElementsByClassName("hidden_detail");
    if (!update) {
      for (var i = 0; i < typeInput.length; i++) {
        typeInput[i].setAttribute("disabled", "disabled");
      }
    }
  });

  return (
    <div>
      <CardTitle className="bg-light border-bottom p-3 mb-0">
        <i className="mdi mdi-apps mr-2"> </i>
        {!update ? "USER INFORMATION" : "UPDATE USER INFORMATION"}
      </CardTitle>
      <br />
      <FormComponent
        user={user}
        changeButton={update}
        callBack={(booleanData) => {
          setUpdate(booleanData);
        }}
      />
      {showHistory ? (
        <div id="showHistory">
          <PointHistoryComponent pointHistory={pointHistory} />
          <div style={{ textAlign: "center" }}>
            <Button
              className="btn"
              color="warning"
              style={{ width: "20%" }}
            >
              Show more
            </Button>
          </div>
        </div>
      ) : ""}
    </div>
  );
};

export default UserDetailComponent;
