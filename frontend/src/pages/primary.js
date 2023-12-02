import {Link} from 'react-router-dom';

export const PrimaryPage = () => {
  return (
    <div>
      PrimaryPage Page
      <Link to="/sign-in">Sign In</Link>
      <Link to="/sign-up">Sign Up</Link>
    </div>
  );
};
