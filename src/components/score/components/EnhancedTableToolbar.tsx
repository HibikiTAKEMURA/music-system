import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { TextField } from '@mui/material';

interface EnhancedTableToolbarProps {
  numSelected: number;
}
export default function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected } = props;
  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        },
        numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        },
      ]}
    >
      {/* <TextField id="title" label="title" variant="filled" color="secondary" fullWidth /> */}
    </Toolbar>
  );
}