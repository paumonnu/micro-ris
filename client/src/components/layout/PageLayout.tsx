import { Spinner } from '../ui/spinner';

export type PageLayoutProps = {
  title?: string;
  isLoading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
};

export function PageLayout({
  title,
  isLoading = false,
  fullWidth = false,
  children,
}: PageLayoutProps) {
  return (
    <div
      className={`relative grow p-4 space-y-4 mx-auto w-full ${
        fullWidth ? '' : 'max-w-300'
      }`}
    >
      {isLoading ? (
        <div className="absolute h-full w-full flex justify-center items-center top-0 left-0">
          <Spinner />
        </div>
      ) : (
        <>
          {title && <h2 className="font-bold">{title}</h2>}
          <div>{children}</div>
        </>
      )}
    </div>
  );
}
