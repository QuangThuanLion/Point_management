/* -----------START IMPORT----------- */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardTitle, Table } from "reactstrap";
import { getAllUser } from "../../../../apis/userApi.js";
import {
  USER_DEFAULT_ITEMS_ON_PAGE,
  USER_FIRST_CURRENT_VALUE_ITEM,
  USER_FIRST_DEFAULT_LIMIT_PAGE,
  USER_FIRST_INDEX_PAGE,
} from "../../../../utils/constantApi.js";
import UserItemComponent from "../UserItem/index.jsx";
import PaginationComponent from "./pagination.jsx";
/*-----------END IMPORT----------- */

const UserComponent = () => {
  const [listUser, setListUser] = useState([]);
  const [reload, setReload] = useState(false);

  const [totalPage, setTotalPage] = useState(null);
  const [limitPage, setLimitPage] = useState(USER_FIRST_DEFAULT_LIMIT_PAGE);
  const [currentValue, setCurrentValue] = useState(
    USER_FIRST_CURRENT_VALUE_ITEM
  );
  const [indexPage, setIndexPage] = useState(USER_FIRST_INDEX_PAGE);
  const [rootTotalPage, setRootTotalpage] = useState(null);

  useEffect(() => {
    setReload(false);
    async function fetchUserList(callBack) {
      const requestAPI = await getAllUser(0);
      try {
        const response = requestAPI.data;
        if (response.success) {
          let data = response.data;
          callBack(data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    async function pagination(data){
      if (data.length > 0) {
        const totalPage = Math.ceil(data.length / USER_DEFAULT_ITEMS_ON_PAGE);
        setRootTotalpage(totalPage);
        if (totalPage <= 5) {
          if (indexPage + 4 > totalPage) {
            setCurrentValue(USER_FIRST_CURRENT_VALUE_ITEM);
            setIndexPage(USER_FIRST_INDEX_PAGE);
            setTotalPage(totalPage);
          }
        } else {
          if (indexPage === 1) {
            setTotalPage(5);
          } else {
            if (indexPage + 4 > totalPage) {
              setCurrentValue((totalPage - 4) * USER_FIRST_CURRENT_VALUE_ITEM);
              setIndexPage(totalPage - 4);
              setTotalPage(totalPage);
            } else {
              setTotalPage(indexPage + 4);
            }
          }
        }
      }
      const requestAPI = await getAllUser(limitPage);
      try {
        const response = requestAPI.data;
        if (response.success) {
          let data = response.data;
          var dataArray = data.slice(data.length - 10, data.length);
          setListUser(dataArray);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchUserList(pagination);
  }, [reload, limitPage, indexPage]);

  return (
    <div>
      <div style={{ textAlign: "right" }}>
        <Link to="/dashboard/user-add">
          <Button
            className="btn"
            color="success"
            size="lg"
            style={{ marginBottom: "10px", minWidth: "150px" }}
          >
            Add User
          </Button>
        </Link>
      </div>
      <Card>
        <CardTitle className="bg-light border-bottom p-3 mb-0">
          <i className="mdi mdi-apps mr-2"> </i>
          USER LIST
        </CardTitle>
        <CardBody>
          <Table className="no-wrap v-middle" responsive>
            <thead>
              <tr className="border-0">
                <th className="border-0">User Name</th>
                <th className="border-0">Email</th>
                <th className="border-0">Phone Number</th>
                <th className="border-0">Gender</th>
                <th className="border-0">Point</th>
                <th className="border-0" style={{ textAlign: "center" }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {listUser.map((user, key) => (
                <UserItemComponent
                  user={user}
                  key={key}
                  callBack={(response) => setReload(response)}
                />
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
      <PaginationComponent
        totalPage={totalPage}
        setCurrentPage={(pageData) => setLimitPage(pageData)}
        setIndexPage={(indexPage) => setIndexPage(indexPage)}
        indexPage={indexPage}
        currentValue={currentValue}
        setCurrentValue={(value) => setCurrentValue(value)}
        limitPage={limitPage}
        rootTotalPage={rootTotalPage}
      />
    </div>
  );
};

export default UserComponent;
