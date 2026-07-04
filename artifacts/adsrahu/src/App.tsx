import { Switch, Route, Router as WouterRouter, useLocation, Redirect } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { isAuthenticated } from "@/lib/admin-auth";
import { MobileBottomNav } from "@/components/ui/MobileBottomNav";

// Public pages
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

// Admin pages
import AdminLogin from "@/pages/admin/Login";
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminLeads from "@/pages/admin/Leads";
import AdminBlog from "@/pages/admin/BlogAdmin";
import AdminBookings from "@/pages/admin/Bookings";
import AdminSubscribers from "@/pages/admin/Subscribers";
import AdminSettings from "@/pages/admin/Settings";

import PremiumLanding from "@/pages/PremiumLanding";
import TelegramGrowth from "@/pages/TelegramGrowth";

const queryClient = new QueryClient();

function AdminGuard({ children }: { children: React.ReactNode }) {
  if (!isAuthenticated()) {
    return <Redirect to="/admin" />;
  }
  return <AdminLayout>{children}</AdminLayout>;
}

function AdminLoginRoute() {
  if (isAuthenticated()) {
    return <Redirect to="/admin/dashboard" />;
  }
  return <AdminLogin />;
}

function Router() {
  const [location] = useLocation();
  const isAdmin = location.startsWith("/admin");
  const isSecretLanding = location === "/adsrahu-real";
  const isTelegramGrowth = location === "/telegram-growth";

  if (isSecretLanding) {
    return (
      <Switch>
        <Route path="/adsrahu-real" component={PremiumLanding} />
      </Switch>
    );
  }

  if (isTelegramGrowth) {
    return (
      <Switch>
        <Route path="/telegram-growth" component={TelegramGrowth} />
      </Switch>
    );
  }

  if (isAdmin) {
    return (
      <Switch>
        <Route path="/admin" component={AdminLoginRoute} />
        <Route path="/admin/dashboard">
          <AdminGuard><AdminDashboard /></AdminGuard>
        </Route>
        <Route path="/admin/leads">
          <AdminGuard><AdminLeads /></AdminGuard>
        </Route>
        <Route path="/admin/blog">
          <AdminGuard><AdminBlog /></AdminGuard>
        </Route>
        <Route path="/admin/bookings">
          <AdminGuard><AdminBookings /></AdminGuard>
        </Route>
        <Route path="/admin/subscribers">
          <AdminGuard><AdminSubscribers /></AdminGuard>
        </Route>
        <Route path="/admin/settings">
          <AdminGuard><AdminSettings /></AdminGuard>
        </Route>
        <Route><Redirect to="/admin" /></Route>
      </Switch>
    );
  }

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
      <MobileBottomNav />
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
