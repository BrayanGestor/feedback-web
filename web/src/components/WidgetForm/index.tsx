
import bugImageUrl from "../../assets/bug.svg"
import ideaImageUrl from "../../assets/idea.svg"
import otherImageUrl from "../../assets/other.svg"
import { useState } from "react";
import { FeedbackTypeStep } from "./Steps/feedbackTypeStep";
import { FeedbackContentStep } from "./Steps/feedbackContentStep";
import { FeedbackSucessStep } from "./Steps/feedbackSucessStep";

export const feedbackTypes = {
    BUG:{
        title: 'Problem',
        image:{
            source: bugImageUrl,
            alt: 'Image of inset'
        },
    },

    IDEA:{
        title: 'Idea',
        image:{
            source: ideaImageUrl,
            alt: 'Image of light bulb'
        },
    },

    OTHER:{
        title: 'Other',
        image: {
            source: otherImageUrl,
            alt: 'image of a cloud'
        },
    },
};

export type FeedbackType = keyof typeof feedbackTypes;


export function WidgetForm(){

    const [feedbackType, setFeedbackType] = useState< FeedbackType | null | false>(null)

    const [feedbackSent, setFeedbackSent] = useState(false)

    function handleRestartFeedback(){
        setFeedbackSent(false);
        setFeedbackType(null);
    }

    return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto ">
        
        
    { feedbackSent ? (
        < FeedbackSucessStep  onFeedbackRestartRequested={handleRestartFeedback}  />
    ):(
        <>
        {!feedbackType ? (
            < FeedbackTypeStep onFeedbackTypeChange={setFeedbackType}/>
         ) : (
        
            <FeedbackContentStep
                feedbackType={feedbackType}
                onFeedbackRestartRequested={handleRestartFeedback} 
                onFeedbackSent={()=> setFeedbackSent(true)}
            />
            )}
        </>
    )}
     <footer className="text-xs text-neutral-400">
        Feito com ♥ por <a className="underline underline-offset-2" href="https://github.com/BrayanGestor">Brayan Quintino</a>
    </footer>
    </div>

    );
}