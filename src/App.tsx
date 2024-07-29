import { useState, useEffect } from "react";
// import "./App.css";
import { IssueList } from "./components/IssueList/IssueList.tsx";
import { DesignersList } from "./components/DesignersTableList/DesignersTableList.tsx";
import { Routes, Route, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HomePage } from "./components/HomePage/HomePage.tsx";
import style from "./App.module.css";

function App() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    localStorage.setItem("lang", language);
  };

  const [theme, setTheme] = useState("");

  useEffect(()=>{
    const lang = localStorage.getItem('lang')
    if (lang) {
      i18n.changeLanguage(lang);
    } else i18n.changeLanguage('ru')
  }, [])

  // useEffect(() => {
  //   if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  //     setTheme("dark");
  //     localStorage.setItem("theme", "dark");
  //   } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
  //     setTheme("light");
  //     localStorage.setItem("theme", "light");
  //   }
  // }, []);

  useEffect (() => {
    const checkTheme = localStorage.getItem('theme') ?? 'light'; setTheme(checkTheme); 
    // if(checkTheme) {
    //   setTheme(checkTheme);
    // } else setTheme('light')
  }, [])

  function toggleDaerkTheme() {
    setTheme("dark");
    localStorage.setItem("theme", "dark");
  }

  function toggleLightTheme() {
    setTheme("light");
    localStorage.setItem("theme", "light");
  }

  function getWeekNumber() {
    const currentDate = new Date();
    const currentYear = new Date(currentDate.getFullYear(), 0, 0);
    const currentWorkWeek = Math.floor(
      (currentDate.valueOf() - currentYear.valueOf() - 10 * 60 * 60 * 1000) /
      (1000 * 60 * 60 * 24 * 7) +
      1
    );
    return currentWorkWeek;
  }

  return (
    <div id={theme} className={style.container}>
      <h1 className={style.title}>{t("title")}</h1> <hr />
      <hr />
      <div className={style.buttons}>
        <button className={style.button} onClick={() => toggleDaerkTheme()}>
          {t("Header.theme_button_dark")}
        </button>
        <button onClick={() => toggleLightTheme()}>
          {t("Header.theme_button_light")}
        </button>
        <button onClick={() => changeLanguage("en")}>EN</button>
        <button onClick={() => changeLanguage("ru")}>RU</button>
      </div>
      <hr />
      <h4 className={style.week}>
        {t("Header.weeks")} {getWeekNumber()}
      </h4>
      <hr />
      <div className={style.description}>
        <p>{t("description.part1")}</p>
        <p>{t("description.part2")}</p>
        <p>{t("description.part3")}</p>
      </div>
      <hr />
      <div className={style.links}>
        <NavLink to="/">{t("Header.home_page_link")}</NavLink>
        <NavLink to="/designerList/">{t("Header.designers_list_link")}</NavLink>
        <NavLink to="/issueList/">{t("Header.issues_link")}</NavLink>
      </div>
      <hr />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/issueList/" element={<IssueList />} />
        <Route path="/designerList/" element={<DesignersList />} />
      </Routes>
    </div>
  );
}

export default App;
