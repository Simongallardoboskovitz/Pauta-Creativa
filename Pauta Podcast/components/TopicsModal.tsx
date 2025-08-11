import React, { useEffect } from 'react';
import Input from './Input';
import Button from './Button';
import { type PodcastFormInputs } from '../types';

interface TopicsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (e: React.FormEvent) => Promise<void>;
    formState: PodcastFormInputs;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    isLoading: boolean;
}

const TopicsModal: React.FC<TopicsModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    formState,
    handleInputChange,
    isLoading,
}) => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const isTopicsFormValid = formState.section1 && formState.section2 && formState.section3 && formState.episodeTitle;

    return (
        <div 
            className="fixed inset-0 bg-brand-dark bg-opacity-60 flex items-center justify-center p-4 z-50 animate-fade-in"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div 
                className="bg-brand-beige rounded-2xl shadow-2xl p-8 w-full max-w-md transform transition-all animate-slide-up"
                onClick={(e) => e.stopPropagation()}
            >
                <form onSubmit={onSubmit}>
                    <h2 id="modal-title" className="text-2xl font-bold text-center text-brand-dark/90">Temas del Programa</h2>
                    <p className="text-center text-sm text-brand-dark/60 mt-2 mb-8">Dale un nombre a los 3 actos y al capítulo.</p>
                    
                    <div className="space-y-6">
                        <Input label="Tema 1" name="section1" value={formState.section1} onChange={handleInputChange} placeholder="Ej: Los inicios y el porqué" required />
                        <Input label="Tema 2" name="section2" value={formState.section2} onChange={handleInputChange} placeholder="Ej: La batalla contra los clientes" required />
                        <Input label="Tema 3" name="section3" value={formState.section3} onChange={handleInputChange} placeholder="Ej: El futuro es brígido" required />
                        <hr className="border-brand-dark/10 !my-8" />
                        <Input label="Nombre del Capítulo" name="episodeTitle" value={formState.episodeTitle} onChange={handleInputChange} placeholder="Ej: El futuro es ahora, viejo" required />
                    </div>

                    <div className="mt-8 space-y-3">
                         <Button type="submit" disabled={isLoading || !isTopicsFormValid}>
                            {isLoading ? 'Cocinando ideas...' : 'Generar Pauta'}
                         </Button>
                         <button 
                            type="button" 
                            onClick={onClose}
                            className="w-full text-center text-sm font-medium text-brand-dark/60 py-3 rounded-lg hover:bg-black/5 transition-colors disabled:opacity-50"
                            disabled={isLoading}
                         >
                             Cancelar
                         </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TopicsModal;