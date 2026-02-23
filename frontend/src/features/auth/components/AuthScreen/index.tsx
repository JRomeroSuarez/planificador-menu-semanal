import React from 'react';
import { Button, Card, CardBody } from "@heroui/react";

interface AuthScreenProps {
    onLoginClick: () => void;
    onRegisterClick: () => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onLoginClick, onRegisterClick }) => {
    return (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-[#f8f9fc] dark:bg-[#0c0a18]">
            <Card className="max-w-md w-full border-none bg-white dark:bg-background-dark shadow-2xl py-8 px-4">
                <CardBody className="flex flex-col items-center">
                    <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mb-6">
                        <span className="material-symbols-outlined text-primary text-[40px]">restaurant_menu</span>
                    </div>

                    <h2 className="text-3xl font-black text-foreground tracking-tight">MENU PLANNER</h2>
                    <p className="text-default-500 mt-4 text-sm leading-relaxed">
                        Organiza tus comidas de forma inteligente, genera listas de la compra automáticas y simplifica tu vida diaria.
                    </p>

                    <div className="mt-8 flex flex-col gap-3 w-full">
                        <Button
                            onPress={onLoginClick}
                            color="primary"
                            size="lg"
                            className="font-bold text-base shadow-lg shadow-primary/20"
                        >
                            Comenzar ahora
                        </Button>
                        <Button
                            onPress={onRegisterClick}
                            variant="flat"
                            size="lg"
                            className="font-bold text-base"
                        >
                            Crear una cuenta
                        </Button>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};

export default AuthScreen;
