

export default function MyButton({ label, onClick, type }) {
    return (
        // <button
        //     onClick={onClick}
        //     className="w-full bg-blue-600 text-white px-6 py-2 mt-3 rounded hover:bg-blue-700 transition"
        // >
        //     {label}
        // </button>

        <button type={type} 
                onClick={onClick}
                class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            {label}
        </button>
    );
}
