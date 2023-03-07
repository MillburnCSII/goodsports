interface bruh {
    children: any;
    onClick?: () => any;
    disabled?: boolean;
    type?: "submit" | "button" | "reset";
    className?: string;
    srText?: string;
}

export default function GenericButton(props: bruh) {
    return (
        <button
            type={props.type || "button"}
            className={`px-4 py-2 mt-4 bg-primary text-white rounded-md focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 transition-all   disabled:bg-gray-500 disabled:text-gray-300 disabled:ring-gray-500 ${props.className}`}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.children}
            {props.srText && <span className="sr-only">{props.srText}</span>}
        </button>
    );
}
