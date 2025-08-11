import React, { useRef, useMemo } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Button from './Button';

interface StructureDisplayProps {
  structure: string;
  episodeTitle: string;
  onReset: () => void;
}

const StructureDisplay: React.FC<StructureDisplayProps> = ({ structure, episodeTitle, onReset }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = () => {
    if (!contentRef.current) return;
    
    html2canvas(contentRef.current, { 
        backgroundColor: '#FDFDFC', // Use the card's background color
        scale: 2 
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'px',
        format: 'a4'
      });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      
      const margin = 40;
      const contentWidth = pdfWidth - margin * 2;
      const contentHeight = (canvas.height * contentWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', margin, margin, contentWidth, contentHeight);
      
      const safeTitle = episodeTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase();
      pdf.save(`pauta_${safeTitle || 'podcast'}.pdf`);
    }).catch(err => {
      console.error("PDF generation failed:", err);
    });
  };
  
  const parsedSections = useMemo(() => {
    const sections: { title: string; items: string[] }[] = [];
    let currentSection: { title: string; items: string[] } | null = null;

    structure.split('\n').forEach(line => {
      const trimmedLine = line.trim();
      if (!trimmedLine) return;

      const titleMatch = trimmedLine.match(/^\*\*(.*)\*\*$/);
      if (titleMatch) {
        if (currentSection) {
          sections.push(currentSection);
        }
        currentSection = { title: titleMatch[1], items: [] };
      } else if (currentSection && trimmedLine.match(/^\d+\.\s/)) {
        currentSection.items.push(trimmedLine.replace(/^\d+\.\s/, ''));
      }
    });

    if (currentSection) {
      sections.push(currentSection);
    }
    
    return sections;
  }, [structure]);

  return (
    <div className="w-full max-w-2xl mx-auto">
        <div ref={contentRef} className="bg-[#FDFDFC] p-8 sm:p-12 rounded-2xl shadow-sm border border-black/5">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tighter mb-2">"{episodeTitle}"</h1>
            <p className="text-lg text-brand-dark/60 mb-10">Una pauta para encender la conversación.</p>
            
            <div className="space-y-10">
              {parsedSections.map((section, sectionIndex) => (
                <div key={sectionIndex}>
                  <h2 className="text-2xl font-bold text-brand-dark mb-4 tracking-tight">{section.title}</h2>
                  <ol className="list-none space-y-3">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start text-brand-dark/90 leading-relaxed text-lg">
                        <span className="text-brand-orange font-bold mr-3 text-xl">·</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
        </div>
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button onClick={handleDownloadPDF}>Descargar PDF</Button>
            <button 
                onClick={onReset} 
                className="w-full px-6 py-4 bg-transparent text-brand-dark font-bold rounded-lg hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-beige focus:ring-brand-dark/50 transition-colors duration-300 transform active:scale-95">
                Crear otra
            </button>
      </div>
    </div>
  );
};

export default StructureDisplay;