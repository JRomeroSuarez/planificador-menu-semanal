import { User } from '@/types';

/**
 * Simula una llamada de login a un backend.
 * @param username El nombre de usuario.
 * @param password La contraseña.
 * @returns Una Promesa que se resuelve con los datos del usuario si las credenciales son correctas.
 */
export const login = (username: string, password: string): Promise<User> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (username === 'admin' && password === 'admin') {
                resolve({ username: 'admin' });
            } else {
                reject(new Error('Credenciales inválidas. Por favor, inténtalo de nuevo.'));
            }
        }, 500); // Simula un retraso de red
    });
};

/**
 * Simula una llamada de registro a un backend.
 * @param username El nombre de usuario.
 * @param password La contraseña.
 * @returns Una Promesa que siempre se resuelve para simular un registro exitoso.
 */
export const register = (username: string, password: string): Promise<User> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            // En una aplicación real, aquí se crearía el usuario en la base de datos.
            // Para la simulación, simplemente devolvemos el usuario como si se hubiera creado.
            resolve({ username });
        }, 500); // Simula un retraso de red
    });
}
