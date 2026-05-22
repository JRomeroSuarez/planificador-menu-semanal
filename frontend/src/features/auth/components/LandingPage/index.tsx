import { Button } from "@heroui/react";

interface LandingPageProps {
    onLoginClick: () => void;
    onRegisterClick: () => void;
}

const features = [
    {
        icon: "calendar_month",
        title: "Planifica la semana",
        description: "Arrastra recetas a cada día. Tu menú se guarda solo, sin botones.",
    },
    {
        icon: "menu_book",
        title: "Tu recetario",
        description: "Guarda recetas con ingredientes, pasos y foto. Siempre a mano.",
    },
    {
        icon: "shopping_basket",
        title: "Lista automática",
        description: "La compra se genera del menú. Sin duplicados ni olvidos.",
    },
    {
        icon: "print",
        title: "Llévalo a la nevera",
        description: "Imprime el menú de la semana o guárdalo como PDF.",
    },
];

const LandingPage = ({ onLoginClick, onRegisterClick }: LandingPageProps) => {
    return (
        <div className="flex-1 flex flex-col bg-cream dark:bg-[#211E1A]">
            {/* Hero */}
            <section className="relative flex flex-col items-center justify-center text-center px-6 pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden">
                {/* soft decorative blobs */}
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-terracotta/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-32 -right-24 w-96 h-96 bg-olive/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 flex flex-col items-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 dark:bg-white/5 border border-[#E5DCC9] dark:border-white/10 mb-8">
                        <span className="material-symbols-outlined text-terracotta text-[18px]">restaurant</span>
                        <span className="text-sm font-medium text-ink/70 dark:text-cream/70">Menú semanal en pareja o familia</span>
                    </div>

                    <h1 className="font-display text-5xl md:text-7xl text-ink dark:text-cream leading-[1.05] max-w-3xl">
                        Decide qué comer<br />
                        <span className="text-terracotta italic">sin pensarlo cada día</span>
                    </h1>

                    <p className="mt-7 text-lg text-ink/60 dark:text-cream/60 max-w-xl leading-relaxed">
                        Organiza las comidas de toda la semana en un sitio, guarda tus recetas favoritas y deja que la lista de la compra se haga sola.
                    </p>

                    <div className="mt-10 flex flex-col sm:flex-row gap-3">
                        <Button
                            onPress={onLoginClick}
                            color="primary"
                            size="lg"
                            radius="full"
                            className="font-semibold px-10 shadow-soft"
                        >
                            Entrar
                        </Button>
                        <Button
                            onPress={onRegisterClick}
                            variant="bordered"
                            size="lg"
                            radius="full"
                            className="font-semibold px-10 border-[#D8CDB6] dark:border-white/15 text-ink dark:text-cream"
                        >
                            Crear cuenta
                        </Button>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="px-6 pb-28 max-w-5xl mx-auto w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {features.map((f) => (
                        <div
                            key={f.icon}
                            className="group bg-white dark:bg-white/[0.03] rounded-3xl p-7 border border-[#EFE8D8] dark:border-white/10 flex gap-5 transition-all hover:shadow-soft hover:-translate-y-0.5"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-terracotta/10 flex items-center justify-center shrink-0 transition-colors group-hover:bg-terracotta/15">
                                <span className="material-symbols-outlined text-terracotta text-[22px]">{f.icon}</span>
                            </div>
                            <div>
                                <h3 className="font-display font-semibold text-ink dark:text-cream text-lg">{f.title}</h3>
                                <p className="text-ink/50 dark:text-cream/50 text-sm mt-1.5 leading-relaxed">{f.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <p className="text-center text-ink/40 dark:text-cream/40 text-sm mt-12">
                    Gratis · Sin anuncios · Hecho para usarse en casa
                </p>
            </section>
        </div>
    );
};

export default LandingPage;
