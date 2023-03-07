interface bruh {
    label: string;
    value: any;
    onChange: (value: any) => any;
    placeholder?: string;
    type?: string;
    required?: boolean;
    className?: string;
}

export default function GenericInput(props: bruh) {
    return (
        <div>
            <label
                htmlFor={props.label}
                className="text-sm font-medium text-gray-700"
            >
                {props.label}
            </label>
            <div className="mt-1">
                <input
                    type={props.type || "text"}
                    name={props.label}
                    id={props.label}
                    value={props.value}
                    onChange={(e) => props.onChange(e.target.value)}
                    className={`shadow-sm focus:ring-primary focus:border-primary sm:text-sm border-gray-300 rounded-md sm:min-w-0 min-w-full sm:w-auto w-0 ${props.className}`}
                    placeholder={props.placeholder}
                    required={props.required}
                />
            </div>
        </div>
    );
}
