import {FaSearch} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import {useSelector} from 'react-redux';
import { useEffect, useState } from 'react';

export default function Header() {
  const {currentUser} = useSelector(state => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className='bg-slate-200 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
<Link to='/'>
      <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
        <span className='text-slate-500'>Alex</span>
        <span className='text-slate-400'>404</span>
      </h1>
</Link>
      <form onSubmit={handleSubmit} className='bg-slate-100 p-3 rounded-lg flex items-center'>
        <input className='bg-transparent focus:outline-none w-24 sm:w-64' type="text" placeholder='Search...' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>

<button>

<FaSearch className='text-slate-500' />
</button>
      </form>
<ui className='flex gap-4 '>
  <Link to="/">
  <a className='hidden sm:inline text-salte-700 hover:underline'>Home</a>
  </Link>
  <Link to="/about">
  <a className='hidden sm:inline text-salte-700 hover:underline'>About</a>
  </Link>

  <Link to="/profile">
    {currentUser ?(
<img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt='profile'/>
    ): <a className='text-salte-700 hover:underline'>Sign in</a>
    }
</Link>

</ui>
      </div>

    </header>
  )
}
