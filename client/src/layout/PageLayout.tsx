import { PropsWithChildren } from 'react';

type Props = {
  centered?: boolean;
  padded?: boolean;
};

function PageLayout({
  children,
  centered = false,
  padded = true,
}: PropsWithChildren<Props>) {
  return (
    <>
      <div className={`flex ${centered ? '' : ''} ${padded ? 'p-4' : ''}`}>
        {children}
      </div>
    </>
  );
}

export default PageLayout;
