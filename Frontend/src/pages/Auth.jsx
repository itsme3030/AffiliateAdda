import React, { useState } from 'react';
import { login, signup } from '../utils/api';
import { useNavigate } from 'react-router-dom';

function Auth() {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup forms
  const [formData, setFormData] = useState({
    userUsername: '',
    userEmail: '',
    userPassword: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate(); // Initialize the navigate function


  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submission for login
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    try {
      const response = await login(formData);
      setSuccessMessage('Login successful!');
      console.log('Login response:', response.data);
      
      //redirect to the home page
      navigate('/home');
    } catch (error) {
      setErrorMessage(error.response?.data || 'Login failed');
      console.error('Login error:', error);
    }
  };

  // Handle form submission for signup
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    try {
      const response = await signup(formData);
      setSuccessMessage('Signup successful! Please log in.');
      console.log('Signup response:', response.data);
      // Optionally reset form or switch to login
    } catch (error) {
      setErrorMessage(error.response?.data || 'Signup failed');
      console.error('Signup error:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-6 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-6">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>

        {/* Error and success messages */}
        {errorMessage && <div className="text-red-600 text-center mb-4">{errorMessage}</div>}
        {successMessage && <div className="text-green-600 text-center mb-4">{successMessage}</div>}

        <form onSubmit={isLogin ? handleLoginSubmit : handleSignupSubmit}>
          {/* Conditional Fields for Signup */}
          {!isLogin && (
            <div className="mb-4">
              <label htmlFor="userUsername" className="block text-sm font-medium text-gray-700">
                Username:
              </label>
              <input
                type="text"
                id="userUsername"
                name="userUsername"
                value={formData.userUsername}
                onChange={handleChange}
                required
                className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="userEmail" className="block text-sm font-medium text-gray-700">
              Email:
            </label>
            <input
              type="email"
              id="userEmail"
              name="userEmail"
              value={formData.userEmail}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="userPassword" className="block text-sm font-medium text-gray-700">
              Password:
            </label>
            <input
              type="password"
              id="userPassword"
              name="userPassword"
              value={formData.userPassword}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div className="text-center mt-4">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 hover:text-blue-700 focus:outline-none"
          >
            {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Auth;
