import {MessageSquareText} from 'lucide-react'
import { Link } from 'react-router';

const Logo = () => {
  return (
    <div className="text-center lg:text-left mb-2 lg:mb-0">
      <h3 className="text-white/90 text-2xl font-bold pb-1">
        <Link to="/" className="flex items-end justify-center lg:justify-start gap-3">
          <MessageSquareText />
          CrypChat
        </Link>
      </h3>
      <p className="text-white/70 font-medium">Talk Freely, Chat Securely</p>
    </div>
  );
}

export default Logo