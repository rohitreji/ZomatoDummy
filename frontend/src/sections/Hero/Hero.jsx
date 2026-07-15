import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import SearchBar from '../../components/SearchBar/SearchBar';

const Hero = () => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();

  // Simple parallax transforms based on page scroll
  const bgY = useTransform(scrollY, [0, 500], [0, 150]);
  const textY = useTransform(scrollY, [0, 500], [0, 80]);

  const handleSearchSubmit = (query) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  // Floating image bubbles removed per user request – background now uses video.


  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden py-16">
      {/* Background Graphic Image with parallax */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0 select-none">
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          poster="" // fallback image if needed
        >
          <source src="/src/assets/videos/food.mp4" type="video/mp4" />

          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-white/10" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background" />
      </motion.div>

      {/* Floating image overlay removed – no floatingImages defined */}

      {/* Hero contents container */}
      <motion.div
        style={{ y: textY }}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-20 max-w-5xl mx-auto px-6 text-center"
      >
        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-display font-extrabold text-label-lg mb-6 border border-primary/20 backdrop-blur-sm select-none">
          ✨ Fastest Delivery in the City
        </span>

        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-black text-on-surface mb-8 leading-tight tracking-tight select-none">
          Urban Gastronomy,<br />
          <span className="text-primary italic font-serif">Delivered.</span>
        </h1>

        {/* Floating search container */}
        <div className="mb-12 px-2 md:px-0">
          <SearchBar onSearch={handleSearchSubmit} />
        </div>

        {/* Dynamic customer count */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-on-surface-variant font-label-lg font-bold">
          <div className="flex -space-x-3 select-none">
            <div className="w-9 h-9 rounded-full border-2 border-white bg-cover bg-center" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAOpmHiZ-kvtvdpfrXZ5B-ng1lf5-aLTVUHaTPQZAi2OA1eVjQuKKXjco4bsh72NjZrhdepbcG0e8gUaToM4Pn7TGI1FN9jcKLogVJa0zTd4RdPNw30fIGZlo4qbtjXTwQ0VphgbuEYwjtIbnuZTFyKG1QNqwBNYXrjdQUaxaKCrV4gPk2_pv0q3VNnXwEAf6QnpAk8P_b5THle06pCzdbq_FG2BwkdbI__LJMusZnOuPUhQfoXYKsPvevXpbiFyH-_WQQblPfMWYBQ')` }} />
            <div className="w-9 h-9 rounded-full border-2 border-white bg-cover bg-center" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDgbiWx3m82kO5OuJHirxDLNwulPWjTCOWTJS0GtDfLyBrbAVRsoAP4UwyiZ51VNnKA4Hx6qVDf7BzWkQxZQba55nRZssGL0M8MWHH9R5iLuChLtwzY3ua_aAeW3uOBLrlB6cz5zb7kRC--CSpnJefKlzDfq87PEYjNHN5liVbOB8EOzKzgyHi_3pXcGfaiFsnJOGMlRcmuKlOVOiVKwJyFKo7YpgpprRrl-s96Sa_vq_XcSRDkMxWVaH4GXJbRoYLmjSuYf9Ng-6Xs')` }} />
            <div className="w-9 h-9 rounded-full border-2 border-white bg-cover bg-center" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuD4nLX1xEjIE8dOYaOpuxNkUkie2x6NhmdtdYMr-0C8DT09qEC7D6Xgoht-Xdzr5lq7gbud_YiVoiN6OPwJJgH5ScuT8OJxl8Xxf_Vbdj_n0vuO3l_f1jW62Jv51yMnPTimQO8fgSQvp--Nh1N-sJ4f2KgbgGM6UffZVv6d14D_IlOYXtGhStbwPRTF-Zu2sn52q2dteDcONPvP6b8Ha10lwElWm2X4W77wWbPRAE6966HkYRRa9lyLMfGu4GscEoF3AeY_fMwoo_H4')` }} />
          </div>
          <p>Trusted by <span className="text-primary font-black">50,000+</span> urban diners</p>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
