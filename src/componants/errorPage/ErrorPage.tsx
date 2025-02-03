import { Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1);
    };

    return (
        <>
            <Typography variant="h2">
                Page not found!
            </Typography>
            <Button onClick={handleBackClick}>Back</Button>
        </>
    );
};

export default ErrorPage;
