import { LoaderCircle, CircleX } from 'lucide-react';
import { cnJoin, cn } from '@/utils/formatting';

type ActionsAreaProps = {
  errorMessages: string[] | null;
  processingMessage: string | null;
  submitButtonLabel: string;
};

export default function ActionsArea({
  errorMessages,
  processingMessage,
  submitButtonLabel,
}: ActionsAreaProps) {
  return (
    <div className={twActionsArea}>
      <div className={twMessages}>

        {errorMessages && errorMessages.map((msg) => (
          <div className={cn(twMessage, twErrorMessage)} key={msg}>
            <CircleX />
            <span>{msg}</span>
          </div>
        ))}

        {processingMessage && (
          <div className={cn(twMessage, twProcessingMessage)}>
            <LoaderCircle className="animate-spin" />
            <span>{processingMessage}</span>
          </div>
        )}

      </div>
      <button type="submit" className={twSubmitButton} disabled={Boolean(processingMessage)}>
        {submitButtonLabel}
      </button>
    </div>
  );
}

const twActionsArea = cnJoin(
  'w-full min-h-16 mt-1 flex flex-row',
);

const twMessages = cnJoin(
  'w-full mt-3 flex flex-col gap-y-1 self-center',
  'text-sm'
);

const twMessage = cnJoin(
  'flex flex-row items-center gap-x-2',
  'text-sm font-semibold'
);

const twErrorMessage = cnJoin(
  'text-red-500'
);

const twProcessingMessage = cnJoin(
  'text-teal-500'
);

const twSubmitButton = cnJoin(
  'h-10 px-4 py-2 inline-flex items-center justify-center self-end',
  'text-white/90 font-medium text-base',
  'bg-black/90 rounded-md'
);