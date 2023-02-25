import Image from "next/image";
import Link from "next/link";
import { UserIcon, CalendarDaysIcon } from "@heroicons/react/20/solid";
import removeMarkdownAndHtml from "remove-markdown-and-html";
import { useCallback, useEffect, useState } from "react";

interface blogprops {
    id: number;
    title: string;
    description: string;
    image: string;
    author: string;
    date: number;
    content: string;
}

export default function BlogCard(props: { post: blogprops }) {
    const [date, setDate] = useState("Loading...");

    useEffect(() => {
        setDate(new Date(props.post.date).toLocaleDateString());
    }, [date, props.post.date]);

    const [sample, setSample] = useState("Loading...");

    useEffect(() => {
        const filtered = removeMarkdownAndHtml(props.post.content);

        let segmenter;

        if (Intl.Segmenter === undefined) {
            // BECAUSE FUCKING FIREFOX DOESN'T SUPPORT IT
            const regex = /(.+?([A-Z].)[\.|\?|\!](?:['")\\\s]?)+?\s?)/gim;
            const sentences = filtered.match(regex);
            setSample(
                sentences[1] + sentences[2]
                    ? sentences[2].slice(0, -3)
                    : "" + "..."
            );
        } else {
            segmenter = new Intl.Segmenter("en", { granularity: "sentence" });
            const iterator1 = segmenter.segment(filtered)[Symbol.iterator]();
            iterator1.next();
            const sentence2 = iterator1.next();
            const sentence3 = iterator1.next();

            setSample(
                sentence2.value.segment +
                    sentence3.value.segment.slice(0, -3) +
                    "..."
            );
        }
    }, [sample, props.post.content]);

    return (
        <div
            className="bg-white drop-shadow-lg rounded-2xl overflow-hidden grid grid-rows-[min-content,_auto]"
            key={props.post.id}
        >
            <div className="relative w-full aspect-[4/3]">
                <Image
                    className="object-cover"
                    alt=""
                    src={props.post.image}
                    fill={true}
                />
            </div>
            <div className="p-8 flex flex-col justify-between gap-4">
                <div className="flex gap-2 flex-col mb-2">
                    <div className="grid grid-cols-2 gap-4 text-gray-500 text-sm">
                        <div className="flex gap-2 items-start">
                            <UserIcon className="h-6 w-6 hidden sm:block" />
                            <h2>{props.post.author}</h2>
                        </div>
                        <div className="flex gap-2 items-start">
                            <CalendarDaysIcon className="h-6 w-6 hidden sm:block" />
                            <h2>{date}</h2>
                        </div>
                    </div>
                    <h1 className="text-primary font-serif text-2xl">
                        {props.post.title}
                    </h1>
                    <p className="text-sm text-gray-500">
                        {props.post.description || sample}
                    </p>
                </div>
                <div>
                    <Link
                        href={`/blogs/${props.post.id}`}
                        className="border-primary text-primary border-2 rounded-md px-6 py-2 hover:bg-primary hover:text-white transition-all"
                    >
                        Read More
                    </Link>
                </div>
            </div>
        </div>
    );
}
