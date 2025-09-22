import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CopilotContext from "./pages/CopilotContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient} data-oid="0zkk101">
    <TooltipProvider data-oid="jf228e_">
      <Toaster data-oid=":1141q." />
      <Sonner data-oid="mgzqa5." />
      <BrowserRouter data-oid="agrlr61">
        <Routes data-oid="r2eh.zv">
          <Route
            path="/"
            element={<Index data-oid=":hy9imx" />}
            data-oid="nm6dpv6"
          />

          <Route
            path="/copilot-context"
            element={<CopilotContext data-oid="1iwtzy5" />}
            data-oid="v96790b"
          />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route
            path="*"
            element={<NotFound data-oid="8ziq:n-" />}
            data-oid="t3ydw-m"
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
