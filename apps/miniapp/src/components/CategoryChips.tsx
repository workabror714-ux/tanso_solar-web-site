import React from 'react';
import { Category } from '@tanso/shared/types';

interface CategoryChipsProps {
  categories: Category[];
  active: string | null;
  onChange: (categoryId: string | null) => void;
}

export const CategoryChips: React.FC<CategoryChipsProps> = ({ categories, active, onChange }) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-none" style={{ scrollbarWidth: 'none' }}>
      <button
        onClick={() => onChange(null)}
        className="shrink-0 px-3.5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors border"
        style={
          active === null
            ? { background: 'var(--teal)', color: '#fff', borderColor: 'var(--teal)' }
            : { background: 'var(--surface)', color: 'var(--ink)', borderColor: 'var(--border)' }
        }
      >
        Barchasi
      </button>
      {categories.filter((c) => c.active).sort((a, b) => a.sortOrder - b.sortOrder).map((cat) => {
        const isActive = active === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onChange(cat.id)}
            className="shrink-0 px-3.5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors border"
            style={
              isActive
                ? { background: 'var(--teal)', color: '#fff', borderColor: 'var(--teal)' }
                : { background: 'var(--surface)', color: 'var(--ink)', borderColor: 'var(--border)' }
            }
          >
            {cat.nameUz}
          </button>
        );
      })}
    </div>
  );
};
