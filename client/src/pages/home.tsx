import Cookies from "js-cookie";

import { useEffect } from "react";

import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { NewInfo } from "@/components/new-info";
import { Parties } from "@/components/parties";
import { Rules } from "@/components/rules";
import { Footer } from "@/components/footer";
import axiosInstance from "@/axiosConfig";


const Home = () => {

    useEffect(() => {
        const token = Cookies.get('token');
        console.log(token)
        const getVoter = async () => {
            try {
                const { data } = await axiosInstance.get('/api/voter/');
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        }

        token && getVoter();

    }, []);

    return (
        <main>
            <Navbar />
            <HeroSection />
            <NewInfo />
            <Parties />
            <Rules />
            <Footer />
        </main>
    );
};

export default Home;