'use client'
import { useState } from "react";
export default function MyInput({type,name, placeholder, onChange,value, error}){
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';

    return(
        <>
        <div className="relative">
            <input 
            type={isPassword && showPassword ? 'text' : type} 
            name = {name}
            value={value}
            placeholder={placeholder} 
            onChange={onChange}
            className={`w-full placeholder:text-gray-400 text-gray-100 px-4 py-2 border ${
                error ? 'border-red-500 focus:ring-red-500' : 'border-gray-100 focus:ring-blue-500'
            } rounded-md focus:outline-none focus:ring-2 focus:border-none`}/>

            {isPassword && (
                <span onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-2.5 right-3 cursor-pointer text-gray-500">{showPassword ? '🙈' : '👁️'}</span>
            )}
        </div>
        
        {error && (
            <p className="text-sm text-red-400 mt-1.5 font-medium">{error}</p>
        )}
        </>
    )
}