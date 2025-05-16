import React, { useState } from 'react'
import axios from "axios";

function Register() {

    const [form, setForm] = useState({ username: "", email: "", password: "" });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let res = await axios.post("http://localhost:5000/api/auth/registerUser", form);
            console.log(res.data);
            alert("User registered successfully")
        } catch (err) {
            console.log(err.response.data.msg || "Error");
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" onChange={handleChange} />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} />
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register
