import { Link } from 'react-router-dom';
import { Button } from './ui/button';

export default function GuestButtons() {
  return (
    <div className="flex gap-6 mt-4 justify-center 2xl:justify-start">
      <Link to={'/login'}>
        <Button className="px-8 h-8 xl:h-10 text-base">Login</Button>
      </Link>

      <Link to={'/signup'}>
        <Button className="px-8 h-8 xl:h-10 text-base">Sign up</Button>
      </Link>
    </div>
  );
}
