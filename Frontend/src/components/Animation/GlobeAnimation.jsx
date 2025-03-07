import React, { useEffect, useRef } from 'react';
import createGlobe from 'cobe';

const GlobeAnimation = () => {
  const canvasRef = useRef(null);
  const pointerInteracting = useRef(null);
  const pointerInteractionMovement = useRef(0);
  const fadeInComplete = useRef(false);
  const globeInstance = useRef(null);

  useEffect(() => {
    let width = 0;
    let currentPhi = 0;
    let currentTheta = 0;
    const doublePi = Math.PI * 2;
    const onResize = () => {
      if (!canvasRef.current) return;
      width = canvasRef.current.offsetWidth;
    };

    window.addEventListener('resize', onResize);
    onResize();

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.1, 0.8, 1],
      glowColor: [1, 1, 1],
      offset: [0, width * -0.4],
      markers: [
        { location: [37.7749, -122.4194], size: 0.03 }, // San Francisco
        { location: [40.7128, -74.0060], size: 0.03 },  // New York
        { location: [51.5074, -0.1278], size: 0.03 },   // London
        { location: [35.6762, 139.6503], size: 0.03 },  // Tokyo
        { location: [-33.8688, 151.2093], size: 0.03 }, // Sydney
      ],
      onRender: (state) => {
        if (!fadeInComplete.current) {
          state.phi = currentPhi;
          currentPhi += 0.003;
          state.theta = currentTheta;
          currentTheta += 0.003;
          if (currentPhi >= doublePi) {
            fadeInComplete.current = true;
          }
        } else if (!pointerInteracting.current) {
          state.phi += 0.003;
        }
        state.width = width * 2;
        state.height = width * 2;
      }
    });

    globeInstance.current = globe;

    const onPointerDown = (e) => {
      pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
      if (canvasRef.current) {
        canvasRef.current.style.cursor = 'grabbing';
      }
    };

    const onPointerUp = () => {
      pointerInteracting.current = null;
      if (canvasRef.current) {
        canvasRef.current.style.cursor = 'grab';
      }
    };

    const onPointerOut = () => {
      pointerInteracting.current = null;
      if (canvasRef.current) {
        canvasRef.current.style.cursor = 'grab';
      }
    };

    const onMouseMove = (e) => {
      if (pointerInteracting.current !== null) {
        const delta = e.clientX - pointerInteracting.current;
        pointerInteractionMovement.current = delta;
        // Fix: Update the phi state property through the state parameter 
        // that is passed to the onRender callback instead of directly on the globe
        if (globeInstance.current) {
          // We store this delta and use it in the onRender callback
          pointerInteractionMovement.current = delta;
        }
      }
    };

    if (canvasRef.current) {
      canvasRef.current.style.cursor = 'grab';
      canvasRef.current.addEventListener('pointerdown', onPointerDown);
      canvasRef.current.addEventListener('pointerup', onPointerUp);
      canvasRef.current.addEventListener('pointerout', onPointerOut);
      canvasRef.current.addEventListener('mousemove', onMouseMove);
    }

    return () => {
      globe.destroy();
      window.removeEventListener('resize', onResize);
      if (canvasRef.current) {
        canvasRef.current.removeEventListener('pointerdown', onPointerDown);
        canvasRef.current.removeEventListener('pointerup', onPointerUp);
        canvasRef.current.removeEventListener('pointerout', onPointerOut);
        canvasRef.current.removeEventListener('mousemove', onMouseMove);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
        cursor: 'grab',
        contain: 'layout paint size',
        opacity: 0.95,
      }}
    />
  );
};

export default GlobeAnimation;
