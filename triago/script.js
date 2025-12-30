const hotels = [
  { name: "Hotel Sunshine", city: "Delhi", price: "₹2,999", image: "hotel1.avif", description: "A cozy hotel located in the heart of Delhi. Close to major attractions and transport hubs." },
  { name: "Beach View Resort", city: "Goa", price: "₹4,200", image: "beach.avif", description: "Enjoy ocean views, fresh seafood, and relaxing beach vibes at Beach View Resort." },
  { name: "City Lights Inn", city: "Mumbai", price: "₹3,500", image: "hotel2.avif", description: "Modern amenities and vibrant nightlife just steps away from your stay." },
  { name: "sayaji Palace", city: "Kolhapur", price: "₹12,000", image: "sayaji.jpg", description: "Luxurious palace-style hotel with top-notch hospitality and fine dining." },
  { name: "panchshil Hotel", city: "Kolhapur", price: "₹9,800", image: "panchshil.jpg", description: "Elegant and spacious rooms with top-rated service in Kolhapur." },
  { name: "Hotel classic mid town", city: "Kolhapur", price: "₹7,800", image: "classicmid.webp", description: "Comfortable stay with all modern facilities in central Kolhapur." },
  { name: "Hotel swamini", city: "Kolhapur", price: "₹2,800", image: "Swamini.webp", description: "Budget-friendly hotel offering homely comfort in Kolhapur." },
  { name: "Taj Hotel", city: "Mumbai", price: "₹45,900", image: "hotel5.jpg", description: "Luxury at its finest. Premium amenities and historic charm." },
  { name: "Hotel Kohinoor Corner", city: "Kolhapur", price: "₹7,400", image: "kohinoor.jpg", description: "Stylish interiors and high-end facilities in Kolhapur city center." },
  { name: "Hotel tulsi", city: "Goa", price: "₹9,800", image: "hotel7.jpg", description: "Great hospitality and vibrant Goan ambiance at Hotel Tulsi." },
  { name: "Ocean Breeze Hotel", city: "Goa", price: "₹5,800", image: "hotel8.jpg", description: "Seaside retreat perfect for relaxing family vacations." },
  { name: "Mountain Escape", city: "Manali", price: "₹2,600", image: "hotel9.jpg", description: "Peaceful getaway surrounded by mountains and fresh air." }
];

hotels.forEach(hotel => {
  hotel.rating = (Math.random() * 2 + 3).toFixed(1);
});

function filterHotels() {
  const input = document.getElementById("mainSearchInput")?.value.toLowerCase() ||
                document.getElementById("cityInput")?.value.toLowerCase() || "";

  const hotelList = document.getElementById("hotelList");
  hotelList.innerHTML = "";

  const filtered = hotels.filter(hotel =>
    hotel.city.toLowerCase().includes(input) ||
    hotel.name.toLowerCase().includes(input)
  );

  if (filtered.length === 0) {
    hotelList.innerHTML = "<p>No hotels found for your search.</p>";
    return;
  }

  filtered.forEach(hotel => {
    const params = new URLSearchParams({
      name: hotel.name,
      city: hotel.city,
      price: hotel.price,
      image: hotel.image,
      description: hotel.description
    });

    hotelList.innerHTML += `
      <div class="hotel-card">
        <a href="hotel-details.html?${params.toString()}" target="_blank">
          <img src="${hotel.image}" alt="${hotel.name}" />
        </a>
        <h3>${hotel.name}</h3>
        <p><strong>${hotel.city}</strong></p>
        <p>From ${hotel.price} per night</p>
        <div class="rating">${renderStars(hotel.rating)} (${hotel.rating})</div>
      </div>
    `;
  });
}

function renderStars(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  let stars = "★".repeat(fullStars);
  if (halfStar && stars.length < 5) stars += "½";
  stars = stars.padEnd(5, "☆");
  return stars;
}

window.onload = filterHotels;
