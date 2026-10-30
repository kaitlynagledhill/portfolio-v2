"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "./components/Nav";
import FlowerCanvas from "./components/FlowerCanvas";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

export default function Home() {
  const contactRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const contact = contactRef.current;
    if (!contact) return;

    const background = contact.querySelector<HTMLElement>(
      ".contact-background",
    );
    if (!background) return;

    let frame = 0;

    const updateFade = () => {
      cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        const rect = contact.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        const fadeStart = viewportHeight * 0.5;
        const fadeDistance = viewportHeight * 0.6;

        const progress = Math.max(
          0,
          Math.min(1, (viewportHeight - rect.top - fadeStart) / fadeDistance),
        );

        background.style.opacity = String(progress);
      });
    };

    updateFade();

    window.addEventListener("scroll", updateFade, { passive: true });
    window.addEventListener("resize", updateFade);

    // Recalculate after the browser has had a chance to lay out the page.
    frame = requestAnimationFrame(updateFade);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateFade);
      window.removeEventListener("resize", updateFade);
    };
  }, []);

  const aboutRef = useRef<HTMLElement>(null);
  const workRef = useRef<HTMLElement>(null);
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [creditsOpen, setCreditsOpen] = useState(false);

  useEffect(() => {
    const section = aboutRef.current;
    if (!section) return;

    let hasAnimated = false;

    const updateProgress = () => {
      if (hasAnimated) return;

      const rect = section.getBoundingClientRect();
      const start = window.innerHeight * 0.8;
      const end = window.innerHeight * 0.2;

      const progress = Math.max(
        0,
        Math.min(1, (start - rect.top) / (start - end + rect.height * 0.8)),
      );

      section.style.setProperty("--about-progress", String(progress));

      if (progress >= 1) {
        hasAnimated = true;
      }
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("modal-open", activeProject !== null);

    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [activeProject]);

  useEffect(() => {
    const contact = contactRef.current;
    if (!contact) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          contact.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(contact);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const section = workRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="portfolio">
      <Navbar />
      <div className="hero-transition">
        <div className="hero-background">
          <img
            className="hero-artwork"
            src="/images/rococo-hero.jpg"
            alt=""
            aria-hidden="true"
          />

          <svg
            className="aperture-overlay"
            viewBox="0 0 1000 1000"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <mask
                id="aperture-cutout"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="1000"
                height="1000"
              >
                <rect width="1000" height="1000" fill="white" />

                <path
                  className="aperture-opening"
                  fill="black"
                  d="M500 25
   C550 28 585 55 625 85
   C675 115 700 155 735 195
   C780 240 805 295 815 355
   C830 415 815 465 805 515
   C795 565 800 617 772 672
   C750 716 744 794 712 818
   C660 857 550 930 480 945
   C430 950 395 900 350 865
   C305 830 260 790 220 745
   C180 700 150 650 135 590
   C120 530 125 475 145 420
   C160 365 174 315 194 275
   C214 230 237 148 287 93
   C322 53 390 30 445 30
   C470 27 485 25 500 25 Z"
                />
              </mask>
            </defs>

            <rect
              width="1000"
              height="1000"
              fill="black"
              mask="url(#aperture-cutout)"
            />
          </svg>
        </div>

        <section className="hero">
          <div className="hero-heading">
            <h1>
              <span className="hero-line hero-line-creative">
                <span className="creative-label">creative</span>
              </span>

              <span className="hero-line hero-line-engineer">
                <span className="title-line">
                  ENGINEER <span className="ampersand">&amp;</span>
                </span>
              </span>

              <span className="hero-line hero-line-designer">
                <span>DESIGNER</span>
              </span>
            </h1>
          </div>

          <p className="hero-description">
            <span className="hero-description-line">
              <span>I’m a full-stack engineer and digital</span>
            </span>
            <span className="hero-description-line">
              <span>designer based on the East Coast.</span>
            </span>
            <span className="hero-description-line">
              <span>Drawn to both thoughtful simplicity</span>
            </span>
            <span className="hero-description-line">
              <span>and creative experimentation. I love</span>
            </span>
            <span className="hero-description-line">
              <span>nature, history, and chihuahuas.</span>
            </span>
          </p>

          <a href="#contact" className="hero-contact" aria-label="Contact me">
            {"CONTACT ME".split("").map((letter, i) => (
              <span
                className={letter === " " ? "contact-space" : "contact-letter"}
                key={i}
              >
                {letter === " " ? "\u00A0" : letter}
              </span>
            ))}
          </a>
        </section>
      </div>

      <section id="about" className="about-section" ref={aboutRef}>
        <div className="about-copy">
          <h2 className="about-heading">
            <span>Hello. I am Kaitlyn.</span>
          </h2>

          <div className="about-body">
            <p>
              <span
                className="about-line"
                style={{ "--line-index": 0 } as React.CSSProperties}
              >
                <span>I'm drawn to the intersection of design and</span>
              </span>
              <span
                className="about-line"
                style={{ "--line-index": 1 } as React.CSSProperties}
              >
                <span>technology, and the possibilities that open up</span>
              </span>
              <span
                className="about-line"
                style={{ "--line-index": 2 } as React.CSSProperties}
              >
                <span>when the two come together. I work with</span>
              </span>
              <span
                className="about-line"
                style={{ "--line-index": 3 } as React.CSSProperties}
              >
                <span>businesses and individuals to strengthen</span>
              </span>
              <span
                className="about-line"
                style={{ "--line-index": 4 } as React.CSSProperties}
              >
                <span>their presence and turn ideas into something</span>
              </span>
              <span
                className="about-line"
                style={{ "--line-index": 5 } as React.CSSProperties}
              >
                <span>tangible, from shaping how a brand shows</span>
              </span>
              <span
                className="about-line"
                style={{ "--line-index": 6 } as React.CSSProperties}
              >
                <span>up in the world to building the digital tools</span>
              </span>
              <span
                className="about-line"
                style={{ "--line-index": 7 } as React.CSSProperties}
              >
                <span>that help it grow. I'm interested in making</span>
              </span>
              <span
                className="about-line"
                style={{ "--line-index": 8 } as React.CSSProperties}
              >
                <span>things that feel distinctly their own in a world</span>
              </span>
              <span
                className="about-line"
                style={{ "--line-index": 9 } as React.CSSProperties}
              >
                <span>where so much is starting to look the same.</span>
              </span>
            </p>
          </div>
        </div>

        <div className="about-artwork">
          <FlowerCanvas />
        </div>
      </section>

      <LayoutGroup>
        <section id="work" className="work-section" ref={workRef}>
          <div className="work-header">
            <h2 className="work-heading">
              <span className="work-heading-line">
                <span>Selected Work</span>
              </span>
            </h2>
          </div>

          <div className="work-grid">
            {/* 1. PILOT COLLECTIVE */}
            <button
              type="button"
              className="work-card"
              onClick={() => setActiveProject("pilot")}
            >
              <div className="work-preview">
                <motion.img
                  layoutId="project-image-pilot"
                  src="/images/work/pilot-collective/cover.jpg"
                  alt="Pilot Collective project"
                />
              </div>
              <div className="work-card-info">
                <div>
                  <h3>Pilot Collective</h3>
                  <p>Software Engineering &amp; Digital Design</p>
                </div>
              </div>
            </button>

            {/* 2. BLUE CROSS BLUE SHIELD */}
            <button
              type="button"
              className="work-card"
              onClick={() => setActiveProject("bcbs")}
            >
              <div className="work-preview">
                <motion.img
                  layoutId="project-image-bcbs"
                  src="/images/work/bcbs/cover.jpeg"
                  alt="Blue Cross Blue Shield member portal"
                />
              </div>
              <div className="work-card-info">
                <div>
                  <h3>BCBS of NC</h3>
                  <p>Enterprise Software Development</p>
                </div>
              </div>
            </button>

            {/* 3. STEVE'S CNC */}
            <button
              type="button"
              className="work-card"
              onClick={() => setActiveProject("cnc")}
            >
              <div className="work-preview">
                <motion.img
                  layoutId="project-image-cnc"
                  src="/images/work/steves-cnc/cover.avif"
                  alt="Steve's CNC project"
                />
              </div>
              <div className="work-card-info">
                <div>
                  <h3>Steve's CNC</h3>
                  <p>E-commerce &amp; Custom Software</p>
                </div>
              </div>
            </button>

            {/* 4. LEAVE A MESSAGE */}
            <button
              type="button"
              className="work-card"
              onClick={() => setActiveProject("message")}
            >
              <div className="work-preview">
                <motion.img
                  layoutId="project-image-message"
                  src="/images/work/leave-a-message/cover.jpeg"
                  alt="Leave a Message project"
                />
              </div>
              <div className="work-card-info">
                <div>
                  <h3>Leave a Message</h3>
                  <p>Embedded Systems &amp; Digital Experience</p>
                </div>
              </div>
            </button>
          </div>
        </section>

        {/* Project detail modal */}
        <AnimatePresence>
          {activeProject && (
            <motion.div
              className="project-modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              onClick={() => setActiveProject(null)}
            >
              <motion.div
                className="project-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="project-modal-title"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  type="button"
                  className="project-modal-close"
                  onClick={() => setActiveProject(null)}
                  aria-label="Close project details"
                >
                  ×
                </button>

                {activeProject === "pilot" && (
                  <div className="project-detail">
                    <div className="project-detail-content">
                      <div className="project-detail-copy">
                        <p className="project-modal-category">
                          Talent Partnerships Agency
                        </p>

                        <h2 id="project-modal-title">Pilot Collective</h2>

                        <div className="project-modal-description">
                          <h3>Overview</h3>
                          <p>
                            Pilot Collective is a talent partnerships agency
                            working across entertainment, sports, and culture.
                            The website brings together the agency's work,
                            partnerships, and story in one place, creating a
                            digital presence that reflects its identity and the
                            range of projects it brings to life.
                          </p>

                          <h3>My Role</h3>
                          <p>
                            I designed and developed a custom, multi-page
                            website, translating the agency's brand into a
                            cohesive digital experience. I built reusable
                            components, responsive navigation, and adaptive
                            layouts, while integrating video and image content
                            throughout the site. I also managed the process from
                            design decisions and content integration through
                            testing and deployment.
                          </p>

                          <div className="project-modal-tech">
                            {[
                              "Next.js",
                              "React",
                              "TypeScript",
                              "Tailwind CSS",
                              "Vercel",
                            ].map((item) => (
                              <span key={item}>{item}</span>
                            ))}
                          </div>

                          <a
                            className="project-modal-link"
                            href="https://pilot-collective.com"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Visit website
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeProject === "cnc" && (
                  <div className="project-detail">
                    <div className="project-detail-content">
                      <div className="project-detail-copy">
                        <p className="project-modal-category">
                          E-commerce &amp; Custom Software
                        </p>

                        <h2 id="project-modal-title">Steve's CNC</h2>

                        <div className="project-modal-description">
                          <h3>Overview</h3>
                          <p>
                            Steve's CNC is a custom woodworking business in
                            Verdi, Nevada. I built a full-stack platform that
                            brings its catalog of more than 1,000 designs
                            online, giving customers a way to browse options,
                            request customizations, and start orders directly
                            through the website.
                          </p>

                          <h3>My Role</h3>
                          <p>
                            I designed and developed the platform from the
                            ground up, including an interactive catalog with
                            search, category filtering, saved designs, and
                            custom quote requests. I also built the order
                            management workflow, allowing the owner to review
                            requests, send quotes, and track projects through
                            production and fulfillment. Stripe handles deposit
                            payments, while Resend manages transactional emails.
                          </p>

                          <div className="project-modal-tech">
                            {[
                              "Next.js",
                              "React",
                              "TypeScript",
                              "PostgreSQL",
                              "Prisma",
                              "Stripe",
                              "Resend",
                            ].map((item) => (
                              <span key={item}>{item}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeProject === "message" && (
                  <div className="project-detail">
                    <div className="project-detail-content">
                      <div className="project-detail-copy">
                        <p className="project-modal-category">
                          Embedded Systems &amp; Digital Experience
                        </p>

                        <h2 id="project-modal-title">Leave a Message</h2>

                        <div className="project-modal-description">
                          <h3>Overview</h3>
                          <p>
                            Leave a Message is an audio guestbook for events
                            that lets guests leave personal voice recordings
                            using a telephone handset. Guests hear a prerecorded
                            greeting, leave their message, and create a
                            collection of recordings that can be revisited long
                            after the event.
                          </p>

                          <h3>My Role</h3>
                          <p>
                            I developed the device's embedded firmware in C
                            using a Teensy microcontroller, implementing handset
                            detection, greeting playback, audio recording, and
                            file management. I also worked through hardware and
                            firmware debugging and created the accompanying
                            rental website, including an inquiry flow for
                            prospective clients.
                          </p>

                          <div className="project-modal-tech">
                            {[
                              "C",
                              "Teensy",
                              "Embedded Systems",
                              "HTML",
                              "CSS",
                              "JavaScript",
                            ].map((item) => (
                              <span key={item}>{item}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeProject === "bcbs" && (
                  <div className="project-detail">
                    <div className="project-detail-content">
                      <div className="project-detail-copy">
                        <p className="project-modal-category">
                          Enterprise Software Development
                        </p>

                        <h2 id="project-modal-title">
                          Blue Cross Blue Shield of NC
                        </h2>

                        <div className="project-modal-description">
                          <h3>Overview</h3>
                          <p>
                            During a semester-long software development
                            internship with Blue Cross and Blue Shield of North
                            Carolina, I worked with a team to redesign and
                            modernize its member maintenance portal. We
                            developed a full-stack system for managing member
                            records, building a new interface with Nuxt and
                            connecting it to a Quarkus backend through secure
                            APIs.
                          </p>

                          <h3>My Role</h3>
                          <p>
                            I created the visual blueprint for the portal,
                            establishing the styling and design across all of
                            its pages. I also worked on the backend, wiring the
                            frontend to the Quarkus services and developing the
                            functionality needed to manage member records. A
                            major part of my work was developing an AI-powered
                            support agent for the portal, a capability it hadn't
                            previously offered. I built the agent and its custom
                            business logic to help members navigate the portal
                            and understand their options. The agent has since
                            been integrated into the live member maintenance
                            portal.
                          </p>

                          <div className="project-modal-tech">
                            {[
                              "Nuxt",
                              "Quarkus",
                              "Java",
                              "GraphQL",
                              "PostgreSQL",
                              "Groq API",
                            ].map((item) => (
                              <span key={item}>{item}</span>
                            ))}
                          </div>
                          <a
                            className="project-modal-link"
                            href="https://www.bluecrossnc.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Visit website
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </LayoutGroup>

      <section id="contact" className="contact-section" ref={contactRef}>
        <div className="contact-background" aria-hidden="true">
          <img
            className="contact-artwork"
            src="/images/rococo-hero.jpg"
            alt=""
          />
        </div>

        <div className="contact-content">
          <div className="contact-title-wrap">
            <h2 className="contact-heading">
              <span className="contact-heading-line">
                <span>Let's</span>
              </span>
              <span className="contact-heading-line">
                <span>connect</span>
              </span>
            </h2>
          </div>

          <div className="contact-options">
            <p className="contact-intro">I'm always interested in...</p>

            <div className="contact-interests">
              {[
                {
                  label: "UX/UI Design",
                  subject: "Let's talk UX/UI",
                },
                {
                  label: "Frontend Dev",
                  subject: "Let's build something",
                },
                {
                  label: "Backend Dev",
                  subject: "Backend development",
                },
                {
                  label: "Full-Stack Projects",
                  subject: "Full-stack projects",
                },
                {
                  label: "Graphic Design",
                  subject: "Something visual",
                },
                {
                  label: "Hardware",
                  subject: "Let's talk hardware",
                },
                {
                  label: "Rebrands",
                  subject: "Time for a fresh start",
                },
                {
                  label: "New Businesses",
                  subject: "I have an idea",
                },
                {
                  label: "Chihuahuas",
                  subject: "🐕 Let's talk tiny dogs",
                },
              ].map((item) => (
                <a
                  key={item.label}
                  href={`mailto:kaitlynagledhill@gmail.com?subject=${encodeURIComponent(
                    item.subject,
                  )}`}
                  className="contact-interest-button"
                  aria-label={item.label}
                >
                  {item.label.split("").map((letter, i) => (
                    <span
                      key={i}
                      className={
                        letter === " "
                          ? "contact-interest-space"
                          : "contact-interest-letter"
                      }
                      aria-hidden="true"
                    >
                      {letter === " " ? "\u00A0" : letter}
                    </span>
                  ))}
                </a>
              ))}
              {/* New CTA below all existing contact content */}
              <div className="contact-cta-row">
                <h2 className="contact-cta-heading">Have a project in mind?</h2>

                <a
                  href="mailto:kaitlynagledhill@gmail.com"
                  className="hero-contact contact-cta-button"
                  aria-label="Contact me"
                >
                  {"CONTACT ME".split("").map((letter, i) => (
                    <span
                      className={
                        letter === " " ? "contact-space" : "contact-letter"
                      }
                      key={i}
                    >
                      {letter === " " ? "\u00A0" : letter}
                    </span>
                  ))}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-social-links">
          <div className="contact-social-group">
            <a
              className="nav-link"
              href="https://www.linkedin.com/in/kaitlyn-gledhill/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>

            <a
              className="nav-link"
              href="https://github.com/kaitlynagledhill"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>

            {/* <a
      className="nav-link"
      href="/resume.pdf"
      target="_blank"
      rel="noopener noreferrer"
    >
      Resume
    </a> */}

            <a className="nav-link" href="mailto:kaitlynagledhill@gmail.com">
              Email
            </a>
          </div>

          <div className="contact-meta-group">
            <a
              className="nav-link"
              href="YOUR_V1_URL"
              target="_blank"
              rel="noopener noreferrer"
            >
              v1
            </a>

            <a className="nav-link" href="/">
              v2
            </a>

            <a
              className="nav-link"
              href="#credits"
              onClick={(event) => {
                event.preventDefault();
                setCreditsOpen(true);
              }}
            >
              credits
            </a>
          </div>
        </div>
      </section>
      <AnimatePresence>
        {creditsOpen && (
          <>
            <motion.div
              className="credits-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCreditsOpen(false)}
            />

            <motion.aside
              className="credits-panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
              role="dialog"
              aria-modal="true"
              aria-label="Credits"
            >
              <button
                type="button"
                className="credits-close"
                onClick={() => setCreditsOpen(false)}
                aria-label="Close credits"
              >
                ×
              </button>

              <div className="credits-content">
                <h2>Credits</h2>

                <div className="credits-section">
                  <h3>Fonts</h3>
                  <p>DM Serif Text</p>
                  <p>DM Sans</p>
                  <p>DM Mono</p>
                  <p>Barlow Condensed</p>
                </div>

                <div className="credits-section">
                  <h3>WebGL Model</h3>
                  <p>VASE</p>
                  <p className="credits-note">
                    Personal use only. Not commercial use.
                  </p>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
