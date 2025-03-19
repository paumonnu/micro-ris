import { PropsWithChildren } from 'react';

type Props = {
  centered?: boolean;
  padded?: boolean;
  fullWidth?: boolean;
  title?: string;
};

function PageListLayout({
  children,
  title,
  fullWidth = false,
}: PropsWithChildren<Props>) {
  return (
    <div className={`flex-1 p-4 h-full w-full overflow-auto`}>
      <div
        className={`flex flex-col m-auto h-full ${
          !fullWidth ? 'max-w-320' : ''
        }`}
      >
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        <div className="shrink grow-0 overflow-auto flex">{children}</div>
      </div>
    </div>
  );
}

export default PageListLayout;
