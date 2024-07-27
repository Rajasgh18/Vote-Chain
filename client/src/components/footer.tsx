import { LucideInstagram, LucideLinkedin, LucideTwitter, LucideYoutube } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="h-32 mt-20 w-full bg-[#05102c] flex justify-between items-center px-20">
            <div className="flex items-center space-x-1">
                <img src="/blockchain.png" className="h-8 w-8" />
                <h4 className="bg-gradient-to-l from-blue-400 to-blue-500 bg-clip-text text-transparent">Vote Chain</h4>
            </div>
            <h4 className="text-white text-base">Copyright 2024 All rights reserved</h4>
            <ul className="flex space-x-4 text-white">
                <LucideInstagram className="w-5 h-5"/>
                <LucideTwitter className="w-5 h-5"/>
                <LucideYoutube className="w-6 h-6"/>
            </ul>
        </footer>
    );
};