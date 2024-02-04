import { ProfilingIntegration } from "@sentry/profiling-node";

export function initializeSentry(app: any, sentry: any, dsn: string) {
    sentry.init({
        dsn,
        release: process.env.IO_VERSION!?.split('-')[0],
        environment: process.env.STAGE,
        tracesSampleRate: 1.0,
        integrations: [
            // enable HTTP calls tracing
            new sentry.Integrations.Http({ tracing: true }),
            // enable Express.js middleware tracing
            new sentry.Integrations.Express({ app }),
            new ProfilingIntegration(),
        ],
    })
}