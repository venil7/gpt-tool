import React, { createContext } from "react";
import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";
import { Store, createStore } from "../stores/store";
import "../style.scss";
import { EntriesScreen } from "./screens/Entries";
import { EntryScreen } from "./screens/Entry";
import { LogsScreen } from "./screens/Logs";

const store = createStore();
export const StoreContext = createContext<Store>(store);

export const App: React.FC = () => {
  return (
    <>
      <h3>GPT tool</h3>
      <StoreContext.Provider value={store}>
        <BrowserRouter>
          <>
            <Link to="/entry">New</Link> | <Link to="/log">Log</Link>
          </>
          <Routes>
            <Route path="/entry" element={<EntryScreen />} />
            <Route path="/log" element={<LogsScreen />} />
            <Route path="/entries/:id" element={<EntriesScreen />} />
            <Route path="*" element={<Navigate to="/entry" replace />} />
          </Routes>
        </BrowserRouter>
      </StoreContext.Provider>
    </>
  );
};
