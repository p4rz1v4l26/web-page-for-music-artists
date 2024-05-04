let target = 0;
let current = 0;
let ease = 0.075;

const slider = document.querySelector(".slider");
const sliderWrapper = document.querySelector(".slider-wrapper");
const slides = document.querySelectorAll(".slide");

let maxScoll = sliderWrapper.offsetWidth - window.innerWidth;

function lerp(start, end, factor) {
  return start + (end - start) * factor;
}

function updateScaleAndPosition() {
  slides.forEach((slide) => {
    const rect = slide.getBoundingClientRect();
    const centrePosition = (rect.left + rect.right) / 2;
    const distanceFromCenter = centrePosition - window.innerWidth / 2;

    let scale, offsetX;
    if (distanceFromCenter > 0) {
      scale = Math.min(1.75, 1 + distanceFromCenter / window.innerWidth);
      offsetX = 0;
    }

    gsap.set(slide, { scale: scale, X: offsetX });
  });
}

function update() {
  current = lerp(current, target, ease);



  gsap.set(".slider-wrapper", {
    x: -current,
  });

  updateScaleAndPosition();
  requestAnimationFrame(update);
}
window.addEventListener("resize", () => {
  maxScoll = sliderWrapper.offsetWidth - window.innerWidth;
});

window.addEventListener("wheel", (e) => {
  target += e.deltaY;
  target = Math.max(0, target);
  target = Math.min(maxScoll, target);
});
update();
