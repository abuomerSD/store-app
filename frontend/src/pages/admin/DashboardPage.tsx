import { Card, CardContent, Typography } from "@mui/material";
import Navbar from "../../components/Navbar";

const DashboardPage = () => {
  // Example data (replace with API data)
  const stats = [
    { title: "Categories", value: 12 },
    { title: "Products", value: 58 },
    { title: "Users", value: 245 },
  ];

  return (
    <>
      <Navbar />
      <div className="h-[56px]"></div>

      {/* Main Container: Tailwind for layout and background */}
      <div className="p-6 min-h-screen bg-gray-50 mt-[50px] sm:mt-[60px]">
        {/* Grid Container: Tailwind for responsiveness and gap */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((item, idx) => (
            <Card
              key={idx}
              // Tailwind for custom shadow, border-radius, and hover effect
              className="shadow-lg rounded-xl transition duration-300 ease-in-out hover:shadow-2xl"
              sx={{
                // MUI system property to ensure background is explicitly white
                // and to define the border radius if needed (though Tailwind dominates)
                backgroundColor: "white",
              }}
            >
              <CardContent
                // Tailwind for text alignment, applied directly to the content area
                className="text-center"
              >
                {/* MUI Typography for semantic structure and built-in styling */}
                <Typography
                  variant="h6"
                  // Tailwind to enforce strong font weight and color
                  className="font-semibold text-gray-700"
                >
                  {item.title}
                </Typography>

                {/* MUI Typography for the large value */}
                <Typography
                  variant="h4"
                  // Tailwind for spacing, boldest font weight, size, and vibrant color
                  className="mt-4 text-4xl font-extrabold text-indigo-600"
                >
                  {item.value}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
