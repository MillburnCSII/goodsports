import Image from "next/image";
import GenericButton from "./Generic/GenericButton";

interface goalpost {
    id: number;
    title: string;
    catergory: string;
    description: string;
    image: string;
    goal: number;
    current: number;
}

export default function DonateCard(props: { post: goalpost }) {
    return (
        <div
            key={props.post.id}
            className="bg-white drop-shadow-lg rounded-2xl p-8 grid grid-rows-[min-content,_auto]"
        >
            <div className="relative w-full aspect-[4/3] rounded-md overflow-hidden">
                <Image
                    className="object-cover"
                    alt=""
                    src={props.post.image}
                    fill={true}
                />
            </div>
            <div className="flex flex-col justify-between h-full">
                <div>
                    <h2 className="mt-4 text-gray-500 text-sm">
                        {props.post.catergory}
                    </h2>
                    <h1 className="text-xl mt-2">{props.post.title}</h1>
                    <p className="text-gray-500 mt-2">
                        {props.post.description}
                    </p>
                </div>
                <div>
                    <div className="flex my-4 gap-4">
                        <div className="w-full bg-secondary rounded-full overflow-hidden">
                            <div
                                className="rounded-full bg-primary h-full"
                                style={{
                                    width: `${
                                        (props.post.current / props.post.goal) *
                                        100
                                    }%`,
                                }}
                            ></div>
                        </div>
                        <p>
                            {Math.trunc(
                                (props.post.current / props.post.goal) * 100
                            )}
                            %
                        </p>
                    </div>
                    <GenericButton className="border-primary !text-primary !border-2 !rounded-full !bg-transparent hover:!bg-primary hover:!text-white mx-auto block px-6 mt-6">
                        Donate Now
                    </GenericButton>
                </div>
            </div>
        </div>
    );
}
