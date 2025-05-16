import React, { useState } from 'react'
import axios from 'axios'

function Login() {

    const [form, setForm] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let res = await axios.post("http://localhost:5000/api/auth/loginUser", form);
            console.log(res.data);
            alert("Login successfully !")
        } catch (err) {
            console.log(err.response.data.msg || "Error");
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email" onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login
