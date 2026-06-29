import { useState } from "react";
import { useModal } from "../hooks/useModal";
import ThemeToggler from "../components/ThemeToggler";
import { Plus, Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

const navLinkClass = ({ isActive }) =>
    `px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
        isActive
            ? "bg-ink-900 text-cream-100 dark:bg-cream-100 dark:text-night-900"
            : "text-ink-800 dark:text-cream-200 hover:bg-paper-200 dark:hover:bg-night-800"
    }`;

const mobileNavLinkClass = ({ isActive }) =>
    `block px-4 py-3 text-base font-medium border-b border-paper-200 dark:border-night-800 transition-colors ${
        isActive
            ? "text-amber-500 dark:text-amber-400 bg-paper-100 dark:bg-night-800"
            : "text-ink-800 dark:text-cream-200 hover:bg-paper-100 dark:hover:bg-night-800"
    }`;

const Header = () => {
    const { openModal, isOpen } = useModal();
    const [menuOpen, setMenuOpen] = useState(false);
    const closeMenu = () => setMenuOpen(false);

    return (
        <>
            <a
                className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-md focus:bg-ink-900 focus:text-cream-100 focus:shadow-lg"
                href="#mainCointent">
                Hoppa till huvudinnehållet
            </a>
            <header className="fixed top-0 left-0 w-full backdrop-blur-md bg-paper-100/90 dark:bg-night-900/90 dark:text-cream-100 z-50 border-b border-paper-300 dark:border-night-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-row justify-between items-center gap-3 h-14">
                    <h1 className="text-lg font-bold shrink-0">
                        <a href="/">Bokklubben</a>
                    </h1>

                    {/* Desktop-nav */}
                    <nav aria-label="Huvudnavigation" className="hidden sm:flex gap-1">
                        <NavLink to="/" end className={navLinkClass}>Böcker</NavLink>
                        <NavLink to="/statistik" className={navLinkClass}>Statistik</NavLink>
                        <NavLink to="/om" className={navLinkClass}>Om</NavLink>
                    </nav>

                    <div className="flex items-center gap-2 shrink-0">
                        <div className="hidden sm:block">
                            <ThemeToggler />
                        </div>

                        {/* Lägg till bok — bara synlig när inloggad */}
                        <SignedIn>
                            <button
                                aria-controls="book-modal"
                                aria-label="Lägg till bok"
                                aria-expanded={isOpen}
                                onClick={() => openModal({})}
                                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg bg-ink-900 text-cream-100 dark:bg-amber-400 dark:text-night-900 hover:opacity-90 cursor-pointer transition-opacity h-9">
                                <Plus size={14} />
                                <span className="hidden sm:inline">Lägg till bok</span>
                            </button>
                            <div className="hidden sm:block">
                                <UserButton />
                            </div>
                        </SignedIn>

                        {/* Inloggningsknapp för utloggade */}
                        <SignedOut>
                            <SignInButton mode="modal">
                                <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg border border-paper-300 dark:border-night-700 text-ink-800 dark:text-cream-200 hover:bg-paper-200 dark:hover:bg-night-800 transition-colors h-9 cursor-pointer">
                                    Logga in
                                </button>
                            </SignInButton>
                        </SignedOut>

                        {/* Hamburger (mobil) */}
                        <button
                            aria-label={menuOpen ? "Stäng meny" : "Öppna meny"}
                            aria-expanded={menuOpen}
                            aria-controls="mobile-menu"
                            onClick={() => setMenuOpen((o) => !o)}
                            className="sm:hidden flex items-center justify-center h-9 w-9 rounded-lg text-ink-800 dark:text-cream-200 hover:bg-paper-200 dark:hover:bg-night-800 transition-colors">
                            {menuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>

                {/* Mobil-meny */}
                {menuOpen && (
                    <div id="mobile-menu" className="sm:hidden border-t border-paper-300 dark:border-night-700 bg-paper-100/95 dark:bg-night-900/95 backdrop-blur-md">
                        <nav aria-label="Mobilnavigation">
                            <NavLink to="/" end className={mobileNavLinkClass} onClick={closeMenu}>Böcker</NavLink>
                            <NavLink to="/statistik" className={mobileNavLinkClass} onClick={closeMenu}>Statistik</NavLink>
                            <NavLink to="/om" className={mobileNavLinkClass} onClick={closeMenu}>Om</NavLink>
                        </nav>
                        <div className="px-4 py-3 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="text-sm text-ink-700 dark:text-cream-300">Tema</span>
                                <ThemeToggler />
                            </div>
                            <SignedIn>
                                <UserButton />
                            </SignedIn>
                            <SignedOut>
                                <SignInButton mode="modal">
                                    <button className="text-sm font-medium text-ink-800 dark:text-cream-200 underline cursor-pointer">
                                        Logga in
                                    </button>
                                </SignInButton>
                            </SignedOut>
                        </div>
                    </div>
                )}
            </header>
        </>
    );
};

export default Header;
