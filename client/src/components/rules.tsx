import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export const Rules = () => {
    const data = [
        {
            title: "What is the purpose of this voting system?",
            description: "This system is designed to ensure fair and transparent voting. It allows registered users to cast their votes securely and see the results in real time."
        },
        {
            title: "How is my vote kept confidential?",
            description: "Your vote is encrypted and stored securely to maintain confidentiality. Only authorized personnel can access the voting data under strict security protocols."
        },
        {
            title: "Can I change my vote after submission?",
            description: "Once submitted, your vote cannot be changed. Please review your choices carefully before casting your vote."
        },
        {
            title: "What should I do if I encounter a problem while voting?",
            description: "If you encounter any issues, please contact the support team immediately for assistance. Ensure you provide details about the problem for a faster resolution."
        },
        {
            title: "How do I know that my vote has been counted?",
            description: "After you cast your vote, you will receive a confirmation message indicating that your vote has been successfully recorded."
        },
        {
            title: "Are there any eligibility requirements for voting?",
            description: "You must be a registered voter to participate. Please check the eligibility criteria specific to this voting process to ensure you meet all requirements."
        },
        {
            title: "What happens if I miss the voting deadline?",
            description: "Votes submitted after the deadline will not be counted. Make sure to cast your vote before the deadline to ensure it is included in the final tally."
        },
        {
            title: "How can I verify the accuracy of the election results?",
            description: "Election results are verified through a rigorous auditing process. You can review the results on the official platform, which provides transparency and accountability."
        },
        {
            title: "What steps are taken to prevent fraud in the voting process?",
            description: "The system uses advanced security measures, including encryption and authentication, to prevent fraud and ensure the integrity of the voting process."
        },
        {
            title: "How is the voting data protected?",
            description: "Voting data is protected using state-of-the-art encryption and security protocols to safeguard against unauthorized access and tampering."
        },
    ]

    return (
        <section className="px-20 w-full flex flex-col space-y-5 justify-center items-center text-lg text-slate-800">
            <h2>Voting Rules</h2>
            <Accordion type="single" className="w-2/3" collapsible>
                {data.map((d: { title: string, description: string }, index: number) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-lg">{d.title}</AccordionTrigger>
                        <AccordionContent className="text-base">{d.description}</AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </section>
    )
}
