import { AfterStep } from '@cucumber/cucumber';
import { renderHtmlToPngBuffer } from '../utils/htmlToPng.util';
// import { format as prettyFormat } from 'pretty-format';

function safeStringify(obj: any) {
  try {
    return JSON.stringify(obj, null, 2);
  } catch {
    return String(obj);
  }
}

function buildHtmlForStep(stepName: string | undefined, payload: any, response: any, scenarioName?: string) {
  const payloadHtml = `<pre style="white-space:pre-wrap; font-family: monospace; font-size:12px;">${safeStringify(payload)}</pre>`;
  const responseHtml = `<pre style="white-space:pre-wrap; font-family: monospace; font-size:12px;">${safeStringify(response)}</pre>`;

  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8"/>
        <title>API Step Snapshot</title>
      </head>
      <body style="font-family: Arial, Helvetica, sans-serif; color:#111">
        <h2 style="margin-bottom:4px;">${scenarioName ?? 'Scenario'}</h2>
        <h3 style="margin:2px 0; color:#1a73e8;">Step: ${stepName ?? '(unknown step)'}</h3>
        <div style="display:flex; gap:16px;">
          <div style="flex:1; border:1px solid #e1e1e1; padding:8px; border-radius:6px;">
            <h4 style="margin:4px 0;">Request / Payload</h4>
            ${payloadHtml}
          </div>
          <div style="flex:1; border:1px solid #e1e1e1; padding:8px; border-radius:6px;">
            <h4 style="margin:4px 0;">Response</h4>
            ${responseHtml}
          </div>
        </div>
        <footer style="margin-top:12px; font-size:11px; color:#666">Captured: ${new Date().toISOString()}</footer>
      </body>
    </html>
  `;
}

AfterStep(async function (testCase) {
  // `this` is the Cucumber World for the scenario
  // many steps set these fields: lastSentPayload, lastResponse, lastRequestHeaders, lastResponseHeaders, etc.
  const world: any = this as any;

  // Step info: Cucumber doesn't pass step text into AfterStep callback by default.
  // We attempt to use a field set by steps: world._currentStepName (optional).
  // If you want exact step text, you can set it in each step: this._currentStepName = 'When I create...'
  const stepName = (world._currentStepName as string | undefined) ?? undefined;

  // scenario name: world.pickle? Not always available. Use world.pickle?.name if present.
  const scenarioName = (world.pickle && world.pickle.name) ? world.pickle.name : undefined;

  // Prefer structured fields your steps already set:
  const payload = world.lastSentPayload ?? world.lastRequest ?? null;
  const response = world.lastResponse ?? world.lastResponseBody ?? null;

  // Build HTML and render to png buffer
  try {
    const html = buildHtmlForStep(stepName, payload, response, scenarioName);
    const pngBuffer = await renderHtmlToPngBuffer(html);

    // Attach screenshot (Buffer) to Cucumber scenario. Content type 'image/png'
    if (typeof world.attach === 'function') {
      await world.attach(pngBuffer, 'image/png');
      // Attach JSON logs as well
      if (payload) await world.attach(safeStringify(payload), 'application/json');
      if (response) await world.attach(safeStringify(response), 'application/json');
    } else {
      // If attach not available, optionally write file (not recommended)
      console.warn('World.attach not available - cannot attach screenshot to report.');
    }
  } catch (err: any) {
    console.error('AfterStep hook failed to capture screenshot:', err && err.message ? err.message : err);
  }
});
