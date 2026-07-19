const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Models
const User = require('./models/User');
const Restaurant = require('./models/restaurant');
const Category = require('./models/category');
const Collection = require('./models/collection');
const Menu = require('./models/Menu');
const Review = require('./models/review');
const Offer = require('./models/offer');
const Coupon = require('./models/coupen');
const Address = require('./models/address');
const Wishlist = require('./models/wishlist');
const Cart = require('./models/cart');
const Order = require('./models/Order');
const Payment = require('./models/payment');

const MONGODB_URI = process.env.MONGO_URL || 'mongodb://localhost:27017/ZomatoDummy';

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Delete all data in correct order
    await Payment.deleteMany({});
    await Order.deleteMany({});
    await Cart.deleteMany({});
    await Wishlist.deleteMany({});
    await Address.deleteMany({});
    await Review.deleteMany({});
    await Menu.deleteMany({});
    await Offer.deleteMany({});
    await Coupon.deleteMany({});
    await Collection.deleteMany({});
    await Category.deleteMany({});
    await Restaurant.deleteMany({});
    await User.deleteMany({});

    console.log('All existing data cleared');

    // Create Users
    const admin = new User({
      name: 'Admin User',
      email: 'admin@zomato.com',
      password: 'admin123',
      role: 'admin'
    });
    await admin.save();

    const ownersData = [
      { name: 'Rajesh Sharma', email: 'owner1@zomato.com' },
      { name: 'Amit Patel', email: 'owner2@zomato.com' },
      { name: 'Neha Singh', email: 'owner3@zomato.com' },
      { name: 'Anjali Mehta', email: 'owner4@zomato.com' },
      { name: 'Vikram Nair', email: 'owner5@zomato.com' },
      { name: 'Rahul Verma', email: 'owner6@zomato.com' },
      { name: 'Suresh Kumar', email: 'owner7@zomato.com' },
      { name: 'Priya Iyer', email: 'owner8@zomato.com' }
    ];

    const owners = [];
    for (const data of ownersData) {
      const owner = new User({
        name: data.name,
        email: data.email,
        password: 'owner123',
        role: 'restaurantOwner'
      });
      await owner.save();
      owners.push(owner);
    }

    const customersData = [
      { name: 'Arjun Reddy', email: 'customer1@zomato.com' },
      { name: 'Sneha Patel', email: 'customer2@zomato.com' },
      { name: 'Ravi Kumar', email: 'customer3@zomato.com' },
      { name: 'Meera Sharma', email: 'customer4@zomato.com' },
      { name: 'Karan Singh', email: 'customer5@zomato.com' },
      { name: 'Priya Nair', email: 'customer6@zomato.com' },
      { name: 'Deepak Verma', email: 'customer7@zomato.com' },
      { name: 'Ananya Reddy', email: 'customer8@zomato.com' },
      { name: 'Suresh Babu', email: 'customer9@zomato.com' },
      { name: 'Lakshmi Iyer', email: 'customer10@zomato.com' },
      { name: 'Manoj Singh', email: 'customer11@zomato.com' },
      { name: 'Radhika Mehta', email: 'customer12@zomato.com' },
      { name: 'Vijay Kumar', email: 'customer13@zomato.com' },
      { name: 'Sarita Reddy', email: 'customer14@zomato.com' },
      { name: 'Rahul Patel', email: 'customer15@zomato.com' }
    ];

    const customers = [];
    for (const data of customersData) {
      const customer = new User({
        name: data.name,
        email: data.email,
        password: 'customer123',
        role: 'customer'
      });
      await customer.save();
      customers.push(customer);
    }

    console.log(`Users Created: ${1 + owners.length + customers.length}`);

    // Create Restaurants
    const restaurantData = [
      {
        name: 'Pizza Palace',
        description: 'Authentic Italian pizzas baked in wood-fired oven',
        cuisine: 'Italian, Pizza',
        address: '123 MG Road',
        city: 'Mumbai',
        phone: '9876543210',
        openingTime: '11:00',
        closingTime: '23:00',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591',
        rating: 0
      },
      {
        name: 'Burger Hub',
        description: 'Gourmet burgers with fresh ingredients',
        cuisine: 'American, Fast Food',
        address: '456 Park Street',
        city: 'Delhi',
        phone: '9876543211',
        openingTime: '10:00',
        closingTime: '22:00',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
        rating: 0
      },
      {
        name: 'Spice Garden',
        description: 'Traditional Indian cuisine with rich flavors',
        cuisine: 'North Indian, Mughlai',
        address: '789 Lake Road',
        city: 'Bangalore',
        phone: '9876543212',
        openingTime: '12:00',
        closingTime: '23:30',
        image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe',
        rating: 0
      },
      {
        name: 'Cafe Mocha',
        description: 'Cozy cafe with specialty coffees and desserts',
        cuisine: 'Cafe, Continental',
        address: '321 Hill Road',
        city: 'Mumbai',
        phone: '9876543213',
        openingTime: '08:00',
        closingTime: '22:00',
        image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24',
        rating: 0
      },
      {
        name: 'Healthy Bites',
        description: 'Healthy and organic meals for fitness enthusiasts',
        cuisine: 'Health Food, Salad',
        address: '654 Green Valley',
        city: 'Bangalore',
        phone: '9876543214',
        openingTime: '09:00',
        closingTime: '21:00',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
        rating: 0
      },
      {
        name: 'Biryani House',
        description: 'Famous for authentic Hyderabadi biryani',
        cuisine: 'Biryani, Mughlai',
        address: '987 Food Street',
        city: 'Hyderabad',
        phone: '9876543215',
        openingTime: '11:30',
        closingTime: '23:00',
        image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0',
        rating: 0
      },
      {
        name: 'Chinese Wok',
        description: 'Authentic Chinese and Asian cuisine',
        cuisine: 'Chinese, Asian',
        address: '147 Canton Road',
        city: 'Delhi',
        phone: '9876543216',
        openingTime: '11:00',
        closingTime: '23:00',
        image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e',
        rating: 0
      },
      {
        name: 'South Spice',
        description: 'Authentic South Indian delicacies',
        cuisine: 'South Indian',
        address: '258 Temple Road',
        city: 'Chennai',
        phone: '9876543217',
        openingTime: '07:00',
        closingTime: '22:00',
        image: 'https://images.unsplash.com/photo-1582337425939-1e100cf5db6a',
        rating: 0
      },
      {
        name: 'BBQ Nation',
        description: 'Live grills and unlimited barbecue',
        cuisine: 'Barbecue, Grill',
        address: '369 Lake View',
        city: 'Mumbai',
        phone: '9876543218',
        openingTime: '12:00',
        closingTime: '00:00',
        image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd',
        rating: 0
      },
      {
        name: 'Sushi House',
        description: 'Premium Japanese sushi and sashimi',
        cuisine: 'Japanese, Sushi',
        address: '741 Sakura Lane',
        city: 'Delhi',
        phone: '9876543219',
        openingTime: '12:00',
        closingTime: '22:30',
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c',
        rating: 0
      }
    ];

    const restaurants = [];
    for (let i = 0; i < restaurantData.length; i++) {
      const data = restaurantData[i];
      const restaurant = new Restaurant({
        ...data,
        owner: owners[i % owners.length]._id
      });
      await restaurant.save();
      restaurants.push(restaurant);
    }

    console.log(`Restaurants Created: ${restaurants.length}`);

    // Create Categories
    const categoriesData = [
      'Pizza',
      'Burger',
      'Biryani',
      'Chinese',
      'South Indian',
      'Cafe',
      'Desserts',
      'Healthy Food',
      'North Indian',
      'Fast Food'
    ];

    const categories = [];
    for (const name of categoriesData) {
      const category = new Category({ name });
      await category.save();
      categories.push(category);
    }

    console.log(`Categories Created: ${categories.length}`);

    // Create Collections
    const collectionsData = [
      { title: 'Best Pizza', restaurants: [restaurants[0]._id, restaurants[1]._id] },
      { title: 'Trending Restaurants', restaurants: [restaurants[2]._id, restaurants[3]._id, restaurants[4]._id] },
      { title: 'Family Dining', restaurants: [restaurants[5]._id, restaurants[6]._id, restaurants[7]._id] },
      { title: 'Luxury Dining', restaurants: [restaurants[8]._id, restaurants[9]._id] },
      { title: 'Late Night Food', restaurants: [restaurants[0]._id, restaurants[2]._id, restaurants[8]._id] },
      { title: 'Budget Eats', restaurants: [restaurants[1]._id, restaurants[4]._id, restaurants[7]._id] },
      { title: 'Top Rated', restaurants: [restaurants[3]._id, restaurants[5]._id, restaurants[9]._id] },
      { title: 'Cafe Culture', restaurants: [restaurants[3]._id, restaurants[6]._id] }
    ];

    for (const data of collectionsData) {
      const collection = new Collection(data);
      await collection.save();
    }

    console.log(`Collections Created: ${collectionsData.length}`);

    // Create Menu Items
    const menuItemsData = [
      // Pizza Palace
      { name: 'Margherita Pizza', price: 299, description: 'Classic tomato sauce with mozzarella', isVeg: true, discount: 10 },
      { name: 'Farmhouse Pizza', price: 399, description: 'Loaded with fresh vegetables', isVeg: true, discount: 15 },
      { name: 'Pepperoni Pizza', price: 449, description: 'Spicy pepperoni with cheese', isVeg: false, discount: 5 },
      { name: 'Garlic Bread', price: 149, description: 'Crispy bread with garlic butter', isVeg: true, discount: 0 },
      { name: 'Pasta Alfredo', price: 299, description: 'Creamy pasta with parmesan', isVeg: true, discount: 10 },
      { name: 'Tiramisu', price: 199, description: 'Classic Italian dessert', isVeg: true, discount: 0 },
      // Burger Hub
      { name: 'Veg Burger', price: 199, description: 'Grilled veg patty with lettuce', isVeg: true, discount: 10 },
      { name: 'Chicken Burger', price: 249, description: 'Grilled chicken with mayo', isVeg: false, discount: 5 },
      { name: 'Double Cheese Burger', price: 299, description: 'Double patty with extra cheese', isVeg: false, discount: 0 },
      { name: 'French Fries', price: 99, description: 'Crispy golden fries', isVeg: true, discount: 0 },
      { name: 'Chicken Wings', price: 199, description: 'Spicy crispy wings', isVeg: false, discount: 15 },
      { name: 'Milkshake', price: 149, description: 'Thick creamy milkshake', isVeg: true, discount: 0 },
      // Spice Garden
      { name: 'Paneer Tikka', price: 299, description: 'Grilled cottage cheese with spices', isVeg: true, discount: 10 },
      { name: 'Butter Chicken', price: 349, description: 'Creamy tomato-based curry', isVeg: false, discount: 5 },
      { name: 'Dal Makhani', price: 249, description: 'Black lentils slow-cooked', isVeg: true, discount: 0 },
      { name: 'Naan Bread', price: 49, description: 'Tandoori baked bread', isVeg: true, discount: 0 },
      { name: 'Mango Lassi', price: 149, description: 'Sweet yogurt drink', isVeg: true, discount: 0 },
      { name: 'Gulab Jamun', price: 99, description: 'Sweet milk dumplings', isVeg: true, discount: 0 },
      // Cafe Mocha
      { name: 'Cappuccino', price: 149, description: 'Classic coffee with foam', isVeg: true, discount: 0 },
      { name: 'Cold Coffee', price: 179, description: 'Iced coffee with cream', isVeg: true, discount: 10 },
      { name: 'Brownie', price: 129, description: 'Chocolate brownie with nuts', isVeg: true, discount: 5 },
      { name: 'Cheesecake', price: 199, description: 'Creamy baked cheesecake', isVeg: true, discount: 0 },
      { name: 'Sandwich Platter', price: 249, description: 'Assorted sandwiches', isVeg: true, discount: 0 },
      { name: 'Fresh Juice', price: 99, description: 'Seasonal fresh juice', isVeg: true, discount: 0 },
      // Healthy Bites
      { name: 'Quinoa Salad', price: 249, description: 'Healthy quinoa with vegetables', isVeg: true, discount: 5 },
      { name: 'Grilled Chicken', price: 299, description: 'Grilled chicken breast with veggies', isVeg: false, discount: 0 },
      { name: 'Smoothie Bowl', price: 199, description: 'Fruit smoothie with granola', isVeg: true, discount: 10 },
      { name: 'Vegetable Wrap', price: 179, description: 'Whole wheat wrap with veggies', isVeg: true, discount: 0 },
      { name: 'Protein Shake', price: 249, description: 'High protein shake', isVeg: true, discount: 0 },
      { name: 'Fruit Platter', price: 149, description: 'Fresh seasonal fruits', isVeg: true, discount: 0 },
      // Biryani House
      { name: 'Chicken Biryani', price: 299, description: 'Hyderabadi style chicken biryani', isVeg: false, discount: 10 },
      { name: 'Mutton Biryani', price: 399, description: 'Tender mutton biryani', isVeg: false, discount: 5 },
      { name: 'Veg Biryani', price: 249, description: 'Vegetable biryani with spices', isVeg: true, discount: 0 },
      { name: 'Raita', price: 49, description: 'Yogurt with spices', isVeg: true, discount: 0 },
      { name: 'Kebab Platter', price: 349, description: 'Assorted grilled kebabs', isVeg: false, discount: 0 },
      { name: 'Phirni', price: 99, description: 'Rice pudding dessert', isVeg: true, discount: 0 },
      // Chinese Wok
      { name: 'Noodles', price: 199, description: 'Hakka noodles with vegetables', isVeg: true, discount: 10 },
      { name: 'Fried Rice', price: 199, description: 'Wok-tossed fried rice', isVeg: true, discount: 5 },
      { name: 'Chicken Manchurian', price: 279, description: 'Fried chicken in gravy', isVeg: false, discount: 0 },
      { name: 'Spring Rolls', price: 149, description: 'Crispy vegetable rolls', isVeg: true, discount: 0 },
      { name: 'Schezwan Chicken', price: 299, description: 'Spicy schezwan chicken', isVeg: false, discount: 0 },
      { name: 'Honey Noodles', price: 179, description: 'Crispy noodles with honey', isVeg: true, discount: 0 },
      // South Spice
      { name: 'Masala Dosa', price: 149, description: 'Crispy dosa with potato filling', isVeg: true, discount: 5 },
      { name: 'Idli', price: 99, description: 'Steamed rice cakes', isVeg: true, discount: 0 },
      { name: 'Vada', price: 79, description: 'Crispy lentil donuts', isVeg: true, discount: 0 },
      { name: 'Uttapam', price: 149, description: 'Thick pancake with toppings', isVeg: true, discount: 0 },
      { name: 'Filter Coffee', price: 49, description: 'South Indian filter coffee', isVeg: true, discount: 0 },
      { name: 'Coconut Chutney', price: 29, description: 'Fresh coconut chutney', isVeg: true, discount: 0 },
      // BBQ Nation
      { name: 'Chicken Tikka', price: 299, description: 'Spicy grilled chicken', isVeg: false, discount: 10 },
      { name: 'Paneer Tikka', price: 279, description: 'Grilled paneer with spices', isVeg: true, discount: 5 },
      { name: 'Fish Grill', price: 349, description: 'Grilled fish with herbs', isVeg: false, discount: 0 },
      { name: 'Veg Kebab', price: 249, description: 'Assorted vegetable kebabs', isVeg: true, discount: 0 },
      { name: 'BBQ Platter', price: 499, description: 'Assorted BBQ platter', isVeg: false, discount: 15 },
      { name: 'Grilled Corn', price: 149, description: 'Corn on the cob with butter', isVeg: true, discount: 0 },
      // Sushi House
      { name: 'California Roll', price: 399, description: 'Crab and avocado roll', isVeg: false, discount: 10 },
      { name: 'Nigiri Platter', price: 499, description: 'Assorted nigiri sushi', isVeg: false, discount: 5 },
      { name: 'Miso Soup', price: 149, description: 'Traditional miso soup', isVeg: true, discount: 0 },
      { name: 'Tempura Roll', price: 449, description: 'Crispy tempura roll', isVeg: false, discount: 0 },
      { name: 'Veg Sushi', price: 349, description: 'Vegetable sushi rolls', isVeg: true, discount: 0 },
      { name: 'Green Tea', price: 99, description: 'Traditional green tea', isVeg: true, discount: 0 }
    ];

    const allMenus = [];
    for (let i = 0; i < menuItemsData.length; i++) {
      const data = menuItemsData[i];
      const restaurantIndex = Math.floor(i / 6);
      const categoryIndex = i % categories.length;
      const menu = new Menu({
        ...data,
        restaurant: restaurants[restaurantIndex]._id,
        category: categories[categoryIndex % categories.length].name,
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
        rating: 4.0 + Math.random()
      });
      await menu.save();
      allMenus.push(menu);
    }

    console.log(`Menus Created: ${allMenus.length}`);

    // Create Reviews
    const reviewComments = [
      'Amazing food and great service!',
      'Best restaurant in town!',
      'Loved the ambiance and the food.',
      'Delicious food, highly recommended.',
      'Great place for family dining.',
      'The biryani is outstanding.',
      'Excellent service and tasty food.',
      'Will visit again for sure.',
      'The pizza is authentic Italian.',
      'Very good value for money.',
      'A bit expensive but worth it.',
      'The staff is very friendly.',
      'Perfect place for a date night.',
      'The portions are generous.',
      'Food was fresh and tasty.',
      'Loved the live music and food.',
      'Great variety of options.',
      'The desserts are must-try.',
      'Very clean and hygienic place.',
      'Quick service and delicious food.'
    ];

    const reviews = [];
    for (let i = 0; i < 30; i++) {
      const customer = customers[i % customers.length];
      const restaurant = restaurants[i % restaurants.length];
      const rating = 3.5 + Math.random() * 1.5;
      const review = new Review({
        user: customer._id,
        restaurant: restaurant._id,
        rating: Math.round(rating * 10) / 10,
        comment: reviewComments[i % reviewComments.length]
      });
      await review.save();
      reviews.push(review);
    }

    console.log(`Reviews Created: ${reviews.length}`);

    // Update restaurant ratings
    for (const restaurant of restaurants) {
      const restaurantReviews = await Review.find({ restaurant: restaurant._id });
      if (restaurantReviews.length > 0) {
        const avgRating = restaurantReviews.reduce((sum, r) => sum + r.rating, 0) / restaurantReviews.length;
        restaurant.rating = Math.round(avgRating * 10) / 10;
        await restaurant.save();
      }
    }

    // Create Offers
    const offersData = [
      {
        title: 'Weekend Special',
        description: 'Get 20% off on all orders',
        code: 'WEEKEND20',
        discount: 20,
        validTill: new Date('2026-12-31'),
        restaurants: [restaurants[0]._id, restaurants[2]._id, restaurants[5]._id]
      },
      {
        title: 'Happy Hour',
        description: '50% off on beverages',
        code: 'HAPPY50',
        discount: 50,
        validTill: new Date('2026-12-31'),
        restaurants: [restaurants[3]._id, restaurants[6]._id]
      },
      {
        title: 'New User Offer',
        description: 'Flat 100 off on first order',
        code: 'NEW100',
        discount: 100,
        validTill: new Date('2026-12-31'),
        restaurants: [restaurants[1]._id, restaurants[4]._id, restaurants[7]._id]
      },
      {
        title: 'Festival Special',
        description: 'Buy 1 Get 1 Free',
        code: 'FESTIVAL',
        discount: 50,
        validTill: new Date('2026-12-31'),
        restaurants: [restaurants[8]._id, restaurants[9]._id]
      },
      {
        title: 'Lunch Special',
        description: '20% off on lunch orders',
        code: 'LUNCH20',
        discount: 20,
        validTill: new Date('2026-12-31'),
        restaurants: [restaurants[0]._id, restaurants[3]._id, restaurants[6]._id]
      },
      {
        title: 'Family Pack',
        description: 'Save 15% on family meals',
        code: 'FAMILY15',
        discount: 15,
        validTill: new Date('2026-12-31'),
        restaurants: [restaurants[2]._id, restaurants[5]._id, restaurants[8]._id]
      },
      {
        title: 'Combo Offer',
        description: 'Meal combos at 25% off',
        code: 'COMBO25',
        discount: 25,
        validTill: new Date('2026-12-31'),
        restaurants: [restaurants[1]._id, restaurants[4]._id, restaurants[7]._id]
      },
      {
        title: 'Late Night Special',
        description: '20% off after 9 PM',
        code: 'LATE20',
        discount: 20,
        validTill: new Date('2026-12-31'),
        restaurants: [restaurants[0]._id, restaurants[2]._id, restaurants[8]._id]
      },
      {
        title: 'Premium Treat',
        description: '10% off on premium items',
        code: 'PREMIUM10',
        discount: 10,
        validTill: new Date('2026-12-31'),
        restaurants: [restaurants[9]._id]
      },
      {
        title: 'International Cuisine',
        description: '15% off on international dishes',
        code: 'INTER15',
        discount: 15,
        validTill: new Date('2026-12-31'),
        restaurants: [restaurants[6]._id, restaurants[9]._id]
      }
    ];

    for (const data of offersData) {
      const offer = new Offer(data);
      await offer.save();
    }

    console.log(`Offers Created: ${offersData.length}`);

    // Create Coupons
    const couponsData = [
      { code: 'WELCOME50', description: '50% off on first order', discountType: 'Percentage', discountValue: 50, expiryDate: new Date('2026-12-31') },
      { code: 'SAVE100', description: 'Save 100 on orders above 500', discountType: 'Flat', discountValue: 100, expiryDate: new Date('2026-12-31') },
      { code: 'FIRSTORDER', description: '20% off on first order', discountType: 'Percentage', discountValue: 20, expiryDate: new Date('2026-12-31') },
      { code: 'FREEDEL', description: 'Free delivery on all orders', discountType: 'Flat', discountValue: 50, expiryDate: new Date('2026-12-31') },
      { code: 'SUMMER25', description: '25% off on summer orders', discountType: 'Percentage', discountValue: 25, expiryDate: new Date('2026-12-31') },
      { code: 'FLAT75', description: 'Flat 75 off on orders above 300', discountType: 'Flat', discountValue: 75, expiryDate: new Date('2026-12-31') },
      { code: 'PARTY15', description: '15% off on group orders', discountType: 'Percentage', discountValue: 15, expiryDate: new Date('2026-12-31') },
      { code: 'SPICE10', description: '10% off on spicy items', discountType: 'Percentage', discountValue: 10, expiryDate: new Date('2026-12-31') },
      { code: 'BIGSAVE', description: 'Save 200 on orders above 1000', discountType: 'Flat', discountValue: 200, expiryDate: new Date('2026-12-31') },
      { code: 'MONDAY10', description: '10% off on Monday orders', discountType: 'Percentage', discountValue: 10, expiryDate: new Date('2026-12-31') }
    ];

    for (const data of couponsData) {
      const coupon = new Coupon(data);
      await coupon.save();
    }

    console.log(`Coupons Created: ${couponsData.length}`);

    // Create Addresses
    const addressData = [
      '123 Main Street, Andheri East, Mumbai',
      '456 Park Avenue, Indiranagar, Bangalore',
      '789 Lake View, HSR Layout, Bangalore',
      '321 Hill Road, Bandra West, Mumbai',
      '654 Green Valley, Electronic City, Bangalore',
      '987 Food Street, Banjara Hills, Hyderabad',
      '147 Canton Road, Connaught Place, Delhi',
      '258 Temple Road, T Nagar, Chennai',
      '369 Lake View, Powai, Mumbai',
      '741 Sakura Lane, Saket, Delhi',
      '852 Garden Road, Koregaon Park, Pune',
      '963 Church Street, MG Road, Bangalore',
      '159 Paradise Road, Jubilee Hills, Hyderabad',
      '753 Silver Oak, Juhu, Mumbai',
      '951 Golden Avenue, Cyber City, Gurgaon'
    ];

    for (let i = 0; i < customers.length; i++) {
      const address = new Address({
        user: customers[i]._id,
        fullName: customers[i].name,
        phone: '9876543210',
        houseNo: 'House No. ' + (i + 1),
        street: addressData[i],
        city: ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai'][i % 5],
        state: ['Maharashtra', 'Delhi', 'Karnataka', 'Telangana', 'Tamil Nadu'][i % 5],
        pincode: ['400001', '110001', '560001', '500001', '600001'][i % 5],
        isDefault: i === 0
      });
      await address.save();
    }

    console.log(`Addresses Created: ${customers.length}`);

    // Create Wishlists
    for (let i = 0; i < customers.length; i++) {
      const customer = customers[i];
      const wishlistRestaurants = [
        restaurants[i % restaurants.length]._id,
        restaurants[(i + 3) % restaurants.length]._id
      ];
      for (const restaurantId of wishlistRestaurants) {
        const wishlist = new Wishlist({
          user: customer._id,
          restaurant: restaurantId
        });
        await wishlist.save();
      }
    }

    console.log(`Wishlists Created: ${customers.length}`);

    // Create Carts
    for (let i = 0; i < customers.length; i++) {
      const customer = customers[i];
      const restaurant = restaurants[i % restaurants.length];
      const menuItems = allMenus.slice(i * 2 % 60, (i * 2 % 60) + 2);
      const items = menuItems.map(item => {
        const qty = 1 + Math.floor(Math.random() * 3);
        return {
          menuItem: item._id,
          quantity: qty,
          totalAmount: item.price * qty
        };
      });

      const cart = new Cart({
        user: customer._id,
        restaurant: restaurant._id,
        items: items
      });
      await cart.save();
    }

    console.log(`Carts Created: ${customers.length}`);

    // Create Orders and Payments
    const orderStatuses = ['Pending', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'];
    const paymentMethods = ['Card', 'UPI', 'Cash on Delivery'];
    const paymentStatuses = ['Pending', 'Paid', 'Failed'];

    let orderCount = 0;
    for (let i = 0; i < customers.length; i++) {
      const customer = customers[i];
      const numOrders = 1 + Math.floor(Math.random() * 3);

      for (let j = 0; j < numOrders; j++) {
        const restaurant = restaurants[(i + j) % restaurants.length];
        const menuItems = allMenus.slice((i + j * 2) % 60, ((i + j * 2) % 60) + 3);
        const items = menuItems.map(item => ({
          menuItem: item._id,
          quantity: 1 + Math.floor(Math.random() * 2)
        }));
        const total = menuItems.reduce((sum, item, idx) => sum + (item.price * items[idx].quantity), 0);
        const deliveryAddressDoc = await Address.findOne({ user: customer._id });
        const deliveryAddressStr = deliveryAddressDoc ? deliveryAddressDoc.street : "123 Main Street, Mumbai";

        const order = new Order({
          user: customer._id,
          restaurant: restaurant._id,
          items: items,
          totalAmount: total,
          deliveryAddress: deliveryAddressStr,
          paymentMethod: paymentMethods[j % paymentMethods.length],
          orderStatus: orderStatuses[j % orderStatuses.length],
          createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
        });
        await order.save();
        orderCount++;

        const payment = new Payment({
          order: order._id,
          user: customer._id,
          amount: total,
          paymentMethod: paymentMethods[j % paymentMethods.length],
          paymentStatus: paymentStatuses[j % paymentStatuses.length],
          transactionId: `TXN${Date.now()}${i}${j}`
        });
        await payment.save();
      }
    }

    console.log(`Orders Created: ${orderCount}`);
    console.log(`Payments Created: ${orderCount}`);

    console.log('\n================== SEED COMPLETE ==================');
    console.log(`Users Created: ${1 + owners.length + customers.length}`);
    console.log(`Restaurants Created: ${restaurants.length}`);
    console.log(`Categories Created: ${categories.length}`);
    console.log(`Collections Created: ${collectionsData.length}`);
    console.log(`Menus Created: ${allMenus.length}`);
    console.log(`Reviews Created: ${reviews.length}`);
    console.log(`Offers Created: ${offersData.length}`);
    console.log(`Coupons Created: ${couponsData.length}`);
    console.log(`Addresses Created: ${customers.length}`);
    console.log(`Wishlists Created: ${customers.length}`);
    console.log(`Carts Created: ${customers.length}`);
    console.log(`Orders Created: ${orderCount}`);
    console.log(`Payments Created: ${orderCount}`);
    console.log('==================================================');
    console.log('Database Seeded Successfully');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

seedDatabase();