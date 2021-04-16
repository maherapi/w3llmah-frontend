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
import { IStudentsItemResponse } from "../../../../app/students/data-source/http-actions";

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
  students: IStudentsItemResponse[];
  onStudentDetailsClick: (student: IStudentsItemResponse) => void;
  areaLabel?: string;
}

const StudentsTable: React.FC<Props> = ({ areaLabel, students, onStudentDetailsClick }) => {
  return (
    <>
      {!students.length ? (
        <EmptyBox />
      ) : (
        <TableContainer>
          <Table aria-label={areaLabel}>
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>#</StyledTableCell>
                <StyledTableCell>اسم الطالب</StyledTableCell>
                <StyledTableCell>بريد الطالب</StyledTableCell>
                <StyledTableCell>اسم الحلقة</StyledTableCell>
                <StyledTableCell>معاينة</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <StyledTableRow key={student.id}>
                  <StyledTableCell scope="row">{student.id}</StyledTableCell>
                  <StyledTableCell>{student.user.name}</StyledTableCell>
                  <StyledTableCell>{student.user.email}</StyledTableCell>
                  <StyledTableCell>{student.ring.name}</StyledTableCell>
                  <StyledTableCell>
                    <IconButton
                      color="primary"
                      aria-label="معاينة الطالب"
                      onClick={() => onStudentDetailsClick(student)}
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

export default StudentsTable;
