import { NavLink } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar } from "@heroui/react";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { useUIStore } from "@/store/useUIStore";
import { useShoppingListStore } from "@/features/shopping/store/useShoppingListStore";

const Header = () => {
    const { isAuthenticated, user, logout } = useAuthStore();
    const { openLogin, openRegister, openShoppingList } = useUIStore();

    const itemCount = useShoppingListStore(state => state.items.filter(i => !i.checked).length);

    return (
        <Navbar maxWidth="full" className="bg-cream/85 dark:bg-[#211E1A]/85 backdrop-blur-md border-b border-[#EAE1CE] dark:border-white/5">
            <NavbarBrand>
                <NavLink to={isAuthenticated ? "/planificador" : "/"} className="flex items-center gap-2.5">
                    <div className="w-9 h-9 bg-terracotta rounded-2xl flex items-center justify-center shadow-soft">
                        <span className="material-symbols-outlined text-white text-[20px]">restaurant</span>
                    </div>
                    <p className="font-display font-semibold text-ink dark:text-cream text-lg hidden sm:block">Menú semanal</p>
                </NavLink>
            </NavbarBrand>

            {isAuthenticated && (
                <NavbarContent className="hidden sm:flex gap-8" justify="center">
                    <NavbarItem>
                        <NavLink
                            to="/planificador"
                            className={({ isActive }) =>
                                `text-sm font-medium transition-colors ${isActive ? 'text-terracotta' : 'text-ink/55 dark:text-cream/55 hover:text-terracotta'}`
                            }
                        >
                            Planificador
                        </NavLink>
                    </NavbarItem>
                    <NavbarItem>
                        <NavLink
                            to="/recetas"
                            className={({ isActive }) =>
                                `text-sm font-medium transition-colors ${isActive ? 'text-terracotta' : 'text-ink/55 dark:text-cream/55 hover:text-terracotta'}`
                            }
                        >
                            Recetario
                        </NavLink>
                    </NavbarItem>
                </NavbarContent>
            )}

            <NavbarContent justify="end">
                {isAuthenticated && (
                    <NavbarItem>
                        <Button
                            isIconOnly
                            variant="light"
                            onPress={openShoppingList}
                            className="relative"
                        >
                            <span className="material-symbols-outlined text-ink/60 dark:text-cream/60">shopping_basket</span>
                            {itemCount > 0 && (
                                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-terracotta rounded-full ring-2 ring-cream dark:ring-[#211E1A]" />
                            )}
                        </Button>
                    </NavbarItem>
                )}

                {isAuthenticated ? (
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <Avatar
                                as="button"
                                className="transition-transform bg-terracotta text-white font-display font-semibold"
                                name={user?.username?.charAt(0).toUpperCase()}
                                size="sm"
                            />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Profile Actions" variant="flat">
                            <DropdownItem key="profile" className="h-14 gap-2">
                                <p className="text-default-500 text-xs">Sesión iniciada como</p>
                                <p className="font-semibold text-terracotta">@{user?.username}</p>
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
                        <NavbarItem>
                            <Button onPress={openLogin} variant="light" className="font-medium text-sm text-ink/70 dark:text-cream/70">
                                Entrar
                            </Button>
                        </NavbarItem>
                        <NavbarItem>
                            <Button onPress={openRegister} color="primary" radius="full" className="font-semibold text-sm px-6 shadow-soft">
                                Registrarse
                            </Button>
                        </NavbarItem>
                    </>
                )}
            </NavbarContent>
        </Navbar>
    );
};

export default Header;
