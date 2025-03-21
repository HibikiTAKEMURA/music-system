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
import { ScoreData } from '../../type/api/ScoreData';
import { Order } from '../../type/utility/general';
import { styled } from 'styled-components';
import Container from '../atoms/Container';


const screenWidth = document.documentElement.clientWidth;

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
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState<ScoreData[]>([]);
  const [searchString, setSearchString] = React.useState<string>('');
  const [visibleRows, setVisibleRows] = React.useState<ScoreData[]>([]);

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

  React.useEffect(() => {
    // 検索文字列に一致する行を抽出
    // 大文字と小文字を区別せずに検索する
    const filteredRows = rows.filter((row) => {
      if (searchString === '') {
      return true;
      }
      return row.title.toLowerCase().includes(searchString.toLowerCase());
    });

    const sortedRows = filteredRows.sort(getComparator(order, orderBy));
    const paginatedRows = sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    setVisibleRows(paginatedRows);
  }, [rows, order, orderBy, page, rowsPerPage, searchString]);

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
          <EnhancedTableToolbar
            setSearchString={setSearchString}
            screenWidth={screenWidth}
          />
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
                        sx={{ width: '150px', fontSize: '18px', fontWeight: 1000 }}
                      >
                        <a href={row.url} style={{ color: '#7799FF' }}>{row.title}</a>
                      </TableCell>
                      <TableCell align="left" sx={{ width: '150px', fontSize: '18px' }}>{row.composer}</TableCell>
                      <TableCell align="left" sx={{ width: '150px', fontSize: '18px' }}>{row.majorPlayers.join(", ")}</TableCell>
                      <TableCell align="left" sx={{ width: '150px', fontSize: '18px' }}>{row.lastUpdated}</TableCell>
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
          {/* ToDo フォントの大きさを18pxに設定する */}
          <TablePagination
            sx={{
              width: screenWidth < 400 ? '300px' : screenWidth < 800 ? '400px' : '850px',
              color: '#FFCCAA',
              '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
                fontSize: '16px',
                fontWeight: 600,
              },
              '& .MuiTablePagination-select, & .MuiTablePagination-actions': {
                fontSize: '16px',
                fontWeight: 600,
              }
            }}
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
