import { Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import OpenRoute from "./components/Auth/OpenRoute"
import PrivateRoute from "./components/Auth/PrivateRoute"
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import Posts from "./pages/Posts";

function App() {
  return (
    <Routes>
      <Route path="/" element={   <OpenRoute> <AuthPage/> </OpenRoute>   }/>
      <Route path="login" element={   <OpenRoute> <LogIn/> </OpenRoute>   }/>
      <Route path="signup" element={   <OpenRoute> <SignUp/> </OpenRoute>   }/>
      <Route path="verify-email" element={   <OpenRoute> <VerifyEmail/> </OpenRoute>   }/>
      <Route path="forgot-password" element={   <OpenRoute> <ForgotPassword/> </OpenRoute>   }/>
      <Route path="update-password/:token" element={   <OpenRoute> <UpdatePassword/> </OpenRoute>   }/>

      <Route path="posts" element={   <PrivateRoute> <Posts/> </PrivateRoute>   }/>
    </Routes>
  );
}

export default App;