import { useState } from "react";
import {useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type FormInputs = {
    email: string;
    password: string;
    name?: string;
};

const AuthModal = () => {
    const { showAuthModal, setShowAuthModal } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormInputs>();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<FormInputs> = (data) => {
        if (isLogin) {
            console.log("Login:", data);
            alert("Logged in successfully!");
        } else {
            console.log("Register:", data);
            alert("Registered successfully!");
        }
        setShowAuthModal(false);
        navigate("/menu");
    };

    if (!showAuthModal) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-11/12 max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">{isLogin ? "Login" : "Register"}</h2>
                    <button className="text-gray-500 hover:text-gray-700" onClick={() => setShowAuthModal(false)}
                        >
                        ⨉
                    </button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    {!isLogin && (
                        <div>
                            <label className="block text-gray-700">Name</label>
                            <input
                                type="text"
                                {...register("name", {
                                    required: !isLogin && "Name is required",
                                })}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm">{errors.name.message}</p>
                            )}                           
                        </div>
                    )}
                    <div>
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Invalid email address",
                                },
                            })}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm">{errors.email.message}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at leatest 6 characters",
                                    },
                                })}
                                className="w-full p-2 border border-gray-300 rounded"
                        />
                        {errors.password && (
                                <p className="text-red-500 text-sm">{errors.password.message}</p>
                            )} 
                    </div>
                    <button
                        type="submit" 
                        className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                    >
                        {isLogin ? "Login" : "Register"}
                    </button>
                </form>
                <button
                    type="button"
                    className="mt-2 text-orange-500 hover:underline"
                    onClick={() => setIsLogin(!isLogin)}
                >       
                    {isLogin ? "Need an account? Register" : "Already have an account? Loin"}
                    </button>                
            </div>
        </div>
    );    
};

export default AuthModal;








const AuthModal = ({ onClose }: { onClose: () => void }) => {
    const [isLogin, setIsLogin] = useState(true);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormInputs>();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<FormInputs> = (data) => {
        if (isLogin) {
            console.log("Login:", data);
            alert("Logged in successfully!");
        } else {
            console.log("Register:", data);
            alert("Registered successfully!");
        }
        onClose();
        navigate("/menu");
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-11/12 max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">{isLogin ? "Login" : "Register"}</h2>
                    <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
                        ✕
                    </button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    {!isLogin && (
                        <div>
                            <label className="block text-gray-700">Name</label>
                            <input
                                type="text"
                                {...register("name", {
                                    required: !isLogin && "Name is required",
                                })}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm">{errors.name.message}</p>
                            )}
                        </div>
                    )}
                    <div>
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Invalid email address",
                                },
                            })}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm">{errors.email.message}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters",
                                },
                            })}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm">{errors.password.message}</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                    >
                        {isLogin ? "Login" : "Register"}
                    </button>
                    <button
                        type="button"
                        className="text-orange-500 hover:underline"
                        onClick={() => setIsLogin(!isLogin)}
                    >
                        {isLogin ? "Need an account? Register" : "Already have an account? Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AuthModal;
