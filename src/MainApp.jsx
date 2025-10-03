import React, { useState, useEffect, Suspense, useRef } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
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

  // Scroll to navigate between sections in order
  useEffect(() => {
    if (!data || !data.sections) return;

    const paths = ['/', ...data.sections.map((s) => s.path)];

    const onWheel = (e) => {
      // Prevent rapid multi-triggers
      if (isScrollingRef.current) return;

      const delta = e.deltaY;
      if (Math.abs(delta) < 30) return;

      const currentPath = history.location.pathname;
      const currentIndex = Math.max(0, paths.indexOf(currentPath));

      let nextIndex = currentIndex;
      if (delta > 0 && currentIndex < paths.length - 1) {
        nextIndex = currentIndex + 1;
      } else if (delta < 0 && currentIndex > 0) {
        nextIndex = currentIndex - 1;
      }

      if (nextIndex !== currentIndex) {
        isScrollingRef.current = true;
        history.push(paths[nextIndex]);
        // simple cooldown to avoid multiple route changes per wheel gesture
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 600);
      }
    };

    window.addEventListener('wheel', onWheel, { passive: true });
    return () => window.removeEventListener('wheel', onWheel);
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
