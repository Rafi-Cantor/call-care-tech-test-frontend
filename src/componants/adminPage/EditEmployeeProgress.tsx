import { useState, useEffect } from 'react';
import { Slider, Button, Typography, CircularProgress, Stack, IconButton } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from "../../redux/store/store";
import { postUpdateEmployeeXp } from '../../apis/adminApis';
import { toast } from 'react-toastify';
import { useTheme } from '@mui/material/styles'; 
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

const EditEmployeeProgress = () => {
  const progress = useSelector((state: RootState) => state.employee.xp);
  const user_id = useSelector((state: RootState) => state.employee.user_id);

  const [loading, setLoading] = useState(false);
  const [localProgress, setLocalProgress] = useState(progress);

  const theme = useTheme(); 

  useEffect(() => {
    setLocalProgress(progress);
  }, [progress]);

  const handleProgressChange = (_event: Event, newValue: number | number[]) => {
    if (typeof newValue !== "number") return;
    setLocalProgress(newValue);
  };

  const handleSubmit = () => {
    setLoading(true); 
    postUpdateEmployeeXp(user_id, localProgress).then((response) => {
      toast.success(response.msg);
      setLoading(false);
    });
  };

  return (
    <Stack spacing={2} sx={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
      <Typography 
        variant="h6" 
        sx={{ 
          fontWeight: 600, 
          color: theme.palette.text.primary, 
          textAlign: 'centre',  
        }}
      >
        Edit Employee Progress
      </Typography>

      <Slider
        value={localProgress}
        onChange={handleProgressChange}
        min={0}
        max={100}
        step={1}
        sx={{
          width: '100%',
          marginTop: 1,
        }}
      />

      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography 
          variant="h6" 
          sx={{
            color: theme.palette.primary.main, 
            fontWeight: 600,
            width: '150px',
          }}
        >
          {localProgress}%
        </Typography>
        <IconButton
          sx={{
            color: localProgress === 100 ? theme.palette.success.main : theme.palette.text.secondary,
          }}
        >
          <EmojiEventsIcon />
        </IconButton>
      </Stack>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{
          padding: '12px 24px',
          fontSize: '16px',
          borderRadius: theme.shape.borderRadius, 
        }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : 'Update Progress'}
      </Button>
    </Stack>
  );
};

export default EditEmployeeProgress;
