'use client';
import Advantages from "./sections/Advantages";
import Main from "./sections/Main";
import Reminder from "./sections/Reminder";
import Steps from "./sections/Steps";

export default function Hero() {
    return (
        <div className="w-full h-full">
            <Main></Main>
            <Advantages></Advantages>
            <Steps></Steps>
            <Reminder></Reminder>
        </div>
    );
}