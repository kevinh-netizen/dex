
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }

  interface Window {
    /**
     * Fix for "All declarations of 'aistudio' must have identical modifiers" error.
     * We add 'readonly' to ensure compatibility with the pre-defined environment interface.
     */
    readonly aistudio: AIStudio;
  }
}

export const CreatorStudio: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [prompt, setPrompt] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [resultVideo, setResultVideo] = useState<string | null>(null);
  const [videoAnalysis, setVideoAnalysis] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState("");
  
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const checkKey = async () => {
    try {
      const hasKey = await window.aistudio.hasSelectedApiKey();
      if (!hasKey) {
        await window.aistudio.openSelectKey();
      }
      return true;
    } catch (e) {
      console.warn("API Key selection not available in this environment.");
      return true; 
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSelectedVideo(file);
  };

  const editImage = async () => {
    if (!selectedImage || !prompt) return;
    setIsProcessing(true);
    setStatusMessage("Refining your vision...");
    try {
      // Create fresh instance before call to ensure up-to-date API key usage
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const base64Data = selectedImage.split(',')[1];
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            { inlineData: { data: base64Data, mimeType: 'image/png' } },
            { text: prompt }
          ]
        }
      });
      
      const imgPart = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
      if (imgPart?.inlineData) {
        setResultImage(`data:image/png;base64,${imgPart.inlineData.data}`);
      }
    } catch (error: any) {
      console.error(error);
      setStatusMessage(error.status === 429 ? "Rate limit reached. Please wait." : "Failed to edit image.");
    } finally {
      setIsProcessing(false);
    }
  };

  const generateVideo = async () => {
    if (!selectedImage) return;
    setIsProcessing(true);
    setStatusMessage("Conceptualizing motion... (this may take a minute)");
    
    try {
      await checkKey();
      // Create fresh instance before call to ensure up-to-date API key usage
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const base64Data = selectedImage.split(',')[1];
      
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt || 'Slow cinematic zoom into the subject',
        image: {
          imageBytes: base64Data,
          mimeType: 'image/png',
        },
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: '16:9'
        }
      });

      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await ai.operations.getVideosOperation({ operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
      const blob = await response.blob();
      setResultVideo(URL.createObjectURL(blob));
    } catch (error: any) {
      console.error(error);
      if (error.message?.includes("Requested entity was not found.")) {
        await window.aistudio.openSelectKey();
      }
      setStatusMessage("Video generation error. Ensure you have a paid API key.");
    } finally {
      setIsProcessing(false);
    }
  };

  const analyzeVideo = async () => {
    if (!selectedVideo) return;
    setIsProcessing(true);
    setStatusMessage("Analyzing frames for creator insights...");
    try {
      await checkKey();
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          // Create fresh instance before call to ensure up-to-date API key usage
          const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
          const base64Data = (reader.result as string).split(',')[1];
          const response = await ai.models.generateContent({
            model: 'gemini-3-pro-preview',
            contents: {
              parts: [
                { inlineData: { data: base64Data, mimeType: selectedVideo.type } },
                { text: "Analyze this video for educational value and creator alignment with the Dex brand philosophy (tactile, curiosity-driven learning)." }
              ]
            }
          });
          setVideoAnalysis(response.text || "No analysis available.");
        } catch (error: any) {
          console.error(error);
          if (error.message?.includes("Requested entity was not found.")) {
            await window.aistudio.openSelectKey();
          }
          setStatusMessage("Analysis failed. Try checking your API key.");
        } finally {
          setIsProcessing(false);
        }
      };
      reader.readAsDataURL(selectedVideo);
    } catch (error) {
      console.error(error);
      setIsProcessing(false);
    }
  };

  return (
    <section id="studio" className="py-32 px-6 bg-stone-50 border-t border-stone-200">
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#369CF4] font-bold block">Creator Studio</span>
          <h2 className="text-5xl font-serif text-stone-900 italic">Bring your vision to life.</h2>
          <p className="text-stone-500 font-light max-w-2xl mx-auto">
            Test concepts, refine captures, and analyze your content with our advanced creative engine.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white rounded-[2.5rem] p-10 shadow-sm space-y-8 border border-stone-100">
            <h3 className="text-2xl font-serif">Visual Refinement</h3>
            <div className="aspect-video bg-stone-50 rounded-2xl relative overflow-hidden flex items-center justify-center border-2 border-dashed border-stone-200 hover:border-[#369CF4] transition-colors group cursor-pointer" onClick={() => imageInputRef.current?.click()}>
              {resultImage ? (
                <img src={resultImage} className="w-full h-full object-cover" alt="Result" />
              ) : selectedImage ? (
                <img src={selectedImage} className="w-full h-full object-cover opacity-50" alt="Preview" />
              ) : (
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-white rounded-full mx-auto flex items-center justify-center shadow-sm">
                    <svg className="w-6 h-6 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-xs text-stone-400 font-medium uppercase tracking-widest">Upload Frame</p>
                </div>
              )}
              <input type="file" ref={imageInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
            </div>

            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="E.g., 'Add a retro cinematic filter'" 
                className="w-full px-6 py-4 bg-stone-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#369CF4] outline-none"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <div className="flex gap-4">
                <button 
                  onClick={editImage} 
                  disabled={isProcessing || !selectedImage}
                  className="flex-1 py-4 bg-stone-900 text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-stone-800 disabled:opacity-50 transition-all"
                >
                  Edit Image
                </button>
                <button 
                  onClick={generateVideo} 
                  disabled={isProcessing || !selectedImage}
                  className="flex-1 py-4 bg-[#F85356] text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#e04a4d] disabled:opacity-50 transition-all"
                >
                  Animate (Veo)
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] p-10 shadow-sm space-y-8 border border-stone-100">
            <h3 className="text-2xl font-serif">Concept Analysis</h3>
            {resultVideo ? (
              <div className="aspect-video rounded-2xl overflow-hidden shadow-inner">
                <video src={resultVideo} controls className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="aspect-video bg-stone-50 rounded-2xl relative overflow-hidden flex items-center justify-center border-2 border-dashed border-stone-200 hover:border-[#F85356] transition-colors group cursor-pointer" onClick={() => videoInputRef.current?.click()}>
                {selectedVideo ? (
                  <p className="text-stone-600 font-serif italic">{selectedVideo.name}</p>
                ) : (
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 bg-white rounded-full mx-auto flex items-center justify-center shadow-sm">
                      <svg className="w-6 h-6 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-xs text-stone-400 font-medium uppercase tracking-widest">Upload Video</p>
                  </div>
                )}
                <input type="file" ref={videoInputRef} className="hidden" accept="video/*" onChange={handleVideoUpload} />
              </div>
            )}

            <div className="space-y-4">
              <button 
                onClick={analyzeVideo} 
                disabled={isProcessing || !selectedVideo}
                className="w-full py-4 bg-[#369CF4] text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#2d87d4] disabled:opacity-50 transition-all"
              >
                Analyze with Gemini Pro
              </button>
              {videoAnalysis && (
                <div className="p-6 bg-stone-50 rounded-2xl border border-stone-100 max-h-[150px] overflow-y-auto">
                  <p className="text-xs text-stone-500 leading-relaxed font-light whitespace-pre-wrap">{videoAnalysis}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {isProcessing && (
          <div className="fixed inset-0 z-[100] bg-white/90 backdrop-blur-sm flex items-center justify-center">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 border-4 border-stone-100 border-t-[#369CF4] rounded-full animate-spin mx-auto"></div>
              <p className="text-stone-900 font-serif text-xl italic animate-pulse">{statusMessage}</p>
              <p className="text-stone-400 text-[10px] uppercase tracking-widest">Powered by Gemini & Veo</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
