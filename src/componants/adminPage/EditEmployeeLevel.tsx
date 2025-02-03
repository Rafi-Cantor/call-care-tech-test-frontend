import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store/store";
import { updateLevelId } from "../../redux/slices/employeeSlice";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import LockIcon from "@mui/icons-material/Lock";
import { getLevels, postUpdateEmployeeLevel } from "../../apis/adminApis";
import { toast } from "react-toastify";
import { Achievement } from "../../types/types";


const EditEmployeeLevel = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const activeStep = useSelector((state: RootState) => state.employee.level_id);
  const user_id = useSelector((state: RootState) => state.employee.user_id);
  const dispatch = useDispatch();

  useEffect(() => {
    getLevels()
      .then((response) => {
        console.log(response);
        const fetchedData = response.levels.map(
          (level: Achievement, index: number) => ({
            name: level.name,
            description: level.description,
            unlocked: index <= activeStep,
          })
        );
        setAchievements(fetchedData);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.response.data.msg);
        setLoading(false);
      });
  }, [activeStep]);

  const handleNext = () => {
    if (activeStep < achievements.length - 1) {
      dispatch(updateLevelId(activeStep + 1));
      postUpdateEmployeeLevel(user_id, activeStep + 1)
      .then((response) => {
        toast.success(response.msg);
      })
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      dispatch(updateLevelId(activeStep - 1));
      postUpdateEmployeeLevel(user_id, activeStep - 1)
      .then((response) => {
        toast.success(response.msg);
      })

    }
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 800, mx: "auto", mt: 4 }}>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            {achievements.map((ach, index) => (
              <Box key={index} sx={{ flex: "1 0 30%", minWidth: 250 }}>
                <Card sx={{ p: 2, boxShadow: 3, height: 220 }}>
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    {ach.unlocked ? (
                      <EmojiEventsIcon
                        sx={{ fontSize: 40, color: "gold", mb: 2 }}
                      />
                    ) : (
                      <LockIcon sx={{ fontSize: 40, color: "grey", mb: 2 }} />
                    )}

                    <Box>
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        color="text.primary"
                      >
                        {ach.unlocked
                          ? ach.name
                          : `Locked Achievement ${index + 1}`}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {ach.unlocked
                          ? ach.description
                          : "Employee achievement is locked. "}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{
                backgroundColor: "secondary.main",
                color: "white",
              }}
            >
              Lock
            </Button>
            <Button
              disabled={activeStep === achievements.length - 1}
              onClick={handleNext}
              sx={{
                backgroundColor: "primary.main",
                color: "white",
              }}
            >
              Unlock
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default EditEmployeeLevel;
