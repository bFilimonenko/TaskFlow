import { Button } from '@/components/ui/button.tsx';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <main className="flex items-center justify-center p-4">
      <div className="max-w-xl w-full text-center space-y-6">
        <p className="text-8xl font-bold text-accent/20 select-none">404</p>
        <h1 className="text-3xl font-bold">Page not found</h1>
        <p className="text-accent/80 text-lg">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/home">
          <Button variant="custom" className="w-auto">
            Back to Home
          </Button>
        </Link>
      </div>
    </main>
  );
};

export default NotFoundPage;
