
gsap.registerPlugin(ScrollTrigger, Draggable);

const FACE_SVG = `
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="50" cy="56" rx="30" ry="34" fill="#f1ead9" stroke="#111" stroke-width="3"/>
  <path d="M17 50C12 18 36 5 52 7c24 1 38 18 31 44-3-14-15-22-33-22S22 36 17 50Z" fill="#111"/>
  <path d="M20 58c0 28 15 38 30 38s30-10 30-38c-6 12-14 16-30 16S26 70 20 58Z" fill="#111"/>
  <path d="M41 84q9 6 18 0" stroke="#f1ead9" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M27 44l15-3M73 44l-15-3" stroke="#111" stroke-width="4.5" stroke-linecap="round"/>
  <ellipse cx="37" cy="53" rx="8" ry="6.5" fill="#fff" stroke="#111" stroke-width="2.5"/>
  <ellipse cx="63" cy="53" rx="8" ry="6.5" fill="#fff" stroke="#111" stroke-width="2.5"/>
  <circle class="pupil" cx="37" cy="53" r="3.4" fill="#111"/>
  <circle class="pupil" cx="63" cy="53" r="3.4" fill="#111"/>
  
  
</svg>`;

const BODY_SVG = `
<svg viewBox="0 0 200 470" xmlns="http://www.w3.org/2000/svg">
  <g stroke="#111" stroke-width="3" stroke-linejoin="round">
    <ellipse cx="100" cy="48" rx="26" ry="30" fill="#e9c9a6"/>
    <path d="M73 42c-4-28 14-40 30-38 18 2 26 18 22 38-4-12-12-17-26-17s-22 5-26 17Z" fill="#111"/>
    <rect x="90" y="74" width="20" height="18" fill="#e9c9a6"/>
    <path d="M52 100l38-12h20l38 12 14 120-24 6-6-70-6 150H80l-8-150-6 70-24-6Z" fill="#1d1d24"/>
    <path d="M90 88h20l-10 40Z" fill="#fff"/>
    <path d="M96 100h8l4 70-8 10-8-10Z" fill="#e5322d"/>
    <path d="M80 250h40l6 170H98l-0 -150-2 150H74Z" fill="#1d1d24"/>
    <path d="M70 420h32l2 26H62Zm28 0h32l8 26h-42Z" fill="#111"/>
    <circle cx="44" cy="230" r="9" fill="#e9c9a6"/><circle cx="156" cy="230" r="9" fill="#e9c9a6"/>
    
  </g>
</svg>`;

const HEAD_SVG = `
<svg viewBox="0 0 200 230" xmlns="http://www.w3.org/2000/svg">
  <g stroke="#111" stroke-width="3" stroke-linejoin="round">
    <path d="M10 230c0-46 30-62 60-70h60c30 8 60 24 60 70Z" fill="#1d1d24"/>
    <rect x="82" y="128" width="36" height="34" fill="#e9c9a6"/>
    <path d="M82 150h36l-18 28Z" fill="#fff"/>
    <path d="M95 160h10l5 60h-20Z" fill="#e5322d"/>
    <ellipse cx="100" cy="82" rx="46" ry="54" fill="#e9c9a6"/>
    <path d="M52 78C44 30 78 10 102 12c30 2 52 24 46 66-6-22-20-32-48-32S58 56 52 78Z" fill="#111"/>
    <path d="M70 84q8-6 16 0M114 84q8-6 16 0" stroke="#111" fill="none" stroke-width="4" stroke-linecap="round"/>
    <path d="M86 118q14 10 28 0" stroke="#111" fill="none" stroke-width="4" stroke-linecap="round"/>
  </g>
</svg>`;

const $  = (s, p = document) => p.querySelector(s);
const $$ = (s, p = document) => [...p.querySelectorAll(s)];

// Every element with data-site="name" / "role" / ... gets that text
$$("[data-site]").forEach(el => (el.textContent = SITE[el.dataset.site]));
document.title = `${SITE.name} — Portfolio`;
$("#yearNow").textContent = new Date().getFullYear();

function setPhoto(sel, file, fallbackSvg, alt) {
  $(sel).innerHTML = file ? `<img src="${file}" alt="${alt}">` : fallbackSvg;
}
setPhoto("#face", SITE.photos.face, FACE_SVG, SITE.name);
setPhoto("#body", SITE.photos.body, BODY_SVG, SITE.name);
setPhoto("#head", SITE.photos.head, HEAD_SVG, SITE.name);

