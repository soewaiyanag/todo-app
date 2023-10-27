import { Link } from "@inertiajs/react";

export default function Header() {
    const toggleDarkMode = () => {
        document.body.classList.toggle("dark");
    };

    return (
        <div className="relative z-20 mx-auto mt-12 flex w-full max-w-sm items-center justify-between md:max-w-md">
            <Link href="/">
                <h1 className="text-3xl font-bold tracking-[.35em] text-white">
                    TODO
                </h1>
            </Link>
            <img
                onClick={toggleDarkMode}
                className="hidden h-6 w-6 cursor-pointer dark:block"
                src="/images/icon-sun.svg"
                aria-label="Light Mode"
            />
            <img
                onClick={toggleDarkMode}
                className="block h-6 w-6 cursor-pointer dark:hidden"
                src="/images/icon-moon.svg"
                aria-label="Dark Mode"
            />
        </div>
    );
}
