import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from 'axios'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [login, setLogin] = useState("Sign Up");
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [cpassword, setCpassword] = useState("")

  const { token, setToken, backendurl } = useContext(AppContext)

  

  const onSubmitHandle = async (e) => {
    e.preventDefault();
    
    console.log(backendurl + "/api/user/register")
    try {
      if (login === "Sign Up") {
        const { data } = await axios.post(backendurl + "/api/user/register", { name, email, password, cpassword })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendurl + "/api/user/login", { email, password })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) { 
      toast.error(error.message)
    }
  };

  

  useEffect(() => {
    if (token) {
      navigate("/")
    }
  }, [token])

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 pt-12">
        <div className="w-full max-w-md p-6 mb-24 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            {login} Page
          </h1>
          <form className="space-y-4" onSubmit={onSubmitHandle}>
            {login === "Sign Up" && (
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-black"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter your username"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
                
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-black"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-black"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            
            </div>

            {login === "Sign Up" && (
              <div>
                <label
                  htmlFor="cpassword"
                  className="block text-sm font-medium text-black"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="cpassword"
                  name="cpassword"
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Confirm your password"
                  onChange={(e) => setCpassword(e.target.value)}
                  value={cpassword}
                />
                
              </div>
            )}

            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={()=>{scrollTo(0,0)}}
            >
              {login === "Sign Up" ? "Continue" : "Login"}
            </button>
          </form>

          {login === "Login" && (
            <p className="mt-4 text-sm text-center text-gray-600">
              <button className="text-blue-500 hover:underline" onClick={()=>navigate("/forgotPassword")}>
                Forgot Password?
              </button>
            </p>
          )}

          {login === "Sign Up" ? (
            <p className="mt-4 text-sm text-center text-black">
              Already have an account?{" "}
              <button
                type="submit"
                onClick={() => setLogin("Login")}
                className="text-blue-500 hover:underline"
              >
                Login Here
              </button>
            </p>
          ) : (
            <p className="mt-4 text-sm text-center text-black">
              Don't have an account?{" "}
              <button
                type="submit"
                onClick={() => setLogin("Sign Up")}
                className="text-blue-500 hover:underline"
              >
                Sign up here
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
