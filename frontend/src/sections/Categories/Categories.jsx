import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CategoryChip from '../../components/CategoryChip/CategoryChip';
import { getCategories } from '../../api/categoryApi';

const Categories = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await getCategories();
        setCategories(response?.data?.categories || []);
      } catch (err) {
        console.error('Failed to load categories:', err);
        setError('Failed to load cuisines. Please try again later.');
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleChipClick = (cat) => {
    const query = cat?.name || cat?._id || cat?.id || '';
    navigate(`/search?c=${encodeURIComponent(query)}`);
  };

  return (
    <section className="py-12 max-w-7xl mx-auto px-6">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="font-display text-headline-lg font-extrabold text-on-surface mb-1">
            Explore Cuisines
          </h2>
          <p className="text-on-surface-variant text-body-md">
            Handpicked categories for every mood
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handleScroll('left')}
            className="w-12 h-12 rounded-full border border-outline-variant/40 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all active:scale-95 shadow-sm"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => handleScroll('right')}
            className="w-12 h-12 rounded-full border border-outline-variant/40 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all active:scale-95 shadow-sm"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8 text-on-surface-variant text-body-sm">Loading cuisines...</div>
      ) : error ? (
        <div className="text-center py-8 text-error text-body-sm">{error}</div>
      ) : categories.length === 0 ? (
        <div className="text-center py-8 text-on-surface-variant text-body-sm">No cuisines available right now.</div>
      ) : (
        <div
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto no-scrollbar pb-4 scroll-smooth"
        >
          {categories.map((cat) => (
            <CategoryChip
              key={cat._id || cat.id}
              name={cat.name}
              image={cat.image}
              onClick={() => handleChipClick(cat)}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Categories;
