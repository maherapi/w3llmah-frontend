import { Dialog, DialogTitle, DialogContent, DialogActions, Button, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "../../../app/auth/authSlice";
import { getAllRings, selectAllRings } from "../../../app/rings/ringsSlice";
import CustomSelectWithoutForm from "./CustomSelectWithouForm";

const useStyles = makeStyles((theme) => ({
  img: {
    maxWidth: "100%",
  },
}));

interface Props {
  title?: string;
  open: boolean;
  handleClose: () => void;
  handleSave: (ringId: number) => void;
}

const EditRingDialog: React.FC<Props> = ({ open, title = "تعديل الحلقة", handleClose, handleSave }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const user = useSelector(selectLoggedInUser);
  const rings = useSelector(selectAllRings);

  const [selectedRing, setSelecteRing] = useState("");

  useEffect(() => {
    if (rings.length === 0) {
      dispatch(getAllRings(user.id));
    }
  }, []);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <CustomSelectWithoutForm
          onChange={(e) => setSelecteRing(`${e.target.value}`)}
          options={rings.map((r) => ({ text: r.name, value: `${r.id}` }))}
          label="اختر حلقة"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleSave(+selectedRing)} color="primary" autoFocus disabled={selectedRing === ""}>
          حفظ
        </Button>
        <Button onClick={handleClose} color="default" autoFocus>
          أغلق
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditRingDialog;
