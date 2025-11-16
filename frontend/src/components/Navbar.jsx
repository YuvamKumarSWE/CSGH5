import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

function Navbar() {
  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{
        bgcolor: 'background.paper',
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <Toolbar>
        <AutoStoriesIcon sx={{ mr: 2, color: 'primary.main' }} />
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            fontWeight: 600,
            color: 'text.primary',
          }}
        >
          StudyForgeAI
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {/* Placeholder for future user-related components */}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
