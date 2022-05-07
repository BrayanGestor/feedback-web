import { ArrowLeft, Camera } from "phosphor-react";
import { CloseButton } from "../../CloseButton";
import { FeedbackType, feedbackTypes } from "..";
import { FormEvent, useState } from "react";
import { ScreenShotButton } from "../ScreenShotButton";
import { api } from "../../../libs/api";
import { Loading } from "../../Loading";

interface FeedbackContentStepProps{
    feedbackType: FeedbackType;
    onFeedbackRestartRequested: () => void;
    onFeedbackSent: () => void;
}


export function FeedbackContentStep({
    feedbackType,
    onFeedbackRestartRequested,
    onFeedbackSent,
    }: FeedbackContentStepProps){
    const [comment, setComment] = useState('');
    const [screenshot, setScreenShot] = useState<string | null>(null);
    const [isSendingFeedback, setIsSendingFeedback] = useState(false);

    const feedbackTypeInfo = feedbackTypes[feedbackType];

    async function handleSubmitFeedback(event: FormEvent){
        event.preventDefault();

        setIsSendingFeedback(true);

        // console.log({
        //     screenshot,
        //     comment,
        // })

        await api.post('/feedbacks',{
            type: feedbackType,
            comment,
            screenshot,
        })

        setIsSendingFeedback(false);
        onFeedbackSent();
    }

    return(
        <>
            <header >
                <button
                    type="button"
                    className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
                    onClick={onFeedbackRestartRequested}
                >
                    <ArrowLeft weight="bold" className="w-4 h-4" />
                </button>
                <span className="text-xl leading-6 flex items-center gap-2">
                    <img src={feedbackTypeInfo.image.source} alt={feedbackTypeInfo.image.alt} className="w-6 h-6" />
                    {feedbackTypeInfo.title}
                </span>

                <CloseButton /> 
            </header>

            <form onSubmit={handleSubmitFeedback} className="my-4 w-full">
                <textarea 
                    className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-offset-brand-500 scrollbar scrollbar-thumb-brand-500 scrollbar-track-transparent"
                    placeholder="Write your problem, please!"
                    onChange={event => setComment(event.target.value)}
                    >
                </textarea>
            

                <footer className="flex gap-2 mt-2">
                    <ScreenShotButton
                        screenshot={screenshot}
                        onScreenshotTook ={setScreenShot}
                    />
                    <button
                        type="submit"
                        disabled={comment.length === 0 || isSendingFeedback}
                        className="p-2 bg-brand-500 rounded-md text-sm border-transparent flex-1 flex justify-center items-center focus:outline-none hover:bg-brand-300 focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
                    >
                    {isSendingFeedback ? <Loading /> : 'Enviar feedback'}
                    </button>
                </footer>
            </form>
        </>
    )
}