import React, {
  useState,
  useEffect,
  Suspense,
  useRef,
} from 'react';
import {
  Switch,
  Route,
  useHistory,
} from 'react-router-dom';
import FallbackSpinner from './components/FallbackSpinner';
import NavBarWithRouter from './components/NavBar';
import Home from './components/Home';
import endpoints from './constants/endpoints';

function MainApp() {
  const [data, setData] = useState(null);
  const history = useHistory();
  const isScrollingRef = useRef(false);

  useEffect(() => {
    fetch(endpoints.routes, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  // Scroll to navigate between sections when reaching bottom of page
  useEffect(() => {
    if (!data || !data.sections) {
      return () => {};
    }

    const paths = ['/', ...data.sections.map((s) => s.path)];

    const checkAndNavigate = () => {
      // Prevent rapid multi-triggers
      if (isScrollingRef.current) return;

      // Check if user has scrolled to the bottom of the page
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Consider "bottom" as within 100px of the actual bottom, or if content is short
      const isAtBottom = scrollTop + windowHeight >= documentHeight - 100;

      // Also trigger if the page content is shorter than viewport (no scrolling needed)
      const isShortContent = documentHeight <= windowHeight + 100;

      if (isAtBottom || isShortContent) {
        const currentPath = history.location.pathname;
        const currentIndex = Math.max(0, paths.indexOf(currentPath));

        // Navigate to next page if not at the last page
        if (currentIndex < paths.length - 1) {
          isScrollingRef.current = true;
          history.push(paths[currentIndex + 1]);

          // Scroll to top of new page
          setTimeout(() => {
            window.scrollTo(0, 0);
            isScrollingRef.current = false;
          }, 100);
        }
      }
    };

    const onScroll = checkAndNavigate;
    const onWheel = (e) => {
      // Also check on wheel events for short content pages
      if (e.deltaY > 0) { // Scrolling down
        setTimeout(checkAndNavigate, 100);
      }
    };

    // Check immediately when component mounts (for short content)
    setTimeout(checkAndNavigate, 500);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('wheel', onWheel, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('wheel', onWheel);
    };
  }, [data, history]);

  return (
    <div className="MainApp">
      <NavBarWithRouter />
      <main className="main">
        <Switch>
          <Suspense fallback={<FallbackSpinner />}>
            <Route exact path="/" component={Home} />
            {data
              && data.sections.map((route) => {
                const SectionComponent = React.lazy(() => import('./components/' + route.component));
                return (
                  <Route
                    key={route.headerTitle}
                    path={route.path}
                    component={() => (
                      <SectionComponent header={route.headerTitle} />
                    )}
                  />
                );
              })}
          </Suspense>
        </Switch>
      </main>
    </div>
  );
}

export default MainApp;
