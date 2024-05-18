
const InputField = ({ label, placeholder, customClasses, type, name, handleChange }: InputFieldProps) => {
    return (
        <div className={`flex flex-col ${customClasses}`}>
            <label className={`text-white text-[12px] font-bold`}>{label}</label>
            <input type={type} placeholder={placeholder} className={`py-2 px-4 rounded-[5px] bg-[#424242] bg-opacity-10 border-[1px] border-white/50 placeholder:text-[14px] text-[14px]`}
                name={name}
                onChange={handleChange}
            />
        </div>
    )
}

export default InputField