document.addEventListener("DOMContentLoaded", () => {
  // Counter function
  function counter(id, start, end, duration) {
    let obj = document.getElementById(id),
      current = start,
      range = end - start,
      increment = end > start ? 1 : -1,
      step = Math.abs(Math.floor(duration / range)),
      timer = setInterval(() => {
        current += increment;
        obj.textContent = current;
        if (current === end) {
          clearInterval(timer);
        }
      }, step);
  }

  // Observer to watch when the counter section enters the viewport
  const counterSection = document.querySelector(".counter-wrapper");
  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Start counters when section is visible
          counter("count1", 0, 5, 1000);
          counter("count2", 0, 25, 1000);
          counter("count3", 0, 25, 1000);
          counter("count4", 10, 5, 1000);
          // Unobserve after triggering
          observerInstance.unobserve(counterSection);
        }
      });
    },
    { threshold: 0.5 } // Trigger when 50% of the section is visible
  );

  observer.observe(counterSection);
});
