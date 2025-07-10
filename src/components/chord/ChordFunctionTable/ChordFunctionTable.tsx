import TableTitle from "@/components/atoms/TableTitle/TableTitle";
import { Chord } from "@/type/music/chord";
import { styled, Table, TableBody, TableCell, tableCellClasses, TableHead, TableRow } from "@mui/material";


const screenWidth = document.documentElement.clientWidth;

type ChordFunctionTableProps = {
    title: string;
    chords: Chord[];
    getKey: (numberOfSeminotes: number) => string;
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: screenWidth < 450 ? 14 : 18,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: screenWidth < 450 ? 14 : 18,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
    backgroundColor: '#202020',
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export default function ChordFunctionTable({title, chords, getKey}: ChordFunctionTableProps) {

    return(
        <>
            <TableTitle>{title}</TableTitle>
            <Table>
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="left" width={132}>Key</StyledTableCell>
                        <StyledTableCell align="left" width={180}>Degree Name</StyledTableCell>
                        <StyledTableCell align="left" width={180}>Function</StyledTableCell>
                        <StyledTableCell align="left" width={400}>Modality</StyledTableCell>
                        <StyledTableCell align="left" width={400}>Scale</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {chords.map((chord) => (
                        <StyledTableRow key={chord.degreeName}>
                            <StyledTableCell scope="row">
                            {getKey(chord.numberOfSeminotes)}
                            </StyledTableCell>
                            <StyledTableCell align="left">{chord.degreeName}</StyledTableCell>
                            <StyledTableCell align="left">{chord.function}</StyledTableCell>
                            <StyledTableCell align="left">{chord.modality.join(', ')}</StyledTableCell>
                            <StyledTableCell align="left">{chord.scales.join(', ')}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
}