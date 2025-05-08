import { postLog } from "./actions";
import { errorLogData } from "./definitions";

// lib/logger.ts
export const logError = (logData: errorLogData)  => {
    if (process.env.NODE_ENV === "development" || process.env.NEXT_PUBLIC_STAGE === "staging") {
      console.error(`[${logData.context || "error"}]`, JSON.stringify(logData.error_data, null, 2));
     
    
      
    } else {
      // Example: send error to external logging service
     //postLog(logData);
    }
  };
  
 /* function sendToLogService(error: Error, context?: string) {
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

  
  // this is normally handled by nextjs, we could use dev mode to debug logged errors