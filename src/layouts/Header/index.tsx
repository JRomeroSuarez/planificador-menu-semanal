import { NavLink } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar } from "@heroui/react";
import { useAuth } from "@/features/auth/context/AuthContext";

interface HeaderProps {
    onLoginClick: () => void;
    onRegisterClick: () => void;
}

const Header = ({ onLoginClick, onRegisterClick }: HeaderProps) => {
    const { isAuthenticated, user, logout } = useAuth();

    return (
        <Navbar isBordered maxWidth="full" className="bg-white/80 dark:bg-background-dark/80 backdrop-blur-md">
            <NavbarBrand>
                <NavLink to="/" className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                        <span className="material-symbols-outlined text-white">restaurant_menu</span>
                    </div>
                    <div className="hidden sm:block">
                        <p className="font-black text-foreground text-lg tracking-tight">AI MENU</p>
                        <p className="text-[10px] font-bold text-default-400 -mt-1 uppercase tracking-widest">Planner Pro</p>
                    </div>
                </NavLink>
            </NavbarBrand>

            <NavbarContent className="hidden sm:flex gap-8" justify="center">
                <NavbarItem>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `text-sm font-bold transition-colors ${isActive ? 'text-primary' : 'text-foreground/60 hover:text-primary'}`
                        }
                    >
                        Planificador
                    </NavLink>
                </NavbarItem>
                <NavbarItem>
                    <NavLink
                        to="/recetas"
                        className={({ isActive }) =>
                            `text-sm font-bold transition-colors ${isActive ? 'text-primary' : 'text-foreground/60 hover:text-primary'}`
                        }
                    >
                        Recetario
                    </NavLink>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent justify="end">
                {isAuthenticated ? (
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <Avatar
                                isBordered
                                as="button"
                                className="transition-transform"
                                color="primary"
                                name={user?.username}
                                size="sm"
                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username}`}
                            />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Profile Actions" variant="flat">
                            <DropdownItem key="profile" className="h-14 gap-2">
                                <p className="font-bold">Sesión iniciada como</p>
                                <p className="font-semibold text-primary">@{user?.username}</p>
                            </DropdownItem>
                            <DropdownItem
                                key="settings"
                                startContent={<span className="material-symbols-outlined text-lg opacity-60">settings</span>}
                                description="Gestionar tus preferencias"
                            >
                                Ajustes
                            </DropdownItem>
                            <DropdownItem
                                key="help"
                                startContent={<span className="material-symbols-outlined text-lg opacity-60">help</span>}
                                description="Preguntas frecuentes y soporte"
                            >
                                Ayuda & Feedback
                            </DropdownItem>
                            <DropdownItem
                                key="logout"
                                color="danger"
                                onPress={logout}
                                className="text-danger"
                                startContent={<span className="material-symbols-outlined text-lg">logout</span>}
                                description="Cerrar la sesión actual"
                            >
                                Salir
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                ) : (
                    <>
                        <NavbarItem className="hidden lg:flex">
                            <Link href="#" onPress={onLoginClick} className="text-sm font-bold text-foreground">Login</Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Button onPress={onRegisterClick} color="primary" variant="flat" className="font-bold text-sm px-6">
                                Sign Up
                            </Button>
                        </NavbarItem>
                    </>
                )}
            </NavbarContent>
        </Navbar>
    );
};

export default Header;
