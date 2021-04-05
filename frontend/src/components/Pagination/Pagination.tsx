import { Button } from "@material-ui/core";
import React from "react";
import styles from "./Pagination.module.scss";

export interface PaginationProps {
  totalPages: number;
  page: number;
  gotoPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = (props) => {

  const next = () => {
    if (props.page >= props.totalPages) {
      return;
    }
    props.gotoPage(props.page + 1);

  };

  const previous = () => {
    if (props.page <= 1) {
      return;
    }
    props.gotoPage(props.page - 1);
  };

  const nextButton = (
    <Button onClick={next} variant="contained">
      繼續
    </Button>
  );
  const previousButton = (
    <Button onClick={previous} variant="contained">
      返回
    </Button>
  );
  const submitButton = (
    <Button variant="contained" color="primary">
      提交
    </Button>
  );

  if (props.page === 1) {
    return <div className={styles.Pagination}>{nextButton}</div>;
  } else if (props.page === props.totalPages) {
    return (
      <div className={styles.Pagination}>
        {previousButton}
        {submitButton}
      </div>
    );
  } else {
    return (
      <div className={styles.Pagination}>
        {previousButton}
        {nextButton}
      </div>
    );
  }
};

export default Pagination;
