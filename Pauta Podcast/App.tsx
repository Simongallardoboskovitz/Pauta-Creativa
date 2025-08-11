import React, { useState, useCallback } from 'react';
import { generatePodcastStructure } from './services/geminiService';
import { DesignSpecialization, type PodcastFormInputs } from './types';
import { DESIGN_SPECIALIZATIONS } from './constants';
import Input from './components/Input';
import Select from './components/Select';
import Button from './components/Button';
import Loader from './components/Loader';
import StructureDisplay from './components/StructureDisplay';
import TopicsModal from './components/TopicsModal';

const App: React.FC = () => {
  const [formState, setFormState] = useState<PodcastFormInputs>({
    specialization: DesignSpecialization.GRAPHIC,
    hostName: '',
    hostRole: '',
    guestName: '',
    episodeTitle: '',
    guestHit: '',
    section1: '',
    section2: '',
    section3: '',
  });
  const [generatedStructure, setGeneratedStructure] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setGeneratedStructure(null);
    setIsModalOpen(false);

    try {
      const structure = await generatePodcastStructure(formState);
      setGeneratedStructure(structure);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocurrió un error desconocido.');
    } finally {
      setIsLoading(false);
    }
  }, [formState]);

  const handleReset = () => {
    setGeneratedStructure(null);
    setError(null);
    setIsModalOpen(false);
    setFormState({
        specialization: DesignSpecialization.GRAPHIC,
        hostName: '',
        hostRole: '',
        guestName: '',
        episodeTitle: '',
        guestHit: '',
        section1: '',
        section2: '',
        section3: '',
    });
  };
  
  const isInitialFormValid = formState.hostName && formState.hostRole && formState.guestName && formState.guestHit;

  return (
    <div className="min-h-screen w-full bg-brand-beige text-brand-dark flex flex-col items-center justify-center font-sans p-4 sm:p-6 lg:p-8">
      <main className="w-full max-w-md z-10">
        {!generatedStructure && !isLoading && !error && (
          <>
            <div className="animate-fade-in text-center">
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tighter mb-4">Pauta Creativa</h1>
              <p className="text-brand-dark/70 mt-2 mb-10 text-lg">La chispa que necesita tu podcast de diseño.</p>
              
              <form onSubmit={(e) => e.preventDefault()} className="space-y-8 text-left">
                  <Input label="Tu Nombre" name="hostName" value={formState.hostName} onChange={handleInputChange} placeholder="Ej: Pancho Malo" required />
                  <Input label="Tu Pega" name="hostRole" value={formState.hostRole} onChange={handleInputChange} placeholder="Ej: 'Diseñador de Nada'" required />
                  <Input label="Nombre del Invitado/a" name="guestName" value={formState.guestName} onChange={handleInputChange} placeholder="Ej: Javiera Mena" required />
                  <Input label="¿Cuál es su HIT?" name="guestHit" value={formState.guestHit} onChange={handleInputChange} placeholder="Ej: El rediseño de la app del banco" required />
                  <Select label="Especialidad del Invitado/a" name="specialization" value={formState.specialization} onChange={handleInputChange} options={DESIGN_SPECIALIZATIONS} />
                  
                  <Button type="button" onClick={() => setIsModalOpen(true)} disabled={!isInitialFormValid}>
                      Definir Temas del Programa
                  </Button>
              </form>
            </div>
            
            <TopicsModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onSubmit={handleSubmit}
              formState={formState}
              handleInputChange={handleInputChange}
              isLoading={isLoading}
            />
          </>
        )}

        {isLoading && <Loader />}
        
        {error && (
            <div className="text-center text-red-500 animate-fade-in bg-white/50 p-8 rounded-2xl shadow-lg">
                <p className="text-xl font-bold text-brand-dark">Algo salió mal...</p>
                <p className="text-brand-dark/80 mt-2">{error}</p>
                <Button onClick={handleReset} className="mt-6">Intentar de nuevo</Button>
            </div>
        )}

        {generatedStructure && (
          <div className="animate-fade-in w-full">
            <StructureDisplay structure={generatedStructure} episodeTitle={formState.episodeTitle} onReset={handleReset} />
          </div>
        )}
      </main>
      
       <footer className="absolute bottom-4 text-brand-dark/40 text-sm z-10">
        Hecho con IA y buen gusto
      </footer>
    </div>
  );
};

export default App;