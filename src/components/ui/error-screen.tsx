export function ErrorScreen({ message }: { message: string }) {
  return (
    <div className="flex flex-1 items-center justify-center px-6 py-16">
      <div className="w-full max-w-md text-center">
        <div className="rounded-3xl bg-card p-8 shadow-sm">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-error/10 text-4xl">
            😔
          </div>
          <h1 className="mb-3 text-xl font-bold text-text-primary">
            Oops, something went wrong
          </h1>
          <p className="text-text-secondary leading-relaxed">{message}</p>
          <p className="mt-4 text-sm text-text-tertiary">
            Need help?{" "}
            <a
              href="mailto:support@youtwoshouldmeet.app"
              className="text-primary hover:underline"
            >
              Contact support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
