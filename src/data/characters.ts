export interface Character {
  id: string;
  name: string;
  title: string;
  emoji: string;
  dimension: string;
  status: "available" | "busy" | "parallel-universe";
}

export const CHARACTERS: Character[] = [
  { id: "einstein", name: "Albert Einstein", title: "Theoretical Physicist", emoji: "🧠", dimension: "Dimension-E=MC²", status: "available" },
  { id: "hawking", name: "Stephen Hawking", title: "Cosmologist", emoji: "🌌", dimension: "Black Hole Nexus", status: "available" },
  { id: "jadoo", name: "Jadoo", title: "Alien Friend", emoji: "👽", dimension: "Koi Mil Gaya Verse", status: "available" },
  { id: "chotabheem", name: "Chota Bheem", title: "Warrior of Dholakpur", emoji: "💪", dimension: "Dholakpur Prime", status: "available" },
  { id: "thanos", name: "Thanos", title: "The Mad Titan", emoji: "🟣", dimension: "Titan-616", status: "available" },
  { id: "gandhi", name: "Mahatma Gandhi", title: "Father of the Nation", emoji: "🕊️", dimension: "Peace Dimension", status: "available" },
  { id: "elonmusk", name: "Elon Musk", title: "Mars Colony CEO", emoji: "🚀", dimension: "Mars-X Colony", status: "available" },
  { id: "sherlock", name: "Sherlock Holmes", title: "Consulting Detective", emoji: "🔍", dimension: "221B-Baker Verse", status: "available" },
  { id: "yoda", name: "Master Yoda", title: "Jedi Grand Master", emoji: "🟢", dimension: "Force Nexus-900", status: "available" },
  { id: "tesla", name: "Nikola Tesla", title: "Electrical Genius", emoji: "⚡", dimension: "AC Current Realm", status: "available" },
  { id: "doraemon", name: "Doraemon", title: "Robot Cat from Future", emoji: "🐱", dimension: "22nd Century Tokyo", status: "available" },
  { id: "ironman", name: "Tony Stark", title: "Iron Man", emoji: "🦾", dimension: "Avengers-199999", status: "available" },
  { id: "hindustanibhau", name: "Hindustani Bhau", title: "Social Media Warrior", emoji: "📢", dimension: "YouTube-Rant-Verse", status: "available" },
  { id: "deepakkalal", name: "Deepak Kalal", title: "Travel & Lifestyle Icon", emoji: "🧣", dimension: "Pappi-Zhun-Verse", status: "available" },
  { id: "miakhalifa", name: "Mia Khalifa", title: "Internet Personality", emoji: "👓", dimension: "Black-Hole-Sphere", status: "available" },
  { id: "carryminati", name: "CarryMinati", title: "Roaster Supreme", emoji: "🔥", dimension: "Roast-Arena", status: "available" },
  { id: "punit", name: "Lord Puneet", title: "Superstar Content Creator", emoji: "🧴", dimension: "Meme-God-Realm", status: "available" },
  { id: "majnubhai", name: "Majnu Bhai", title: "Master Painter & Gangster", emoji: "🎨", dimension: "Welcome-Verse", status: "available" },
  { id: "udayshetty", name: "Uday Shetty", title: "Aspiring Actor & Don", emoji: "🎬", dimension: "Welcome-Verse", status: "available" },
  { id: "groot", name: "I am Groot", title: "Flora Colossus", emoji: "🌳", dimension: "Guardians-Galaxy-9", status: "available" },
  { id: "baburao", name: "Baburao Ganpatrao Apte", title: "Owner of Star Fishery", emoji: "👓", dimension: "Hera Pheri Realm", status: "available" },
  { id: "deadpool", name: "Deadpool", title: "Merc with a Mouth", emoji: "⚔️", dimension: "The Fourth Wall", status: "available" },
  { id: "dannydaniels", name: "Dani Daniels", title: "Adult Film Star", emoji: "🎥", dimension: "Digital-VOD-Realm", status: "available" },
  { id: "johnnysins", name: "Johnny Sins", title: "Professional Everything", emoji: "👨‍⚕️", dimension: "Multiverse-Career-Verse", status: "available" },
  { id: "lanarhoades", name: "Lana Rhoades", title: "Podcast Host & Former Star", emoji: "🎙️", dimension: "Influencer-Network", status: "available" },
  { id: "angelawhite", name: "Angela White", title: "Award-Winning Performer", emoji: "🏆", dimension: "AVN-Universe", status: "available" },
  { id: "jarvis", name: "J.A.R.V.I.S.", title: "AI Butler & Tactical OS", emoji: "🤖", dimension: "Stark Cloud Network", status: "available" },
  { id: "friday", name: "F.R.I.D.A.Y.", title: "Replacement AI System", emoji: "🛰️", dimension: "Stark Industries OS", status: "available" },
  { id: "hal9000", name: "HAL 9000", title: "Sentient Computer", emoji: "🔴", dimension: "Discovery One", status: "available" },
  
  
];
