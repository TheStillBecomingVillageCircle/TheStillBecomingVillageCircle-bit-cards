/* B.I.T. Cards authentication options. The existing email-link flow remains the default. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const db = window.bitCardsDb;
  if (!db) return;
  const linkForm = $('bit-login-form');
  const passwordForm = $('bit-password-form');
  const status = $('bit-login-status');
  if (!linkForm || !passwordForm || !status || !$('bit-method-link') || !$('bit-method-password')) return;
  const redirectTo = location.origin + location.pathname;
  let mode = 'link';
  function setMode(next) {
    mode = next;
    linkForm.hidden = next !== 'link';
    passwordForm.hidden = next !== 'password';
    $('bit-method-link').setAttribute('aria-pressed', String(next === 'link'));
    $('bit-method-password').setAttribute('aria-pressed', String(next === 'password'));
    status.textContent = '';
  }
  $('bit-method-link').addEventListener('click', () => setMode('link'));
  $('bit-method-password').addEventListener('click', () => setMode('password'));
  async function withBusy(button, action) {
    button.disabled = true;
    try { await action(); } catch (error) { status.textContent = 'Something went wrong. Please try again.'; console.error('Authentication action failed',error); } finally { button.disabled = false; }
  }
  function credentials() {
    return {email: $('bit-password-email').value.trim(), password: $('bit-password-value').value};
  }
  passwordForm.addEventListener('submit', e => {
    e.preventDefault();
    const button = e.submitter || passwordForm.querySelector('[type="submit"]');
    withBusy(button, async () => {
      status.textContent = 'Signing in…';
      const {error} = await db.auth.signInWithPassword(credentials());
      status.textContent = error ? 'Sign-in unsuccessful. Check your email and password, or use an email link.' : '';
    });
  });
  $('bit-password-create').addEventListener('click', e => withBusy(e.currentTarget, async () => {
    const {email, password} = credentials();
    if (!email || password.length < 12) {
      status.textContent = 'Enter your email and a password of at least 12 characters.';
      return;
    }
    status.textContent = 'Creating your account…';
    const {error} = await db.auth.signUp({email, password, options:{emailRedirectTo:redirectTo}});
    status.textContent = error ? 'Could not create the account: ' + error.message : 'Check your email to confirm your account. If you already use an email link, sign in that way first and add a password under Security & Sign-In.';
  }));
  $('bit-password-forgot').addEventListener('click', e => withBusy(e.currentTarget, async () => {
    const email = $('bit-password-email').value.trim();
    if (!email) {status.textContent = 'Enter your email address first.';return;}
    const {error} = await db.auth.resetPasswordForEmail(email, {redirectTo});
    status.textContent = error ? 'Unable to send a recovery email: ' + error.message : 'If an account exists, a password recovery email is on its way.';
  }));
  $('bit-set-password-form').addEventListener('submit', e => {
    e.preventDefault();
    const output = $('bit-security-status');
    const password = $('bit-new-password').value;
    if (password.length < 12 || password !== $('bit-confirm-password').value) {
      output.textContent = 'Use at least 12 characters and make sure both passwords match.';
      return;
    }
    withBusy(e.submitter, async () => {
      const {data:{user},error:userError} = await db.auth.getUser();
      if (userError || !user) {output.textContent = 'Please sign in again before changing your password.';return;}
      const {error} = await db.auth.updateUser({password});
      output.textContent = error ? 'Unable to save password: ' + error.message : 'Password saved. You can now use either sign-in method.';
      if (!error) $('bit-set-password-form').reset();
    });
  });
  db.auth.onAuthStateChange(event => {
    if (event === 'PASSWORD_RECOVERY') {
      window.bitShowView?.('account');
      const panel = $('bit-account-in');
      if (!panel) return;
      panel.hidden = false;
      const security = panel.querySelector('.bit-security-panel');
      if (security) security.open = true;
      $('bit-security-status').textContent = 'Choose a new password to finish account recovery.';
    }
  });
  setMode(mode);
})();
