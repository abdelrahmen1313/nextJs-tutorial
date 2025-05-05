import { postLog } from "./actions";
import { errorLogData } from "./definitions";

// lib/logger.ts
export const logError = (logData: errorLogData)  => {
    if (process.env.NODE_ENV === "development" || process.env.NEXT_PUBLIC_STAGE === "staging") {
      console.error(`[${logData.context || "error"}]`, logData.message);
      postLog(logData);
      
    } else {
      // Example: send error to external logging service
      postLog(logData);
    }
  };
  
 /* function sendToLogService(error: Error, context?: string) {
    // Use services like Sentry, LogRocket, Datadog, or a custom webhook
    fetch("/api/log-error", {
      method: "POST",
      body: JSON.stringify({
        name: error.name,
        message: error.message,
        stack: error.stack,
        context,
      }),
    });
  } */

  
  // upscaling -> override nextjs error handler -> creating contextual error classes