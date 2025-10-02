import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function TermsAndConditionsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 py-12 md:py-24 lg:py-32 bg-background text-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Terms and Conditions</h1>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Please read these terms and conditions carefully before using Our Service.
              </p>
            </div>
            {/* Placeholder for terms and conditions content */}
            <div className="w-full max-w-3xl mx-auto bg-card p-6 rounded-lg shadow-md mt-8 text-left space-y-4">
              <p>
                These Terms and Conditions ("Terms") govern your use of the Scarves Co. website and services (the
                "Service"). By accessing or using the Service, you agree to be bound by these Terms. If you disagree
                with any part of the terms, then you may not access the Service.
              </p>
              <h2 className="text-xl font-bold mt-6">Accounts</h2>
              <p>
                When you create an account with us, you must provide us information that is accurate, complete, and
                current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate
                termination of your account on our Service.
              </p>
              <p>
                You are responsible for safeguarding the password that you use to access the Service and for any
                activities or actions under your password, whether your password is with our Service or a third-party
                service.
              </p>
              <p>
                You agree not to disclose your password to any third party. You must notify us immediately upon becoming
                aware of any breach of security or unauthorized use of your account.
              </p>
              <h2 className="text-xl font-bold mt-6">Intellectual Property</h2>
              <p>
                The Service and its original content, features and functionality are and will remain the exclusive
                property of Scarves Co. and its licensors. The Service is protected by copyright, trademark, and other
                laws of both the Country and foreign countries. Our trademarks and trade dress may not be used in
                connection with any product or service without the prior written consent of Scarves Co.
              </p>
              <h2 className="text-xl font-bold mt-6">Links To Other Web Sites</h2>
              <p>
                Our Service may contain links to third-party web sites or services that are not owned or controlled by
                Scarves Co.
              </p>
              <p>
                Scarves Co. has no control over, and assumes no responsibility for, the content, privacy policies, or
                practices of any third party web sites or services. You further acknowledge and agree that Scarves Co.
                shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to
                be caused by or in connection with use of or reliance on any such content, goods or services available
                on or through any such web sites or services.
              </p>
              <p>
                We strongly advise You to read the terms and conditions and privacy policies of any third-party web
                sites or services that You visit.
              </p>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
