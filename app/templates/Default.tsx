type DefaultType = {
  header?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
};

function Default({ header, footer, children, className }: DefaultType) {
  return (
    <>
      <div className="flex flex-col min-h-dvh inset-0 z-0 bg-[#020617] custom-gradient-bg">
        {header}
        <main className={`${className} flex flex-1 w-full p-5`}>
          {children}
        </main>
        {footer}
      </div>
    </>
  );
}

export default Default;
