import React from "react";
import { useMemoizedFn, useBoolean } from 'ahooks';
import { Button, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import styles from "./styles.module.scss";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import searchSlice, { selectSearechValue } from "./searchState";
import { useNavigate } from "react-router-dom";


const Header: React.FC = () => {
  const navigate = useNavigate();
  const keyword = useAppSelector(selectSearechValue);
  const dispatch = useAppDispatch();
  const [err, { setFalse, setTrue }] = useBoolean(false)

  const handleSearch = useMemoizedFn(() => {
    if (!keyword?.length) {
      setTrue();
      return;
    }
    navigate(`/search/${keyword.replace(/ /gi, '+')}`)
  })

  return (
    <div className={styles.header}>
      <h1 className={styles.logo}>
        <strong>Best</strong> Search
      </h1>
      <div className={styles.box}>
        <TextField
          value={keyword}
          onChange={(e) => {
            dispatch(searchSlice.actions.input(e.target.value))
            setFalse();
          }}
          size="small"
          variant="outlined"
          fullWidth
          placeholder="Search for new products in 961K stores"
          error={err}
          helperText={err ? '请输入关键词' : null}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch()
          }}
        />
      </div>
      <Button variant="outlined" color="neutral" size="large" onClick={handleSearch}><SearchIcon /></Button>
    </div>
  );
};

export default Header;
