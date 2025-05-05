// lib/logger.ts
export const logError = (error: Error, context?: string) => {
    if (process.env.NODE_ENV === "development" || process.env.NEXT_PUBLIC_STAGE === "staging") {
      console.error(`[${context || "error"}]`, error);
    } else {
      // Example: send error to external logging service
      sendToLogService(error, context);
    }
  };
  
  function sendToLogService(error: Error, context?: string) {
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
  }
  
  // upscaling -> override nextjs error handler -> creating contextual error classes