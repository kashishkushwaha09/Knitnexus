
export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">Textile Gig Marketplace</h1>
      <p className="text-gray-600 mb-8">
        Connecting Manufacturers with Skilled Gig Workers
      </p>

      <div className="flex gap-4">
        <a
          href="/signup"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Signup
        </a>
        <a
          href="/login"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Login
        </a>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 text-center">
        <div className="p-6 bg-white shadow rounded">
          <h2 className="text-xl font-semibold">For Manufacturers</h2>
          <p className="text-gray-500 mt-2">
            Create your profile, post jobs, and find skilled gig workers fast.
          </p>
          <a href="/manufacturer" className="text-blue-500 underline mt-3 block">
            Go to Manufacturer Dashboard →
          </a>
        </div>

        <div className="p-6 bg-white shadow rounded">
          <h2 className="text-xl font-semibold">For Gig Workers</h2>
          <p className="text-gray-500 mt-2">
            Build your profile, explore job posts, and apply easily.
          </p>
          <a href="/gigworker" className="text-green-500 underline mt-3 block">
            Go to Gig Worker Dashboard →
          </a>
        </div>
      </div>
    </main>
  );
}
