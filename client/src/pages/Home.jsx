import React, { useState } from "react";
import axios from "axios";

const Home = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async () => {
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const res = await axios.post("http://localhost:3001/register", { email, password });
            if (res.status === 201) {
                alert("Registration successful");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
                setError("");
            } else {
                setError("Failed to register");
            }
        } catch (error) {
            console.error(error);
            setError("Internal server error");
        }
    };

    return (
        <div className=" ">
            <h1 className="text-center text-3xl font-semibold">
                Register
            </h1>
            <div className="flex justify-center ">
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input input-bordered input-lg w-full max-w-xs mt-9"
                />
            </div>
            <div className="flex justify-center mt-2">
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input input-bordered input-lg w-full max-w-xs mt-2"
                />
            </div>
            <div className="flex justify-center mt-2">
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="input input-bordered input-lg w-full max-w-xs mt-2"
                />
            </div>
            <div className="flex justify-center mt-2">
                <button className="btn btn-wide " onClick={handleSubmit}>
                    Register
                </button>
            </div>
            {error && (
                <div className="text-red-500 text-center mt-2">{error}</div>
            )}
        </div>
    );
};

export default Home;
