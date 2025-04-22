'use client'
import {useState} from 'react'
import MyButton from '../components/btn'
import MyInput from '../components/input'
import MyLabel from '../components/label'
import MyFloat from '../components/floatlbl'

export default function Register() {
    const [test , setTest] = useState(false)
    const [formData ,setFormData] = useState({
        username : "",
        email:"",
        password:"",
        confirmPassword:""
    })
    const [error,setError] =useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const handleClick = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]:value,
        }))

        setError((last) => {
            const newErrors = {...last}

            if (name === "email") {
                if (!value.trim()) {
                    newErrors.email = "Email is required";
                } else if (!validateEmail(value)) {
                    newErrors.email = "Please enter a valid email address";
                } else {
                    newErrors.email = "";
                }
            }
            if (name === 'username' && !value.trim()){
                newErrors.username = 'Username is required'
            }else {
                newErrors.username = ''
            }
            if (name === "password") {
                if (!value.trim()) {
                    newErrors.password = "Password is required";
                } else if (value.length < 6) {
                    newErrors.password = "Password must be at least 6 characters";
                } else {
                    newErrors.password = "";
                }
            }

            if (name === "confirmPassword") {
                if (!value.trim()) {
                    newErrors.confirmPassword = "Password is required";
                }else if(value.length <= 5){
                    newErrors.confirmPassword = "";
                }else if(formData.password !== value){
                    newErrors.confirmPassword = "Password does not match";
                }else{
                    newErrors.confirmPassword = "";
                }
            }
            

            return newErrors
        })
    };

    const validateForm = () => {
        const newErrors = {
            username:"",
            email:"",
            password:"",
            confirmPassword:""
        }

        if (!formData.username.trim()){
            newErrors.username = "Username is required"
        }
        if(!formData.email.trim()){
            newErrors.email = "Email is required"
        }else if (!validateEmail(formData.email)){
            newErrors.email = "Please enter a valid email address"
        }
        if (!formData.password.trim()){
            newErrors.password = "Password is required"
        }else if (formData.password.length < 6){
            newErrors.password = "Password must be at least 6 characters"
        }
        if (!formData.confirmPassword.trim()){
            newErrors.confirmPassword = "Password is required"
        }else if (formData.password !== formData.confirmPassword){
            newErrors.confirmPassword = "Password does not match"
        }

        setError(newErrors)
        return Object.values(newErrors).every(error => !error)
    }

    

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validateForm()){
            console.log("Form Submited Successfully", formData)
        }
        setTest(validateForm())
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-gray-900 backdrop-blur-lg rounded-xl p-8 shadow-2xl border border-gray-700">
                <div className="text-center">
                    <h2 className="mt-2 text-3xl font-extrabold text-white">
                        Create your account
                    </h2>
                    <p className="mt-2 text-sm text-gray-400">
                        Join us today and experience the difference
                    </p>
                </div>
                
                {test && (
                    <div className="rounded-md bg-green-900/50 p-4">
                        <p className="text-center text-green-400 font-medium">Registration Successful!</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div className="space-y-4">
                        <div>
                            <MyFloat name={'username'} 
                                type={'text'} 
                                label={'Username'} 
                                value={formData.username}
                                onChange={handleClick} 
                                error={error.username}
                            />
                        </div>

                        <div>
                            <MyFloat name={'email'} 
                                type={'text'} 
                                label={'Email'} 
                                value={formData.email}
                                onChange={handleClick} 
                                error={error.email}
                            />
                        </div>

                        <div>
                            <MyFloat name={'password'} 
                                type={'password'} label={'Password'} 
                                value={formData.password}
                                onChange={handleClick} 
                                error={error.password}
                            />
                        </div>

                        <div>
                            <MyFloat name={'confirmPassword'} 
                                type={'password'} 
                                label={'Confirm Password'} 
                                value={formData.confirmPassword}
                                onChange={handleClick} 
                                error={error.confirmPassword}
                            />
                        </div>
                        
                    </div>

                    <div>
                        <MyButton label={"Create Account"} type={'submit'}/>
                    </div>
                </form>
            </div>
        </div>
    );
}