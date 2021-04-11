import { Box, Typography } from "@material-ui/core";
import { Inbox as InboxIcon } from "@material-ui/icons";
import React from "react";

interface Props {
  scale?: number;
}

const EmptyBox: React.FC<Props> = ({ scale = 50 }) => {
  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" marginTop="50px">
      <InboxIcon color="secondary" style={{fontSize: scale}} />
      <Typography color="secondary">
        القائمة فارغة
      </Typography>
    </Box>
  );
};

export default EmptyBox;
