import { useState } from "react";
export default function MyFloat({label, type,name, onChange,value, error}){
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';

    return(
        <div>
            <div class="relative">
                <input type={isPassword && showPassword ? 'text' : type}
                    name={name}
                    onChange={onChange}
                    value={value}
                    placeholder=""
                    id={error ? "outline_error":"floating_outlined"} 
                    class={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none dark:text-white focus:outline-none focus:ring-0 ${error ? "dark:border-red-500 border-red-600 dark:focus:border-red-500  focus:border-red-600 peer":
                                "dark:border-gray-600 border-gray-300 dark:focus:border-blue-500 focus:border-blue-600 peer"}`}/>
                <label for="floating_outlined" class={error ? "absolute text-sm text-red-600 dark:text-red-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto":"absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"}>
                {label}
                </label>
                {isPassword && (
                <span onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-2.5 right-3 cursor-pointer text-gray-500">{showPassword ? '🙈' : '👁️'}</span>
            )}
            </div>
            {error && (
                <p id="outlined_error_help" class="mt-2 text-xs text-red-600 dark:text-red-400">{error}</p>     
            )}
        </div>
        
    )
}