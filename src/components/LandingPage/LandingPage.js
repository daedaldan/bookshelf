import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

/**
 * The landing page for Bookshelf.
 */
export default function LandingPage() {
  return (
    <div className="landing-page">
      <section className="landing-hero">
        <div className="landing-hero-content">
          <span className="landing-badge">For curious readers</span>
          <h1 className="landing-headline">
            Find your next read — and the people who love it too.
          </h1>
          <p className="landing-subtitle">
            Bookshelf is a community where readers share thoughtful reviews,
            discover hidden gems, and follow the stories that shaped someone
            else&apos;s perspective.
          </p>
          <div className="landing-cta">
            <Link className="btn btn-primary" to="/register">
              Get started free
            </Link>
            <Link className="btn btn-secondary" to="/login">
              Sign in
            </Link>
          </div>
        </div>

        <div className="landing-hero-visual" aria-hidden="true">
          <div className="landing-book-stack">
            <div className="landing-book landing-book-1" />
            <div className="landing-book landing-book-2" />
            <div className="landing-book landing-book-3" />
          </div>
        </div>
      </section>

      <section className="landing-features">
        <h2 className="landing-section-title">Everything you need to read better together</h2>
        <div className="landing-feature-grid">
          <article className="landing-feature-card">
            <span className="landing-feature-icon">📚</span>
            <h3>Browse reviews</h3>
            <p>
              Explore books through the eyes of real readers. See what resonated,
              what surprised them, and what they&apos;d recommend next.
            </p>
          </article>
          <article className="landing-feature-card">
            <span className="landing-feature-icon">✍️</span>
            <h3>Share your take</h3>
            <p>
              Write reviews that go beyond star ratings. Capture the ideas,
              quotes, and moments that made a book memorable for you.
            </p>
          </article>
          <article className="landing-feature-card">
            <span className="landing-feature-icon">👥</span>
            <h3>Follow readers</h3>
            <p>
              Discover people with taste like yours. Browse profiles, compare
              shelves, and find your next favorite author together.
            </p>
          </article>
        </div>
      </section>

      <section className="landing-cta-banner">
        <div className="landing-cta-banner-inner">
          <h2>Your next great read is one review away.</h2>
          <Link className="btn btn-primary" to="/register">
            Create your account
          </Link>
        </div>
      </section>

      <footer className="landing-footer">
        <p>Bookshelf · Daniel Wang, 2023</p>
      </footer>
    </div>
  );
}
