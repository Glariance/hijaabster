import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function UserProfilePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 py-12 md:py-24 lg:py-32 bg-background text-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">User Profile</h1>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Manage your personal information and account settings.
              </p>
            </div>
            {/* Placeholder for user profile form */}
            <div className="w-full max-w-md mx-auto bg-card p-6 rounded-lg shadow-md mt-8 text-left">
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    defaultValue="John Doe"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-white focus:ring-white sm:text-sm bg-input text-foreground"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    defaultValue="john.doe@example.com"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-white focus:ring-white sm:text-sm bg-input text-foreground"
                  />
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-foreground">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    defaultValue="123 Main St, Anytown, USA"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-white focus:ring-white sm:text-sm bg-input text-foreground"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-white/90 text-foreground py-2 px-4 rounded-md hover:bg-white"
                >
                  Save Changes
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
