import React, { useEffect, useState } from 'react';
import { getCategories } from '../../api/categoryApi';
import { getMenuByRestaurant } from '../../api/menuApi';
import Loader from '../../components/Loader/Loader';

const OwnerCategories = ({ restaurantId }) => {
  const [globalCategories, setGlobalCategories] = useState([]);
  const [menuCategories, setMenuCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [globalRes, menuRes] = await Promise.all([
          getCategories(),
          restaurantId ? getMenuByRestaurant(restaurantId) : Promise.resolve({ data: [] }),
        ]);

        setGlobalCategories(globalRes.data?.categories || globalRes.data || []);
        
        const items = menuRes.data.menuItems || menuRes.data || [];
        const uniqueCats = [...new Set(items.map((item) => item.category).filter(Boolean))];
        setMenuCategories(uniqueCats);
      } catch (err) {
        console.error('Failed to load categories:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [restaurantId]);

  if (loading) return <div className="py-12"><Loader /></div>;

  return (
    <div className="bg-white rounded-[32px] p-8 border border-outline-variant/20 shadow-premium space-y-8">
      <div>
        <h2 className="font-display text-headline-sm font-black text-on-surface">Categories Management</h2>
        <p className="text-body-sm text-on-surface-variant mt-1">
          Explore global food categories and view what categories are active in your current menu.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="font-display text-body-lg font-bold text-on-surface">Active Categories in Your Menu</h3>
        {menuCategories.length === 0 ? (
          <p className="text-body-sm text-on-surface-variant">No categories currently used. Add items in the Menu tab to categorize them!</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {menuCategories.map((cat, idx) => (
              <span key={idx} className="bg-primary/10 text-primary border border-primary/20 px-4 py-2 rounded-full font-bold text-label-md capitalize">
                {cat}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-4 pt-4 border-t border-outline-variant/10">
        <h3 className="font-display text-body-lg font-bold text-on-surface">Global System Categories</h3>
        <p className="text-body-sm text-on-surface-variant mb-4">Select or type these names when adding new items to list them in standardized filters:</p>
        
        {globalCategories.length === 0 ? (
          <p className="text-body-sm text-on-surface-variant">No system categories found.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {globalCategories.map((c) => (
              <div key={c._id} className="p-4 border border-outline-variant/30 rounded-2xl flex flex-col items-center text-center gap-2 hover:border-primary/50 transition-colors">
                {c.image && (
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-outline-variant/30 bg-surface-container-low mb-1">
                    <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
                  </div>
                )}
                <span className="font-bold text-body-md text-on-surface capitalize">{c.name}</span>
                {c.description && <span className="text-[10px] text-on-surface-variant leading-tight">{c.description}</span>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerCategories;
