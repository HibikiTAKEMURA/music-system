import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EnhancedTableToolbar from './components/EnhancedTableToolbar';
import EnhancedTableHead from './components/EnhancedTableHead';
import axiosBase from 'axios';
import { ScoreData } from '../../type/api/ScoreData';
import { Order } from '../../type/utility/general';
import { styled } from 'styled-components';
import Container from '../atoms/Container';


const screenWidth = document.documentElement.clientWidth;

function createData(
  id: number,
  title: string,
  url: string,
  composer: string,
  lastUpdated: string,
  majorPlayers: string[],
  irealUrl?: string,
): ScoreData {
  return {
    id,
    title,
    url,
    composer,
    lastUpdated,
    majorPlayers,
    irealUrl,
  };
}

// const rows = [
//   createData(1, 'Circus', 'https://drive.google.com/file/d/1Ta7tq4QlQU_cSmX-mAz2C_GgZMoHmHm8/view?usp=drive_link', 'Louis Alter', '2025/2/15', ['Art Blakey & Jazz Messengers', 'Steve Grossman']),
//   createData(2, 'Driftin', 'https://drive.google.com/file/d/1UxxcPRP6eCYawrhcSeMwlEPt_17nMVxu/view?usp=drive_link', 'Herbie Hancock', '2025/2/15', ['Herbie Hancock']),
//   createData(3, 'Sweet Pumpkin', 'https://drive.google.com/file/d/1G7_mGVY-tgTxjBSzFOogg_8uXb3BZBoM/view?usp=drive_link', 'Ronnell Bright', '2025/2/15', ['Blue Mitchlle']),
//   createData(4, 'Passages', 'https://drive.google.com/file/d/19jYEG4w-upONcC3ndjvkkOuDOl2D3yNU/view?usp=drive_link', 'Bob Brookmeyer', '2025/2/15', ['Bob Brookmeyer']),
//   createData(5, 'Voyage', 'https://drive.google.com/file/d/1VdpG72gkpnbJ9IVVgsYKVSQQMOlqGQiV/view?usp=drive_link', 'Kenny Barron', '2025/2/15', ['Kenny Barron', 'George Robert']),
//   createData(6, 'Time to Smile', 'https://drive.google.com/file/d/1s1Yg1b9Q0nKbK7hWUlDJ7Gx764hHZ7IV/view?usp=drive_link', 'Freddie Redd', '2025/2/15', ['Freddie Redd', 'Steve Grossman']),
// ];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(
  order: Order,
  orderBy: keyof ScoreData,
): (
  a: ScoreData,
  b: ScoreData,
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const TableStyle = styled.div`
  display: flex;
  justify-content: ${screenWidth < 400 ? 'left' : 'center'};
  width: 100%;
  overflow-x: auto; /* 横方向のスクロールを有効化 */
  overflow-y: hidden; /* 縦方向のスクロールを非表示 */
  white-space: nowrap; /* コンテンツの折り返しを防ぐ */
  box-sizing: border-box; /* パディングやボーダーを幅に含める */
`;

const NoteStyle = styled.div`
  padding: 24px 0;
  display: flex;
  justify-content: center;
`;

export default function ScoreContent() {
  const [order, setOrder] = React.useState<Order>('desc');
  const [orderBy, setOrderBy] = React.useState<keyof ScoreData>('title');
  const [selected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState<ScoreData[]>([]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof ScoreData,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      [...rows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage],
  );

  React.useEffect(() => {
    // POST リクエストを送信する関数
    const sendPostRequest = async () => {
      try {
        const response = await fetch("https://script.google.com/macros/s/AKfycbxm1wcpNCgnVgZF-PvppnNvRwHyDu1apRCKBeUtG3decpidDqn6cjz421TvjlCAS5Cn/exec", {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain',
          },
          body: JSON.stringify({ key: "value" }), // 必要なデータをJSON形式で送る
        });

        // レスポンスをJSON形式で取得
        response.json().then((data) => {
          setRows(data);
          setOrder('asc');
        });
      } catch (error) {
        console.error("Error:", error);
      }
    };

    sendPostRequest(); // 関数を呼び出す
  }, []);

  return (
    <Container>
      <NoteStyle>
        <h1>Scores</h1>
      </NoteStyle>
      <TableStyle>
        <Paper sx={{ width: '1200px', mb: 2, padding: 3 }}>
          <EnhancedTableToolbar numSelected={selected.length} />
          <TableContainer>
            <Table
              aria-labelledby="tableTitle"
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {visibleRows.map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      role="checkbox"
                      tabIndex={-1}
                      key={index}
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        sx={{ width: '150px' }}
                      >
                        <a href={row.url}>{row.title}</a>
                      </TableCell>
                      <TableCell align="left" sx={{ width: '150px' }}>{row.composer}</TableCell>
                      <TableCell align="left" sx={{ width: '150px' }}>{row.majorPlayers.join(", ")}</TableCell>
                      <TableCell align="left" sx={{ width: '150px' }}>{row.lastUpdated}</TableCell>
                      {/* <TableCell align="right">{row.protein}</TableCell> */}
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination sx={{ width: screenWidth < 400 ? '300px' : screenWidth < 800 ? '400px' : '850px' }}
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </TableStyle>
    </Container>
  );
}
