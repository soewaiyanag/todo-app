import BackgroundImage from "@/Components/BackgroundImage";
import { Link, Head } from "@inertiajs/react";

export default function Todo({ auth }) {
    const toggleDarkMode = () => {
        document.body.classList.toggle("dark");
    };

    return (
        <div className="font-josefin">
            <Head title="Todo App" />
            <BackgroundImage />
            <div className="flex max-w-sm w-full justify-between items-center mx-auto mt-12">
                <h1 className="text-3xl font-bold text-white tracking-[.35em]">
                    TODO
                </h1>
                <img
                    onClick={toggleDarkMode}
                    className="w-6 h-6 cursor-pointer hidden dark:block"
                    src="/images/icon-sun.svg"
                />
                <img
                    onClick={toggleDarkMode}
                    className="w-6 h-6 cursor-pointer block dark:hidden"
                    src="/images/icon-moon.svg"
                />
            </div>
        </div>
    );
}
