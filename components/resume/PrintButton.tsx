'use client';

import { useCallback } from 'react';
import { Printer } from 'lucide-react';
import { buttonClasses } from '@/components/ui/ButtonLink';

export function PrintButton() {
  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  return (
    <button type="button" onClick={handlePrint} className={buttonClasses('primary')}>
      <Printer className="h-4 w-4" aria-hidden="true" />
      Print / Save PDF
    </button>
  );
}
