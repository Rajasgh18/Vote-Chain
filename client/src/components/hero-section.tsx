import { useGSAP } from "@gsap/react";
import { Timer } from "./timer";
import { useRef } from "react";
import gsap from "gsap";

export const HeroSection = () => {
    const elementsRef = useRef<HTMLHeadingElement[]>([]);

    useGSAP(() => {
        gsap.from(elementsRef.current, {
            opacity: 0,
            filter: "blur(20px)",
            y: -100,
            ease: "back",
            duration: 0.75,
            stagger: 0.1,
        })
    })

    const addToRefs = (
        el: HTMLHeadingElement
    ) => {
        if (el && !elementsRef.current.includes(el)) {
            elementsRef.current.push(el);
        }
    };

    return (
        <section className="h-[calc(100vh-3.5rem)] w-full bg-gradient-to-r from-[#13186d] to-[#05064d] flex items-center">
            <div className="w-1/2 h-full flex flex-col justify-center text-white pl-20">
                <h1 ref={addToRefs} className="">Next-Generation Voting System</h1>
                <h4 ref={addToRefs} className="text-slate-300 mt-4">Harness the power of blockchain to ensure tamper-proof and transparent elections. Bringing trust and transparency to elections through blockchain technology.</h4>
                <Timer />
            </div>
            <img src="/home-bg.png" alt="Blockchain" className="w-1/2 h-full" />
        </section>
    );
};