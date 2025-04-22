'use client'
export default function MyLabel({label}){
    return(
        <label
            className="block mb-2 text-sm font-medium text-gray-300 tracking-wide"
        >
            {label}
        </label>
    )
}