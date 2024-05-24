'use client'; // Error components must be Client Components

export default function ErrorBoundary() {
  return (
    <div className="align-center flex flex-col">
      <h2 className="text-white">Something went wrong!</h2>
    </div>
  );
}
