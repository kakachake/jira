import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { UnauthenticatedApp } from "./unauthenticated-app";
import { useAuth } from "./context/auth-context";
import { AuthenticatedApp } from "./authenticated-app";
import { ErrorBoundary } from "./components/error-boundary";
import { FullPageErrorFallback } from "./components/lib";
import { BrowserRouter } from "react-router-dom";
import { Navigate, Route, Routes, useNavigate } from "react-router";

function App() {
  const { user } = useAuth();

  return (
    <div className="App">
      {/* <ProjectListScreen /> */}
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                user ? <Navigate to="/projects" /> : <Navigate to="/login" />
              }
            />
            <Route path={"/login"} element={<UnauthenticatedApp />}></Route>
            <Route path={"/projects/*"} element={<AuthenticatedApp />}></Route>
          </Routes>
        </BrowserRouter>
        {/* {user ? <AuthenticatedApp /> : <UnauthenticatedApp />} */}
      </ErrorBoundary>
    </div>
  );
}

export default App;
