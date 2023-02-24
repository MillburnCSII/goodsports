import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

export default function CardGroup(props: {
    title: string;
    subtitle: string;
    data: any;
    card: any;
}) {
    if (props.data.length === 0) return <h1>404 No Data</h1>;

    const [offset, setOffset] = useState(0);
    const [style, setStyle] = useState({
        transform: `translateX(${offset}%)`,
    });

    const step = (1 / 6) * 100;

    const handleIncrement = () => {
        if (offset >= 49) return alert("over!");
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
            <div className="p-16">
                <div className="flex justify-between items-end">
                    <div>
                        <h2>{props.subtitle}</h2>
                        <h1 className="text-3xl font-serif mt-2">
                            {props.title}
                        </h1>
                    </div>
                    <div className="lg:flex gap-4 hidden">
                        <button
                            className="bg-primary text-secondary h-12 w-12 rounded-full focus-within:ring-primary focus-within:ring-2 focus-within:ring-offset-2 transition-all p-2 flex justify-center items-center  disabled:bg-gray-500 disabled:text-gray-300"
                            onClick={handleDecrement}
                            disabled={offset <= 0}
                        >
                            <ChevronLeftIcon />
                        </button>
                        <button
                            className="bg-primary text-secondary h-12 w-12 rounded-full focus-within:ring-primary focus-within:ring-2 focus-within:ring-offset-2 transition-all p-2 flex justify-center items-center  disabled:bg-gray-500 disabled:text-gray-300"
                            onClick={handleIncrement}
                            disabled={offset >= 49}
                        >
                            <ChevronRightIcon />
                        </button>
                    </div>
                </div>
                <div className="-m-2 p-2 lg:-m-16 lg:p-16 overflow-hidden">
                    {/* DESKTOP VIEW */}
                    <div
                        className="lg:grid grid-cols-6 gap-8 mt-8 w-[200%] transition-all duration-500 lg:visible hidden"
                        style={style}
                    >
                        {props.data.map((cardData) => (
                            <props.card post={cardData} key={cardData.id} />
                        ))}
                    </div>
                    {/* MOBILE VIEW */}
                    <div className="flex flex-col grid-cols-2 gap-8 mt-8 w-full transition-all duration-500 lg:hidden visible sm:grid">
                        {[props.data[0], props.data[1]].map((cardData) => (
                            <props.card post={cardData} key={cardData.id} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
