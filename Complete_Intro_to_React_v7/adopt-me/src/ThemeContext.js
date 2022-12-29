import { createContext } from "react";

// createContext([defaultValue, setterFunction]). That default value passed to the function,
// it's only purpose on this case is to mimmick a useState hook.
const ThemeContext = createContext(["darkblue", () => {}]);

export default ThemeContext;
