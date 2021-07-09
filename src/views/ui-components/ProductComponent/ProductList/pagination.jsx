import React, { useState } from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import {
  PRODUCT_FIRST_CURRENT_VALUE_ITEM,
  PRODUCT_FIRST_DEFAULT_LIMIT_PAGE,
} from "../../../../utils/constantApi";

function PaginationComponent(props) {
  const { totalPage, limitPage, indexPage, rootTotalPage } = props;
  const limitToTalPage =
    parseInt(rootTotalPage) * PRODUCT_FIRST_CURRENT_VALUE_ITEM;
  let { currentValue } = props;
  const [pageIndex, setPageIndex] = useState(1);

  const checkPage = (event) => {
    var value = event.target.value;
    var index_page = event.target.innerHTML;

    switch (value) {
      case "first": {
        value = PRODUCT_FIRST_DEFAULT_LIMIT_PAGE;
        index_page = 1;
        break;
      }
      case "last": {
        value = limitToTalPage;
        index_page = rootTotalPage;
        break;
      }
      case "next": {
        if (limitPage === limitToTalPage) {
          value = limitToTalPage;
          index_page = rootTotalPage;
        } else {
          index_page = parseInt(pageIndex) + 1;
          value = parseInt(limitPage) + 16;
        }
        break;
      }
      case "previous": {
        if (limitPage === 16) {
          value = limitPage;
          index_page = 1;
        } else {
          index_page = parseInt(pageIndex) - 1;
          value = parseInt(limitPage) - 16;
        }
        break;
      }
      default:
        break;
    }

    if (parseInt(value) === limitPage) {
      return false;
    }

    props.setCurrentPage(parseInt(value));
    props.setCurrentValue(parseInt(value));
    props.setIndexPage(parseInt(index_page));
    setPageIndex(index_page);
  };

  const showPageItems = () => {
    var result = [];
    for (var i = indexPage; i <= totalPage; i++) {
      result.push(
        <PaginationItem
          key={i}
          active={currentValue === limitPage ? true : false}
        >
          <PaginationLink
            value={currentValue}
            onClick={(event) => checkPage(event)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
      currentValue += 16;
    }
    return result;
  };

  return (
    <Pagination aria-label="Page navigation example" style={{justifyContent: "flex-end"}}>
      <PaginationItem> 
        <PaginationLink value="first" onClick={(event) => checkPage(event)}>
          First
        </PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink value="next" onClick={(event) => checkPage(event)}>
          next
        </PaginationLink>
      </PaginationItem>
      {showPageItems()}
      <PaginationItem>
        <PaginationLink value="previous" onClick={(event) => checkPage(event)}>
          previous
        </PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink value="last" onClick={(event) => checkPage(event)}>
          Last
        </PaginationLink>
      </PaginationItem>
    </Pagination>
  );
}

export default PaginationComponent;
