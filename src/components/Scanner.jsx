
import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Camera, Upload, ScanLine, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Scanner = ({ onScan, scanning }) => {
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            processFile(file);
        }
    };

    const processFile = (file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const triggerScan = () => {
        if (fileInputRef.current?.files[0]) {
            onScan(fileInputRef.current.files[0], preview);
        }
    };

    return (
        <div className="relative w-full max-w-md mx-auto aspect-square group">
            {/* Cyberpunk Reticle SVG */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-20 text-green-500/50" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Corners */}
                <path d="M10 30 V10 H30" stroke="currentColor" strokeWidth="1" />
                <path d="M70 10 H90 V30" stroke="currentColor" strokeWidth="1" />
                <path d="M10 70 V90 H30" stroke="currentColor" strokeWidth="1" />
                <path d="M90 70 V90 H70" stroke="currentColor" strokeWidth="1" />

                {/* Crosshairs */}
                <path d="M45 50 H55" stroke="currentColor" strokeWidth="0.5" />
                <path d="M50 45 V55" stroke="currentColor" strokeWidth="0.5" />

                {/* Dynamic Circles */}
                <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.2" strokeDasharray="4 4" className="animate-[spin_10s_linear_infinite]" />
                <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="0.5" strokeDasharray="20 20" className="animate-[spin_15s_linear_infinite_reverse] opacity-50" />
            </svg>

            {/* Scan Area */}
            <div
                className={`relative w-full h-full bg-black/50 overflow-hidden border border-green-900/50 transition-all duration-300 ${!preview ? 'hover:bg-green-900/10 cursor-pointer' : ''}`}
                onClick={() => !scanning && !preview && fileInputRef.current?.click()}
                onKeyDown={(e) => {
                    if ((e.key === 'Enter' || e.key === ' ') && !scanning && !preview) {
                        fileInputRef.current?.click();
                    }
                }}
                role="button"
                tabIndex={!scanning && !preview ? 0 : -1}
                aria-label="Upload image for scanning"
            >
                <AnimatePresence>
                    {preview ? (
                        <motion.div
                            key="preview"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="w-full h-full relative"
                        >
                            <img src={preview} alt="Target" className="w-full h-full object-cover filter grayscale sepia-[0.5] contrast-125 brightness-75 border-2 border-transparent" />
                            <div className="absolute inset-0 bg-green-500/10 mix-blend-overlay"></div>

                            {/* Scan Line Animation */}
                            {scanning && (
                                <motion.div
                                    className="absolute left-0 right-0 h-2 bg-green-400/80 shadow-[0_0_20px_rgba(74,222,128,0.8)] z-30"
                                    animate={{ top: ['0%', '100%', '0%'] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                />
                            )}

                            {!scanning && (
                                <button
                                    onClick={(e) => { e.stopPropagation(); setPreview(null); }}
                                    className="absolute top-2 right-2 p-2 bg-black/80 text-red-500 hover:text-red-400 z-40 border border-red-900/50"
                                    aria-label="Clear image"
                                >
                                    <X size={20} />
                                </button>
                            )}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="placeholder"
                            className="w-full h-full flex flex-col items-center justify-center text-green-700/50 gap-4"
                            whileHover={{ scale: 1.05, color: '#22c55e' }}
                        >
                            <Camera size={64} strokeWidth={1} />
                            <div className="text-xs font-mono tracking-widest uppercase">
                                Load Target Image
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Action Button */}
            {preview && !scanning && (
                <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={triggerScan}
                    className="absolute bottom-[-60px] left-1/2 transform -translate-x-1/2 w-full py-4 bg-green-900/80 text-green-400 border border-green-500 hover:bg-green-500 hover:text-black font-bold tracking-widest transition-all z-50 skew-x-[-10deg]"
                >
                    EXECUTE_ANALYSIS
                </motion.button>
            )}

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/png, image/jpeg, image/webp"
                className="hidden"
                aria-label="File input for image upload"
            />
        </div>
    );
};

Scanner.propTypes = {
    onScan: PropTypes.func.isRequired,
    scanning: PropTypes.bool.isRequired
};

export default Scanner;
