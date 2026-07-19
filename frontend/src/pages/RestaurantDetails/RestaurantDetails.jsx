import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Clock, Heart, Share2, Plus, Minus, ShoppingCart, ShieldCheck } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { getRestaurantById } from '../../api/restaurantApi';
import { getMenuByRestaurant } from '../../api/menuApi';
import { getReviewsByRestaurant, createReview } from '../../api/reviewApi';
import { useAuth } from '../../hooks/useAuth';
import Loader from '../../components/Loader/Loader';
import Button from '../../components/Button/Button';
import ReviewCard from '../../components/ReviewCard/ReviewCard';
import { motion } from 'framer-motion';

const RestaurantDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cart, addItem, incrementQuantity, decrementQuantity, subtotal, total, deliveryFee } = useCart();
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('Menu');
  const [liked, setLiked] = useState(false);
  const { user, isAuthenticated } = useAuth();

  // Review form state
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewError, setReviewError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const fetchRestaurantData = async () => {
      if (!id) {
        setRestaurant(null);
        setMenuItems([]);
        setReviews([]);
        setError('Restaurant could not be found.');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError('');
      setMenuItems([]);
      setReviews([]);

      const [restaurantResult, menuResult, reviewsResult] = await Promise.allSettled([
        getRestaurantById(id),
        getMenuByRestaurant(id),
        getReviewsByRestaurant(id),
      ]);

      if (!isMounted) return;

      const restaurantData = restaurantResult.status === 'fulfilled'
        ? restaurantResult.value?.data?.restaurant || restaurantResult.value?.data || null
        : null;

      setRestaurant(restaurantData);
      setMenuItems(menuResult.status === 'fulfilled' ? menuResult.value?.data?.menuItems || [] : []);
      setReviews(reviewsResult.status === 'fulfilled' ? reviewsResult.value?.data?.reviews || [] : []);

      if (!restaurantData) {
        setError('Restaurant could not be found.');
        return;
      }
    };

    fetchRestaurantData().finally(() => {
      if (isMounted) {
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [id, navigate]);

  if (loading) return <Loader fullPage />;

  if (!restaurant) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-16 text-center">
        <p className="text-error text-body-lg">{error || 'Restaurant could not be found.'}</p>
      </div>
    );
  }

  const tabs = ['Overview', 'Menu', 'Reviews', 'Photos', 'About'];
  const cuisineText = Array.isArray(restaurant?.cuisine)
    ? restaurant.cuisine.filter(Boolean).join(' • ')
    : restaurant?.cuisine || 'Restaurant';
  const reviewsCount = restaurant?.reviewsCount || reviews.length;
  const imageSrc = restaurant?.image || restaurant?.imageUrl || '';

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) return;
    setSubmittingReview(true);
    setReviewError('');
    try {
      const res = await createReview({
        user: user._id,
        restaurant: id,
        rating: reviewRating,
        comment: reviewComment,
      });
      setReviews([res.data.review, ...reviews]);
      setReviewComment('');
      setReviewRating(5);
    } catch (err) {
      setReviewError(err?.response?.data?.message || 'Failed to submit review');
    } finally {
      setSubmittingReview(false);
    }
  };

  // Check if item is in cart
  const getItemQuantity = (itemId) => {
    const item = cart.find((i) => i.id === itemId);
    return item ? item.quantity : 0;
  };

  return (
    <div className="w-full">
      {/* Cinematic Hero Section */}
      <section className="relative h-[450px] md:h-[550px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={imageSrc}
            alt={restaurant.name}
            className="w-full h-full object-cover transform scale-102"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>

        {/* Floating Restaurant Details Info Card */}
        <div className="absolute -bottom-1 left-0 right-0 max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6 md:p-8 rounded-3xl shadow-premium flex flex-col md:flex-row items-start md:items-end justify-between gap-6"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                {restaurant.isMichelin && (
                  <span className="bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full text-label-sm font-bold tracking-wider uppercase">
                    Michelin Selection
                  </span>
                )}
                <div className="flex items-center text-primary font-bold">
                  <Star size={16} fill="currentColor" className="mr-1" />
                  <span>{restaurant.rating}</span>
                  <span className="text-on-surface-variant font-medium ml-1">
                    ({reviewsCount} Reviews)
                  </span>
                </div>
              </div>
              <h1 className="font-display text-3xl md:text-5xl font-black text-on-surface">
                {restaurant.name}
              </h1>
              <p className="text-on-surface-variant text-body-md flex items-center gap-2">
                <span>{cuisineText}</span>
                <span>•</span>
                <span>{restaurant.deliveryTime || '30-45 min'}</span>
                <span>•</span>
                <span>{restaurant.price || 'Budget'}</span>
              </p>
            </div>

            {/* Quick Share / Like Action buttons */}
            <div className="flex gap-3 w-full md:w-auto">
              <button
                onClick={() => setLiked(!liked)}
                className="bg-surface-container-highest p-3.5 rounded-2xl hover:bg-outline-variant/30 transition-colors group active:scale-95 flex-grow sm:flex-grow-0 flex justify-center"
              >
                <Heart size={20} className={liked ? 'text-primary fill-current' : 'text-on-surface-variant'} />
              </button>
              <button className="bg-surface-container-highest p-3.5 rounded-2xl hover:bg-outline-variant/30 transition-colors group active:scale-95 flex-grow sm:flex-grow-0 flex justify-center">
                <Share2 size={20} className="text-on-surface-variant" />
              </button>
              <Button
                variant="primary"
                onClick={() => navigate('/checkout')}
                className="flex-grow md:flex-grow-0 font-bold"
              >
                Order Now
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 mt-16 md:mt-24">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left Column: Menu list & tabs */}
          <div className="w-full lg:flex-1">
            {/* Tabs Navigation Row */}
            <div className="flex items-center gap-6 border-b border-outline-variant/30 mb-8 overflow-x-auto hide-scrollbar py-2">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`font-display text-body-lg font-bold pb-2 border-b-2 transition-all select-none whitespace-nowrap
                    ${activeTab === tab ? 'text-primary border-primary' : 'text-on-surface-variant/70 border-transparent hover:text-primary'}
                  `}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab contents panel */}
            {activeTab === 'Menu' ? (
              <div className="space-y-8">
                <h2 className="font-display text-headline-lg font-extrabold text-on-surface">
                  Recommended Dishes
                </h2>

                {menuItems.length === 0 ? (
                  <div className="rounded-3xl border border-dashed border-outline-variant/40 bg-white p-8 text-center text-on-surface-variant">
                    <p className="text-body-md font-medium">No menu items are available for this restaurant right now.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {menuItems.map((item) => {
                      const qty = getItemQuantity(item._id || item.id);
                      return (
                        <div
                          key={item._id || item.id}
                          className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md border border-outline-variant/20 hover:border-outline-variant/40 transition-all duration-300 flex flex-col justify-between h-[360px]"
                        >
                        <div className="h-40 overflow-hidden relative bg-surface-container">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          {item.rating > 0 && (
                            <span className="absolute top-4 right-4 glass-pill px-3 py-1 text-primary font-bold text-label-sm shadow-sm flex items-center gap-1">
                              ★ {item.rating.toFixed(1)}
                            </span>
                          )}
                        </div>

                        <div className="p-5 flex-grow flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start gap-4 mb-2">
                              <h3 className="font-display text-headline-sm font-extrabold text-on-surface leading-tight">
                                {item.name}
                              </h3>
                              <span className="font-bold text-primary text-headline-sm select-none">
                                ${(Number(item.price) || 0).toFixed(2)}
                              </span>
                            </div>
                            <p className="text-on-surface-variant text-body-sm line-clamp-2">
                              {item.description}
                            </p>
                          </div>

                          {/* Add to cart / quantity button */}
                          <div className="pt-4">
                            {qty > 0 ? (
                              <div className="flex items-center justify-between bg-primary text-white rounded-full p-1 border border-primary max-w-[140px]">
                                <button
                                  onClick={() => decrementQuantity(item._id || item.id)}
                                  className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors"
                                >
                                  <Minus size={16} />
                                </button>
                                <span className="font-bold text-body-md select-none">{qty}</span>
                                <button
                                  onClick={() => incrementQuantity(item._id || item.id)}
                                  className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors"
                                >
                                  <Plus size={16} />
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => addItem({ ...item, id: item._id || item.id, restaurantId: restaurant._id || restaurant.id, restaurantName: restaurant.name })}
                                className="w-full flex items-center justify-center gap-2 border-2 border-primary text-primary font-display font-extrabold py-2 rounded-full hover:bg-primary hover:text-white transition-all active:scale-95"
                              >
                                <ShoppingCart size={16} />
                                <span>Add to Cart</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  </div>
                )}
              </div>
            ) : activeTab === 'Reviews' ? (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-headline-lg font-extrabold text-on-surface">
                    Customer Reviews
                  </h2>
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-bold text-label-sm">
                    {reviews.length} Reviews
                  </span>
                </div>

                {/* Review submission form */}
                {isAuthenticated ? (
                  <form onSubmit={handleSubmitReview} className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/30 shadow-sm">
                    <h3 className="font-bold text-body-lg text-on-surface mb-4">Write a Review</h3>
                    
                    <div className="flex items-center gap-2 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewRating(star)}
                          className={`p-1 transition-colors ${reviewRating >= star ? 'text-yellow-500' : 'text-outline-variant'}`}
                        >
                          <Star size={24} fill="currentColor" />
                        </button>
                      ))}
                    </div>

                    <textarea
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder="What did you like or dislike?"
                      className="w-full bg-surface-container-low border border-outline-variant rounded-xl p-4 outline-none text-body-md text-on-surface resize-none h-24 mb-4 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      required
                    />

                    {reviewError && <p className="text-error text-label-sm mb-4">{reviewError}</p>}

                    <div className="flex justify-end">
                      <Button type="submit" variant="primary" loading={submittingReview} disabled={!reviewComment.trim()}>
                        Post Review
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/30 text-center">
                    <p className="text-on-surface-variant text-body-md mb-4">Please log in to leave a review.</p>
                    <Button variant="outline" onClick={() => navigate('/login')}>Log In to Review</Button>
                  </div>
                )}

                {/* Review List */}
                {reviews.length === 0 ? (
                  <div className="rounded-3xl border border-dashed border-outline-variant/40 bg-white p-8 text-center text-on-surface-variant">
                    <p className="text-body-md font-medium">No reviews yet. Be the first to review!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {reviews.map((rev) => (
                      <ReviewCard
                        key={rev._id}
                        name={rev.user?.name || 'Anonymous User'}
                        role="Foodie"
                        rating={rev.rating}
                        comment={rev.comment}
                        avatar={null}
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-8 border border-outline-variant/30 text-center text-on-surface-variant">
                <p className="text-body-md font-medium">
                  {activeTab} content for {restaurant.name} will be loaded from MERN backend.
                </p>
              </div>
            )}
          </div>

          {/* Right Column: Sticky Cart Sidebar Summary */}
          <aside className="w-full lg:w-[380px] lg:sticky lg:top-28">
            <div className="glass-card rounded-3xl p-6 border border-outline-variant/30 shadow-premium">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-headline-sm font-extrabold text-on-surface">
                  Your Order
                </h3>
                <span className="bg-primary text-white px-3 py-1 rounded-full text-label-sm font-black shadow-sm">
                  {cart.length} Items
                </span>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-8 text-on-surface-variant/60 flex flex-col items-center gap-2">
                  <ShoppingCart size={36} className="stroke-[1.5]" />
                  <p className="text-body-sm font-medium">Your cart is empty.</p>
                </div>
              ) : (
                <>
                  {/* Cart Items list */}
                  <div className="space-y-4 max-h-[220px] overflow-y-auto pr-1 hide-scrollbar mb-6">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-3 justify-between items-center py-2 border-b border-outline-variant/10">
                        <div className="flex-grow">
                          <p className="font-bold text-body-sm text-on-surface capitalize">
                            {item.name}
                          </p>
                          <p className="text-label-sm text-primary font-bold">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                        <div className="flex items-center bg-surface-container rounded-full p-0.5 border border-outline-variant/50">
                          <button
                            onClick={() => decrementQuantity(item.id)}
                            className="w-6 h-6 flex items-center justify-center hover:bg-surface-container-high rounded-full transition-colors text-primary"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="px-2.5 font-bold text-label-sm select-none">{item.quantity}</span>
                          <button
                            onClick={() => incrementQuantity(item.id)}
                            className="w-6 h-6 flex items-center justify-center hover:bg-surface-container-high rounded-full transition-colors text-primary"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Calculations */}
                  <div className="border-t border-outline-variant/20 pt-4 space-y-2.5 text-on-surface-variant text-label-lg font-bold">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-on-surface">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Fee</span>
                      {deliveryFee === 0 ? (
                        <span className="text-tertiary">Free</span>
                      ) : (
                        <span className="text-on-surface">${deliveryFee.toFixed(2)}</span>
                      )}
                    </div>
                    <div className="flex justify-between border-t border-outline-variant/20 pt-4 text-headline-sm text-on-surface font-extrabold">
                      <span>Total</span>
                      <span className="text-primary">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    onClick={() => navigate('/cart')}
                    className="w-full mt-6"
                  >
                    Go to Checkout
                  </Button>
                </>
              )}

              {/* Safety banner */}
              <div className="flex items-center gap-2 bg-tertiary/10 border border-tertiary/10 text-tertiary px-3.5 py-2.5 rounded-2xl mt-4">
                <ShieldCheck size={16} />
                <span className="text-[11px] font-bold">Zomato Safe: contactless delivery active</span>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;
