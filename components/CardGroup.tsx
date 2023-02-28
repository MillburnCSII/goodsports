import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import GenericButton from "./Generic/GenericButton";
import { useBlazeSlider } from "react-blaze-slider";
import "blaze-slider/dist/blaze.css";
import React from "react";

export default function CardGroup(props: {
    title: string;
    subtitle: string;
    data: any;
    card: any;
}) {
    const [offset, setOffset] = useState(0);
    const [style, setStyle] = useState({
        transform: `translateX(${offset}%)`,
    });
    const ref = useBlazeSlider({
        all: {
            slidesToShow: 1,
            slideGap: "2rem",
            loop: true,
        },
        "(min-width: 640px)": {
            slidesToShow: 2,
        },
        "(min-width: 1024px)": {
            slidesToShow: 3,
        },
    });

    // if (props.data.length === 0) return <h1>404 No Data</h1>;

    const step = (1 / 6) * 100;

    const handleIncrement = () => {
        const cap = step * (props.data.length - 3);
        if (offset >= cap) return alert("over!");
        setOffset(offset + step);
        setStyle({ transform: `translateX(${-(offset + step)}%)` });
    };

    const handleDecrement = () => {
        if (offset <= 0) return alert("under!");
        setOffset(offset - step);
        setStyle({ transform: `translateX(${-(offset - step)}%)` });
    };

    return (
        <>
            <div className="blaze-slider" ref={ref}>
                <div className="blaze-container p-10 sm:p-16">
                    <div className="flex justify-between items-end">
                        <div>
                            <h2>{props.subtitle}</h2>
                            <h1 className="text-3xl font-serif mt-2">
                                {props.title}
                            </h1>
                        </div>
                        <div className="flex gap-4">
                            <button className="blaze-prev h-12 w-12 rounded-full bg-primary text-secondary flex justify-center items-center p-2">
                                <ChevronLeftIcon />
                            </button>
                            {/* <div className="blaze-pagination"></div> */}
                            <button className="blaze-next h-12 w-12 rounded-full bg-primary text-secondary flex justify-center items-center p-2">
                                <ChevronRightIcon />
                            </button>
                        </div>
                    </div>
                    <div className="-m-4 p-4 lg:-m-16 lg:p-16 overflow-hidden">
                        <div className="blaze-track-container mt-8 -m-6 p-6">
                            <div className="blaze-track">
                                {props.data.map((cardData) => (
                                    <props.card
                                        post={cardData}
                                        key={cardData.id}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
