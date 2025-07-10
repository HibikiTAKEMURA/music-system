import PlayButtonStyle from "@/components/atoms/PlayButtonStyle/PlayButtonStyle";
import TableTitle from "@/components/atoms/TableTitle/TableTitle";
import { Chord, Type } from "@/type/music/chord";
import { styled, Table, TableBody, TableCell, tableCellClasses, TableHead, TableRow } from "@mui/material";


const screenWidth = document.documentElement.clientWidth;

type AvailableChordTableProps = {
    title: string;
    chords: Chord[];
    getChordName: (numberOfSeminotes: number, type: Type) => string;
    playChord: (numberOfSeminotes: number, type: Type) => void;
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


export default function AvailableChordTable({title, chords, getChordName, playChord}: AvailableChordTableProps) {

    return(
        <>
            <TableTitle>{title}</TableTitle>
            <Table>
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="left" width={132}>Chord Name</StyledTableCell>
                        <StyledTableCell align="left" width={132}>Degree Name</StyledTableCell>
                        <StyledTableCell align="left" width={180}>Function</StyledTableCell>
                        <StyledTableCell align="left" width={400}>Modality</StyledTableCell>
                        <StyledTableCell align="left" width={400}>Scale</StyledTableCell>
                         <StyledTableCell align="left" width={84}></StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {chords.map((chord) => (
                        <StyledTableRow key={chord.degreeName}>
                            <StyledTableCell scope="row">
                            {getChordName(chord.numberOfSeminotes, chord.type)}
                            </StyledTableCell>
                            <StyledTableCell align="left">{chord.degreeName}</StyledTableCell>
                            <StyledTableCell align="left">{chord.function}</StyledTableCell>
                            <StyledTableCell align="left">{chord.modality.join(', ')}</StyledTableCell>
                            <StyledTableCell align="left">{chord.scales.join(', ')}</StyledTableCell>
                            <StyledTableCell align="left">
                                <PlayButtonStyle onClick={() => playChord(chord.numberOfSeminotes, chord.type)}>
                                    Play
                                </PlayButtonStyle>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
}