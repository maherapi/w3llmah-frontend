import React from "react";
import {
  createStyles,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Theme,
  withStyles,
} from "@material-ui/core";
import { Visibility as EyeIcon } from "@material-ui/icons";
import { IOrdersItemResponse } from "../../../../app/orders/data-source/http-actions";
import EmptyBox from "../../../../common/components/common/EmptyBox";

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
  orders: IOrdersItemResponse[];
  onOrderDetailsClick: (order: IOrdersItemResponse) => void;
  areaLabel?: string;
}

const OrdersTable: React.FC<Props> = ({ areaLabel, orders, onOrderDetailsClick }) => {
  return (
    <>
      {!orders.length ? (
        <EmptyBox />
      ) : (
        <TableContainer>
          <Table aria-label={areaLabel}>
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>#</StyledTableCell>
                <StyledTableCell>اسم المدرسة</StyledTableCell>
                <StyledTableCell>اسم المدير</StyledTableCell>
                <StyledTableCell>الجوال</StyledTableCell>
                <StyledTableCell>معاينة</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <StyledTableRow key={order.id}>
                  <StyledTableCell scope="row">{order.id}</StyledTableCell>
                  <StyledTableCell>{order.request_by_user.userable.school.name}</StyledTableCell>
                  <StyledTableCell>{order.request_by_user.name}</StyledTableCell>
                  <StyledTableCell>{order.request_by_user.phone}</StyledTableCell>
                  <StyledTableCell>
                    <IconButton color="primary" aria-label="معاينة الطلب" onClick={() => onOrderDetailsClick(order)}>
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

export default OrdersTable;
