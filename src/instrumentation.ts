import { OTLPLogExporter } from "@opentelemetry/exporter-logs-otlp-http";
import { resourceFromAttributes } from "@opentelemetry/resources";
import { BatchLogRecordProcessor, LoggerProvider } from "@opentelemetry/sdk-logs";

const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;

function missingConfiguration(variable: string): void {
  if (process.env.NODE_ENV === "development") {
    throw new Error(
      `${variable} variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once ${variable} is configured`,
    );
  }
}

if (!token) missingConfiguration("NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN");
if (!host) missingConfiguration("NEXT_PUBLIC_POSTHOG_HOST");

export const posthogLogProvider =
  token && host
    ? new LoggerProvider({
        resource: resourceFromAttributes({
          "service.name": "fynk-tech-website",
        }),
        processors: [
          new BatchLogRecordProcessor({
            exporter: new OTLPLogExporter({
              url: `${host.replace(/\/$/, "")}/i/v1/logs`,
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }),
          }),
        ],
      })
    : null;

export const posthogChatLogger = posthogLogProvider?.getLogger("posthog-chat-route");

export async function flushPostHogLogs(): Promise<void> {
  await posthogLogProvider?.forceFlush();
}

export function register(): void {}
