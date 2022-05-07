import { Camera, Trash } from "phosphor-react";
import html2canvas from 'html2canvas';
import { useState } from "react";
import { Loading } from "../Loading";


interface ScreenShotButtonProps{
    screenshot: string | null,
    onScreenshotTook: (screenshot: string | null) => void;
}

export function ScreenShotButton({
    screenshot,
    onScreenshotTook,

}: ScreenShotButtonProps){

    const [isTakeScreenShot, setIsTakeScreenShot] = useState(false) 

    async function HandleTakeScreenShot(){
        setIsTakeScreenShot(true)

        const canvas = await html2canvas(document.querySelector('html')!);
        const base64image = canvas.toDataURL('image/png');

        onScreenshotTook(base64image);

        setIsTakeScreenShot(false);
    }
    if(screenshot){
        return (
            <button
                type="button"
                onClick={()=> onScreenshotTook(null)}
                className="p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end text:zinc-400 hover:bg-zinc-200"
                style={{
                    backgroundImage: `URL(${screenshot})`,
                    backgroundPosition: 'right bottom',
                    backgroundSize: 180,
                }}
            >
                 <Trash weight="fill" />
            </button>
        );
    }

    return (
        <button
            type="button"
            onClick={HandleTakeScreenShot}
            className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 transparent-colors"
        >
           { isTakeScreenShot ? <Loading /> : <Camera  className="w-6 h-6"/>}
        </button>
    )
}