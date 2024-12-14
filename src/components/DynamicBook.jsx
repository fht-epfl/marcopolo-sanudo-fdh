import React, { useState, useEffect, useRef } from 'react';
import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Experience } from "./dynamicbook/Experience";
import { UI } from "./dynamicbook/UI";

import ReactGoogleSlides from './SlideViewer';

const SlideViewer = () => {
    return (
        <div id="datastory" className="h-full w-full flex items-center justify-center">
            <ReactGoogleSlides
                width={680}
                height={418}
                slidesLink="https://docs.google.com/presentation/d/16rHJPH5FaAHGiwzbEGcFuFIVB3XzaqwMnXu_X6Axc_4/edit?usp=sharing"
                position={1}
                showControls
                loop
            />
        </div>
    );
};

const DynamicBook = () => {
    const [isScrolledIntoView, setIsScrolledIntoView] = useState(false); // Track if the component is in view
    const containerRef = useRef(null); // Ref for the container

    useEffect(() => {
        const handleScroll = () => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                const threshold = window.innerHeight * 0.5; // 50% threshold
                const isVisible = rect.top < threshold && rect.bottom > threshold;
                setIsScrolledIntoView(isVisible);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="relative h-dvh w-full flex overflow-x-hidden"> {/* Adjusted container to flex */}
            <div ref={containerRef} className="h-dvh w-1/2">
                {isScrolledIntoView && <UI />} {/* Render UI only when scrolled into 50% of view */}
                <Loader />
                <Canvas
                    shadows
                    camera={{
                        position: [-0.5, 1, window.innerWidth > 800 ? 4 : 9],
                        fov: 45,
                    }}
                >
                    <group position-y={0}>
                        <Suspense fallback={null}>
                            <Experience />
                        </Suspense>
                    </group>
                </Canvas>
            </div>
            <div className="h-dvh w-1/2">
                <SlideViewer /> {/* Add SlideViewer to the other half */}
            </div>
        </div>
    );
};

export default DynamicBook;
