import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import { useRef, useState } from "react";

import VideoPreview from "./VideoPreview";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(1); // current index of the video
    const [hasClicked, setHasClicked] = useState(false); // flag to check if the mini video has been clicked


    const totalVideos = 4; // the total number of videos
    const nextVideoRef = useRef(null); // reference for the next video dom, so we can use it.


    /* mini video functions */
    const handleMiniVideoClick = () => {
        setHasClicked(true); // set the hasClicked to true once it is clicked.
        setCurrentIndex((prevIndex) => (prevIndex % totalVideos) + 1);
        // 1 % 4 + 1 = 2, 2 % 4 + 1 = 3, 3 % 4 + 1 = 4, 4 % 4 + 1 = 1
    };

    /* This animation will be played when the mini video is clicked(the current index changed) */
    useGSAP(
        () => {
            if (hasClicked) {
                /* the next video is visible when I click the mini video */
                gsap.set("#current-video", { visibility: "visible" });
                /* */
                gsap.from("#next-video", {
                    transformOrigin: "50% 50%", // scale point is in the middle of the video
                    scale: 0, // starting from zero scale
                    duration: 2, // duration of two seconds to transmit the scale from 0 to the original size
                    ease: "power1.inOut", // acceleration
                });
                gsap.to("#current-video", {
                    transformOrigin: "50% 50%",
                    width: "100%", // the whole screen
                    height: "100%", // the whole screen
                    duration: 2,
                    ease: "power1.inOut",
                    onStart: () => nextVideoRef.current.play(), // play the next video
                });
            }
        },
        {
            dependencies: [currentIndex], // whenever the currentIndex changes
            revertOnUpdate: true, // back to the original place, so we will not lose the animation of the next videos
        }
    );

    useGSAP(() => {
        /* set the default/original video frame to irregular shape we want */
        gsap.set("#video-frame", {
            clipPath: "polygon(0 0, 100% 0%, 75% 100%, 0% 100%)", // irregular shape
            borderRadius: "0% 0% 40% 0%",
        });

        /* animate the video frame to the original shape */
        gsap.from("#video-frame", {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", // rectangle shape
            borderRadius: "0% 0% 0% 0%",
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: "#video-frame",
                start: "center center", // The animation starts when the center of the #video-frame element aligns with the center of the viewport.
                end: "bottom center", // The animation ends when the bottom of the #video-frame element aligns with the center of the viewport.
                scrub: true, // the animation progress is directly synchronized with the scroll progress.
            },
        });
    });

    const getVideoSrc = (index) => `/videos/hero-${index}.mp4`;

    return (
        <div className="relative h-dvh w-screen overflow-x-hidden">
            {/* the whole video frame */}
            <div
                id="video-frame"
                className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
            >
                {/* videos part */}
                <div>
                    {/* mini video showing the next video */}
                    <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
                        <VideoPreview>
                            <div
                                onClick={handleMiniVideoClick}
                                className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
                            >
                                <video
                                    ref={nextVideoRef}
                                    src={getVideoSrc((currentIndex % totalVideos) + 1)}
                                    loop
                                    muted
                                    id="next-video"
                                    className="size-64 origin-center scale-150 object-cover object-center"
                                />
                            </div>
                        </VideoPreview>
                    </div>

                    <video
                        ref={nextVideoRef}
                        src={getVideoSrc(currentIndex)}
                        loop
                        muted
                        id="current-video"
                        className="absolute-center invisible absolute z-20 size-64 object-cover object-center"

                    />
                    <video
                        src={getVideoSrc(
                            currentIndex === totalVideos - 1 ? 1 : currentIndex
                        )}
                        autoPlay
                        loop
                        muted
                        className="absolute left-0 top-0 size-full object-cover object-center"

                    />
                </div>
                {/* texts part */}

                {/* names */}
                <h1 className="hero-heading absolute bottom-5 right-5 z-40 text-violet-100">
                    Chiara, Haotian, Vittoria
                </h1>
                {/* project */}
                <div className="absolute left-0 top-0 z-40 size-full mt-24 px-5 sm:px-10">
                    {/* project title */}
                    <h1 className="hero-heading text-blue-100">
                        I Diarii di Marino Sanuto
                    </h1>
                    {/* project slogan */}
                    <p className="mb-5 max-w-64 font-robert-regular text-violet-200">
                        Enter the Sanudo world <br/> Volume 5
                    </p>
                </div>
            </div>
            {/* the name when scroll down outside the video frame*/}
            <h1 className="hero-heading absolute bottom-5 right-5 text-black">
                Chiara, Haotian, Vittoria
            </h1>
        </div>
    );
};

export default Hero;