$("#aboutHi").textContent = SITE.aboutHi;
$("#aboutParas").innerHTML = SITE.about.map(t => `<p>${t}</p>`).join("");
function iconTile(s) {
  const ic = ICONS[s.icon];
  if (!ic) return `<div class="skill"><div class="skill__tile" style="background:#111">${s.abbr || "?"}</div><span>${s.name || s.icon}</span></div>`;
  const hex = (s.color || ic.color).replace("#", "");
  const lum = (parseInt(hex.slice(0, 2), 16) * 299 + parseInt(hex.slice(2, 4), 16) * 587 + parseInt(hex.slice(4), 16) * 114) / 1000;
  const logo = lum > 150 ? "#111" : "#fff";
  return `<div class="skill" title="${s.name || ic.name}">
    <div class="skill__tile" style="background:#${hex}">
      <svg viewBox="0 0 24 24" fill="${logo}" aria-hidden="true"><path d="${ic.path}"/></svg>
    </div>
    <span>${s.name || ic.name}</span>
  </div>`;
}
$("#skills").innerHTML = SITE.skills.map(iconTile).join("");

const timeline = list => list.map(i =>
  `<li><small>${i.when}</small><strong>${i.title}</strong><span>${i.place}</span></li>`).join("");
$("#experience").innerHTML = timeline(SITE.experience);
$("#education").innerHTML  = timeline(SITE.education);
const rowText = () =>
  Array.from({ length: 4 }, () => `<span>PORTFOLIO</span><span><i>✦</i></span><span>${SITE.name}</span><span><i>✦</i></span>`).join("");
$("#rowA").innerHTML = rowText();
$("#rowB").innerHTML = rowText();

// Projects (polaroids)
$("#projectsTitle").textContent = SITE.projectsTitle;
$("#projectsNote").textContent  = SITE.projectsNote;
const tints = ["#e5322d", "#2f6fed", "#e8a317", "#2e8b57", "#8a4fff", "#111"];
$("#polaroids").innerHTML = SITE.projects.map((p, i) => `
  <article class="polaroid">
    <div class="polaroid__img" style="background:${tints[i % tints.length]}">
      ${p.image ? `<img src="${p.image}" alt="${p.title}">` : String(i + 1).padStart(2, "0")}
    </div>
    <div class="polaroid__tag">${p.tag}</div>
    <h3>${p.title}</h3>
    <p>${p.desc}</p>
    <a href="${p.link}" target="_blank" rel="noopener">View ↗</a>
  </article>`).join("");

$("#contactText").textContent = SITE.contactText;
$("#contactBig").href = `mailto:${SITE.email}`;
$("#socials").innerHTML =
  `<a href="mailto:${SITE.email}">${SITE.email}</a>` +
  SITE.socials.map(s => `<a href="${s.url}" target="_blank" rel="noopener">${s.label} ↗</a>`).join("");

function splitChars(el) {
  const text = el.textContent;
  el.innerHTML = [...text].map(c =>
    c === " " ? " " : `<span class="ch-wrap"><span class="ch">${c}</span></span>`).join("");
  return $$(".ch", el);
}

// Draw a ragged "torn paper" edge into every <svg class="tear">
function rand(seed) { return () => (seed = (seed * 16807) % 2147483647) / 2147483647; }
$$("svg.tear").forEach(svg => {
  const r = rand(+svg.dataset.seed * 9973 + 17);
  const rim = svg.classList.contains("tear--rim");
  let x = 0, d = `M0 90 L0 ${30 + r() * 30}`;
  while (x < 1440) {
    x += 6 + r() * 26;
    const y = rim ? 8 + r() * 36 : 30 + r() * 40;
    d += ` L${Math.min(x, 1440)} ${y.toFixed(1)}`;
  }
  svg.innerHTML = `<path d="${d} L1440 90 Z"/>`;
});

const isTouch = matchMedia("(hover: none)").matches;
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------------------------------------------------------------------
   4. ANIMATIONS
   --------------------------------------------------------------------- */

/* ----- 4a. Prepare letters ----- */
const heroChars  = $$(".hero__title .split").flatMap(splitChars);
const helloChars = splitChars($(".about .big"));
const workChars  = splitChars($(".work .big"));

/* ----- 4b. Loader, then the hero intro ----- */
document.body.classList.add("is-loading");
gsap.set(heroChars, { yPercent: 115 });
gsap.set("#face", { scale: 0, rotate: -120 });
gsap.set([".hero__role", ".hero__year", ".hero__scroll", ".hero__loc"], { autoAlpha: 0, y: 14 });

