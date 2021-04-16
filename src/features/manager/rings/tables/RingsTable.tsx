import React from "react";
import {
  createStyles,
  IconButton,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Theme,
  withStyles,
} from "@material-ui/core";
import { Visibility as EyeIcon, LocationOn as LocationIcon } from "@material-ui/icons";
import EmptyBox from "../../../../common/components/common/EmptyBox";
import { ISchoolsItemResponse } from "../../../../app/schools/data-source/http-actions";
import { getAllRings, IRingsItemResponse } from "../../../../app/rings/data-source/http-actions";

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.primary.contrastText,
    },
    body: {
      fontSize: 14,
    },
  })
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow);

interface Props {
  rings: IRingsItemResponse[];
  onRingDetailsClick: (ring: IRingsItemResponse) => void;
  areaLabel?: string;
}

const SchoolsTable: React.FC<Props> = ({ areaLabel, rings, onRingDetailsClick }) => {
  return (
    <>
      {!rings.length ? (
        <EmptyBox />
      ) : (
        <TableContainer>
          <Table aria-label={areaLabel}>
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>#</StyledTableCell>
                <StyledTableCell>اسم الحلقة</StyledTableCell>
                <StyledTableCell>العدد الأقصى للطلاب</StyledTableCell>
                <StyledTableCell>الفترة</StyledTableCell>
                <StyledTableCell>اسم الأستاذ</StyledTableCell>
                <StyledTableCell>معاينة</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {rings.map((ring) => (
                <StyledTableRow key={ring.id}>
                  <StyledTableCell scope="row">{ring.id}</StyledTableCell>
                  <StyledTableCell>{ring.name}</StyledTableCell>
                  <StyledTableCell>{ring.max_student}</StyledTableCell>
                  <StyledTableCell>{ring.period === "MORNING" ? "صباحية" : "مسائية"}</StyledTableCell>
                  <StyledTableCell>{ring.teacherName}</StyledTableCell>
                  <StyledTableCell>
                    <IconButton
                      color="primary"
                      aria-label="معاينة الحلقة"
                      onClick={() => onRingDetailsClick(ring)}
                    >
                      <EyeIcon />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default SchoolsTable;
