import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Header from "./Header";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import { getCookie } from "../util/util";
import { useAppDispatch } from "../store/configureStore";
import { setBasket } from "../../features/basket/basketSlice";


function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buyerId = getCookie("buyerId");
    if (buyerId) {
      agent.Basket.get()
        .then(basket => dispatch(setBasket(basket)))
        .catch(error => console.log(error))
        .finally(() => setLoading(false))
    } else {
      setLoading(false);
    }
  }, [dispatch])

  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? "dark" : "light";
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === "light" ? "#eaeaea" : "#121212"
      },
      secondary: {
        main: "#651fff",
        light: "#834bff",
        dark: "#4615b2"
      }
    }
  })

  function handleThemeChange() {
    setDarkMode(!darkMode)
  }

  if (loading) return <LoadingComponent message="Initializiang App..." />

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <Header darkmode={darkMode} handleThemeChange={handleThemeChange} />
      <Container>
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}

export default App;
