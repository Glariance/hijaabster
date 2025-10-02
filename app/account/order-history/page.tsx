import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function OrderHistoryPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 py-12 md:py-24 lg:py-32 bg-background text-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Order History</h1>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                View your past orders and their details.
              </p>
            </div>
            {/* Placeholder for order history table */}
            <div className="w-full max-w-3xl mx-auto bg-card p-6 rounded-lg shadow-md mt-8 text-left">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Total
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">#123456789</td>
                      <td className="px-6 py-4 whitespace-nowrap">Sep 20, 2025</td>
                      <td className="px-6 py-4 whitespace-nowrap">$69.97</td>
                      <td className="px-6 py-4 whitespace-nowrap">Delivered</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button className="text-primary hover:underline">View Details</button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">#987654321</td>
                      <td className="px-6 py-4 whitespace-nowrap">Aug 15, 2025</td>
                      <td className="px-6 py-4 whitespace-nowrap">$45.00</td>
                      <td className="px-6 py-4 whitespace-nowrap">Shipped</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button className="text-primary hover:underline">View Details</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
