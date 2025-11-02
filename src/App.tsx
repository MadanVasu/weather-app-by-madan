import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "./components/ui/sonner";
import { WeatherDashboard } from "./pages/weather-dashboard";
import { Layout } from "./components/layout";
import { ThemeProvider } from "./context/theme-provider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CityPage } from "./pages/city-page";
import WeatherBackground from "./components/WeatherBackground";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const [condition, setCondition] = useState("Clear");

  // 🪄 Listen for weather updates from WeatherDashboard
  const handleWeatherUpdate = (weatherData: any) => {
    if (weatherData?.weather?.[0]?.main) {
      setCondition(weatherData.weather[0].main);
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {/* Animated Weather Background */}
        <WeatherBackground condition={condition} />

        <ThemeProvider defaultTheme="dark">
          <Layout>
            <Routes>
              <Route
                path="/"
                element={<WeatherDashboard onWeatherUpdate={handleWeatherUpdate} />}
              />
              <Route path="/city/:cityName" element={<CityPage />} />
            </Routes>
          </Layout>
          <Toaster richColors />
        </ThemeProvider>
      </BrowserRouter>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
