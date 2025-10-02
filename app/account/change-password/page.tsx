import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function ChangePasswordPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 py-12 md:py-24 lg:py-32 bg-background text-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Change Password</h1>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Update your account password for enhanced security.
              </p>
            </div>
            {/* Placeholder for change password form */}
            <div className="w-full max-w-md mx-auto bg-card p-6 rounded-lg shadow-md mt-8 text-left">
              <form className="space-y-4">
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-foreground">
                    Current Password
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-white focus:ring-white sm:text-sm bg-input text-foreground"
                  />
                </div>
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-foreground">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-white focus:ring-white sm:text-sm bg-input text-foreground"
                  />
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-white focus:ring-white sm:text-sm bg-input text-foreground"
                  />
                </div>
                <button type="submit" className="w-full bg-white/90 text-foreground py-2 px-4 rounded-md hover:bg-white">
                  Change Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
