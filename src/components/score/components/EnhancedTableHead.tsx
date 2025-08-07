// import Box from '@mui/material/Box';
import TableHead from '@mui/material/TableHead';
// import TableSortLabel from '@mui/material/TableSortLabel';
// import { visuallyHidden } from '@mui/utils';

import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { ScoreData } from '@/type/api/ScoreData';


type Order = 'asc' | 'desc';

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof ScoreData) => void;
  // onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

interface HeadCell {
  id: keyof ScoreData;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'title',
    numeric: false,
    label: 'Title',
  },
  {
    id: 'composer',
    numeric: false,
    label: 'Composer',
  },
  {
    id: 'majorPlayers',
    numeric: false,
    label: 'Majpr Players',
  },
  {
    id: 'lastUpdated',
    numeric: false,
    label: 'Last Updated',
  },
  {
    id: 'irealUrl',
    numeric: false,
    label: 'iReal Data',
  },
];

export default function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy } =
    props;
  // const createSortHandler =
  //   (property: keyof ScoreData) => (event: React.MouseEvent<unknown>) => {
  //     onRequestSort(event, property);
  //   };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : headCell.id === 'irealUrl' ? 'center' : 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
            {/* <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel> */}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}