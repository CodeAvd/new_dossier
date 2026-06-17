/* Contact — dark warm card with links, + footer */
function Contact() {
  const { Button } = window.AvdeevDesignSystem_a8f605;
  const D = window.AV_DATA;
  const ref = window.useReveal();
  return (
    <section className="av-section av-contact" id="contact">
      <div className="container">
        <div className="av-contact__card reveal" ref={ref}>
          <span className="av-blob" style={{ width: 340, height: 340, top: -120, right: -80, background: "radial-gradient(circle at 40% 40%, #e8a87c, #b1603b)", opacity: 0.5 }} />
          <span className="av-blob" style={{ width: 240, height: 240, bottom: -120, left: -60, background: "radial-gradient(circle at 40% 40%, var(--mauve), var(--blush-deep))", opacity: 0.3 }} />
          <div className="av-contact__inner">
            <div>
              <h2 className="av-contact__title">let&rsquo;s build something that <em>proves itself.</em></h2>
              <p className="av-contact__blurb">{D.contact.blurb}</p>
              <div style={{ marginTop: 30 }}>
                <Button variant="primary" size="lg" as="a" href={"mailto:" + D.contact.email}>send a hard problem</Button>
              </div>
            </div>
            <div className="av-contact__links">
              {D.contact.links.map((l) => (
                <a className="av-clink" key={l.label} href={l.href}>
                  <span className="av-clink__l">{l.label}</span>
                  <span className="av-clink__h">{l.handle}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
        <footer className="av-footer">
          <div className="av-footer__note">{D.wordmark} — built <em>file-first</em>, of course.</div>
          {/* ARB-83: the proper name is the ONE deliberate capitalized exception to the
              all-lowercase voice — small-caps marks it as an intentional typographic
              choice, not a stray capital. */}
          <div className="av-footer__note">© 2026 <span style={{ fontVariant: "small-caps", letterSpacing: "0.03em" }}>{D.name}</span></div>
        </footer>
      </div>
    </section>
  );
}
window.Contact = Contact;
