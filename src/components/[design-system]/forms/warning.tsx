type WarningContentProps = React.ComponentPropsWithoutRef<'div'>;

export default function WarningContent({ children }: WarningContentProps) {
  return (
    <div className="px-4 py-2 rounded-md border border-dashed border-red-500">
      {children}
    </div>
  );
}
