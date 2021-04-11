import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";
import { Avatar, Box } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: "relative",
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
    screenContainer: {
      display: "flex",
      flexDirection: "column",
    },
  })
);

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
  title: string;
  open: boolean;
  onClose: () => void;
  avatar?: {
    src?: string;
    alt?: string;
  };
}

export const FullScreenDialog: React.FC<Props> = ({ title, open, onClose, avatar = null, children }) => {
  const classes = useStyles();

  return (
    <>
      <Dialog
        fullScreen
        open={open}
        onClose={onClose}
        TransitionComponent={Transition}
        className={classes.screenContainer}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={onClose} aria-label={`أغلق شاشة ${title}`}>
              <CloseIcon />
            </IconButton>
            {avatar !== null ? <Avatar src={avatar.src} alt={avatar.alt} /> : ""}
            <Typography variant="h6" className={classes.title}>
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
        <Box flexGrow={0} display="flex" flexDirection="column">
          {children}
        </Box>
      </Dialog>
    </>
  );
};

export default FullScreenDialog;
