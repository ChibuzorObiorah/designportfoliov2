import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import About from "./pages/About";
import IOSHomeCaseStudy from "./pages/ioshome-CaseStudy";
import ThredupCaseStudy from "./pages/ThredupCaseStudy";
import CopilotCanvasCaseStudy from "./pages/CopilotCanvasCaseStudy";
import NotFound from "./pages/NotFound";
import CopilotContext from "./pages/CopilotContext";

const queryClient = new QueryClient();

const App = () => {
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [showNavbar, setShowNavbar] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    console.log('App initializing...');
    try {
      // Check if this is the first time loading the app
      const hasLoadedBefore = sessionStorage?.getItem('hasLoadedBefore');
      console.log('Has loaded before:', hasLoadedBefore);
      
      if (hasLoadedBefore) {
        // If user has loaded before, show everything immediately
        console.log('Returning user - showing immediately');
        setIsInitialLoad(false);
        setShowNavbar(true);
        setShowContent(true);
      } else {
        // First time load - show loading sequence (reduced from 2000ms to 1500ms)
        console.log('First time user - starting loading sequence');
        const slideInTimer = setTimeout(() => {
          console.log('Loading sequence complete');
          setShowNavbar(true);
          setShowContent(true);
          setIsInitialLoad(false);
          try {
            sessionStorage?.setItem('hasLoadedBefore', 'true');
          } catch (e) {
            console.warn('Could not set sessionStorage:', e);
          }
        }, 1500); // Reduced timeout

        return () => {
          clearTimeout(slideInTimer);
        };
      }
    } catch (error) {
      console.error('Error in app initialization:', error);
      // Fallback: show everything immediately if there's any error
      setIsInitialLoad(false);
      setShowNavbar(true);
      setShowContent(true);
    }
  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient} data-oid="0zkk101">
        <TooltipProvider data-oid="jf228e_">
          <Toaster data-oid=":1141q." />
          <Sonner data-oid="mgzqa5." />
          <BrowserRouter data-oid="agrlr61">
            <ScrollToTop />
            <div className="min-h-screen bg-bg-1">
              {/* Fixed navbar that handles its own animations */}
              {showNavbar && (
                <ErrorBoundary>
                  <Navbar />
                </ErrorBoundary>
              )}
              
              {/* Content with slide-up animation on initial load and top padding for fixed navbar */}
              <div
                className={`pt-[88px] transition-transform duration-1000 ease-out ${
                  showContent ? "translate-y-0" : "translate-y-8"
                }`}
              >
                <ErrorBoundary>
                  <Routes data-oid="r2eh.zv">
                    <Route
                      path="/"
                      element={<Index isInitialLoad={isInitialLoad} />}
                      data-oid="nm6dpv6"
                    />

                    <Route
                      path="/about"
                      element={<About />}
                    />

                    <Route
                      path="/case-study"
                      element={<IOSHomeCaseStudy />}
                    />

                    <Route
                      path="/thredup-case-study"
                      element={<ThredupCaseStudy />}
                    />

                    <Route
                      path="/copilot-context"
                      element={<CopilotContext data-oid="1iwtzy5" />}
                      data-oid="v96790b"
                    />

                    <Route
                      path="/copilot-canvas"
                      element={<CopilotCanvasCaseStudy />}
                    />

                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route
                      path="*"
                      element={<NotFound data-oid="8ziq:n-" />}
                      data-oid="t3ydw-m"
                    />
                  </Routes>
                </ErrorBoundary>
              </div>
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
