(() => {
  // Opt-in measurement of the return transition, including the route commit.
  if (new URLSearchParams(location.search).get('perf') === 'return') {
    window.addEventListener('portfolio:prepare-home', () => {
      const start = performance.now();
      const home = document.querySelector('[data-chaos-field]');
      const intervals = [], tasks = [];
      let previous = start;
      const observer = new PerformanceObserver(list => tasks.push(...list.getEntries()));
      observer.observe({ type: 'longtask' });
      const sample = time => {
        intervals.push(time - previous);
        previous = time;
        if (time - start < 3200) return requestAnimationFrame(sample);
        observer.disconnect();
        const sorted = [...intervals].sort((a, b) => a - b);
        const output = document.getElementById('return-performance-audit') || document.createElement('output');
        output.id = 'return-performance-audit';
        output.hidden = true;
        output.textContent = JSON.stringify({
          frames: intervals.length,
          meanFrameMs: +(intervals.reduce((sum, value) => sum + value, 0) / intervals.length).toFixed(1),
          p95FrameMs: +sorted[Math.floor(sorted.length * .95)].toFixed(1),
          maxFrameMs: +sorted[sorted.length - 1].toFixed(1),
          framesOver50ms: intervals.filter(value => value > 50).length,
          longTaskMs: Math.round(tasks.reduce((sum, task) => sum + task.duration, 0)),
          retainedHome: home === document.querySelector('[data-chaos-field]'),
          path: location.pathname,
        });
        document.body.appendChild(output);
      };
      requestAnimationFrame(sample);
    });
    return;
  }
  if (new URLSearchParams(location.search).get('perf') === 'about') {
    window.addEventListener('load', () => setTimeout(() => {
      const bounds = document.getElementById('canvas')?.getBoundingClientRect();
      if (bounds) window.scrollTo({
        left: 0, top: window.scrollY + bounds.top + (bounds.height - innerHeight) / 2,
        behavior: 'instant',
      });
    }, 250), { once: true });
  }
  const longTasks = [];
  let lcp = 0;
  const observers = [];
  for (const type of ['longtask', 'largest-contentful-paint']) {
    try {
      const observer = new PerformanceObserver(list => list.getEntries().forEach(entry => {
        if (type === 'longtask') longTasks.push({ start: entry.startTime, duration: entry.duration });
        else lcp = entry.startTime;
      }));
      observer.observe({ type, buffered: true });
      observers.push(observer);
    } catch {}
  }
  const frames = [];
  let previous = 0;
  const start = performance.now();
  const sample = time => {
    if (previous && time - start > 3000) frames.push(time - previous);
    previous = time;
    if (time - start < 11000) return requestAnimationFrame(sample);
    const sorted = [...frames].sort((a, b) => a - b);
    const resources = performance.getEntriesByType('resource').filter(e => e.name.includes(location.host));
    const result = {
      viewport: [innerWidth, innerHeight], frames: frames.length,
      meanFrameMs: +(frames.reduce((a,b)=>a+b,0) / frames.length).toFixed(1),
      p95FrameMs: +sorted[Math.floor(sorted.length * 0.95)]?.toFixed(1),
      framesOver34ms: frames.filter(n=>n>34).length,
      longTasks: longTasks.length,
      longTaskMs: Math.round(longTasks.reduce((sum,t)=>sum+t.duration,0)),
      steadyLongTaskMs: Math.round(longTasks.filter(t=>t.start>start+3000).reduce((sum,t)=>sum+t.duration,0)),
      lcpMs: Math.round(lcp),
      loadMs: Math.round(performance.getEntriesByType('navigation')[0]?.loadEventEnd),
      resourceBytes: resources.reduce((sum,r)=>sum+r.decodedBodySize,0),
      resources: resources.sort((a,b)=>b.decodedBodySize-a.decodedBodySize).slice(0,12).map(r=>({name:r.name.split('/').pop(),bytes:r.decodedBodySize})),
    };
    const output = document.createElement('output');
    output.id = 'performance-audit';
    output.hidden = true;
    output.textContent = JSON.stringify(result);
    document.body.appendChild(output);
    observers.forEach(observer=>observer.disconnect());
  };
  requestAnimationFrame(sample);
})();
