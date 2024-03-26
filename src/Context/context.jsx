import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const Darkmodecontext = createContext()

function DarkmodeProvider({ children }) {

  const [isDarkmode, setisdarkmode] = useLocalStorageState(window.matchMedia(`(prefers-color-scheme:dark)`).matches, "isDarkmode")

  useEffect(function () {
    if (isDarkmode) {
      document.documentElement.classList.add('dark-mode');
      document.documentElement.classList.remove('light-mode');
    } else {
      document.documentElement.classList.add('light-mode');
      document.documentElement.classList.remove('dark-mode');
    }
  }, [isDarkmode])

  function ToggleDarkmode() {
    setisdarkmode((isdarkmode) => !isdarkmode)
  }

  return <Darkmodecontext.Provider value={{ isDarkmode, ToggleDarkmode }}>
    {children}
  </Darkmodecontext.Provider>
}

function useDarkmode() {
  const context = useContext(Darkmodecontext);
  if (context === undefined) throw new Error("Darkmode context was used outside of darkmode")
  return context
}

export { DarkmodeProvider, useDarkmode }