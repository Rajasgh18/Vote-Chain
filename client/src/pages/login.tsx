import gsap from "gsap";
import Cookies from 'js-cookie';
import axios from "axios";

import { Input } from "@/components/input";

import { useGSAP } from "@gsap/react";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { LucideLoaderCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const voterForm = useRef<HTMLFormElement>(null);
    const otpForm = useRef<HTMLFormElement>(null);
    const [currentForm, setCurrentForm] = useState<'VOTER' | 'OTP'>('VOTER');
    const [voterId, setVoterId] = useState<string>("");
    const [otp, setOtp] = useState<string>("");
    const [errorMesg, setErrorMesg] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    useGSAP(() => {
        const form = currentForm === 'VOTER' ? voterForm.current : otpForm.current;
        if (form) {
            gsap.from(form.children, {
                opacity: 0,
                y: 40,
                stagger: 0.2,
                duration: 0.4,
                ease: "sine.inOut"
            });
        }
    }, [currentForm]);

    const handleVoterSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (voterId.length !== 10) {
            setErrorMesg("Voter ID should be of 10 digits only!");
            return
        }
        setLoading(true);
        try {
            await axios.get(`http://localhost:5000/api/login/send-otp/${voterId}`);

            gsap.to(voterForm.current!.children, {
                opacity: 0,
                y: -20,
                stagger: 0.1,
                duration: 0.25,
                ease: "sine.inOut",
                onComplete: () => {
                    setCurrentForm('OTP');
                }
            });
        } catch (error: any) {
            setErrorMesg(error.response.data.message || "Something went wrong");
            return;
        }
        finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        try {
            await axios.get(`http://localhost:5000/api/login/send-otp/${voterId}`);
        } catch (error: any) {
            setErrorMesg(error.response.data.message || "Something went wrong");
        }
    }

    const handleOtpSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (otp.length !== 6) {
            setErrorMesg("OTP contains 6 digits");
            return;
        }

        setLoading(true);
        try {
            const {data} = await axios.post("http://localhost:5000/api/login/verify-otp", { voterId, otp });

            // Decoded the token to get its' expiration time
            const payload = JSON.parse(atob(data.token.split('.')[1]));
            const expiresAt = new Date(payload.exp * 1000);

            Cookies.set('token', data.token, { expires: expiresAt });
            
            gsap.to(otpForm.current!.children, {
                opacity: 0,
                y: -20,
                stagger: 0.1,
                duration: 0.25,
                ease: "sine.inOut",
                onComplete: () => {
                    navigate('/');
                }
            });
        } catch (error: any) {
            setErrorMesg(error.response.data.message || "Something went wrong");
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <main className="h-screen w-screen flex justify-center items-center bg-gradient-to-r">
            {currentForm === 'VOTER' &&
                <form ref={voterForm} onSubmit={handleVoterSubmit} className="gap-y-5 flex flex-col text-white">
                    <div className="flex items-center space-x-1">
                        <img src="/blockchain.png" className="h-10 w-10" />
                        <h3 className="bg-gradient-to-l from-blue-400 to-blue-500 bg-clip-text text-transparent">Vote Chain</h3>
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <h3 className="font-medium">Welcome Back!</h3>
                        <p>Enter your Voter ID to receive an OTP for secure login</p>
                    </div>
                    <Input label="Voter ID" value={voterId} onChange={(e: ChangeEvent<HTMLInputElement>) => setVoterId(e.target.value)} />
                    <div className="flex flex-col gap-y-2">
                        <p className="text-sm text-red-600">{errorMesg}</p>
                        <button type="submit" className="bg-blue-600 rounded-lg p-2 hover:bg-opacity-90">{loading ? <LucideLoaderCircle className="mx-auto w-6 h-6 animate-spin" /> : "Send OTP"}</button>
                    </div>
                </form>
            }
            {
                currentForm === 'OTP' &&
                <form ref={otpForm} onSubmit={handleOtpSubmit} className="flex flex-col gap-y-5 text-white">
                    <div className="flex items-center space-x-1">
                        <img src="/blockchain.png" className="h-10 w-10" />
                        <h3 className="bg-gradient-to-l from-blue-400 to-blue-500 bg-clip-text text-transparent">Vote Chain</h3>
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <h3 className="font-medium">Enter OTP</h3>
                        <p>Check your email for the OTP and enter it below</p>
                    </div>
                    <Input label="OTP" value={otp} onChange={(e: ChangeEvent<HTMLInputElement>) => { if (e.target.value.length === 0 || !isNaN(parseInt(e.target.value))) setOtp(e.target.value) }} />
                    <div className="flex flex-col gap-y-2">
                        <p className="text-sm text-red-600">{errorMesg}</p>
                        <button type="submit" className="bg-blue-600 rounded-lg p-2 hover:bg-opacity-90">{loading ? <LucideLoaderCircle className="mx-auto w-6 h-6 animate-spin" /> : "Verify OTP"}</button>
                        <p className="text-center text-sm text-slate-300">Didn't get a code? <button type="button" onClick={handleResend} className="hover:underline hover:text-white">Click to resend</button></p>
                    </div>
                </form>
            }
            <img src="/login-bg.jpg" alt="hello" className="absolute h-screen w-screen -z-10" />
        </main >
    );
};

export default Login;
