import { Suspense, lazy, useEffect, useRef } from 'react';
import { Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SkipLink } from '@/components/layout/SkipLink';
import { useSmoothScroll } from '@/lib/useSmoothScroll';
import { features } from '@/content/site';
import HomePage from '@/pages/HomePage';

/* The home page ships in the entry chunk because it is the landing route. Everything below it is
   split, so a first visit downloads one page rather than six. */
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const PlatformPage = lazy(() => import('@/pages/PlatformPage'));
const ProductPage = lazy(() => import('@/pages/ProductPage'));
const CapabilityPage = lazy(() => import('@/pages/CapabilityPage'));
const ServicePage = lazy(() => import('@/pages/ServicePage'));
const PartnerFindPage = lazy(() => import('@/pages/PartnerFindPage'));
const PartnerBecomePage = lazy(() => import('@/pages/PartnerBecomePage'));
const PartnerLoginPage = lazy(() => import('@/pages/PartnerLoginPage'));
const ResourcesPage = lazy(() => import('@/pages/ResourcesPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

/**
 * Resets scroll and hands focus to the main landmark on navigation, which a client-side router
 * does not do on its own — without it a screen reader stays parked at the bottom of the old page.
 * Hash links are left alone so the anchor rail still works.
 */
function RouteChangeEffects() {
  const { pathname, hash } = useLocation();
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (hash) return;

    // Lenis owns the scroll position once it is running, and it ignores window.scrollTo — without
    // this branch a route change would leave the new page scrolled to wherever the old one was.
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
    else window.scrollTo({ top: 0, behavior: 'auto' });

    document.getElementById('main')?.focus({ preventScroll: true });
  }, [pathname, hash]);

  return null;
}

function RootLayout() {
  // Reference: Lenis at duration 1.1, pointer devices only. See useSmoothScroll for why touch and
  // reduced-motion users keep native scrolling.
  useSmoothScroll();

  return (
    <>
      <SkipLink />
      <Header />
      <RouteChangeEffects />
      {/* Fallback is deliberately empty: a spinner that flashes for 40ms is worse than nothing,
          and the header and footer are already painted around it. */}
      <Suspense fallback={<div className="min-h-[60svh]" />}>
        <Outlet />
      </Suspense>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="platform" element={<PlatformPage />} />
        {/* Declared before the :slug pattern so "datanerve/governance" is not swallowed by it. */}
        <Route path="platform/datanerve/:capability" element={<CapabilityPage />} />
        <Route path="platform/:slug" element={<ProductPage />} />
        <Route path="services/:service" element={<ServicePage />} />
        <Route path="partners/find" element={<PartnerFindPage />} />
        <Route path="partners/become" element={<PartnerBecomePage />} />
        <Route path="partners/login" element={<PartnerLoginPage />} />
        {features.resources ? <Route path="resources" element={<ResourcesPage />} /> : null}
        <Route path="contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
