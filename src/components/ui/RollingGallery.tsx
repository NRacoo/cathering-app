'use client'
import React, { useEffect, useState } from "react";
import {
    motion,
    useMotionValue,
    useAnimation,
    useTransform,
    PanInfo,
    ResolvedValues,
} from "framer-motion";
import gambar1 from '@/components/gambar/gambar1.jpg'
import gambar2 from '@/components/gambar/gambar2.jpg'
import gambar3 from '@/components/gambar/gambar3.jpg'
import gambar4 from '@/components/gambar/gambar4.jpg'
import gambar5 from '@/components/gambar/gambar5.jpg'
import gambar6 from '@/components/gambar/gambar6.jpg'
import gambar7 from '@/components/gambar/gambar7.jpg'
import gambar8 from '@/components/gambar/gambar8.jpg'
import gambar9 from '@/components/gambar/gambar9.jpg'
import gambar10 from '@/components/gambar/gambar10.jpg'
const IMGS = [
    gambar1.src,
    gambar2.src,
    gambar3.src,
    gambar4.src,
    gambar5.src,
    gambar6.src,
    gambar7.src,
    gambar8.src,
    gambar9.src,
    gambar10.src,
];

interface RollingGalleryProps {
    autoplay?: boolean;
    pauseOnHover?: boolean;
    images?: string[];
}

const RollingGallery: React.FC<RollingGalleryProps> = ({
    autoplay = false,
    pauseOnHover = false,
    images = [],
}) => {
    const galleryImages = images.length > 0 ? images : IMGS;
    const [isScreenSizeSm, setIsScreenSizeSm] = useState<boolean>(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setIsScreenSizeSm(window.innerWidth <= 640);
            const handleResize = () => setIsScreenSizeSm(window.innerWidth <= 640);
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }
    }, []);

    const cylinderWidth: number = isScreenSizeSm ? 1100 : 1800;
    const faceCount: number = galleryImages.length;
    const faceWidth: number = (cylinderWidth / faceCount) * 1.5;
    const radius: number = cylinderWidth / (2 * Math.PI);

    const dragFactor: number = 0.05;
    const rotation = useMotionValue(0);
    const controls = useAnimation();

    const transform = useTransform(
        rotation,
        (val: number) => `rotate3d(0,1,0,${val}deg)`
    );

    const startInfiniteSpin = (startAngle: number) => {
        controls.start({
            rotateY: [startAngle, startAngle - 360],
            transition: {
                duration: 20,
                ease: "linear",
                repeat: Infinity,
            },
        });
    };

    useEffect(() => {
        if (autoplay) {
            const currentAngle = rotation.get();
            startInfiniteSpin(currentAngle);
        } else {
            controls.stop();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [autoplay]);

    const handleUpdate = (latest: ResolvedValues) => {
        if (typeof latest.rotateY === "number") {
            rotation.set(latest.rotateY);
        }
    };

    const handleDrag = (
        _: MouseEvent | TouchEvent | PointerEvent,
        info: PanInfo
    ): void => {
        controls.stop();
        rotation.set(rotation.get() + info.offset.x * dragFactor);
    };

    const handleDragEnd = (
        _: MouseEvent | TouchEvent | PointerEvent,
        info: PanInfo
    ): void => {
        const finalAngle = rotation.get() + info.velocity.x * dragFactor;
        rotation.set(finalAngle);
        if (autoplay) {
            startInfiniteSpin(finalAngle);
        }
    };

    const handleMouseEnter = (): void => {
        if (autoplay && pauseOnHover) {
            controls.stop();
        }
    };

    const handleMouseLeave = (): void => {
        if (autoplay && pauseOnHover) {
            const currentAngle = rotation.get();
            startInfiniteSpin(currentAngle);
        }
    };

    return (
        <div className="relative h-[200px] w-full overflow-hidden">
           
            <div className="flex h-full items-center justify-center [perspective:1000px] [transform-style:preserve-3d]">
                <motion.div
                    drag="x"
                    dragElastic={0}
                    onDrag={handleDrag}
                    onDragEnd={handleDragEnd}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    animate={controls}
                    onUpdate={handleUpdate}
                    style={{
                        transform: transform,
                        rotateY: rotation,
                        width: cylinderWidth,
                        transformStyle: "preserve-3d",
                    }}
                    className="flex min-h-[200px] cursor-grab items-center justify-center [transform-style:preserve-3d]"
                >
                    {galleryImages.map((url, i) => (
                        <div
                            key={i}
                            className="group absolute flex h-fit items-center justify-center p-[8%] [backface-visibility:hidden] md:p-[6%]"
                            style={{
                                width: `${faceWidth}px`,
                                transform: `rotateY(${(360 / faceCount) * i}deg) translateZ(${radius}px)`,
                            }}
                        >
                            <img
                                src={url}
                                alt="gallery"
                                className="pointer-events-none h-[120px] w-[300px] rounded-[15px] border-[3px] border-white object-cover transition-transform duration-300 ease-out group-hover:scale-105 sm:h-[100px] sm:w-[220px]"
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default RollingGallery;
