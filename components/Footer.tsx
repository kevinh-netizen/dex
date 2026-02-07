
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-stone-100 pt-20 pb-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Bottom Row: Logo, Socials, Email, Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-12 gap-10">
          {/* Logo */}
          <div className="flex order-1">
            <img 
              src="/Dex_Wordmark.png" 
              alt="Dex" 
              className="h-8 w-auto object-contain opacity-80"
            />
          </div>

          {/* Social Icons & Email */}
          <div className="flex flex-col md:flex-row items-center gap-8 order-3 md:order-2">
            <div className="flex items-center gap-6">
              {/* Facebook */}
              <a href="https://www.facebook.com/people/Dex/61566390641942/" target="_blank" rel="noopener noreferrer" className="text-stone-900 hover:opacity-70 transition-opacity">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-8.786h-2.954v-3.429h2.954v-2.527c0-2.925 1.787-4.52 4.398-4.52 1.251 0 2.328.093 2.641.135v3.061h-1.812c-1.42 0-1.695.675-1.695 1.666v2.185h3.389l-.441 3.429h-2.948v8.786h6.12c.731 0 1.324-.593 1.324-1.324v-21.351c0-.732-.593-1.325-1.324-1.325z"/>
                </svg>
              </a>
              {/* Instagram */}
              <a href="https://www.instagram.com/dexcamera/" target="_blank" rel="noopener noreferrer" className="text-stone-900 hover:opacity-70 transition-opacity">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              {/* YouTube */}
              <a href="https://www.youtube.com/@dexcamera" target="_blank" rel="noopener noreferrer" className="text-stone-900 hover:opacity-70 transition-opacity">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              {/* X / Twitter */}
              <a href="https://x.com/worldexlab" target="_blank" rel="noopener noreferrer" className="text-stone-900 hover:opacity-70 transition-opacity">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
            
            <a href="mailto:hello@dex.camera" className="text-sm text-stone-600 font-medium hover:text-stone-900 transition-colors">
              hello@dex.camera
            </a>
          </div>

          {/* Copyright */}
          <div className="flex flex-col gap-2 order-2 md:order-3 items-end">
            <div className="flex flex-row items-center gap-4">
              <div className="text-xs text-stone-500">© 2026, Worldex Labs, Inc</div>
              <a href="https://www.wapitee.io/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-stone-300 hover:text-stone-500 transition-colors">
                <img src="/wapitee_lulu.jpg" alt="Wapitee Interactive" className="h-6 w-6 rounded-full object-cover" />
                <span>Partner with Wapitee Interactive</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
