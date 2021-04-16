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
import { ITeachersItemResponse } from "../../../../app/teachers/data-source/http-actions";

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
  teachers: ITeachersItemResponse[];
  onTeacherDetailsClick: (teacher: ITeachersItemResponse) => void;
  areaLabel?: string;
}

const TeachersTable: React.FC<Props> = ({ areaLabel, teachers, onTeacherDetailsClick }) => {
  return (
    <>
      {!teachers.length ? (
        <EmptyBox />
      ) : (
        <TableContainer>
          <Table aria-label={areaLabel}>
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>#</StyledTableCell>
                <StyledTableCell>اسم الأستاذ</StyledTableCell>
                <StyledTableCell>بريد الأستاذ</StyledTableCell>
                <StyledTableCell>اسم الحلقة</StyledTableCell>
                <StyledTableCell>معاينة</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {teachers.map((teacher) => (
                <StyledTableRow key={teacher.id}>
                  <StyledTableCell scope="row">{teacher.id}</StyledTableCell>
                  <StyledTableCell>{teacher.user.name}</StyledTableCell>
                  <StyledTableCell>{teacher.user.email}</StyledTableCell>
                  <StyledTableCell>{teacher.rings[teacher.rings.length - 1].name}</StyledTableCell>
                  <StyledTableCell>
                    <IconButton
                      color="primary"
                      aria-label="معاينة الأستاذ"
                      onClick={() => onTeacherDetailsClick(teacher)}
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

export default TeachersTable;
