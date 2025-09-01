import { createContext } from "react";
import navigationValues from "./navigationValues";
const navigationContext = createContext(navigationValues.home);

export default navigationContext;
