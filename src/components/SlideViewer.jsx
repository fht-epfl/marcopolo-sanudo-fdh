import React from 'react';

/**
 * Generates iframe-compatible URL to display the presentation
 * @param {string | null} presentationKey The Google Slides presentation key
 * @param {boolean} loop Whether the slides should loop after finishing
 * @param {number} slideDuration Duration in seconds for how long each slide should be
 * @param {boolean} showControls Whether to display the Google Slides controls
 * @param {number} position Slide position to start
 * @returns {string} The constructed URL for embedding the presentation
 */
const constructUrl = (presentationKey, loop, slideDuration, showControls, position) => {
    let baseUrl = 'https://docs.google.com/presentation/d/';
    baseUrl += `${presentationKey}/embed?`;
    baseUrl += `loop=${loop ? 'true' : 'false'}`;

    if (slideDuration) {
        baseUrl += `&start=true`;
        baseUrl += `&delayms=${slideDuration * 1000}`;
    }

    if (!showControls) {
        baseUrl += `&rm=minimal`;
    }

    if (position) {
        baseUrl += `&slide=${position}`;
    }

    return baseUrl;
};

// Regex for extracting presentation ID
const regex = /(((https|http):\/\/|)docs\.google\.com\/presentation\/d\/)(.+?(?=(\/.+|\/|$)))/;

/**
 * Extracts the slide ID from the shareable URL
 * @param {string} slidesUrl The Google Slides URL
 * @returns {string | null} The extracted presentation key
 */
const extractSlidesKey = (slidesUrl) => {
    const match = regex.exec(slidesUrl);
    return match ? match[4] : null;
};

/**
 * Calculates dimensions for string or numbers
 * @param {string | number | null} dim The dimension value
 * @returns {string} The calculated dimension in px or as-is for strings
 */
const calcDimension = (dim) => (dim ? (typeof dim === 'number' ? `${dim}px` : dim) : '480px');

const ReactGoogleSlides = ({
                               slidesLink,
                               loop = false,
                               slideDuration = null,
                               showControls = false,
                               position = null,
                               width = '640px',
                               height = '480px',
                               containerStyle = null,
                               ErrorComponent,
                               ...props
                           }) => {
    const presentationKey = extractSlidesKey(slidesLink);
    const url = constructUrl(
        presentationKey,
        loop,
        slideDuration,
        showControls,
        position
    );

    if (!presentationKey && ErrorComponent) {
        return <>{ErrorComponent}</>;
    }

    return (
        <iframe
            src={url}
            width={calcDimension(width)}
            height={calcDimension(height)}
            style={containerStyle || { border: 0 }}
            allowFullScreen
            {...props}
        />
    );
};

export default ReactGoogleSlides;
