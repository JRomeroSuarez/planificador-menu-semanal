import { useState, useMemo } from 'react';
import { Meal, MealType } from '@/types';
import { isAiAvailable } from '@/features/meals/api/geminiService';
import { useAuth } from '@/features/auth/context/AuthContext';

interface UseMealListProps {
    meals: Meal[];
    onLoginClick: () => void;
}

export const useMealList = ({ meals, onLoginClick }: UseMealListProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilters, setActiveFilters] = useState<MealType[]>([]);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isGeminiModalOpen, setGeminiModalOpen] = useState(false);

    const aiEnabled = isAiAvailable();
    const { isAuthenticated } = useAuth();

    const handleFilterChange = (type: MealType) => {
        setActiveFilters(prev =>
            prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
        );
    };

    const handleAddClick = () => {
        if (isAuthenticated) {
            setAddModalOpen(true);
        } else {
            onLoginClick();
        }
    };

    const handleGeminiClick = () => {
        if (isAuthenticated) {
            setGeminiModalOpen(true);
        } else {
            onLoginClick();
        }
    };

    const filteredMeals = useMemo(() => {
        return meals.filter(meal => {
            const matchesSearch = meal.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesFilter = activeFilters.length === 0 || activeFilters.every(filter => meal.type.includes(filter));
            return matchesSearch && matchesFilter;
        });
    }, [meals, searchTerm, activeFilters]);

    return {
        searchTerm,
        setSearchTerm,
        activeFilters,
        handleFilterChange,
        isAddModalOpen,
        setAddModalOpen,
        isGeminiModalOpen,
        setGeminiModalOpen,
        filteredMeals,
        aiEnabled,
        handleAddClick,
        handleGeminiClick
    };
};
