"use client";

import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: { href: string; label: string }[];
}

export function MobileMenu({ isOpen, onClose, navLinks }: MobileMenuProps) {
  const pathname = usePathname();

  const isItemActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-background/60 fixed inset-0 z-40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Menu Container */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-20 right-0 left-0 z-50 w-full"
          >
            <motion.div className="border-border bg-background/95 w-full border-b p-4 shadow-sm backdrop-blur-xl">
              <nav className="flex flex-col gap-1">
                {navLinks.map((item, i) => {
                  const isActive = isItemActive(item.href);

                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.2,
                        delay: i * 0.05,
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          "group relative flex items-center justify-between rounded-xl px-4 py-3 transition-colors",
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground",
                        )}
                      >
                        <span className="font-heading text-lg font-medium">
                          {item.label}
                        </span>

                        {isActive && (
                          <motion.div
                            layoutId="active-dot"
                            className="bg-primary h-2 w-2 rounded-full"
                          />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}

                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.2,
                    delay: navLinks.length * 0.05,
                  }}
                  className="border-border mt-2 border-t pt-2"
                >
                  <Link
                    href="/cart"
                    onClick={onClose}
                    className="group bg-primary text-primary-foreground hover:bg-primary/90 flex w-full items-center justify-between rounded-xl px-4 py-3 transition-all active:scale-[0.98]"
                  >
                    <span className="font-heading text-lg font-medium">
                      View Cart
                    </span>
                    <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </motion.div>
              </nav>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
