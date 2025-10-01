import { Card, CardContent, Typography, Button } from "@mui/material";

export default function HomePage() {
  const sections = [
    {
      title: "📦 Inventory",
      description:
        "Track stock levels, add new products, and manage categories.",
      buttonText: "Manage Inventory",
      color: "primary",
    },
    {
      title: "💰 Sales",
      description:
        "View sales reports, track daily transactions, and generate invoices.",
      buttonText: "View Sales",
      color: "success",
    },
    {
      title: "👥 Staff",
      description:
        "Manage employee roles, schedules, and performance insights.",
      buttonText: "Manage Staff",
      color: "secondary",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      {/* Header */}
      <header className="mb-8 text-center">
        <Typography variant="h4" className="font-bold text-blue-600">
          🏪 Store Management System
        </Typography>
        <Typography variant="subtitle1" className="text-gray-600 mt-2">
          Manage your inventory, sales, and staff all in one place
        </Typography>
      </header>

      {/* Cards Container */}
      <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0 w-full max-w-6xl">
        {sections.map((section, index) => (
          <Card
            key={index}
            className="flex-1 shadow-lg hover:shadow-xl transition rounded-2xl"
          >
            <CardContent className="text-center p-6">
              <Typography variant="h6" className="mb-2 font-semibold">
                {section.title}
              </Typography>
              <Typography variant="body2" className="text-gray-600 mb-4">
                {section.description}
              </Typography>
              <Button
                variant="contained"
                color={
                  section.color as
                    | "primary"
                    | "secondary"
                    | "success"
                    | "error"
                    | "info"
                    | "warning"
                }
                fullWidth
              >
                {section.buttonText}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
