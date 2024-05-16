import React from 'react'

const InputField = ({ label, placeholder, customClasses, type }: InputFieldProps) => {
    return (
        <div className={`flex flex-col ${customClasses}`}>
            <label className={`text-white text-[12px] font-bold`}>{label}</label>
            <input type={type} placeholder={placeholder} className={`py-2 px-4 rounded-[5px] bg-[#424242] bg-opacity-10 border-[1px] border-white placeholder:text-[12px]`} />
        </div>
    )
}

export default InputField