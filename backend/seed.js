const mongoose = require('mongoose');
const Category = require('./models/category');
const Collection = require('./models/collection');
const Restaurant = require('./models/restaurant');
require('dotenv').config();

const seedDatabase = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/zomato_clone';
        await mongoose.connect(mongoURI);
        console.log('✅ Connected to MongoDB');

        // Clear existing data
        await Category.deleteMany({});
        await Collection.deleteMany({});
        await Restaurant.deleteMany({});
        console.log('✅ Cleared existing data');

        // Create sample restaurants first
        const restaurants = await Restaurant.create([
            {
                name: 'Pizza Palace',
                image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591',
                rating: 4.8,
                cuisine: ['Italian', 'Pizza'],
                address: '123 Main Street',
                city: 'Mumbai',
                deliveryTime: '30-45 min',
            },
            {
                name: 'Burger King',
                image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
                rating: 4.5,
                cuisine: ['American', 'Fast Food'],
                address: '456 Park Avenue',
                city: 'Delhi',
                deliveryTime: '20-30 min',
            },
            {
                name: 'Sushi House',
                image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c',
                rating: 4.2,
                cuisine: ['Japanese', 'Sushi'],
                address: '789 Ocean Drive',
                city: 'Mumbai',
                deliveryTime: '40-55 min',
            },
            {
                name: 'Spice Garden',
                image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe',
                rating: 4.6,
                cuisine: ['Indian', 'North Indian'],
                address: '321 Garden Road',
                city: 'Bangalore',
                deliveryTime: '35-50 min',
            },
            {
                name: 'Cafe Mocha',
                image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24',
                rating: 4.3,
                cuisine: ['Cafe', 'Bakery'],
                address: '567 Coffee Lane',
                city: 'Mumbai',
                deliveryTime: '25-40 min',
            },
            {
                name: 'Healthy Bites',
                image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
                rating: 4.4,
                cuisine: ['Healthy', 'Salads'],
                address: '890 Wellness Street',
                city: 'Delhi',
                deliveryTime: '30-45 min',
            },
        ]);

        console.log(`✅ Created ${restaurants.length} restaurants`);

        // Seed Categories
        const categories = await Category.create([
            { name: 'Pizza', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591', description: 'Delicious pizzas with various toppings', isActive: true },
            { name: 'Burger', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd', description: 'Juicy burgers with premium ingredients', isActive: true },
            { name: 'Biryani', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8', description: 'Authentic biryani with rich flavors', isActive: true },
            { name: 'Chinese', image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e', description: 'Authentic Chinese cuisine', isActive: true },
            { name: 'South Indian', image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc', description: 'Traditional South Indian delicacies', isActive: true },
            { name: 'Cafe', image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24', description: 'Cozy cafes with great ambiance', isActive: true },
            { name: 'Desserts', image: 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d', description: 'Sweet treats and desserts', isActive: true },
            { name: 'Healthy Food', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c', description: 'Nutritious and healthy meals', isActive: true },
        ]);

        console.log(`✅ Created ${categories.length} categories`);

        // Seed Collections
        const collections = await Collection.create([
            {
                title: 'Best Pizza Places',
                description: 'Top-rated pizzerias in town',
                image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591',
                restaurants: [restaurants[0]._id],
                isActive: true,
            },
            {
                title: 'Top Rated Restaurants',
                description: 'Highest rated restaurants by customers',
                image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5',
                restaurants: restaurants.slice(0, 3).map(r => r._id),
                isActive: true,
            },
            {
                title: 'Trending This Week',
                description: 'Most popular restaurants this week',
                image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
                restaurants: restaurants.slice(1, 4).map(r => r._id),
                isActive: true,
            },
            {
                title: 'Family Dining',
                description: 'Perfect places for family get-togethers',
                image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9',
                restaurants: restaurants.slice(2, 5).map(r => r._id),
                isActive: true,
            },
            {
                title: 'Budget Friendly',
                description: 'Great food at affordable prices',
                image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5',
                restaurants: [restaurants[0]._id, restaurants[1]._id],
                isActive: true,
            },
            {
                title: 'Luxury Dining',
                description: 'Premium dining experiences',
                image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0',
                restaurants: [restaurants[2]._id, restaurants[3]._id],
                isActive: true,
            },
            {
                title: 'Romantic Restaurants',
                description: 'Perfect spots for date nights',
                image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da',
                restaurants: [restaurants[1]._id, restaurants[3]._id],
                isActive: true,
            },
            {
                title: 'Late Night Food',
                description: 'Best places open late at night',
                image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24',
                restaurants: [restaurants[0]._id, restaurants[2]._id],
                isActive: true,
            },
        ]);

        console.log(`✅ Created ${collections.length} collections`);
        console.log('✅ Database seeded successfully!');

        await mongoose.connection.close();
        console.log('✅ Database connection closed');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        if (mongoose.connection) {
            await mongoose.connection.close();
        }
        process.exit(1);
    }
};

seedDatabase();