// ─── NAV SCROLL SHADOW ───────────────────────────────────────────
window.addEventListener('scroll', () => {
  document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 40);
});

// ─── FADE-UP ON SCROLL ───────────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.15 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ─── PAYMENT MODAL ───────────────────────────────────────────────
// Replace the stripeUrl values below with your actual Stripe Payment Links.
// To create Payment Links: https://dashboard.stripe.com/payment-links
//   - Concierge: create a Recurring subscription product at $1,800/month
//   - Discharge:  create a one-time payment product at $450
//   - Hourly:     create a one-time payment product at $125
const SERVICES = {
  concierge: {
    label:     'Monthly Concierge Care',
    name:      'Ongoing Concierge Nursing',
    price:     '$1,800 / month',
    info:      '2-month minimum commitment. Your card will be charged $1,800 today. Subsequent monthly billing via Stripe. Cancel anytime after the initial 2-month period.',
    btnText:   'Proceed to Secure Payment →',
    stripeUrl: 'https://buy.stripe.com/YOUR_CONCIERGE_LINK'
  },
  discharge: {
    label:     'Transitional Support',
    name:      'Hospital Discharge Support',
    price:     'Starting at $450',
    info:      'Final cost confirmed during free consultation. Submit your info and Sarah will reach out within 24 hours to confirm scope and process payment.',
    btnText:   'Request Discharge Support →',
    stripeUrl: 'https://buy.stripe.com/YOUR_DISCHARGE_LINK'
  },
  hourly: {
    label:     'On-Demand Consultation',
    name:      'Hourly Consultation',
    price:     '$125 / hour',
    info:      'Pay for one hour to start. Sarah will reach out to schedule your call. Additional hours billed at the same rate if needed.',
    btnText:   'Pay & Book Consultation →',
    stripeUrl: 'https://buy.stripe.com/YOUR_HOURLY_LINK'
  }
};

let currentService = null;

function openModal(type) {
  currentService = type;
  const s = SERVICES[type];
  document.getElementById('modal-label').textContent   = s.label;
  document.getElementById('modal-name').textContent    = s.name;
  document.getElementById('modal-price').textContent   = s.price;
  document.getElementById('modal-info').textContent    = s.info;
  document.getElementById('modal-pay-btn').textContent = s.btnText;
  document.getElementById('modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal').classList.remove('open');
  document.body.style.overflow = '';
  currentService = null;
}

function handlePayment() {
  if (!currentService) return;
  const s = SERVICES[currentService];
  if (s.stripeUrl.includes('YOUR_')) {
    alert(
      'Stripe payment links not yet configured.\n\n' +
      'To activate:\n' +
      '1. Go to dashboard.stripe.com → Payment Links\n' +
      '2. Create a link for each service tier\n' +
      '3. Replace the placeholder URLs in js/main.js'
    );
  } else {
    window.location.href = s.stripeUrl;
  }
}

// Close modal on Escape key or backdrop click
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
document.getElementById('modal').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});
