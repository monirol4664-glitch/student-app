import Login from "./pages/login.jsx"
import Register from "./pages/register.jsx"

export default function App() {
  return (
    <div className="container">
      <h1>University System</h1>

      <Login />
      <hr />
      <Register />
    </div>
  )
}