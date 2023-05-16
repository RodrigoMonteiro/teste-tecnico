import "./styles.css";
import { Button } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

export function Header(props: any) {
  const { changeTheme, theme } = props;
  const currentTheme = useTheme();

  return (
    <header
      className="header-container"
      style={{ backgroundColor: currentTheme.palette.primary.main }}
    >
      <Button
        className="btn-theme"
        color="secondary"
        onClick={() => changeTheme()}
      >
        {theme === true ? <LightMode /> : <DarkMode />}
      </Button>
    </header>
  );
}
