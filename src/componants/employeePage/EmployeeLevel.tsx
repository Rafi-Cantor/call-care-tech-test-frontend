import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { Box, Card, CardContent, Typography, CircularProgress, Button } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import LockIcon from "@mui/icons-material/Lock";
import { getLevels } from "../../apis/employeeApis";
import { Achievement } from "../../types/types";
import { toast } from "react-toastify";


const EmployeeLevel = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [redeemedCodes, setRedeemedCodes] = useState<{ [key: string]: boolean }>({});

  const user_id = useSelector((state: RootState) => state.employee.user_id);
  const level_id = useSelector((state: RootState) => state.employee.level_id);

  useEffect(() => {
    if (!user_id) return;
    setLoading(true)
  
      getLevels().then((response) => {
        setLoading(false);
        const updatedAchievements = response.levels.map((ach: Achievement, index: number) => ({
          ...ach,
          unlocked: index + 1 <= level_id,
        }));
        setAchievements(updatedAchievements);
      }).catch((error) => {
        setLoading(false);
        toast.error(error.response.data.msg);
      })
  }, [user_id, level_id]);

  const handleRedeemCode = (achievement: Achievement) => {
    if (achievement.unlocked) {
      setRedeemedCodes((prev) => ({ ...prev, [achievement.name]: true }));
    }
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 800, mx: "auto", mt: 4 }}>
      {loading ? (
        <CircularProgress />
      ) : (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          {achievements.map((ach, index) => (
            <Box key={index} sx={{ flex: "1 0 30%", minWidth: 250 }}>
              <Card sx={{ p: 2, boxShadow: 3, height: 250, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  {ach.unlocked ? (
                    <EmojiEventsIcon sx={{ fontSize: 40, color: "gold", mb: 2 }} />
                  ) : (
                    <LockIcon sx={{ fontSize: 40, color: "grey", mb: 2 }} />
                  )}
                  <Box sx={{ textAlign: "center" }}>
                    <Typography variant="h6" fontWeight="bold" color="text.primary">
                      {ach.unlocked ? ach.name : `Locked Achievement ${index + 1}`}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {ach.unlocked ? ach.description : "Achievement is locked."}
                    </Typography>
                  </Box>
                </CardContent>
                {ach.unlocked && (
                  <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
                    {redeemedCodes[ach.name] ? (
                      <Typography variant="body1" color="primary" fontWeight="bold">
                        Code: {ach.code}
                      </Typography>
                    ) : (
                      <Button variant="contained" color="primary" onClick={() => handleRedeemCode(ach)}>
                        Redeem Code
                      </Button>
                    )}
                  </Box>
                )}
              </Card>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default EmployeeLevel;
