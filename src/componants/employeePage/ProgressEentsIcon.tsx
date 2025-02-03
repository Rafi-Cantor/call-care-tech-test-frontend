import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";

const ProgressIcon = () => {

  const progress = useSelector((state: RootState) => state.employee.xp);


  const fillColour = "#6CC071"; 
  const maskHeight = `${100 - progress}%`; 

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%", 
        overflow: "hidden", 
        margin: '50px 0px'

      }}
    >
      <div style={{ position: "relative", width: 150, height: 150 }}>
        <EmojiEventsIcon
          sx={{
            fontSize: 150,
            color: "#D3D3D3",
          }}
        />

        <EmojiEventsIcon
          sx={{
            fontSize: 150,
            color: fillColour,
            position: "absolute",
            top: 0,
            left: 0,
            clipPath: `inset(${maskHeight} 0 0 0)`, 
          }}
        />
      </div>
    </div>
  );
};

export default ProgressIcon;
