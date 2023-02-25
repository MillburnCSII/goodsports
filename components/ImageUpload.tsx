import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { Dialog, Transition } from "@headlessui/react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebaseConfig.js";
import { Fragment, useEffect, useState, useCallback, useRef } from "react";
import GenericButton from "./Generic/GenericButton";
import { InboxIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/20/solid";

export default function ImageUploadModal({ files, setFiles }) {
    // FIXME: If transient interaction is lost and the error toast is displayed, when the user clicks copy, it will wipe files array.

    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [currentImage, setCurrentImage] = useState(0);
    const [blobs, setBlobs] = useState([]);
    const [links, setLinks] = useState([]);

    useEffect(() => {
        const blobs2 = files.map((file: File) => getBlob(file));
        setBlobs(blobs2);
    }, [files]);

    const cancelImage = async (currentImage: number) => {
        await setFiles(
            files.filter((file: File) => file !== files[currentImage])
        );
    };

    const cancelCallback = useCallback(cancelImage, [files, setFiles]);

    useEffect(() => {
        console.log(files);
        if (files.length > 0 && !files[currentImage]) {
            setCurrentImage(currentImage - 1);
        } else if (files.length === 0) {
            setCurrentImage(0);
            setLinks([]);
        }
    }, [files, currentImage]);

    const confirmImage = (currentImage: number) => {
        uploadImage(currentImage);
    };

    const uploadImage = async (index: number) => {
        // e.preventDefault();
        // get the name of the file
        const file = files[index];
        const storageRef = ref(storage, `/files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload is paused");
                        break;
                    case "running":
                        console.log("Upload is running");
                        break;
                }
            },
            (error) => {
                console.error(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
                    console.log("File available at", url);

                    setLinks([...links, url]);
                });
            }
        );
    };

    const getBlob = (file: File): string => {
        return URL.createObjectURL(file);
    };

    let timeoutId = useRef(null);

    const copy = async () => {
        setError(false);
        navigator.clipboard.writeText(links.join("    |    ")).then(
            () => {
                setSuccess(true);
                // clear previous timeout
                timeoutId.current ? clearTimeout(timeoutId.current) : null;
                // set new timeout
                timeoutId.current = setTimeout(() => {
                    setSuccess(false);
                }, 2000);
                if (files.length == 0) {
                    setLinks([]);
                }
                cancelCallback(currentImage);
            },
            () => {
                setError(true);
            }
        );
    };

    const copyCallback = useCallback(copy, [
        links,
        files,
        currentImage,
        cancelCallback,
    ]);

    useEffect(() => {
        console.log(links);

        if (!links.length) return;

        if (
            (navigator as any).userActivation &&
            !(navigator as any).userActivation.isActive
        ) {
            setError(true);
        } else {
            copyCallback();
        }
    }, [links, copyCallback]);

    return (
        <>
            {/* Main Modal */}
            <Transition appear show={files.length > 0} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-10"
                    onClose={() => setFiles([])}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <div className="flex justify-between">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium leading-6 text-gray-900"
                                        >
                                            {files[currentImage]?.name}
                                        </Dialog.Title>
                                        <p>
                                            {currentImage + 1}/{files.length}
                                        </p>
                                    </div>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={blobs[currentImage]}
                                        alt=""
                                        className="rounded-md mt-4 aspect-[4/3] w-full object-cover"
                                    />
                                    {/* <div className="mt-2">
                            <p className="text-sm text-gray-500">
                                Your payment has been successfully
                                submitted. We’ve sent you an email
                                with all of the details of your
                                order.
                            </p>
                        </div> */}

                                    <div className="mt-4 flex justify-between items-baseline">
                                        <div className="flex gap-4">
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border-2 border-primary bg-white px-4 py-2 text-sm font-medium text-primary hover:text-white hover:bg-primary focus:outline-none focus-visible:ring-2 transition-all focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                                                onClick={() =>
                                                    confirmImage(currentImage)
                                                }
                                            >
                                                Upload
                                            </button>
                                            <button
                                                type="button"
                                                className="text-gray-500 hover:underline decoration-transparent hover:decoration-gray-500 underline-offset-4 transition-all text-sm font-medium"
                                                onClick={() =>
                                                    cancelImage(currentImage)
                                                }
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                        <div className="flex gap-4">
                                            <GenericButton
                                                className="!rounded-full !p-2"
                                                disabled={currentImage == 0}
                                                onClick={() =>
                                                    setCurrentImage(
                                                        currentImage - 1
                                                    )
                                                }
                                            >
                                                <ChevronLeftIcon className="w-4 h-4" />
                                            </GenericButton>

                                            <GenericButton
                                                className="!rounded-full !p-2"
                                                disabled={
                                                    currentImage ==
                                                    files.length - 1
                                                }
                                                onClick={() =>
                                                    setCurrentImage(
                                                        currentImage + 1
                                                    )
                                                }
                                            >
                                                <ChevronRightIcon className="w-4 h-4" />
                                            </GenericButton>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            {/* Copy Failed Toast */}
            <div
                aria-live="assertive"
                className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start z-30"
            >
                <div className="w-full flex flex-col items-center space-y-4 sm:items-end h-full justify-end">
                    {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
                    <Transition
                        show={error}
                        as={Fragment}
                        enter="transform ease-out duration-300 transition"
                        enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                        enterTo="translate-y-0 opacity-100 sm:translate-x-0"
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
                            <div className="p-4">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <InboxIcon
                                            className="h-6 w-6 text-gray-400"
                                            aria-hidden="true"
                                        />
                                    </div>
                                    <div className="ml-3 w-0 flex-1 pt-0.5">
                                        <p className="text-sm font-medium text-gray-900">
                                            Error!
                                        </p>
                                        <p className="mt-1 text-sm text-gray-500">
                                            Failed to copy the links to your
                                            clipboard, please click below to
                                            copy the links to your clipboard.
                                        </p>
                                        <div className="mt-3 flex space-x-7">
                                            <button
                                                type="button"
                                                className="bg-white rounded-md text-sm font-medium text-primary outline-none focus:outline-none  focus:decoration-primary decoration-transparent transition-all underline underline-offset-2"
                                                onClick={copy}
                                            >
                                                Copy
                                            </button>
                                            <button
                                                type="button"
                                                className="bg-white rounded-md text-sm font-medium text-gray-700 hover:text-gray-500 outline-none focus:outline-none focus:text-gray-500 focus:decoration-gray-500 decoration-transparent transition-all underline underline-offset-2"
                                                onClick={() => {
                                                    setError(false);
                                                }}
                                            >
                                                Dismiss
                                            </button>
                                        </div>
                                    </div>
                                    <div className="ml-4 flex-shrink-0 flex">
                                        <button
                                            className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                            onClick={() => {
                                                setError(false);
                                            }}
                                        >
                                            <span className="sr-only">
                                                Close
                                            </span>
                                            <XMarkIcon
                                                className="h-5 w-5"
                                                aria-hidden="true"
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition>
                </div>
            </div>
            {/* Successful Copy */}
            <div
                aria-live="assertive"
                className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start z-40"
            >
                <div className="w-full flex flex-col items-center space-y-4 sm:items-end h-full justify-end">
                    {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
                    <Transition
                        show={success}
                        as={Fragment}
                        enter="transform ease-out duration-300 transition"
                        enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                        enterTo="translate-y-0 opacity-100 sm:translate-x-0"
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
                            <div className="p-4">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <CheckCircleIcon
                                            className="h-6 w-6 text-green-400"
                                            aria-hidden="true"
                                        />
                                    </div>
                                    <div className="ml-3 w-0 flex-1 pt-0.5">
                                        <p className="text-sm font-medium text-gray-900">
                                            Successfully saved!
                                        </p>
                                        <p className="mt-1 text-sm text-gray-500">
                                            A public link to your images has
                                            been copied to your clipboard. You
                                            can now use the link within your
                                            markdown or as the cover image for
                                            your blog post.
                                        </p>
                                    </div>
                                    <div className="ml-4 flex-shrink-0 flex">
                                        <button
                                            className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            onClick={() => {
                                                setSuccess(false);
                                            }}
                                        >
                                            <span className="sr-only">
                                                Close
                                            </span>
                                            <XMarkIcon
                                                className="h-5 w-5"
                                                aria-hidden="true"
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition>
                </div>
            </div>
        </>
    );
}
