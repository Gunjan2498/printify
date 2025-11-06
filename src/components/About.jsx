import React from 'react';

// The main application component is now named 'About' to match the file name.
const About = () => {
    // CSS Definitions: Defined here to encapsulate all styling in the single file,
    // including media queries for responsiveness.
    const styles = `
        /* CSS Variables for easy color management */
        :root {
            --color-dark: #2C3E50; /* Primary Text Color (Deep Blue/Gray) */
            --color-accent: #3498DB; /* Highlight Blue */
            --color-light: #ffffff; /* Background White */
            --color-light-gray: #f7f7f7; /* Section Background */
            --color-soft-blue: #f0f8ff; /* New soft background for quotes */
            --font-family: 'Poppins', Arial, sans-serif;
        }

        /* Base Styles */
        body {
            font-family: var(--font-family);
            background-color: var(--color-light);
            color: var(--color-dark);
            min-height: 100vh;
            margin: 0;
            line-height: 1.6;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }

        /* Responsive Container (Max Width 1280px with Padding) */
        .container {
            max-width: 1280px;
            margin: 0 auto;
            padding-left: 1rem;
            padding-right: 1rem;
        }
        @media (min-width: 640px) {
            .container { padding-left: 1.5rem; padding-right: 1.5rem; }
        }
        @media (min-width: 1024px) {
            .container { padding-left: 2rem; padding-right: 2rem; }
        }

        /* Color Utility Classes */
        .text-accent { color: var(--color-accent); }
        .text-dark { color: var(--color-dark); }
        .text-gray-700 { color: #374151; }
        .text-gray-600 { color: #4b5563; }
        .bg-light-gray { background-color: var(--color-light-gray); }

        /* --- Hero Section: Dynamic Background --- */
        .section-hero {
            padding-top: 6rem; /* Increased base padding */
            padding-bottom: 6rem;
            text-align: center;
            /* Subtle blue gradient for visual lift */
            background: radial-gradient(circle at top right, #e8f5ff 10%, #ffffff 80%);
        }
        .hero-title {
            font-size: 2.5rem;
            font-weight: 800;
            line-height: 1.2;
            margin-bottom: 1.5rem;
            text-shadow: 2px 2px 4px rgba(52, 152, 219, 0.15); /* Subtle text shadow */
        }
        @media (min-width: 640px) {
            .section-hero { padding-top: 8rem; padding-bottom: 8rem; }
            .hero-title { font-size: 3.75rem; }
        }
        @media (min-width: 1024px) {
            .section-hero { padding-top: 10rem; padding-bottom: 10rem; }
            .hero-title { font-size: 4.5rem; }
        }
        .hero-subtitle {
            font-size: 1.125rem;
            max-width: 56rem;
            margin: 0 auto 1.5rem;
        }
        .hero-tag {
            font-size: 1.125rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            display: block;
            margin-bottom: 0.5rem;
        }

        /* --- Primary Button: Enhanced Lift --- */
        .btn-primary {
            display: inline-block;
            padding: 0.85rem 1.85rem; /* Slightly bigger button */
            border: none;
            font-size: 1rem;
            font-weight: 600; /* Bolder font */
            border-radius: 0.5rem;
            box-shadow: 0 8px 15px rgba(52, 152, 219, 0.3); /* Stronger, colored shadow */
            background-color: var(--color-accent);
            color: var(--color-light);
            transition: all 0.4s ease; /* Smooth transitions for all properties */
            text-decoration: none;
        }
        .btn-primary:hover {
            background-color: #2980b9; /* Slightly darker accent on hover */
            transform: translateY(-4px); /* More noticeable lift */
            box-shadow: 0 20px 30px rgba(52, 152, 219, 0.4);
        }

        /* --- Mission & Vision Section: Card Updates --- */
        .section-mission {
            padding-top: 5rem;
            padding-bottom: 5rem;
            background-color: var(--color-light);
        }
        .mission-heading-container {
            text-align: center;
            margin-bottom: 2rem;
        }
        .mission-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 3rem;
            margin-top: 3rem;
        }
        @media (min-width: 768px) {
            .mission-grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }
        .mission-card {
            padding: 2rem;
            border-radius: 0.75rem;
            border: 1px solid #e5e7eb; /* Soft border */
            background-color: var(--color-light);
            box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s, box-shadow 0.3s;
            position: relative;
            overflow: hidden;
        }
        /* Decorative corner accent using pseudo-element */
        .mission-card::before {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 30px;
            height: 30px;
            border-top: 5px solid var(--color-accent);
            border-right: 5px solid var(--color-accent);
            border-top-right-radius: 0.75rem;
        }
        .mission-card:hover {
            transform: scale(1.03); /* Slight scale on hover */
            box-shadow: 0 15px 40px -5px rgba(0, 0, 0, 0.2);
        }
        .mission-card h4 {
            font-size: 1.75rem;
            font-weight: 700;
            color: var(--color-dark); /* Darker title for better contrast */
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
        }
        .mission-card p {
            font-size: 1.05rem;
            color: var(--color-dark);
            margin: 0;
        }
        .mission-icon-svg {
            width: 24px;
            height: 24px;
            margin-right: 0.75rem; /* Increased spacing */
            color: var(--color-accent); /* Icon uses accent color */
        }


        /* --- Pillars Section: Left Border Accent & Lift --- */
        .section-pillars {
            padding-top: 4rem;
            padding-bottom: 4rem;
        }
        .pillars-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 2rem;
        }
        @media (min-width: 768px) {
            .pillars-grid { grid-template-columns: repeat(3, 1fr); }
        }
        .pillar-card {
            background-color: var(--color-light);
            padding: 2rem;
            border-radius: 0.75rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            transition: box-shadow 0.4s ease, transform 0.4s ease;
            border: 1px solid #e5e7eb;
            border-left: 8px solid var(--color-accent); /* Strong left border accent */
        }
        .pillar-card:hover {
            box-shadow: 0 25px 35px -8px rgba(0, 0, 0, 0.2); /* Deeper shadow on hover */
            transform: translateY(-0.75rem); /* More aggressive lift on hover */
        }
        .pillar-icon-svg {
            width: 40px;
            height: 40px;
            color: var(--color-dark); /* Icon color set to dark */
            margin-bottom: 1rem;
        }
        .pillar-title {
            font-size: 1.25rem;
            font-weight: 700;
            color: var(--color-accent); /* Pillar titles highlighted with accent color */
            margin-bottom: 0.75rem;
        }

        /* --- Story Section: Image Pop --- */
        .section-story {
            padding-top: 5rem;
            padding-bottom: 5rem;
        }
        .story-flex {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        @media (min-width: 768px) {
            .story-flex {
                flex-direction: row;
                justify-content: space-between;
            }
            .story-img-col {
                width: 45%;
            }
            .story-text-col {
                width: 45%;
                padding-left: 20px;
            }
        }
        .story-img {
            width: 100%;
            height: auto;
            object-fit: cover;
            border-radius: 0.75rem;
            box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.35); /* Deeper shadow */
            border: 12px solid var(--color-light); /* Thicker internal border */
            outline: 4px solid var(--color-accent); /* Accent color outline */
            margin-bottom: 2.5rem;
        }
        @media (min-width: 768px) {
            .story-img { margin-bottom: 0; }
        }
        .story-heading {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 1.5rem;
        }
        
        /* --- Quote Block: Prominent Styling --- */
        .section-quote {
            padding-top: 4rem;
            padding-bottom: 4rem;
            text-align: center;
            background-color: var(--color-soft-blue); /* Lighter blue background for visual break */
        }
        .quote-icon-svg {
            width: 48px; /* Larger icon */
            height: 48px;
            color: var(--color-accent);
            margin: 0 auto 1rem auto;
        }
        .blockquote-text {
            font-size: 1.5rem; /* Larger font size */
            font-style: italic;
            font-weight: 300; /* Lighter weight for sophisticated look */
            line-height: 1.7;
            max-width: 52rem; /* Wider quote */
            margin: 0 auto;
            color: var(--color-dark);
        }
        @media (min-width: 768px) {
            .blockquote-text { font-size: 1.875rem; }
        }
        .cite-source {
            display: block;
            margin-top: 1.5rem; /* Increased spacing */
            font-size: 1.125rem;
            font-weight: 600;
            color: var(--color-dark); /* Source is dark for readability */
            font-style: normal;
        }
        .cite-source::before {
            content: '—';
            margin-right: 0.5rem;
            color: var(--color-accent);
        }
    `;

    // --- SVG Icon Definitions (no change, just included for completeness) ---

    // Mission Target Icon (for Mission Statement)
    const TargetIcon = (props) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mission-icon-svg" {...props}>
            <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
        </svg>
    );

    // Sparkle Icon (for Vision Statement)
    const SparkleIcon = (props) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mission-icon-svg" {...props}>
            <path d="M10 20.8l4-4M10 3.2l4 4M20.8 14l-4-4M3.2 14l4 4M12 2v20M2 12h20" />
        </svg>
    );

    // Pillar Icons
    const AwardIcon = (props) => (
        <svg xmlns="http://www.w3.org/2000/svg" className="pillar-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
        </svg>
    );

    const LeafIcon = (props) => (
        <svg xmlns="http://www.w3.org/2000/svg" className="pillar-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M11 20A7 7 0 0 1 9.87 6.44c.4-1.2.78-2.5 1.58-4.14C9 2.5 8 2 7 2A5 5 0 0 0 2 7c0 1.2.4 2.3 1 3.3.6 1 1.3 1.8 2.2 2.6A8 8 0 0 0 12 22a8 8 0 0 0 8-8c0-.6-.12-1.2-.35-1.78C18.4 14.8 17.2 15.6 16 15.8c-1.3-.2-2.5-.9-3.4-1.9-1-1-1.6-2.2-1.8-3.5-.2-1.3.4-2.5 1.5-3.3C13.8 6.6 15 6 16 6c1.2 0 2.4.4 3.5 1.2.6.4 1 1 1.4 1.7.4.7.6 1.4.6 2.2a5 5 0 0 1-5 5c-1.2 0-2.4-.4-3.5-1.2z" />
        </svg>
    );

    const UsersIcon = (props) => (
        <svg xmlns="http://www.w3.org/2000/svg" className="pillar-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    );

    const QuoteIcon = (props) => (
        <svg xmlns="http://www.w3.org/2000/svg" className="quote-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M3 21c3 0 5-2 5-6s-2-6-5-6v2c1 0 2 1 2 4s-1 4-2 4h-2" /><path d="M15 21c3 0 5-2 5-6s-2-6-5-6v2c1 0 2 1 2 4s-1 4-2 4h-2" />
        </svg>
    );

    return (
        <>
            {/* The style block defines all CSS rules for the component */}
            <style dangerouslySetInnerHTML={{ __html: styles }} />

            <main className="text-dark">

                {/* Hero Section: Main Statement */}
                <section className="section-hero">
                    <div className="container">
                        <div style={{ maxWidth: '896px', margin: '0 auto' }}>
                            <span className="hero-tag text-accent">Our Manifesto</span>
                            <h2 className="hero-title">
                                We Believe Clothing Should Be <span className="text-accent">Art.</span> Not Just Fabric.
                            </h2>
                            <p className="hero-subtitle">
                                Printify was founded on a simple idea: to empower self-expression through high-quality, sustainable prints. Every thread, every color, every design tells a story—your story.
                            </p>
                            <div style={{ marginTop: '3rem' }}>
                                <a href="#" className="btn-primary">
                                    Explore Our Collections
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Mission & Vision Section */}
                <section className="section-mission">
                    <div className="container">
                        <div className="mission-heading-container">
                            <h3 className="story-heading">Our Driving Force: Mission & Vision</h3>
                        </div>
                        <div className="mission-grid">

                            {/* Mission Card */}
                            <div className="mission-card">
                                <h4>
                                    <TargetIcon />
                                    Mission Statement
                                </h4>
                                <p>
                                    To connect independent artists with conscious consumers by providing a platform for sustainable, high-quality, and ethically produced custom apparel that turns original art into wearable fashion. We are committed to minimizing our environmental footprint and maximizing creative empowerment.
                                </p>
                            </div>

                            {/* Vision Card */}
                            <div className="mission-card">
                                <h4>
                                    <SparkleIcon />
                                    Vision for the Future
                                </h4>
                                <p>
                                    To be the global leader in on-demand, artistic clothing, recognized not only for superior print quality and fabric durability, but also as the standard-bearer for transparency, sustainability, and fair compensation within the creative merchandise industry.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Three Pillars Section (Creative Grid) */}
                <section className="section-pillars bg-light-gray">
                    <div className="container">
                        <h3 className="story-heading" style={{ textAlign: 'center', marginBottom: '4rem' }}>The Printify Difference</h3>
                        <div className="pillars-grid">

                            {/* Pillar 1: Quality */}
                            <div className="pillar-card">
                                <AwardIcon />
                                <h4 className="pillar-title">Uncompromised Quality</h4>
                                <p className="text-gray-600">
                                    We use premium, durable fabrics and state-of-the-art printing technology. Our prints don't fade, and our garments last, ensuring your art remains vibrant wash after wash.
                                </p>
                            </div>

                            {/* Pillar 2: Sustainability */}
                            <div className="pillar-card">
                                <LeafIcon />
                                <h4 className="pillar-title">Eco-Conscious Creation</h4>
                                <p className="text-gray-600">
                                    From organic cotton to water-based, non-toxic inks, sustainability is woven into our process. We are committed to a zero-waste future and ethical sourcing.
                                </p>
                            </div>

                            {/* Pillar 3: Community */}
                            <div className="pillar-card">
                                <UsersIcon />
                                <h4 className="pillar-title">Empowering Creators</h4>
                                <p className="text-gray-600">
                                    Printify is a platform for artists. We partner with independent designers globally, giving them a voice and ensuring they receive fair compensation for their visionary work.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Our Story / Meet the Founder Section */}
                <section className="section-story">
                    <div className="container">
                        <div className="story-flex">
                            <div className="story-img-col">
                                {/* Founder Portrait Image URL */}
                                <img
                                    src="https://img.freepik.com/premium-photo/portrait-young-professional-man-smiling_604472-8539.jpg"
                                    alt="Portrait of Printify Founder"
                                    className="story-img"
                                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/800x600/2C3E50/ffffff?text=Printify+Story+Image+Unavailable'; }}
                                />
                            </div>
                            <div className="story-text-col">
                                <span className="hero-tag text-accent">Our Origin</span>
                                <h3 className="story-heading">From a Sketchbook to a Global Movement</h3>
                                <p className="hero-subtitle text-gray-700" style={{ fontSize: '1.125rem' }}>
                                    Our founder, Alex Chen, started Printify in 2018 out of a tiny studio apartment with one screen-printing machine and a big vision. The goal wasn't just to make t-shirts, but to make a difference. Alex saw a gap in the market for customized apparel that didn't compromise on ethical standards or artistic integrity.
                                </p>
                                <p className="hero-subtitle text-gray-700" style={{ fontSize: '1.125rem' }}>
                                    Today, while we've grown, our core commitment remains the same: **crafting wearable stories responsibly**. We invite you to join our journey and feel the difference of clothing made with passion and purpose.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonial/Quote Block */}
                <section className="section-quote">
                    <div className="container">
                        <QuoteIcon />
                        <blockquote className="blockquote-text">
                            "Printify gave my art a new canvas. Knowing that every piece is made sustainably makes wearing it an act of conscious self-expression."
                        </blockquote>
                        <cite className="cite-source">Maya J., Featured Artist & Customer</cite>
                    </div>
                </section>

            </main>
        </>
    );
}

export default About;