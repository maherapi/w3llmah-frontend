import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  makeStyles,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  img: {
    maxWidth: "100%",
  },
}));

interface Props {
  title: string;
  imgSrc: string;
  open: boolean;
  handleClose: () => void;
}

const ImageDialog: React.FC<Props> = ({ open, title, imgSrc, handleClose }) => {
  const classes = useStyles();
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <img src={imgSrc} alt={title} className={classes.img} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          أغلق
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImageDialog;
