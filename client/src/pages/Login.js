import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, [])

    const fetchUsers = () => {
        axios
        .get('http://localhost:3002/api/users/register')
        .then((res) => {
            console.log(res.data)
        })
    }


    const handleLogin =  async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3002/api/users/login', { username, password })
            const token = response.data.token
            alert('Login successful')
            setUsername('')
            setPassword('')
            fetchUsers();
            navigate('/')
            window.location.reload();
            localStorage.setItem('token', token)
        } catch (error) {
            console.log('Login Error', error)
        }
    }
    return (
 

        <div className='w-full h-screen flex'>
        <div className='w-[100%] h-[100%] bg-[#c7a5d9] text-white flex justify-center items-center'>
            <form
                className='text-center border rounded-lg w-[600px] h-[400px] p-9'
                onSubmit={handleLogin}
            >
                {/* Username Input */}
                <label>Username</label>
                <br />
                <input
                    className='w-[400px] h-[40px] rounded-xl bg-zinc-700 p-2'
                    type='text'
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <br />
                <br />
                {/* Password Input */}
                <label>Password</label>
                <br />
                <input
                    className='w-[400px] h-[40px] rounded-xl bg-zinc-700 p-2'
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <br />
                {/* Button */}
                <button className='w-[200px] h-[50px] border hover:bg-black' type='submit'>
                    Login
                </button>
            </form>
        </div>
    </div>
    


  )
}

export default Login