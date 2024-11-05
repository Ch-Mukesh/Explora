export const travelTypes = [
    {
      id: 1,
      icon: "✈️",
      title: "Solo Adventure",
      description: "Exploring the world, one destination at a time.",
      people: "1"
    },
    {
      id: 2,
      icon: "🥂",
      title: "Couple's Journey",
      description: "Two hearts, one incredible adventure.",
      people: "2"
    },
    {
      id: 3,
      icon: "👨‍👩‍👧‍👦",
      title: "Family Fun",
      description: "A playful crew, making memories together.",
      people: "3 to 5"
    },
    {
      id: 4,
      icon: "⛵",
      title: "Friends' Escape",
      description: "A pack of thrill-seekers chasing excitement.",
      people: "2 to 4",
      spn : "md:col-span-3 md:w-1/2  md:mx-auto"
    }
  ];


  export const travelBudgets = [
    {
      id: 1,
      icon: "🛏️",
      title: "Budget-Friendly",
      description: "Travel smart, save more."
    },
    {
      id: 2,
      icon: "🏨",
      title: "Moderate",
      description: "Balanced spending for a comfortable trip."
    },
    {
      id: 3,
      icon: "💸",
      title: "Luxury",
      description: "Indulge without limits."
    }
  ];
  


  export const AiPrompt = 'Generate Travel Plan for Location: {location}, for {totalDays} Days for {typeTravel} members with a {typeBudget} budget,Give me a Hotels options list with HotelName, Hotel address along with city or town name, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName along with city or town name, Place Details, Place Image Url, Geo Coordinates,rating, ticket Pricing ,Time to travel and best time to visit along with start time and expected end time each of the location for {totalDays} days with each day plan with best time to visit in JSON format.'
