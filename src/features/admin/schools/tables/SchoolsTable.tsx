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
  schools: ISchoolsItemResponse[];
  onSchoolDetailsClick: (school: ISchoolsItemResponse) => void;
  areaLabel?: string;
}

const SchoolsTable: React.FC<Props> = ({ areaLabel, schools, onSchoolDetailsClick }) => {
  return (
    <>
      {!schools.length ? (
        <EmptyBox />
      ) : (
        <TableContainer>
          <Table aria-label={areaLabel}>
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>#</StyledTableCell>
                <StyledTableCell>اسم المدرسة</StyledTableCell>
                <StyledTableCell>نوع المدرسة</StyledTableCell>
                <StyledTableCell>موقع المدرسة</StyledTableCell>
                <StyledTableCell>المدينة</StyledTableCell>
                <StyledTableCell>اسم المدير</StyledTableCell>
                <StyledTableCell>معاينة</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {schools.map((school) => (
                <StyledTableRow key={school.id}>
                  <StyledTableCell scope="row">{school.id}</StyledTableCell>
                  <StyledTableCell>{school.name}</StyledTableCell>
                  <StyledTableCell>{school.gender === "MALE" ? "للذكور" : "للإناث"}</StyledTableCell>
                  <StyledTableCell>
                    <Link
                      href={`https://www.google.com/maps/@${school.longitude},${school.latitude},12.5z?hl=ar`}
                      target="_blank"
                    >
                      <IconButton
                        color="primary"
                        aria-label="موقع المدرسة"
                      >
                        <LocationIcon />
                      </IconButton>
                    </Link>
                  </StyledTableCell>
                  <StyledTableCell>{school.address}</StyledTableCell>
                  <StyledTableCell>{school.manager.user.name}</StyledTableCell>
                  <StyledTableCell>
                    <IconButton
                      color="primary"
                      aria-label="معاينة المدرسة"
                      onClick={() => onSchoolDetailsClick(school)}
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
