import { useState } from 'react';
import { Search, Mic, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const SearchBar = ({ onSearch, placeholder = 'Search for food, cuisines or restaurants...' }) => {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('Manhattan, NY');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full glass-pill p-2 md:p-3 rounded-full flex items-center shadow-premium border-white/40 max-w-3xl mx-auto"
    >
      {/* Location Pill Selector */}
      <div className="hidden sm:flex items-center gap-2 px-4 border-r border-outline-variant/30 flex-shrink-0 cursor-pointer group">
        <MapPin size={18} className="text-primary group-hover:scale-110 transition-transform" />
        <span className="font-bold text-on-surface text-body-sm whitespace-nowrap">{location}</span>
      </div>

      {/* Input Field */}
      <div className="flex-grow flex items-center px-4">
        <Search size={18} className="text-outline mr-3" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent border-none focus:outline-none focus:ring-0 placeholder:text-outline text-body-md text-on-surface"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 pr-1 md:pr-2">
        <button
          type="button"
          className="p-2 text-outline hover:text-primary transition-colors flex items-center justify-center rounded-full hover:bg-surface-container-low"
        >
          <Mic size={18} />
        </button>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          className="hidden md:block px-6 py-2.5 bg-primary text-white font-bold rounded-full hover:bg-primary-container shadow-lg shadow-primary/20 transition-all text-label-lg"
        >
          Search
        </motion.button>
      </div>
    </form>
  );
};

export default SearchBar;
