import {MessageSquareText} from 'lucide-react'
import { Link } from 'react-router';

const Logo = () => {
  return (
    <div className="">
      <h3 className="text-white/90 text-2xl font-bold pb-1">
        <Link to="/" className="flex items-end gap-3">
          <MessageSquareText />
          CrypChat
        </Link>
      </h3>
      <p className="text-white/70 font-medium">Talk Freely, Chat Securely</p>
    </div>
  );
}

export default Logo