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
import PlayButtonStyle from '@/components/atoms/PlayButtonStyle/PlayButtonStyle';
import getScoreData from '@/helper/getScoreData';
import { useAtom } from 'jotai';
import { scoreDataAtom } from '@/jotais/default';


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
  justify-content: ${screenWidth < 450 ? 'left' : 'center'};
  width: 100%;
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
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof ScoreData>('title');
  const [selected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = useAtom(scoreDataAtom);
  const [searchString, setSearchString] = React.useState<string>('');
  const [visibleRows, setVisibleRows] = React.useState<ScoreData[]>([]);
  const [sortedRowLength, setSortedRowLength] = React.useState(0);

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

  function formatDateString(dateString: string) {
    // 引数として受け取った日時文字列をDateオブジェクトに変換
    const date = new Date(dateString);
  
    // 年、月、日、時間、分を取得
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // 月は0から始まるため+1
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  
    // フォーマットした文字列を返す
    return `${year}/${month}/${day} ${hours}:${minutes}`;
  }


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
    setSortedRowLength(sortedRows.length);
    const paginatedRows = sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    setVisibleRows(paginatedRows);
  }, [rows, order, orderBy, page, rowsPerPage, searchString]);

  React.useEffect(() => {
    setPage(0);
  }, [setPage, searchString]);

  React.useEffect(() => {
    if (rows.length !== 0) {
      return; // 既にデータがある場合は再取得しない
    }
    getScoreData().then((data) => {
      if (data) {
        setRows(data);
        setOrder('asc');
      } else {
        console.error('Failed to fetch score data');
      }
    });
  }, []);

  return (
    <Container>
      <NoteStyle>
        <h1>Scores</h1>
      </NoteStyle>
      <TableStyle>
        <Paper sx={{ width: '1250px', mb: 2, padding: 3, overflow: 'auto' }}>
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
                        sx={{ width: '150px', height: '72px', fontSize: '18px', fontWeight: 1000 }}
                      >
                        <a href={row.url} style={{ color: '#c1e4e9' }}>{row.title}</a>
                      </TableCell>
                      <TableCell align="left" sx={{ width: '150px', fontSize: '18px', color: '#ded5c0' }}>{row.composer}</TableCell>
                      <TableCell align="left" sx={{ width: '150px', fontSize: '18px', color: '#ded5c0' }}>{row.majorPlayers.join(", ")}</TableCell>
                      <TableCell align="left" sx={{ width: '150px', fontSize: '18px', color: '#ded5c0' }}>{formatDateString(row.lastUpdated)}</TableCell>
                      <TableCell align="center">
                        {row.irealUrl && (<PlayButtonStyle>
                          <a href={row.irealUrl}>iReal</a>
                        </PlayButtonStyle>)}
                      </TableCell>
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
          <TablePagination
            sx={{
              width: screenWidth < 450 ? '350px' : screenWidth < 800 ? '425px' : '100%',
              color: '#f6ad49',
              '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows, ': {
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
            count={sortedRowLength}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage={'Rows/page'}
          />
        </Paper>
      </TableStyle>
    </Container>
  );
}
