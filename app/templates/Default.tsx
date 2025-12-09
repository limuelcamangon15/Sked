"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

type DefaultType = {
  header?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
};

function Default({ header, footer, children, className }: DefaultType) {
  const pathname = usePathname();

  return (
    <>
      <div className="flex flex-col min-h-dvh inset-0 z-0 bg-[#020617] custom-gradient-bg">
        {header}
        <AnimatePresence mode="wait">
          <motion.main
            className={`${className} flex flex-1 w-full p-5`}
            key={pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            {children}
          </motion.main>
        </AnimatePresence>
        {footer}
      </div>
    </>
  );
}

export default Default;
