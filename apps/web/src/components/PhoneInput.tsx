import React from 'react';
import { Phone } from 'lucide-react';

interface PhoneInputProps {
  /** Local part only — up to 9 digits, no "+998", no spaces, no symbols. */
  value: string;
  onChange: (digitsOnly: string) => void;
  required?: boolean;
  id?: string;
}

/**
 * Uzbek phone number field: "+998" is a fixed, non-editable prefix, and the
 * input itself only ever accepts up to 9 digits (everything else is
 * stripped as the user types, so letters/symbols/extra digits simply can't
 * be entered). Used everywhere a customer submits a lead so phone numbers
 * always come into the CRM/Telegram in a single consistent format.
 */
export const PhoneInput: React.FC<PhoneInputProps> = ({ value, onChange, required, id }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 9);
    onChange(digitsOnly);
  };

  return (
    <div className="relative">
      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-dark)] pointer-events-none" />
      <span className="absolute left-9 top-1/2 -translate-y-1/2 text-sm font-mono-num text-[var(--muted-dark)] pointer-events-none select-none">
        +998
      </span>
      <input
        id={id}
        type="tel"
        inputMode="numeric"
        autoComplete="tel-national"
        required={required}
        value={value}
        onChange={handleChange}
        placeholder="90 123 45 67"
        maxLength={9}
        pattern="[0-9]{9}"
        className="field-input-dark !pl-[4.75rem]"
      />
    </div>
  );
};
