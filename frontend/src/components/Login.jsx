import React, { useEffect, useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const LoginForm = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const { login } = useAuth()
    const navigate = useNavigate()
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    useEffect(()=>{
        localStorage.removeItem('isLoggedIn');
        localStorage.clear();

    },[])

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login Data:', form);
        axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/login`, form)
            .then(result => {
                console.log(result)
                if (result.data === "Success") {
                    alert('Successfully Logged In')
                    login(); 
                    navigate('/app')
                }
                else{
                    alert(result.data)
                }
            })
            .catch(err => console.log(err))
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Log in to Your Account</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
                        required
                    />
                    <input
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-600 transition"
                    >
                        Log In
                    </button>
                </form>
                <p className="text-sm text-center text-gray-600 mt-4">
                    Don’t have an account? <Link to="/signup" className="text-gray-600 font-medium">Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;
