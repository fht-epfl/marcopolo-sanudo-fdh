import { FaGithub } from "react-icons/fa";

const githubLinks = [
    { href: "https://github.com/chiara-del", name: "Chiara Delvecchio" },
    { href: "https://github.com/fht-epfl", name: "Haotian Fang" },
    { href: "https://github.com/vittoriameroni", name: "Vittoria Meroni" },
];

const Footer = () => {
    return (
        <footer className="w-screen bg-purple-500 py-4 text-black">
            <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
                <p className="text-center text-sm font-light md:text-left">
                    ©Team Marcopolo 2024. All rights reserved
                </p>

                <div className="flex justify-center gap-4 md:justify-start">
                    {githubLinks.map((link, index) => (
                        <a
                            key={index}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-black transition-colors duration-500 ease-in-out hover:text-white"
                        >
                            {index === 0 && <FaGithub className="mr-2" />} {link.name}
                        </a>
                    ))}
                </div>

            </div>
        </footer>
    );
};

export default Footer;
