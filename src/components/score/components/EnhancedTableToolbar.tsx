import Toolbar from '@mui/material/Toolbar';
import { TextField } from '@mui/material';

interface EnhancedTableToolbarProps {
  setSearchString: React.Dispatch<React.SetStateAction<string>>
  screenWidth: number;
  searchString: string;
}
export default function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { setSearchString, screenWidth, searchString } = props;
  return (
    <Toolbar
      sx={{
        height: '100px',
      }}
    >
      <TextField id="title" label="title" variant="filled" color="secondary" defaultValue={searchString} sx={{width: screenWidth > 400 ? '360px' : '280px'}} onChange={(e) => {setSearchString(e.target.value);}} />
    </Toolbar>
  );
}