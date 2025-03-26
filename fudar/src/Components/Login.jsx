import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  let role;
  const [loginForm, setLoginForm] = useState('driver') // Initialize with a default value
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset error state
    setError('');
    
    try {
      setLoading(true);
      
      // Call the login API endpoint
      const response = await axios.post('https://fudar-dqqd.onrender.com/api/user/login', { // Fixed URL
        phoneNumber,
        password
      });
      role = response.data.loggedUser.role;
      localStorage.setItem('role', role);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      if(role === 'staff'){
        navigate('/')
      }else if(role === 'admin'){
        navigate('/main')
      }else if(role === "driver") {
        navigate('/driverPage')
      }else{
        navigate('/driverPage')
      } 
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 overflow-x-hidden">
      <div className="bg-white relative h-[390px] p-8 rounded-lg shadow-md w-96">
        <h2 className="text-[32px] font-bold text-gray-800 mb-6 text-center">Login</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder='0808563991'
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 "
              placeholder='XXXXXX'
            />
          </div>
          {/* <div>
            <select 
              value={loginForm} 
              onChange={(e) => setLoginForm(e.target.value)} // Fixed onChange handler
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              <option value="driver">Driver</option>
              <option value="staff">Staff</option>
              <option value="admin">Admin</option>
            </select>
          </div> */}
          <button
            type="submit"
            className="w-[200px] bg-green-400 h-[32px] absolute left-[80px] text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="mt-4 absolute top-[370px] left-[75px] text-center">
          <span className="text-gray-600">Don't have an account? </span>
          <Link to="/signup" className="text-gray-800 hover:text-gray-600 font-medium">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;