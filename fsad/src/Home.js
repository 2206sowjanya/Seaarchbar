import React, { createContext, useState } from "react";
import Login from "./Login"; // Ensure this path is correct

// Create the UserContext
export const UserContext = createContext();

function Home() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <UserContext.Provider value={{ isLogin, setIsLogin }}>
      <div>
        {isLogin ? (
          <h1>Welcome, you are logged in!</h1>
        ) : (
          <Login />
        )}
      </div>
    </UserContext.Provider>
  );
}

export default Home;
