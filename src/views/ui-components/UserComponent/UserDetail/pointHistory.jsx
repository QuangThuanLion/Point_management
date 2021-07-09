/* -----------START IMPORT IMAGE----------- */
import React from "react";
import { Card, CardBody, CardTitle, Table } from "reactstrap";

/*-----------END IMPORT IMAGE----------- */

const PointHistoryComponent = (props) => {
  const { pointHistory } = props;
  
  var showPointHistory = pointHistory.map((point, key) => {
    let result = [];
    let date = new Date(point.createdAt);
    let formatDate = `${date.getDate()} - ${date.getMonth()} - ${date.getFullYear()}`;
    if (pointHistory.length > 0) {
      result = (
        <tr key={key}>
          <td>{formatDate}</td>
          <td>{point.point}</td>
          <td>{point.name_product}</td>
          <td>{point.description}</td>
        </tr>
      );
    }
    return result;
  });

  return (
    <div>
      <Card>
        <CardTitle className="bg-light border-bottom p-3 mb-0">
          <i className="mdi mdi-apps mr-2"> </i>
          HISTORY POINT
        </CardTitle>
        <CardBody>
          <Table className="no-wrap v-middle" responsive>
            <thead>
              <tr className="border-0">
                <th className="border-0">Date Exchange</th>
                <th className="border-0">Point Exchange</th>
                <th className="border-0">Product</th>
                <th className="border-0">Description</th>
              </tr>
            </thead>
            <tbody>{showPointHistory}</tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default PointHistoryComponent;