const counter = { n: 0 };
const loaderTl = gsap.timeline({ delay: .2 });
loaderTl
  .to(counter, {
    n: 100, duration: reduceMotion ? .1 : 1.6, ease: "power2.inOut",
    onUpdate: () => ($("#loaderCount").textContent = Math.round(counter.n))
  })
  .to("#loader", { yPercent: -100, duration: .9, ease: "power4.inOut" })
  .add(() => { document.body.classList.remove("is-loading"); $("#loader").remove(); }, ">-0.2")
  // --- hero intro ---
  .to(heroChars, { yPercent: 0, duration: 1, stagger: .06, ease: "power4.out" }, "-=0.5")
  .to("#face", { scale: 1, rotate: 0, duration: 1.2, ease: "elastic.out(1, .55)" }, "-=0.7")
  .to([".hero__role", ".hero__year", ".hero__scroll", ".hero__loc"],
      { autoAlpha: 1, y: 0, duration: .8, stagger: .1, ease: "power3.out" }, "-=0.8")
  .to("#dock", { yPercent: 0, duration: .9, ease: "back.out(1.6)" }, "-=0.4");

// Dock: set the start position with GSAP (so the CSS translate doesn't fight it)
gsap.set("#dock", { xPercent: -50, yPercent: 150, x: 0, y: 0 });

/* ----- 4c. Hero: eyes follow the mouse + title drifts on scroll ----- */
const pupils = $$("#face .pupil");
if (pupils.length && !isTouch) {
  const face = $("#face");
  window.addEventListener("pointermove", e => {
    const r = face.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    const a = Math.atan2(dy, dx), d = Math.min(3, Math.hypot(dx, dy) / 120);
    gsap.to(pupils, { x: Math.cos(a) * d, y: Math.sin(a) * d, duration: .3 });
    gsap.to(face,   { rotate: dx / window.innerWidth * 10, duration: .6 });
  });
}
gsap.to(".hero__title", {
  yPercent: -25, scale: .9, opacity: .15, ease: "none",
  scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
});

/* ----- 4d. About ----- */
gsap.from(helloChars, {
  yPercent: 115, duration: 1, stagger: .07, ease: "power4.out",
  scrollTrigger: { trigger: ".about .big", start: "top 85%" }
});
gsap.from(".about__figure", {
  x: -140, autoAlpha: 0, duration: 1.2, ease: "power3.out",
  scrollTrigger: { trigger: ".about", start: "top 70%" }
});
// gentle floating of the standing figure
gsap.to(".figure", { y: -10, duration: 2.2, yoyo: true, repeat: -1, ease: "sine.inOut" });
gsap.to(".figure__shadow", { scaleX: .85, opacity: .7, duration: 2.2, yoyo: true, repeat: -1, ease: "sine.inOut" });

gsap.from(".about__text > *, .about__text p", {
  y: 36, autoAlpha: 0, duration: .9, stagger: .12, ease: "power3.out",
  scrollTrigger: { trigger: ".about__grid", start: "top 80%" }
});
// Skill icons: pop in one by one, then keep floating gently (each on its own rhythm)
gsap.from(".skill__tile", {
  scale: 0, rotate: () => gsap.utils.random(-60, 60), y: 40, autoAlpha: 0,
  duration: .9, stagger: .08, ease: "back.out(2.4)",
  scrollTrigger: { trigger: ".skills", start: "top 90%" },
  onComplete: () => $$(".skill__tile").forEach((t, i) =>
    gsap.to(t, { y: -7, rotate: i % 2 ? 3 : -3, duration: gsap.utils.random(1.6, 2.6), delay: i * .12,
                 yoyo: true, repeat: -1, ease: "sine.inOut" }))
});
gsap.from(".skill span", {
  autoAlpha: 0, y: 8, duration: .6, stagger: .08, delay: .5,
  scrollTrigger: { trigger: ".skills", start: "top 90%" }
});
// hover: quick spin-pop
$$(".skill").forEach(el => {
  const tile = $(".skill__tile", el);
  el.addEventListener("pointerenter", () =>
    gsap.fromTo(tile, { scale: 1 }, { scale: 1.22, rotate: "+=360", duration: .6, ease: "back.out(2)", overwrite: "auto" }));
  el.addEventListener("pointerleave", () => gsap.to(tile, { scale: 1, duration: .4, overwrite: "auto" }));
});
gsap.from(".timeline li, .about__side .label", {
  x: 40, autoAlpha: 0, duration: .8, stagger: .1, ease: "power3.out",
  scrollTrigger: { trigger: ".timeline", start: "top 90%" }
});

