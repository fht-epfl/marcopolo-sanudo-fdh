import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";

const navItems = ["Home", "DataStory"];

const NavBar = () => {

    // Refs for navigation container
    const navContainerRef = useRef(null); // directly connects to the navigation container
    const { y: currentScrollY } = useWindowScroll(); // Get the current scroll position
    const [isNavVisible, setIsNavVisible] = useState(true); // state for visibility
    const [lastScrollY, setLastScrollY] = useState(0); // last scroll position

    // call useEffect whenever the currentScrollY or lastScrollY changes
    useEffect(() => {
        if (currentScrollY === 0) {
            // Topmost position: show navbar without floating-nav by removing the floating-nav class
            setIsNavVisible(true);
            navContainerRef.current.classList.remove("floating-nav");
        } else if (currentScrollY > lastScrollY) {
            // Scrolling down: hide navbar and apply floating-nav
            setIsNavVisible(false);
            navContainerRef.current.classList.add("floating-nav");
        } else if (currentScrollY < lastScrollY) {
            // Scrolling up: show navbar with floating-nav
            setIsNavVisible(true);
            navContainerRef.current.classList.add("floating-nav");
        }

        setLastScrollY(currentScrollY);
    }, [currentScrollY, lastScrollY]);

    useEffect(() => {
        gsap.to(navContainerRef.current, {
            y: isNavVisible ? 0 : -100, // if the navbar is visible, set the y start from zero, otherwise start from -100, so it will have the effect from top
            opacity: isNavVisible ? 1 : 0, // if the navbar is visible, set the navbar flag to 1
            duration: 0.2,
        });
    }, [isNavVisible]);

    return (
        <div
            ref={navContainerRef}
            className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700"
        >
            {/* When the navbar is visible, render the header */}
            <header className="absolute top-1/2 w-full -translate-y-1/2">
                <nav className="flex size-full items-center justify-between p-4">
                    {/* Logo */}
                    <img src="./img/logo.png" alt="logo" className="w-10" />
                    {/* Navigation Links */}

                        <div className="hidden md:block">
                            {/* Create nav items for each */}
                            {navItems.map((item, index) => (
                                <a
                                    key={index}
                                    href={`#${item.toLowerCase()}`}
                                    className="nav-hover-btn"
                                >
                                    {item}
                                </a>
                            ))}
                    </div>
                </nav>
            </header>
        </div>
    );
};

export default NavBar;