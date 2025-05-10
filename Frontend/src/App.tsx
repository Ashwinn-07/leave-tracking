import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";
import AuthGuard from "./components/auth/AuthGuard";
const App = () => {
  return (
    <BrowserRouter>
      <AuthGuard>
        <AppRoutes />
      </AuthGuard>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#1f2937",
            color: "#fff",
            border: "1px solid #4f46e5",
            boxShadow: "0 0 10px rgba(79, 70, 229, 0.3)",
          },
        }}
      />
    </BrowserRouter>
  );
};

export default App;
