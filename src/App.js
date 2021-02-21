import React from "react";
import useSettings from "./hooks/useSettings";
import { createTheme } from "./theme";
import { jssPreset, StylesProvider, ThemeProvider } from "@material-ui/core";
import { create } from "jss";
import rtl from "jss-rtl";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { AuthProvider } from "./contexts/AuthContext";
import GlobalStyles from "./components/GlobalStyles";
import { TabsProvider } from './contexts/TabsContext';
import routes, { renderRoutes } from './routes';

export default function App() {
  const { settings } = useSettings();
  const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
  const history = createBrowserHistory();

  const theme = createTheme({
    direction: settings.direction,
    responsiveFontSizes: settings.responsiveFontSizes,
    theme: settings.theme
  });

  return (
    <ThemeProvider theme={theme}>
      <StylesProvider jss={jss}>
        <Router history={history}>
          <AuthProvider>
          <TabsProvider>
            <GlobalStyles />
            {renderRoutes(routes)}
          </TabsProvider>
          </AuthProvider>
        </Router>
      </StylesProvider>
    </ThemeProvider>
  );
}
