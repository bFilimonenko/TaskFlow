import { Button } from '@/components/ui/button.tsx';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <main className="flex items-center justify-center p-4">
      <div className="max-w-xl w-full text-center space-y-6">
        <h1 className="text-4xl font-bold ">👋 Welcome to TaskFlow!</h1>
        <p className="text-accent/80 text-lg">
          A lightweight task management system for your team. Create projects, assign tasks, and
          track progress effortlessly.
        </p>
        <Link to="/projects">
          <Button variant="custom" className="w-full sm:w-auto">
            View Projects
          </Button>
        </Link>
      </div>
    </main>
  );
};

export default HomePage;
