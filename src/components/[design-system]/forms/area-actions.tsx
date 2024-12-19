import { useState } from 'react';
import { LoaderCircle, CircleX } from 'lucide-react';

import { cnJoin } from '@/utils/formatting';

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
          <div className={twErrorContainer} key={msg}>
            <CircleX />
            <span>{msg}</span>
          </div>
        ))}

        {processingMessage && (
          <div className={twProcessingContainer}>
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
  'w-full min-h-16 flex flex-row gap-x-4',
);

const twMessages = cnJoin(
  ' w-full flex flex-col gap-y-1 self-center',
  'text-sm'
);

const twProcessingContainer = cnJoin(
  'flex flex-row items-center gap-x-2',
  'text-teal-500 text-sm font-semibold'
);

const twErrorContainer = cnJoin(
  'flex flex-row items-center gap-x-2',
  'text-red-500 text-sm font-semibold'
);

const twSubmitButton = cnJoin(
  'h-10 px-4 py-2 inline-flex items-center justify-center self-end',
  'font-inter text-white/90 font-medium text-base',
  'bg-black/90 rounded-md'
);