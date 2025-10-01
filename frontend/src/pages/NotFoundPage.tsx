import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="lg"
      className="flex flex-col items-center justify-center h-screen text-center"
    >
      <Typography
        variant="h1"
        className="text-7xl font-bold text-blue-600 mb-4"
      >
        404
      </Typography>
      <Typography variant="h5" className="text-gray-700 mb-6">
        Oops! The page you are looking for does not exist.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/")}
        className="px-6 py-2 rounded-lg"
      >
        Go Back Home
      </Button>
    </Container>
  );
}
