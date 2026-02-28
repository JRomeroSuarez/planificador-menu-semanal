import { useState, useMemo } from 'react';
import { Meal, MealType } from '@/types';
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import { useUIStore } from '@/store/useUIStore';

interface UseMealListProps {
    meals: Meal[];
}

export const useMealList = ({ meals }: UseMealListProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilters, setActiveFilters] = useState<MealType[]>([]);
    const [isAddModalOpen, setAddModalOpen] = useState(false);

    const { isAuthenticated } = useAuthStore();
    const { openLogin } = useUIStore();

    const handleFilterChange = (type: MealType) => {
        setActiveFilters(prev =>
            prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
        );
    };

    const handleAddClick = () => {
        if (isAuthenticated) {
            setAddModalOpen(true);
        } else {
            openLogin();
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
        filteredMeals,
        handleAddClick
    };
};
