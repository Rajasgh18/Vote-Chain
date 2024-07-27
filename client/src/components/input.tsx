import { ChangeEvent } from "react";

interface InputProps {
    label: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({ label, value, onChange }: InputProps) => {
    return (
        <div className="flex flex-col w-full gap-y-1">
            <label htmlFor={label.split(" ").join("-")}>{label}</label>
            <input id={label.split(" ").join("-")} type="text" value={value} onChange={onChange} className="border-2 rounded-lg focus:outline-none text-slate-800 focus:border-blue-300 p-2 px-2 placeholder:text-slate-400" placeholder={`Enter your ${label}`} />
        </div>
    );
};