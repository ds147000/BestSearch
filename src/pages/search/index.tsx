import {
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useDebounceEffect, useBoolean } from "ahooks";
import { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./styles.module.scss";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Header from "../../components/Header";
import searchSlice, {
  parseUrlKeyword,
  searchFetch,
  selectSearechList,
  selectSearechStatus,
} from "../../components/Header/searchState";
import ProductCard from "../../components/ProductCard/card";

const Search: React.FC = () => {
  const params = useParams<{ keyword?: string }>();
  const [isErr, { setTrue: showError, setFalse: hdieError }] = useBoolean();
  const [errorMsg, setErrorMsg] = useState("");
  const keyword = parseUrlKeyword(params.keyword);
  const status = useAppSelector(selectSearechStatus);
  const list = useAppSelector(selectSearechList);
  const dispatch = useAppDispatch();

  useDebounceEffect(
    () => {
      dispatch(searchSlice.actions.input(keyword));
      if (keyword) {
        dispatch(searchFetch(keyword)).then((res: any) => {
          if (res.error) {
            showError();
            setErrorMsg(res.error.message || "未知错误");
          }
        });
      }
    },
    [keyword, dispatch],
    { wait: 250 }
  );

  return (
    <div className="page">
      <Header />
      <div className={styles.list}>
        <h2>Related product trends</h2>
        {list?.map((item) => (
          <ProductCard {...item} key={item.name + item.search_msv.length} />
        ))}
      </div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={status === "loading"}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Dialog
        open={isErr}
        onClose={hdieError}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">发生错误</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {errorMsg}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={hdieError}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Search;
