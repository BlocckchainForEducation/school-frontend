import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";

export default function SimpleTable({ head, body }) {
  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            {head.map((columnTitle, index) => (
              <TableCell key={index}>{columnTitle}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {body.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {row.map((cell, index) => (
                <TableCell key={index}>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
