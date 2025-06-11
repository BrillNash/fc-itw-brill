import type { App } from "vue"
import { toast } from "vue-sonner"
import { SMError } from "@/types/error"

export default {
  install(app: App) {
    app.config.errorHandler = (error, vm, info) => {
      console.error("[Vue Global Error Handler]", {
        error,
        component: vm,
        info,
      })

      // Show toast for known custom error
      if (error instanceof SMError) {
        toast(error.name, {
          description: error.message,
        })
      } else {
        toast("Unexpected Error", {
          description: (error as Error).message || String(error),
        })
      }
    }
  }
}

