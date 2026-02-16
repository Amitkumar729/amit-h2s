
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Heart, Activity } from 'lucide-react';

const MonsterCard = ({ data, image }) => {
    if (!data) return null;

    return (
        <motion.div
            className="relative w-full max-w-sm bg-black border border-green-500/50 overflow-hidden group perspective-1000"
            initial={{ opacity: 0, rotateY: 90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
        >
            {/* Dynamic Background Noise */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>

            {/* Header */}
            <div className="bg-green-900/20 p-4 border-b border-green-500/50 flex justify-between items-center relative overflow-hidden">
                <h2 className="text-2xl font-bold text-green-400 font-mono tracking-tighter uppercase glitch-text" data-text={data.name}>
                    {data.name}
                </h2>
                <div className="text-[10px] font-mono text-green-600 border border-green-800 px-2 py-1">
                    TYPE // {data.type.toUpperCase()}
                </div>
                <div className="absolute bottom-0 left-0 h-[2px] w-full bg-green-500 animate-pulse"></div>
            </div>

            {/* Image Container */}
            <div className="relative aspect-video bg-black border-y border-green-900/50 overflow-hidden group-hover:border-green-500 transition-colors duration-500">
                <img src={image} alt={data.name} className="w-full h-full object-cover filter contrast-125 brightness-90 grayscale group-hover:grayscale-0 transition-all duration-700" />

                {/* Overlay Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.1)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>

                {/* Corner Accents */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-green-500"></div>
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-green-500"></div>
            </div>

            {/* Stats Section */}
            <div className="p-6 space-y-6 font-mono relative">
                <div className="space-y-3">
                    <StatBar label="HP" value={data.hp} max={100} icon={<Heart size={14} />} />
                    <StatBar label="ATK" value={data.attack} max={100} icon={<Zap size={14} />} />
                    <StatBar label="DEF" value={data.defense} max={100} icon={<Shield size={14} />} />
                </div>

                {/* Ability Box */}
                <div className="relative p-4 border border-green-800 bg-green-900/10">
                    <div className="absolute -top-3 left-4 bg-black px-2 text-xs text-green-600 font-bold uppercase tracking-widest flex items-center gap-2">
                        <Activity size={12} className="animate-pulse" />
                        SPECIAL_ABILITY
                    </div>
                    <h3 className="text-green-400 font-bold mb-1 uppercase">{data.ability}</h3>
                    <p className="text-green-600/80 text-xs leading-relaxed lowercase">
                        {data.abilityDesc}
                    </p>
                </div>

                {/* Flavor Text */}
                <div className="text-[10px] text-green-800/80 italic border-l-2 border-green-900 pl-3 leading-tight">
                    "{data.flavorText}"
                </div>
            </div>

            {/* Footer Status Line */}
            <div className="bg-green-900/10 p-2 text-[8px] text-green-800 font-mono text-center tracking-[0.5em] uppercase border-t border-green-900/50">
                System Analysis Complete
            </div>
        </motion.div>
    );
};

const StatBar = ({ label, value, max, icon }) => {
    const percentage = Math.min((value / max) * 100, 100);

    return (
        <div className="flex items-center gap-3 text-xs">
            <div className="w-8 font-bold text-green-600 flex justify-end">{label}</div>
            <div className="flex-1 h-3 bg-green-900/20 border border-green-900/50 relative overflow-hidden">
                {/* Fill Animation */}
                <motion.div
                    className="h-full bg-green-500/80 relative"
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, ease: "circOut", delay: 0.2 }}
                >
                    <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-white mix-blend-overlay"></div>
                </motion.div>

                {/* Grid Lines in Bar */}
                <div className="absolute inset-0 flex justify-evenly pointer-events-none">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-[1px] h-full bg-black/20"></div>
                    ))}
                </div>
            </div>
            <div className="w-8 text-right text-green-500 font-bold">{value}</div>
        </div>
    );
};

export default MonsterCard;
