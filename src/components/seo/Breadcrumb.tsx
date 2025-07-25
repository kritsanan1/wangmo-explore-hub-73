import { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { BREADCRUMB_CONFIG } from '@/constants/seo-urls';

interface BreadcrumbItem {
  label: string;
  url: string;
}

const Breadcrumb = memo(() => {
  const location = useLocation();
  const breadcrumbs = BREADCRUMB_CONFIG[location.pathname as keyof typeof BREADCRUMB_CONFIG] || [
    { label: 'Home', url: '/' }
  ];

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav 
      aria-label="Breadcrumb navigation"
      className="mb-6 bg-gradient-to-r from-amber-50/50 to-green-50/50 px-4 py-3 rounded-lg border border-amber-100"
    >
      <ol className="flex items-center space-x-2 text-sm">
        {breadcrumbs.map((item, index) => (
          <li key={item.url} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="h-4 w-4 text-amber-400 mx-2" aria-hidden="true" />
            )}
            
            {index === breadcrumbs.length - 1 ? (
              // Current page (not clickable)
              <span 
                className="text-amber-800 font-medium flex items-center"
                aria-current="page"
              >
                {index === 0 && <Home className="h-4 w-4 mr-1" />}
                {item.label}
              </span>
            ) : (
              // Clickable breadcrumb items
              <Link
                to={item.url}
                className="text-amber-600 hover:text-amber-800 transition-colors flex items-center hover:underline"
              >
                {index === 0 && <Home className="h-4 w-4 mr-1" />}
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
});

Breadcrumb.displayName = 'Breadcrumb';

export default Breadcrumb;
