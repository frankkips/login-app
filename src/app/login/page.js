"use client"
import { useEffect, useState } from "react";
import MyButton from "../components/btn";
import MyInput from "../components/input";
import MyLabel from "../components/label";
import MyFloat from "../components/floatlbl";

export default function Login() {
    const [test,setTest] = useState(false)
    const [formData,setFormData] = useState({
        email:"",
        password:""
    })
    const [error, setError] = useState({
        email:"",
        password:""
    })


    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    };

    const handleClick = (e) => {
        const {name , value} = e.target
        setFormData((prev) => ({
            ...prev,
            [name]:value
        }))
        setError((prev) => ({
            ...prev,
            [name]:''
        }))
    };

    const validateForm = () => {
        const newError = {
            email:"",
            password:""
        }
        if (!formData.email.trim()){
            newError.email = "Email is required"
        }else if (!validateEmail(formData.email)){
            newError.email = "Please input a corect email format"
        }
        if  (!formData.password.trim()){
            newError.password = "Password is required"
        }else if (formData.password.length < 6){
            newError.password = "Password should have at least 6 characters"
        }

        setError(newError)
        return Object.values(newError).every(error => !error)
    }

    

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validateForm()){
            console.log("Form Submited Successfully",formData)
        }
        setTest(validateForm())
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-gray-900 backdrop-blur-lg rounded-xl p-8 shadow-2xl border border-gray-700">
            <div className="text-center">
                    <h2 className="mt-2 text-3xl font-extrabold text-white">
                        Welcome Back 👋
                    </h2>
                    <p className="mt-2 text-sm text-gray-400">
                        Sign in with your email and password
                    </p>
                </div>
                {test && (
                    <div className="rounded-md bg-green-900/50 p-4">
                        <p className="text-center text-green-400 font-medium">Login Successful!</p>
                    </div>
                )}
                <form onSubmit={handleSubmit} className="mt-8 space-y-3">
                    <MyFloat name={'email'} 
                                type={'text'} 
                                label={'Email or Username'} 
                                value={formData.email}
                                onChange={handleClick} 
                                error={error.email}
                    />
                    <MyFloat name={'password'} 
                                type={'password'} label={'Password'} 
                                value={formData.password}
                                onChange={handleClick} 
                                error={error.password}
                    />
                    <MyButton type={'submit'} label={'Login'}/>
                </form>
            </div>
        </div>
    );
}