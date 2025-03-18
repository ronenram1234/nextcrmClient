import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import NavBar from "./components/NavBar";
import Main from "./components/Main";
import PageNotFound from "./components/PageNotFound";
import Footer from "./components/Footer";


import { User } from "./interfaces/User";


import {
  getTokenLocalStorage,
  getUserDetail,
  removeTokenLocalStorage,
  tokenToDecoode,
} from "./services/userServices";
import { Jwt } from "./interfaces/Jwt";
import { CardRecFull } from "./interfaces/Card";
import About from "./components/About";

import FavCards from "./components/FavCards";
import MyCards from "./components/MyCards";
import { errorMsg } from "./services/feedbackService";
import { getAllCards } from "./services/cardServices";
import CardDetails from "./components/CardDetails";

import NewEditCard from "./components/NewEditCard";
import { ToastContainer } from "react-toastify";
import AdminUsers from "./components/AdminUsers";
import AdminCards from "./components/AdminCards";
import AdminStats from "./components/AdminStats";

interface GlobalPropsType {
  isUserLogedin: boolean;
  setIsUsserLogedin: React.Dispatch<React.SetStateAction<boolean>>;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  cardArray: CardRecFull[] | null;
  setCardArray: React.Dispatch<React.SetStateAction<CardRecFull[] | null>>;

  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  searchString: string;
  setSearchString: React.Dispatch<React.SetStateAction<string>>;

  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;

  imageError: string[];
  setImageError: React.Dispatch<React.SetStateAction<string[]>>;
  addressError:string[];
  setAddressError: React.Dispatch<React.SetStateAction<string[]>>;

}
export const GlobalProps = createContext<GlobalPropsType>({
  isUserLogedin: false,
  setIsUsserLogedin: () => {},
  token: "",
  setToken: () => {},
  currentUser: null,
  setCurrentUser: () => {},
  cardArray: null,
  setCardArray: () => {},

  isDarkMode: false,
  setIsDarkMode: () => {},
  searchString: "",
  setSearchString: () => {},
  sort: "",
  setSort: () => {},
  imageError: [],
  setImageError: () => {},
  addressError:[],
  setAddressError: () => {},
});

export async function getAllCardsFromAPI(
  setCardArray: React.Dispatch<React.SetStateAction<CardRecFull[] | null>>
) {
  try {
    const res = await getAllCards();

    const updatedCards = res.data.map((card: CardRecFull) => ({
      ...card,
      imageError: "false",
      addressError: "false",
    }));

    setCardArray(updatedCards);
  } catch (err: any) {
    console.log(err);
    if (err.response) {
      errorMsg(`Transaction Error - ${err.response}`);
    }
  }
}

function App() {
  const localToken = getTokenLocalStorage() || "";

  const [token, setToken] = useState(localToken);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [cardArray, setCardArray] = useState<CardRecFull[] | null>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [sort, setSort] = useState("");
  const [imageError, setImageError] = useState<string[]>([]);
  const [addressError, setAddressError] = useState<string[]>([]);

  const [isUserLogedin, setIsUsserLogedin] = useState(
    localToken === "" ? false : true
  );

  const globalContextValue = {
    isUserLogedin,
    setIsUsserLogedin,
    token,
    setToken,
    currentUser,
    setCurrentUser,
    cardArray,
    setCardArray,
    isDarkMode,
    setIsDarkMode,
    searchString,
    setSearchString,
    sort,
    setSort,
    imageError,
    setImageError,
    addressError,
    setAddressError,
  };

  

  useEffect(() => {
    if (localToken !== "") {
      
      const jwtUser: Jwt = tokenToDecoode(localToken);
      getUserDetail(jwtUser._id, localToken)
        .then((res) => {
          
          setCurrentUser(res.data);
        })
        .catch((err) => {
          console.log(err);
          
          removeTokenLocalStorage();
          setIsUsserLogedin(false);
        });
    }
  }, [localToken]);

  useEffect(() => {
    if (cardArray?.length === 0) {
      getAllCardsFromAPI(setCardArray);
    }
  }, [cardArray]);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
    } else {
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  return (
    <>
      <ToastContainer />
      <GlobalProps.Provider value={globalContextValue}>
        <div className="App">
          <>
            <div className="container">
              <Router>
                <NavBar />
                <Routes>
                  <Route path="/" element={<Main />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/favcards" element={<FavCards />} />
                  <Route path="/mycards" element={<MyCards />} />
                  <Route path="/sandbox">
                    <Route path="adminusers" element={<AdminUsers />} />
                    <Route path="admincards" element={<AdminCards />} />
                    <Route path="adminstats" element={<AdminStats />} />
                  </Route>
                  <Route path="/carddetails" element={<CardDetails />} />
                  <Route path="/neweditcard" element={<NewEditCard />} />

                  <Route path="*" element={<PageNotFound />} />
                </Routes>
                <Footer />
              </Router>
            </div>
          </>
        </div>
      </GlobalProps.Provider>
    </>
  );
}

export default App;
