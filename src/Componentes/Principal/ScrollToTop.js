import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation(); // useLocation proporciona la ruta actual

  useEffect(() => {
    window.scrollTo(0, 0); // Hace scroll al inicio de la página cada vez que cambia el pathname
  }, [pathname]);

  return null;
}
