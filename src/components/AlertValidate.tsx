import { motion, AnimatePresence } from "framer-motion";

export default function Alert({ show, message }: { show: boolean; message: string | null; }) {
    return (
        <AnimatePresence>
            {show && (
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className="text-[var(--secondary)] text-center fixed bg-white w-[90vw] max-w-md left-1/2 -translate-x-1/2 top-6 opacity-95 rounded-2xl p-modal z-[9999] shadow-lg"
                >
                    {message}
                </motion.span>
            )}
        </AnimatePresence>
    );
}