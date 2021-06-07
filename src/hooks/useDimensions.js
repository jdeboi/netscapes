// hook
import React, { useState, useEffect } from 'react';

export default function useDimensions() {

    const footerMobileH = 60;
    const headerMobileH = 60;
    const headerH = 34;
    const toolbarH = 26;


    const getHasFooter = (w, h) => {
        //788
        return (w < 835 || h < 600);
    }

    const getOrientation = (w, h) => {
        return w > h ? "landscape" : "portrait";
    }

    const getIsMobile = () => {
        return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    }

    const getWindowSize = (w) => {
        if (!w)
            return 'medium';
        else if (w < 340)
            return 'xxsmall';
        else if (w < 480)
            return 'xsmall';
        else if (w < 788)
            return 'small';
        else if (w < 992)
            return 'medium';
        else if (w < 1200)
            return 'large';
        return 'xlarge';
    }

    const getContentW = (w, h) => {
        if (getHasFooter(w, h) || getIsMobile(w, h)) {
            if (getOrientation(w, h) === "portrait") {
                return w;
            }
            return w - footerMobileH; // right hand menu
        }
        return w;
    }

    const getContentH = (w, h) => {
        if (getHasFooter(w, h) || getIsMobile(w, h)) {
            if (getOrientation(w, h) === "portrait") {
                return h - footerMobileH - headerMobileH;
            }
            return h - headerMobileH;
        }
        return h - headerH;
    }

    const getHeaderH = (w, h) => {
        return (getHasFooter(w, h) || getIsMobile()) ? headerMobileH : headerH;
    }

    const getEdgeSpacing = (w, h) => {
        if (w < 800)
            return 10;
        else if (w >= 1920)
            return 30;
        return 20;
    }


    const getWindowObject = () => {
        let initW = typeof window === 'object' ? window.innerWidth : null;
        let initH = typeof window === 'object' ? window.innerHeight : null;

        if (!initW || !initH)
            return null;

        return {
            width: initW,
            height: initH,
            isMobile: getIsMobile(),
            orientation: getOrientation(initW, initH),
            size: getWindowSize(initW),
            hasFooter: getHasFooter(initW, initH),
            headerH: getHeaderH(initW, initH),
            toolbarH: toolbarH,
            contentW: getContentW(initW, initH),
            contentH: getContentH(initW, initH),
            edgeSpacing: getEdgeSpacing(initW, initH)
        };
    }

    const [windowDimensions, setWindowDimensions] = useState(getWindowObject());

    const handleWindowResize = () => {
        setWindowDimensions(getWindowObject());
    }

    useEffect(
        () => {
            window.addEventListener('resize', handleWindowResize);

            return () => {
                window.removeEventListener('resize', handleWindowResize);
            }
        },
        []
    );

    return windowDimensions;
}
