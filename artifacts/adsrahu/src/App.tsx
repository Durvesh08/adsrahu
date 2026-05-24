import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// Pages
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import Results from "@/pages/Results";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import BookCall from "@/pages/BookCall";
import Blog from "@/pages/Blog";
import Industries from "@/pages/Industries";
import { PrivacyPolicy, Terms, RefundPolicy } from "@/pages/Legal";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white selection:bg-primary/30">
      <Navbar />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/services" component={Services} />
          <Route path="/results" component={Results} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/book-a-call" component={BookCall} />
          <Route path="/blog" component={Blog} />
          <Route path="/industries" component={Industries} />
          <Route path="/privacy-policy" component={PrivacyPolicy} />
          <Route path="/terms" component={Terms} />
          <Route path="/refund-policy" component={RefundPolicy} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