/* ----- 4e. Torn paper: section pins, text slides, head pops up ----- */
if (!reduceMotion) {
  gsap.timeline({
    scrollTrigger: { trigger: ".torn", start: "top top", end: "+=160%", pin: true, scrub: .7 }
  })
  .fromTo("#rowA", { x: "10vw" },  { x: "-70vw", ease: "none" }, 0)
  .fromTo("#rowB", { x: "-80vw" }, { x: "0vw",   ease: "none" }, 0)
  .fromTo("#head", { yPercent: 105, rotate: -6 }, { yPercent: 8, rotate: 0, ease: "power2.out", duration: .55 }, 0)
  .to("#head", { yPercent: -4, scale: 1.04, ease: "sine.inOut", duration: .45 }, .55);
}

/* ----- 4f. Work: polaroids fly in, then can be dragged ----- */
gsap.from(workChars, {
  yPercent: 115, duration: 1, stagger: .05, ease: "power4.out",
  scrollTrigger: { trigger: ".work .big", start: "top 85%" }
});
gsap.from(".work__note", {
  autoAlpha: 0, x: -30, duration: .8, delay: .4,
  scrollTrigger: { trigger: ".work .big", start: "top 85%" }
});

const tilts = [-6, 4, -3, 6, -5, 3, -4, 5];
$$(".polaroid").forEach((card, i) => {
  const tilt = tilts[i % tilts.length];
  gsap.set(card, { rotate: tilt });
  gsap.from(card, {
    y: 200, rotate: tilt * 4, autoAlpha: 0, duration: 1.1, ease: "back.out(1.4)", delay: (i % 4) * .1,
    scrollTrigger: { trigger: card, start: "top 92%" }
  });
  card.addEventListener("pointerenter", () => gsap.to(card, { rotate: 0, scale: 1.05, duration: .35, zIndex: 20 }));
  card.addEventListener("pointerleave", () => gsap.to(card, { rotate: tilt, scale: 1, duration: .35 }));
});
let topZ = 30;
Draggable.create(".polaroid", {
  type: "x,y", inertia: false,
  onPress() { this.target.style.zIndex = ++topZ; },
  allowEventDefault: true,
  dragClickables: false
});

/* ----- 4g. Contact ----- */
gsap.from(".line__in", {
  yPercent: 110, duration: 1.1, ease: "power4.out",
  scrollTrigger: { trigger: ".contact__big", start: "top 85%" }
});
gsap.from([".contact__sub", ".contact__links a", ".contact__sign"], {
  y: 30, autoAlpha: 0, duration: .8, stagger: .1, ease: "power3.out",
  scrollTrigger: { trigger: ".contact__links", start: "top 92%" }
});
gsap.to(".contact__arrow", { x: 14, duration: .9, yoyo: true, repeat: -1, ease: "sine.inOut" });

// Magnetic big link
if (!isTouch) {
  const mag = $("[data-magnet]");
  mag.addEventListener("pointermove", e => {
    const r = mag.getBoundingClientRect();
    gsap.to(mag, { x: (e.clientX - r.left - r.width / 2) * .06, y: (e.clientY - r.top - r.height / 2) * .1, duration: .4 });
  });
  mag.addEventListener("pointerleave", () => gsap.to(mag, { x: 0, y: 0, duration: .8, ease: "elastic.out(1,.4)" }));
}

/* ----- 4h. Menu highlight + custom cursor ----- */
["home", "about", "work", "contact"].forEach(id => {
  const link = $(`.dock [data-section="${id}"]`);
  ScrollTrigger.create({
    trigger: `#${id}`, start: "top 55%", end: "bottom 55%",
    onToggle: self => link.classList.toggle("is-active", self.isActive)
  });
});

if (!isTouch) {
  const cur = $("#cursor");
  const xTo = gsap.quickTo(cur, "x", { duration: .25 }), yTo = gsap.quickTo(cur, "y", { duration: .25 });
  window.addEventListener("pointermove", e => { cur.style.opacity = 1; xTo(e.clientX); yTo(e.clientY); });
  $$("a, .skill, .polaroid").forEach(el => {
    el.addEventListener("pointerenter", () => cur.classList.add("is-big"));
    el.addEventListener("pointerleave", () => cur.classList.remove("is-big"));
  });
}

// Recalculate positions once fonts/images are ready
window.addEventListener("load", () => ScrollTrigger.refresh());

