import { useEffect, useState } from "react";

import Party from "@/contracts/party.json";
import { partyNetworkData, web3 } from "@/constants/blockchain";
import { ArrowRightIcon } from "lucide-react";

type PartyType = {
    id: number;
    name: string;
    imgUrl: string;
    description: string;
    schems: string[];
}

export const Parties = () => {
    const [parties, setParties] = useState<PartyType[]>([]);

    useEffect(() => {
        const loadParties = async () => {
            const contract = new web3.eth.Contract(Party.abi, partyNetworkData.address);
            const partiesLength: number = await contract.methods.getPartiesCount().call();
            let fetchedParty: PartyType[] = [];
            for (let i = 0; i < partiesLength; i++) {
                fetchedParty.push(await contract.methods.getParty(i).call());
            }
            setParties(fetchedParty);
        };
        loadParties();
    }, []);

    return (
        <section className="p-20 flex flex-col items-center gap-y-10 text-slate-700">
            {parties.length !== 0 ? parties.map((party: PartyType, index: number) => (
                <div key={party.id} className="w-1/2 border-2 border-transparent transition-colors hover:border-[#4c31a9] flex justify-between items-center p-4 px-8 rounded-full shadow-[0_2px_20px_-2px] shadow-slate-200">
                    <h4 className="text-2xl">{index + 1}</h4>
                    <div className="flex space-x-4">
                        <img src={`/${party.imgUrl}`} alt={party.name} className="h-8 w-8" />
                        <h4 className="text-2xl">{party.name}</h4>
                    </div>
                    <button className="px-10 p-1 rounded-full text-lg border-2 border-[#4c31a9] hover:bg-[#4c31a9] hover:text-white flex items-center gap-x-2 transition-colors">Vote <ArrowRightIcon className="w-5 h-5"/></button>
                </div>
            )) : <p>No Party</p>}
        </section>
    );
};