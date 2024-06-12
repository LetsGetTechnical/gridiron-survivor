'use client'; // Error components must be Client Components

interface IErrorBoundary{
  children? : React.ReactNode
}

export default function ErrorBoundary(props: IErrorBoundary) {
  return (
    <div className="align-center flex flex-col">
      <h2 className="text-white">Something went wrong!</h2>
    </div>
  );
}
